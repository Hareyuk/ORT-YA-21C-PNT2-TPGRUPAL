
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Button, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import socket from '../src/services/socketService'; // Asegúrate de que esta ruta sea correcta
import { useAuthUser } from "../hooks/userLogged";
import LoadingScreen from "../src/components/loading/loading";
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
  const { userData } = useAuthUser();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [userLocal, setUserLocal] = useState(null);
  const [userEnemy, setUserEnemy] = useState(null);
  const [cardsPlayer, setCardsPlayer] = useState([]) //Elegidas van a CardsPlayerOrder
  const [cardsPlayerSelected, setCardsPlayerOrder] = useState([])
  const [cardsOrderSent, setCardsOrderSent] = useState(false) //inmovible apenas tenga true
  const [salaEstado, setSalaEstado] = useState(null);
  const LIMIT_CARDS = 9;
  const [row1Cards, setRow1Cards] = useState([]); //Para mostrar cartas
  const [row2Cards, setRow2Cards] = useState([]);
  const [row3Cards, setRow3Cards] = useState([]);

  // --- Lógica de Socket.IO para recibir el estado del juego ---
  useEffect(() => {
    
      // Ahora sí pide al armarse este emit de recibir sala 
    socket.emit('SOLICITAR_SALA_INICIAL');

    // Escuchar el estado de la sala actualizado
    socket.on('ESTADO_SALA_ACTUALIZADO', (sala) => {
      console.log('GameView - Estado de la sala actualizado:', sala);
      setSalaEstado(sala);
      // Lógica para el fin del juego por desconexión
      if (sala.estado === 'juego-finalizado' && sala.ganador) {
        if (sala.ganador === salaEstado.jugadorActual.id) { 
          Alert.alert('VICTORIA', `¡Has ganado la partida! El otro jugador se desconectó.`);
        }
        else
        {
          Alert.alert('DERROTA', `Has perdido la partida.`);
        }
        setIsLoading(false);
        // Puedes navegar de nuevo al Lobby o Home después de un breve retraso
        setTimeout(() => navigation.replace('Lobby'), 3000);
      }
    });

    // Manejar errores que el backend envíe por socket
    socket.on('ERROR', (error) => {
        console.error('GameView - Error del servidor:', error);
        Alert.alert('Error del Servidor', error.mensaje || 'Ha ocurrido un error en el juego.');
    });

    // Limpiar listeners al desmontar el componente
    return () => {
      socket.off('ESTADO_SALA_ACTUALIZADO');
      socket.off('ERROR');
    };
  }, []);
  // --- Funciones para enviar acciones al Backend ---
  const handleOrdenarCartas = () => {
    if (!salaEstado || !userData.id) return Alert.alert('Error', 'No hay datos de sala o usuario.');

    const jugadorActual = salaEstado.jugadores.find(j => j.id === userData.id);
    if (!jugadorActual || jugadorActual.ordenadas) {
        return Alert.alert('Info', 'Ya ordenaste tus cartas o no eres un jugador activo.');
    }

    // EJEMPLO: Ordenar cartas al azar para probar. En un juego real, la UI
    // permitiría al usuario arrastrar y soltar las cartas para definir el nuevoOrden.
    // Esto es solo un placeholder: deberías obtener el orden real de tus cartas en la UI.
    //const nuevoOrden = [...jugadorActual.cartas].sort(() => Math.random() - 0.5).map(c => c.id);
    console.log(`[GameView] Enviando ORDENAR_CARTAS para ${userData.id}:`, nuevoOrden);
    socket.emit('ORDENAR_CARTAS', { id: userData.id, nuevoOrden: nuevoOrden });
  };

  const handleEnfrentarCartas = () => {
    if (!salaEstado || salaEstado.estado !== 'cartas-ordenadas') {
      return Alert.alert('Info', 'Las cartas aún no están ordenadas por ambos jugadores.');
    }
    console.log('[GameView] Enviando ENFRENTAR_CARTAS');
    socket.emit('ENFRENTAR_CARTAS');
  };

  const handleAvanzarRonda = () => {
    if (!salaEstado || salaEstado.estado !== 'partida-finalizada') {
      return Alert.alert('Info', 'La partida no ha finalizado para avanzar de ronda.');
    }
    console.log('[GameView] Enviando AVANZAR_RONDA');
    socket.emit('AVANZAR_RONDA');
  };

  const selectOrderCardIndividual = (pos_card)=>
  {
    const card = cardsPlayer[pos_card];
    const updatedSelectedCards = [...cardsPlayerSelected, card];
    const updatedCardsPlayer = cardsPlayer.filter((_, idx) => idx !== pos_card);
    setCardsPlayer(updatedCardsPlayer);
    setCardsPlayerOrder(updatedSelectedCards);
  }

  const removeOrderCardIndividual = (pos_card)=>
  {
    const card = cardsPlayerSelected[pos_card];
    const updatedCards = [...cardsPlayer, card];
    const updatedCardsPlayerSelected = cardsPlayerSelected.filter((_, idx) => idx !== pos_card);
    setCardsPlayer(updatedCards);
    setCardsPlayerOrder(updatedCardsPlayerSelected);
  }

