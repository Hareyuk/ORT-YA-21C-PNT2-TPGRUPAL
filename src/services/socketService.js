import io from 'socket.io-client';
import {API_URL, API_GAME} from '@env';
import { useAuthUser } from '../../hooks/userLogged';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_CARDS = process.env.EXPO_PUBLIC_API_CARDS;

const API_GAME = process.env.EXPO_PUBLIC_API_GAME;
const API_USERS = process.env.EXPO_PUBLIC_API_USERS;

const SOCKET_SERVER_URL = 'http://localhost:8080';
const socket = io(SOCKET_SERVER_URL,
  {
    transports: ["websocket"]
  }
);

socket.on('connect', () => {  
  console.log('Conectado al servidor Socket.IO:', socket.id);
});

socket.on('disconnect', (reason) => {
  console.log('Desconectado del servidor Socket.IO:', reason);
});

socket.on('connect_error', (error) => {
  console.error('Error de conexión de Socket.IO:', error.message);
  
});

export default socket;