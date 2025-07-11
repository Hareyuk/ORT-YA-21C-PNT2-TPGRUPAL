
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Button, Alert, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import socket from '../src/services/socketService'; // Asegúrate de que esta ruta sea correcta
import { useTokenUser } from "../hooks/hookToken";
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
  const {userData} = useTokenUser();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [userLocal, setUserLocal] = useState(null);
  const [userEnemy, setUserEnemy] = useState(null);
  const [availableCards, setAvailableCards] = useState([]) //Elegidas van a CardsPlayerOrder
  const [orderedCards, setOrderedCards] = useState([])
  const [hasSubmittedOrder, setHasSubmittedOrder] = useState(false) //inmovible apenas tenga true
  const [salaEstado, setSalaEstado] = useState(null)
  const [cardsPlayerLocal, setCardsPlayerLocal] = useState(null)
  const [cardsPlayerEnemy, setCardsPlayerEnemy] = useState(null)
  // --- Lógica de Socket.IO para recibir el estado del juego ---
  
  useEffect(() => {
    
      // Ahora sí pide al armarse este emit de recibir sala 
    socket.emit('SOLICITAR_SALA_INICIAL');

    socket.on('BATALLA_RONDA',(room)=>
    {
      if(room.estado === "cartas-ordenadas" || room.estado === "partida-finalizada") //partida-finalizada agregado  de último momento por cambios de estructura
      {
        console.log('QUE EMPIECE EL ENFRENTAMIENTO DE CARTAS');
        const local = room.jugadores.find(j => j.id === userData.id);
        const enemy = room.jugadores.find(j => j.id !== userData.id);
        setCardsPlayerLocal(local.cartas)
        setCardsPlayerEnemy(enemy.cartas)
        setSalaEstado(room);
        console.log('cartas de jugador loca: ', local.cartas);
        setIsLoading(false);
      }
      else
      {
        console.log(room);
        console.log('Falta un jugador todavía');
      }
    })

    socket.on('FIN_DE_PARTIDA', ()=>
    {
      console.log('Terminó partida, a irse bye');
      playerExitRoom();
    })
    
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
        //setTimeout(() => navigation.replace('Lobby'), 3000);
      }
    });

    socket.on()

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
  }, [navigation]);
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
    socket.emit('ORDENAR_CARTAS', { id: userData.id, nuevoOrden: orderedCards });
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

  //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  const getShuffledArr = arr => {
    const newArr = arr.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr
};

  const generateRandomOrder = ()=>
  {
    const fullArray = [...availableCards, ...orderedCards];
    const shuffled = getShuffledArr(fullArray);
    setAvailableCards([]);
    setOrderedCards(shuffled);
  }

  const sendOrderCards = ()=>
  {
    setIsLoading(true);
    /* console.log("ENVIAR CARTAS");
    console.log("ID: ", userData.id);
    console.log("nuevoOrden: ", orderedCards); */
    setHasSubmittedOrder(true);
    socket.emit('CARTAS_ORDENADAS_ENVIADO', { id: userData.id, nuevoOrden: orderedCards });
  }

  const selectOrderCardIndividual = (pos_card)=>
  {
    const card = availableCards[pos_card];
    const updatedSelectedCards = [...orderedCards, card];
    const updatedCardsPlayer = availableCards.filter((_, idx) => idx !== pos_card);
    setAvailableCards(updatedCardsPlayer);
    setOrderedCards(updatedSelectedCards);
  }

  const removeOrderCardIndividual = (pos_card)=>
  {
    const card = orderedCards[pos_card];
    const updatedCards = [...availableCards, card];
    const updatedCardsPlayerSelected = orderedCards.filter((_, idx) => idx !== pos_card);
    setAvailableCards(updatedCards);
    setOrderedCards(updatedCardsPlayerSelected);
  }

  useEffect(() => {
      if(salaEstado)
      {
        /* console.log("LOG ESTADO:");
        console.log(salaEstado); */
        setUserLocal(salaEstado.jugadores.find(j => j.id === userData.id));
        setUserEnemy(salaEstado.jugadores.find(j => j.id !== userData.id));
      }
  }, [salaEstado])

  useEffect(()=>
  {
    if(userLocal)
    {
      setAvailableCards(userLocal.cartas)
    }
  }, [userLocal])

  const renderIndividualResultFightCards=(typePlayer, typeRival)=>
  {
    let resultado = '';
    const PIEDRA = 'piedra';
    const TIJERA = 'tijera';
    const PAPEL = 'papel'
    if(typePlayer === typeRival) resultado = 'draw';
    if (typePlayer === PIEDRA)
    {
      if(typeRival === TIJERA) resultado = 'win';
      if(typeRival === PAPEL) resultado = 'lose';
    } 
    if (typePlayer === PAPEL)
    {
      if(typeRival === PIEDRA) resultado = 'win';
      if(typeRival === TIJERA) resultado = 'lose';
    } 
    if (typePlayer === TIJERA)
    {
      if(typeRival === PAPEL) resultado = 'win';
      if(typeRival === PIEDRA) resultado = 'lose';
    }
    let src;
    if(resultado==='win') src=(require('../assets/img/match_win.png'));
    if(resultado==='lose') src=(require('../assets/img/match_loss.png'));
    if(resultado==='draw') src=(require('../assets/img/match_draw.png'));
    return(<Image style={styles.imgResult} source={src} />)
  }

  const renderResultsRound=()=>
  {
    if(cardsPlayerEnemy == null)
    return (<></>);
    console.log(salaEstado);
    console.log(salaEstado.ganador);
    
    return(
      <>
        <View style={styles.playerSection}>
          {/* <Text style={styles.textInfo}>Ronda {salaEstado.ronda}</Text>
            <Text style={styles.textInfo}>{salaEstado.ganador == 'empate' ? "Empate"
            : salaEstado.ganador == userLocal.id ? "¡Has ganado!" : "Has perdido"}</Text> */}
            {/* Render enemy cards */}
            <View style={styles.cardsPlayerContainer}>
              <Text style={styles.playerName}>{userEnemy.usuario.usuario.usuario}</Text>
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
            {/* Render results */}
            <View style={styles.cardsPlayerContainer}>
              <View style={styles.cardsContainer}>
                {
                  cardsPlayerLocal.map((cardPlayer, i)=>
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
            {/* Render local player cards */}
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
              <Text style={styles.playerName}>{userLocal.usuario.usuario.usuario}</Text>
            </View>
            <TouchableOpacity style={styles.boton} onPress={()=>playerEmitExit()}>
              <Text style={styles.textoBoton}>Volver al lobby</Text>
            </TouchableOpacity>
          </View>
      </>
    )
  }

  const playerExitRoom = ()=>
  {
    setSalaEstado(null);
    setCardsPlayerLocal(null);
    setCardsPlayerEnemy(null);
    setUserLocal(null);
    setUserEnemy(null);
    navigation.navigate("Lobby");
  }

  const playerEmitExit = ()=>
  {
    socket.emit('SALIR_SALA', { id: userData.id });
  }

  const renderPlayingGame=()=>
  {
    if(!userEnemy || cardsPlayerLocal != null)
    return(<></>)
    
    return(
      <>
        <View style={styles.playerSection}>
          <Text style={styles.playerName}>{userEnemy.cartas.length} cartas de {userEnemy.usuario.usuario.usuario}</Text>
        </View>
        <View style={styles.playerSection}>
          <Text style={styles.playerName}>Tus Cartas ({availableCards.length}):</Text>
          <View style={styles.cardsContainer}>
            {orderedCards.length > 0 && orderedCards.map((card, i) => (
              <View key={`key-cards-${i}`} style={styles.cardContainer}>
                {/* <Text key={card.id} style={styles.card}>id: {card.id} - tipo: {card.tipo}</Text> */}
                <View style={styles.selectedCardContainer}>
                  <Image style={styles.darkCard} source={imageSources[card.id]} />
                  <Text style={[styles.whiteText, styles.textSelected]}>{i + 1}</Text>
                </View>
                <Button title="Eliminar orden" onPress={()=>removeOrderCardIndividual(i)} />
              </View>
            ))}
            {availableCards.length > 0 && availableCards.map((card, i) => (
              <>
                <View key={`available-cards-${i}`} style={styles.cardContainer}>
                  {/* <Text key={card.id} style={styles.card}>id: {card.id} - tipo: {card.tipo}</Text> */}
                  <Image style={styles.imgCard} source={imageSources[card.id]} />
                  <Button title="Seleccionar" onPress={()=>selectOrderCardIndividual(i)} />
                  {/* <Text>Sin orden</Text> */}
                </View>
              </>
            ))}
          </View>
          <Text>Cartas ordenadas: {orderedCards[orderedCards.length-1] ? 'Sí' : 'No'}</Text>
          <Button title="Ordernar aleatoriamente" onPress={generateRandomOrder} />
          {(!hasSubmittedOrder && orderedCards && orderedCards.length == 9) ? (
              <Button title="Aceptar orden de cartas" onPress={sendOrderCards} />
          ) : (
            <Button title="Aceptar orden de cartas" disabled />
          )}
        </View>
      </>
    )
  }

  // Renderizado principal de la pantalla de juego
  if(!salaEstado || !userLocal || !availableCards)
  {
    return(
      <View>
        <LoadingScreen isLoading={isLoading} text="Preparando sala..."/>
      </View>
    )
  }
  return (
    <View style={styles.container}>
{/*       <Text style={styles.title}>Pantalla videojuego - {userData.usuario.usuario}</Text>
      <Text>Estado de la Sala: {salaEstado.estado}</Text>
      <Text>Ronda: {salaEstado.ronda}</Text> */}

      {salaEstado.jugadores.length < 2 && <Text>Esperando más jugadores...</Text>}
      {salaEstado.estado === 'partida-finalizada' && salaEstado.resultado && (
        <View style={styles.resultsSection}>
          <Text>{userLocal.usuario.usuario.usuario} {userLocal.usuario.id === salaEstado.ganador ? " ha ganado" : "ha pedido"}</Text>
          <Text>{userEnemy.usuario.usuario.usuario} {userEnemy.usuario.id === salaEstado.ganador ? " ha ganado" : "ha pedido"}</Text>
          {salaEstado.ganador && salaEstado.finalizada ? (
            <Text style={styles.winnerText}>Ganador del Juego: {salaEstado.jugadores.find(j => j.id === salaEstado.ganador)?.usuario.usuario.usuario}</Text>
          ) : (
            <Text style={styles.infoText}>La partida ha finalizado.</Text>
          )}

          {/* {salaEstado.estado === 'partida-finalizada' && !salaEstado.finalizada && ( // Si la ronda terminó pero no el juego
            <Button title="Avanzar a Siguiente Ronda" onPress={handleAvanzarRonda} />
          )} */}
        </View>
      )}  
      {renderPlayingGame()}
      {renderResultsRound()}
      {/* {salaEstado.estado === 'cartas-ordenadas' && (
        <Button title="Enfrentar Cartas" onPress={handleEnfrentarCartas} />
      )} */}
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
  textoBoton: { color: "#fff", fontWeight: "bold" },
});