/*   useEffect(()=>
  { 
    let cont = 0;
    let rowArray1, rowArray2, rowArray3 = [];
    let minus = cardsPlayerSelected.length;
    while(rowArray1.length < 3)
    {
      if(cardsPlayerSelected.length > cont) rowArray1.push(cardsPlayerSelected[cont])
      else rowArray1.push(cardsPlayer[cont - minus])
      cont++;
    }
    while(rowArray2.length < 3)
    {
      if(cardsPlayerSelected.length > cont) rowArray2.push(cardsPlayerSelected[cont])
      else rowArray2.push(cardsPlayer[cont - minus])
      cont++;
    }
    while(rowArray3.length < 3)
    {
      if(cardsPlayerSelected.length > cont) rowArray3.push(cardsPlayerSelected[cont])
      else rowArray3.push(cardsPlayer[cont - minus])
      cont++;
    }
    console.log('Arrays de cartas ordenadas');
    console.log(rowArray1);
    console.log(rowArray2);
    console.log(rowArray3);
    setRow1Cards([...rowArray1]);
    setRow2Cards([...rowArray2]);
    setRow3Cards([...rowArray3]);
    
  }, [cardsPlayer, cardsPlayerSelected]) */

  useEffect(() => {
      if(salaEstado)
      {
        console.log("LOG ESTADO:");
        console.log(salaEstado);
        setUserLocal(salaEstado.jugadores.find(j => j.id === userData.id));
        setUserEnemy(salaEstado.jugadores.find(j => j.id !== userData.id));
      }
  }, [salaEstado])

  useEffect(()=>
  {
    if(userLocal)
    {
      setCardsPlayer(userLocal.cartas)
    }
  }, [userLocal])

  // Renderizado principal de la pantalla de juego
  if(!salaEstado || !userLocal || !cardsPlayer)
  {
    return(
      <View>
        <LoadingScreen isLoading={isLoading} text="Preparando sala..."/>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla videojuego - {userData.usuario.usuario}</Text>
      <Text>Estado de la Sala: {salaEstado.estado}</Text>
      <Text>Ronda: {salaEstado.ronda}</Text>

      {salaEstado.jugadores.length < 2 && <Text>Esperando más jugadores...</Text>}
      {userLocal && (
        <View style={styles.playerSection}>
          <Text style={styles.playerName}>Tus Cartas ({cardsPlayer.length}):</Text>
          <View style={styles.cardsContainer}>
            {cardsPlayerSelected.map((card, i) => (
              <View style={styles.cardContainer}>
                {/* <Text key={card.id} style={styles.card}>id: {card.id} - tipo: {card.tipo}</Text> */}
                <View style={styles.selectedCardContainer}>
                  <Image style={styles.darkCard} source={imageSources[card.id]} />
                  <Text style={[styles.whiteText, styles.textSelected]}>{i + 1}</Text>
                </View>
                <Button title="Eliminar orden" onPress={()=>removeOrderCardIndividual(i)} />
              </View>
            ))}
            {cardsPlayer.map((card, i) => (
              <View style={styles.cardContainer}>
                {/* <Text key={card.id} style={styles.card}>id: {card.id} - tipo: {card.tipo}</Text> */}
                <Image style={styles.imgCard} source={imageSources[card.id]} />
                <Button title="Elegir orden carta" onPress={()=>selectOrderCardIndividual(i)} />
                <Text>Sin orden</Text>
              </View>
            ))}
          </View>
          <Text>Cartas ordenadas: {cardsPlayerSelected[cardsPlayerSelected.length-1] ? 'Sí' : 'No'}</Text>
          {salaEstado.estado === 'esperando-orden' && !cardsOrderSent && (
            <Button title="Ordenar Mis Cartas" onPress={handleOrdenarCartas} />
          )}
        </View>
      )}

      {userEnemy && (
        <View style={styles.playerSection}>
          <Text style={styles.playerName}>Cartas de {userEnemy.usuario.usuario.usuario} ({userEnemy.cartas.length}):</Text>
        </View>
      )}

      {salaEstado.estado === 'cartas-ordenadas' && (
        <Button title="Enfrentar Cartas" onPress={handleEnfrentarCartas} />
      )}

      {salaEstado.estado === 'partida-finalizada' && salaEstado.resultado && (
        <View style={styles.resultsSection}>
          <Text style={styles.resultsTitle}>Resultados de la Ronda:</Text>
          <Text>{userLocal.usuario.usuario.usuario} {userLocal.usuario.id === salaEstado.ganador ? " ha ganado" : "ha pedido"}</Text>
          <Text>{userEnemy.usuario.usuario.usuario} {userEnemy.usuario.id === salaEstado.ganador ? " ha ganado" : "ha pedido"}</Text>
          {salaEstado.ganador && salaEstado.finalizada ? (
            <Text style={styles.winnerText}>Ganador del Juego: {salaEstado.jugadores.find(j => j.id === salaEstado.ganador)?.usuario.usuario.usuario}</Text>
          ) : (
            <Text style={styles.infoText}>La partida ha finalizado.</Text>
          )}

          {salaEstado.estado === 'partida-finalizada' && !salaEstado.finalizada && ( // Si la ronda terminó pero no el juego
            <Button title="Avanzar a Siguiente Ronda" onPress={handleAvanzarRonda} />
          )}
        </View>
      )}  
    <LoadingScreen isLoading={isLoading} text="Cargando partida..." />;
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
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  playerName: {
    fontSize: 18,
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
    backgroundColor: "#201313"
  },
  darkCard:
  {
    aspectRatio: 4/5,
    height: "auto",
    width: "auto",
    opacity: 0.5
  }
  ,
  resultsSection: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#d4edda', // Light green background for results
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#28a745',
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
  }
});