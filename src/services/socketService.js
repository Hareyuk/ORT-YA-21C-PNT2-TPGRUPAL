
import io from 'socket.io-client';



const SOCKET_SERVER_URL = 'http://192.168.0.132:8080'; // Ajusta esto si no es localhost

// Inicializa la conexión de Socket.IO
// Puedes pasar opciones aquí, como un token de autenticación
// si fueras a implementar la autenticación en el socket:
// const socket = io(SOCKET_SERVER_URL, {
//   auth: {
//     token: 'tu_jwt_token_aqui' // Vendría de AsyncStorage después del login
//   }
// });
const socket = io(SOCKET_SERVER_URL);

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