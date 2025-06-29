
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import socket from '../src/services/socketService'; // Asegúrate de que esta ruta sea correcta
import { useAuthUser } from "../hooks/userLogged";
import LoadingScreen from "../src/components/loading/loading";
export default function GameView() {
  const cards_images = ['','','','','','','','','','','','','','','','','','']
  const { userData } = useAuthUser();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [userLocal, setUserLocal] = useState(null);
  const [userEnemy, setUserEnemy] = useState(null);
  const [cardsPlayer, setCardsPlayer] = useState([])
  const [cardsPlayerOrder, setCardsPlayerOrder] = useState([]) //Que tenga los IDs
  const [salaEstado, setSalaEstado] = useState(null);

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

  const selectOrderCardIndividual = ()=>
  {

  }

  useEffect(() => {
      if(salaEstado)
      {
        console.log("LOG ESTADO:");
        console.log(salaEstado);
        setUserLocal(salaEstado.jugadores.find(j => j.id === userData.id));
        setUserEnemy(salaEstado.jugadores.find(j => j.id !== userData.id));
        console.log("Jugadores seteados");
        setCardsPlayer(userLocal.cartas)
      }
  }, [salaEstado])
  // Renderizado principal de la pantalla de juego
  if(!salaEstado || !userLocal || cardsPlayer)
  {
    return(
      <View>
        <LoadingScreen isLoading={isLoading} text="Preparando sala..."/>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla videojuego - {userData.usuario}</Text>
      <Text>Estado de la Sala: {salaEstado.estado}</Text>
      <Text>Ronda: {salaEstado.ronda}</Text>

      {salaEstado.jugadores.length < 2 && <Text>Esperando más jugadores...</Text>}
      {userLocal && (
        <View style={styles.playerSection}>
          <Text style={styles.playerName}>Tus Cartas ({cardsPlayer.length}):</Text>
          <View style={styles.cardsContainer}>
            {cardsPlayer.map(card => (
              <View>
                <Text key={card.id} style={styles.card}>id: {card.id} - tipo: {card.tipo}</Text>
                <Button title="Elegir orden carta" onPress={()=>selectOrderCardIndividual(card.id)} />
                (card.pos_card && <Text>Orden: {card.pos_card}</Text>)
              </View>
            ))}
          </View>
          <Text>Cartas ordenadas: {cardsPlayerOrder ? 'Sí' : 'No'}</Text>
          {salaEstado.estado === 'esperando-orden' && !cardsPlayerOrder && (
            <Button title="Ordenar Mis Cartas" onPress={handleOrdenarCartas} />
          )}
        </View>
      )}

      {userEnemy && (
        <View style={styles.playerSection}>
          <Text style={styles.playerName}>Cartas de {userEnemy.usuario} ({userEnemy.cartas.length}):</Text>
          <Text>Ordenadas: {userEnemy.ordenadas ? 'Sí' : 'No'}</Text>
        </View>
      )}

      {salaEstado.estado === 'cartas-ordenadas' && (
        <Button title="Enfrentar Cartas" onPress={handleEnfrentarCartas} />
      )}

      {salaEstado.estado === 'partida-finalizada' && salaEstado.resultado && (
        <View style={styles.resultsSection}>
          <Text style={styles.resultsTitle}>Resultados de la Ronda:</Text>
          <Text>{userLocal?.usuario}: {salaEstado.resultado[userLocal.id]}</Text>
          <Text>{userEnemy?.usuario}: {salaEstado.resultado[userEnemy.id]}</Text>
          {salaEstado.ganador && salaEstado.finalizada ? (
            <Text style={styles.winnerText}>Ganador del Juego: {salaEstado.jugadores.find(j => j.id === salaEstado.ganador)?.usuario}</Text>
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
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 8,
    margin: 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
  },
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
  }
});