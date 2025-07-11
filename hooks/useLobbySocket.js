// hooks/useLobbySocket.js
import { useEffect } from 'react';
import { Alert } from 'react-native';
import socket from '../src/services/socketService';

export default function useLobbySocket({ userData, navigation, setCurrentRoomState, setIsLoading }) {
  useEffect(() => {
    // Listener para el estado actualizado de la sala
    socket.on('ESTADO_SALA_ACTUALIZADO', (sala) => {
      console.log('LobbyView - Estado de la sala actualizado:', sala);
      setCurrentRoomState(sala);

      if (sala.jugadores.length === 2 && sala.estado !== 'esperando-jugadores') {
        console.log('LobbyView: Dos jugadores encontrados, navegando a GameView.');
        navigation.navigate('Game', { userId: userData.id, userName: userData });
      }
    });

    // Listener para errores del servidor
    socket.on('ERROR', (error) => {
      console.error('LobbyView - Error del servidor:', error);
      Alert.alert('Error del Servidor', error.mensaje || 'Ha ocurrido un error desconocido.');
    });

    // Emitir solicitud inicial
    socket.emit('SOLICITAR_SALA_INICIAL');

    // Limpieza de listeners
    return () => {
      socket.off('ESTADO_SALA_ACTUALIZADO');
      socket.off('ERROR');
    };
  }, []);

  const joinGame = () => {
    socket.emit('UNIRSE_JUEGO', {
      usuario: {
        id: userData.id,
        usuario: userData,
      }
    });
  };

  return { joinGame };
}
