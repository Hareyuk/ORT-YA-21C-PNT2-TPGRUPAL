import io from 'socket.io-client';
import {API_URL, API_GAME} from '@env';


const SOCKET_SERVER_URL = API_URL;
// Inicializa la conexión de Socket.IO
// Puedes pasar opciones aquí, como un token de autenticación
// si fueras a implementar la autenticación en el socket:
// const socket = io(SOCKET_SERVER_URL, {
//   auth: {
//     token: 'tu_jwt_token_aqui' // Vendría de AsyncStorage después del login
//   }
// });
const socket = io(SOCKET_SERVER_URL,
  {
    path: API_GAME,
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