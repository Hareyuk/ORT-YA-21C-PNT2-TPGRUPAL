// hooks/useGameSocket.js
import { useEffect } from "react";
import socket from "../src/services/socketService";
import { Alert } from "react-native";

export default function useGameSocket({ userData, setSalaEstado, setCardsPlayerLocal, setCardsPlayerEnemy, navigation, setIsLoading }) {
 
  useEffect(() => {
    socket.emit('SOLICITAR_SALA_INICIAL');

     socket.on('ESTADO_SALA_ACTUALIZADO', (sala) => {
      setSalaEstado(sala);
      if (sala.estado === 'juego-finalizado' && sala.ganador) {
        Alert.alert(
          sala.ganador === userData.id ? 'VICTORIA' : 'DERROTA',
          sala.ganador === userData.id ? '¡Has ganado la partida! El otro jugador se desconectó.' : 'Has perdido la partida.'
        );
        setIsLoading(false);
      }
    });

    socket.on('BATALLA_RONDA', (room) => {
      if (room.estado === "cartas-ordenadas" || room.estado === "partida-finalizada") {
        const local = room.jugadores.find(j => j.id === userData.id);
        const enemy = room.jugadores.find(j => j.id !== userData.id);
        setCardsPlayerLocal(local.cartas);
        setCardsPlayerEnemy(enemy.cartas);
        setSalaEstado(room);
        setIsLoading(false);
      } else {
        console.log('Falta un jugador todavía');
      }
    });

    socket.on('FIN_DE_PARTIDA', () => {
      navigation.navigate("Lobby");
    });

    socket.on('ERROR', (error) => {
      console.error('GameView - Error del servidor:', error);
      Alert.alert('Error del Servidor', error.mensaje || 'Ha ocurrido un error en el juego.');
    });

    return () => {
      socket.off('BATALLA_RONDA');
      socket.off('ESTADO_SALA_ACTUALIZADO');
      socket.off('FIN_DE_PARTIDA');
      socket.off('ERROR');
    };
  }, []);

   const sendOrderCards = (orderedCards) => {
    
    socket.emit('CARTAS_ORDENADAS_ENVIADO', { id: userData.id, nuevoOrden: orderedCards });
  };

  const playerEmitExit = () => {
    socket.emit('SALIR_SALA', { id: userData.id });
  };

  return { sendOrderCards, playerEmitExit };
}
