import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTokenUser } from "../hooks/hookToken";
import LoadingScreen from "../src/components/loading/loading";
import useGameSocket from "../hooks/useGameSocket";
//import styles from "../src/styles/stylesGameView"; // Asegúrate de tener este archivo o define tus estilos

export default function GameView() {
  const imageSources = {
    0: require('../assets/img/cardsgame/0.png'),
    1: require('../assets/img/cardsgame/1.png'),
    2: require('../assets/img/cardsgame/2.png'),
    3: require('../assets/img/cardsgame/3.png'),
    4: require('../assets/img/cardsgame/4.png'),
    5: require('../assets/img/cardsgame/5.png'),
    6: require('../assets/img/cardsgame/6.png'),
    7: require('../assets/img/cardsgame/7.png'),
    8: require('../assets/img/cardsgame/8.png'),
    9: require('../assets/img/cardsgame/9.png'),
    10: require('../assets/img/cardsgame/10.png'),
    11: require('../assets/img/cardsgame/11.png'),
    12: require('../assets/img/cardsgame/12.png'),
    13: require('../assets/img/cardsgame/13.png'),
    14: require('../assets/img/cardsgame/14.png'),
    15: require('../assets/img/cardsgame/15.png'),
    16: require('../assets/img/cardsgame/16.png'),
    17: require('../assets/img/cardsgame/17.png'),
  };

  const { userData } = useTokenUser();
  const navigation = useNavigation();

  // Estados principales
  const [isLoading, setIsLoading] = useState(false);
  const [salaEstado, setSalaEstado] = useState(null);
  const [cardsPlayerLocal, setCardsPlayerLocal] = useState(null);
  const [cardsPlayerEnemy, setCardsPlayerEnemy] = useState(null);

  // Estados de usuario y cartas
  const [userLocal, setUserLocal] = useState(null);
  const [userEnemy, setUserEnemy] = useState(null);
  const [availableCards, setAvailableCards] = useState([]);
  const [orderedCards, setOrderedCards] = useState([]);
  const [hasSubmittedOrder, setHasSubmittedOrder] = useState(false);

  // Hook de conexión por socket
  const { sendOrderCards, playerEmitExit } = useGameSocket({
  userData,
  setSalaEstado,
  setCardsPlayerLocal,
  setCardsPlayerEnemy,
  navigation,
  setIsLoading,
});

  useEffect(() => {
    if (salaEstado) {
      const local = salaEstado.jugadores.find(j => j.id === userData.id);
      const enemy = salaEstado.jugadores.find(j => j.id !== userData.id);
      setUserLocal(local);
      setUserEnemy(enemy);
    }
  }, [salaEstado]);

  useEffect(() => {
    if (userLocal) {
      setAvailableCards(userLocal.cartas || []);
    }
  }, [userLocal]);

  // Funciones de cartas
  const getShuffledArr = arr => {
    const newArr = arr.slice();
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr;
  };

  const generateRandomOrder = () => {
    const fullArray = [...availableCards, ...orderedCards];
    const shuffled = getShuffledArr(fullArray);
    setAvailableCards([]);
    setOrderedCards(shuffled);
  };

  const selectOrderCardIndividual = pos => {
    const card = availableCards[pos];
    setOrderedCards([...orderedCards, card]);
    setAvailableCards(availableCards.filter((_, idx) => idx !== pos));
  };

  const removeOrderCardIndividual = pos => {
    const card = orderedCards[pos];
    setAvailableCards([...availableCards, card]);
    setOrderedCards(orderedCards.filter((_, idx) => idx !== pos));
  };

  const aceptarOrdenCartas = () => {
  setHasSubmittedOrder(true);
  setIsLoading(true);
  sendOrderCards(orderedCards);
};

  // Render lógica
  const renderIndividualResultFightCards = (typePlayer, typeRival) => {
    let resultado = '';
    if (typePlayer === typeRival) resultado = 'draw';
    if (typePlayer === 'piedra' && typeRival === 'tijera') resultado = 'win';
    if (typePlayer === 'piedra' && typeRival === 'papel') resultado = 'lose';
    if (typePlayer === 'papel' && typeRival === 'piedra') resultado = 'win';
    if (typePlayer === 'papel' && typeRival === 'tijera') resultado = 'lose';
    if (typePlayer === 'tijera' && typeRival === 'papel') resultado = 'win';
    if (typePlayer === 'tijera' && typeRival === 'piedra') resultado = 'lose';

    let src = null;
    if (resultado === 'win') src = require('../assets/img/match_win.png');
    if (resultado === 'lose') src = require('../assets/img/match_loss.png');
    if (resultado === 'draw') src = require('../assets/img/match_draw.png');
    return (<Image style={styles.imgResult} source={src} />);
  };

  const renderResultsRound = () => {
    if (cardsPlayerEnemy == null) return (<></>);

    return (
      <View style={styles.playerSection}>
        <View style={styles.cardsPlayerContainer}>
          <View style={styles.nameRow}>
  <Text style={styles.playerName}>{userLocal.usuario.usuario.usuario}</Text>
  {userLocal.usuario.usuario.pais && (
    <>
      <Text style={styles.playerCountry}> ({userLocal.usuario.usuario.pais})</Text>
      <Image
        source={{ uri: `https://flagcdn.com/w40/${userLocal.usuario.usuario.codigoPais.toLowerCase()}.png` }}
        style={styles.flag}
      />
    </>
  )}
</View>
   
          <View style={styles.cardsContainer}>
            {cardsPlayerEnemy.map((card, i) => (
              <View key={`cards-enemy-${i}`} style={styles.cardContainer}>
                    <View style={styles.selectedCardContainer}>
                      <Image style={styles.imgCard} source={imageSources[card.id]} />
                    </View>
                  </View>
            ))}
          </View>
        </View>

        <View style={styles.cardsPlayerContainer}>
          <View style={styles.cardsContainer}>
            {cardsPlayerLocal.map((cardPlayer, i) => 
            {
                    const typeCardPlayer = cardPlayer.tipo;
                    const typeCardRival = cardsPlayerEnemy[i].tipo;  
                    return(
                      <View key={`result-win-matchs-${i}`} style={styles.imgResultContainer}>
                        {renderIndividualResultFightCards(typeCardPlayer, typeCardRival)}
                      </View>
                    )})
                }
          </View>
        </View>

        <View style={styles.cardsPlayerContainer}>
          <View style={styles.cardsContainer}>
            {cardsPlayerLocal.map((card, i) => (
             <View key={`cards-local-${i}`} style={styles.cardContainer}>
                    <View style={styles.selectedCardContainer}>
                      <Image style={styles.imgCard} source={imageSources[card.id]} />
                    </View>
                  </View>
                ))}
          </View>
         <View style={styles.nameRow}>
  <Text style={styles.playerName}>{userLocal.usuario.usuario.usuario}</Text>
  {userLocal.usuario.usuario.pais && (
    <>
      <Text style={styles.playerCountry}> ({userLocal.usuario.usuario.pais})</Text>
      <Image
        source={{ uri: `https://flagcdn.com/w40/${userLocal.usuario.usuario.codigoPais.toLowerCase()}.png` }}
        style={styles.flag}
      />
    </>
  )}
</View>
        </View>

        <TouchableOpacity style={styles.boton} onPress={playerEmitExit}>
          <Text style={styles.textoBoton}>Volver al lobby</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderPlayingGame = () => {
    if (!userEnemy || cardsPlayerLocal != null) return null;

    return (
      <View style={styles.playerSection}>
        <Text style={styles.playerName}>Cartas de {userEnemy.usuario.usuario.usuario}</Text>
        <Text style={styles.playerName}>Tus Cartas ({availableCards.length})</Text>
        <View style={styles.cardsContainer}>
          {orderedCards.map((card, i) => (
            <View key={i} style={styles.cardContainer}>
              <Image style={styles.darkCard} source={imageSources[card.id]} />
              <Text style={[styles.whiteText, styles.textSelected]}>{i + 1}</Text>
              <Button title="Eliminar orden" onPress={() => removeOrderCardIndividual(i)} />
            </View>
          ))}
          {availableCards.map((card, i) => (
            <View key={i} style={styles.cardContainer}>
              <Image style={styles.imgCard} source={imageSources[card.id]} />
              <Button title="Seleccionar" onPress={() => selectOrderCardIndividual(i)} />
            </View>
          ))}
        </View>
        <Text>Cartas ordenadas: {orderedCards.length === 9 ? "Sí" : "No"}</Text>
        <Button title="Ordenar aleatoriamente" onPress={generateRandomOrder} />
        {(!hasSubmittedOrder && orderedCards.length === 9) ? (
          <Button title="Aceptar orden de cartas" onPress={aceptarOrdenCartas} />
        ) : (
          <Button title="Aceptar orden de cartas" disabled />
        )}
      </View>
    );
  };

  if (!salaEstado || !userLocal || !availableCards) {
    return (
      <View>
        <LoadingScreen isLoading={isLoading} text="Preparando sala..." />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {salaEstado.jugadores.length < 2 && <Text>Esperando más jugadores...</Text>}
      {salaEstado.estado === 'partida-finalizada' && salaEstado.resultado && (
        <View style={styles.resultsSection}>
          <Text>{userLocal.usuario.usuario.usuario} {userLocal.usuario.id === salaEstado.ganador ? " ha ganado" : "ha perdido"}</Text>
          <Text>{userEnemy.usuario.usuario.usuario} {userEnemy.usuario.id === salaEstado.ganador ? " ha ganado" : "ha perdido"}</Text>
          {salaEstado.finalizada && salaEstado.ganador && (
            <Text style={styles.winnerText}>Ganador: {salaEstado.jugadores.find(j => j.id === salaEstado.ganador)?.usuario.usuario.usuario}</Text>
          )}
        </View>
      )}
      {renderPlayingGame()}
      {renderResultsRound()}
      <LoadingScreen isLoading={isLoading} text="Cargando partida..." />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0e0c0c',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  playerSection: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
  },
  cardsPlayerContainer:
  {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center"
  },
  playerName: {
    fontSize: 18,
    marginBottom: 10,
  },
  textInfo:
  {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'flex-start',
    marginBottom: 10,
    width: 1500,
    
  },
  cardContainer:
  {
    width: 150,
    padding: 5
  },
  imgResultContainer:
  {
    width: 150,
    height: 75,
    padding: 5
  },
  selectedCardContainer:
  {
    position: "relative",
    display: "flex",
    backgroundColor: "#201313",
    borderRadius: 10
  },
  card: {
    backgroundColor: '#fff',
    padding: 5,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
  },
  imgCard:
  {
    aspectRatio: 4/5,
    height: "auto",
    width: "auto",
    backgroundColor: "#201313",
    borderRadius: 5
  },
  imgResult:
  {
    height: "80%",
    width: "80%",
    resizeMode: "contain",
    alignSelf: "center"
  },
  darkCard:
  {
    aspectRatio: 4/5,
    height: "auto",
    width: "auto",
    opacity: 0.5
  },
  resultsSection: {
    marginTop: 5,
    padding: 10,
    backgroundColor: '#d4edda', // Light green background for results
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#28a745',
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#28a745',
  },
  winnerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    marginTop: 10,
  },
  whiteText:
  {
    color: "#fff"
  },
  textSelected:
  {
    position: "absolute",
    fontSize: 30,
    fontWeight: "700",
    left: "50%",
    top: "50%",
    transform: [{translateX: "-50%"}, {translateY: "-50%"}]
  },
  boton: {
    backgroundColor: "#3a2a23",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 4,
  },
  textoBoton: { color: "#fff", fontWeight: "bold" 
  },
  nameRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 8
},
playerName: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold'
},
playerCountry: {
  color: '#ccc',
  fontSize: 14,
  marginLeft: 4,
  marginRight: 4
},
flag: {
  width: 28,
  height: 20,
  borderRadius: 3,
  borderWidth: 1,
  borderColor: '#aaa'
}
});