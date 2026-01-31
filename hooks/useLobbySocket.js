// hooks/useLobbySocket.js
import { useEffect } from 'react';
import { Alert } from 'react-native';
import socket from '../src/services/socketService';

export default function useLobbySocket({ userData, navigation, setCurrentRoomState, setIsLoading }) {
  useEffect(() => {
    // Listener para el estado actualizado de la sala
    socket.on('ESTADO_SALA_ACTUALIZADO', (data) => {
      console.log('LobbyView - Estado de la sala actualizado:', data);
      
      // Extraer la sala correctamente si viene anidada
      const sala = data.sala || data;
      
      console.log('LobbyView - Sala extraída:', sala);
      setCurrentRoomState(sala);

      // Verificar si hay 2 jugadores (usar listaJugadores)
      const listaJugadores = sala.listaJugadores || sala.jugadores;
      const cantidadJugadores = Array.isArray(listaJugadores) ? listaJugadores.length : 0;
      
      if (cantidadJugadores === 2 && sala.estado !== 'esperando-jugadores') {
        console.log('LobbyView: Dos jugadores encontrados, navegando a GameView.');
        setIsLoading(false);
        navigation.navigate('Game', { userId: userData.id, userName: userData });
      }
    });

    // Listener para errores del servidor
    socket.on('ERROR', (error) => {
      console.error('LobbyView - Error del servidor:', error);
      setIsLoading(false);
      Alert.alert('Error del Servidor', error.mensaje || 'Ha ocurrido un error desconocido.');
    });

    // Listener para sala creada
    socket.on('SALA_CREADA', (response) => {
      console.log('LobbyView - Sala creada:', response);
      if (response.success) {
        console.log('LobbyView - Esperando a otro jugador en la sala...');
        setCurrentRoomState(response.sala);
        // NO apagar isLoading aquí - debe mantenerse hasta que haya 2 jugadores
      } else {
        setIsLoading(false);
      }
    });

    // Listener para actualización de lista de salas
    socket.on('LISTA_SALAS_ACTUALIZADA', (data) => {
      console.log('LobbyView - Lista de salas actualizada:', data);
      setCurrentRoomState((prevState) => {
        // Si prevState es un array (lista de salas), reemplaza con las nuevas
        // Si es una sala individual, mantén las salas nuevas
        return Array.isArray(prevState) ? (data.salas || []) : (data.salas || []);
      });
    });

    // Emitir solicitud inicial para obtener todas las salas
    socket.emit('SOLICITAR_SALAS');

    // Limpieza de listeners
    return () => {
      socket.off('ESTADO_SALA_ACTUALIZADO');
      socket.off('ERROR');
      socket.off('SALA_CREADA');
      socket.off('LISTA_SALAS_ACTUALIZADA');
    };
  }, []);

  const joinGame = (salaId) => {
    socket.emit('UNIRSE_JUEGO', {
      salaId: salaId,
      usuario: {
        id: userData.id,
        usuario: userData,
      }
    });
  };

  const createRoom = (nombreSala) => {
    if (!nombreSala || nombreSala.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa un nombre para la sala');
      return;
    }
    socket.emit('CREATE_ROOM', {
      nombreSala: nombreSala.trim(),
      usuario: {
        id: userData.id,
        usuario: userData.usuario,
      }
    });
  };

  return { joinGame, createRoom };
}
