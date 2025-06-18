import { View, Text, StyleSheet, TextInput, Image, Alert, ActivityIndicator } from "react-native";
import Button from "../src/components/button";
import Checkbox from 'expo-checkbox';
import { useState, useEffect } from "react";
import Room from "../src/components/room/room";
import LoadingScreen from "../src/components/loading/loading";
import { useNavigation } from "@react-navigation/native";
// import { useAuthUser } from "../../hooks/userLogged"; // <--- REMOVIDO
import socket from '../src/services/socketService'; // Asegúrate de que esta ruta sea correcta

// Helper para generar IDs de usuario únicos (TEMPORAL para testing sin login)
const generateUniqueId = () => {
    // Podrías usar algo más robusto como uuid si lo instalas: import { v4 as uuidv4 } from 'uuid';
    // return uuidv4();
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export default function LobbyView() {
  const navigation = useNavigation();
  // const { isUserLogged, dataUser, isLoading: isAuthLoading } = useAuthUser(); // <--- REMOVIDO
  // Datos de usuario simulados para testear sin login
  const [simulatedUserId, setSimulatedUserId] = useState(null);
  const [simulatedUserName, setSimulatedUserName] = useState('');


  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setChecked] = useState(false); //For private rooms
  const [currentRoomState, setCurrentRoomState] = useState(null);

  // Genera un ID de usuario al cargar el componente (si no existe)
  // ¡IMPORTANTE! Esto generará un nuevo ID cada vez que el componente se monte,
  // lo cual puede ser problemático si no persiste.
  // Idealmente, este ID vendría del proceso de LOGIN.
  useEffect(() => {
    if (!simulatedUserId) {
      const newId = generateUniqueId();
      setSimulatedUserId(newId);
      // Para diferenciar en dos emuladores, puedes hardcodear un nombre distinto
      // o usar el ID para el nombre, ej: setSimulatedUserName(`Jugador-${newId.substring(0, 5)}`);
      setSimulatedUserName(`Jugador-${Math.floor(Math.random() * 1000)}`);
      console.log(`LobbyView: Generado ID de usuario simulado: ${newId}, Nombre: ${simulatedUserName}`);
    }
  }, [simulatedUserId, simulatedUserName]); // Asegura que se ejecuta una vez por sesión simulada


  // --- Lógica de Socket.IO para recibir el estado de la sala ---
  useEffect(() => {
    // Listener para el estado actualizado de la sala
    socket.on('ESTADO_SALA_ACTUALIZADO', (sala) => {
      console.log('LobbyView - Estado de la sala actualizado:', sala);
      setCurrentRoomState(sala);
      setIsLoading(false); // Ocultar spinner si se actualizó el estado

      // Si la sala ahora tiene 2 jugadores y el juego ha comenzado (o está esperando orden)
      if (sala.jugadores.length === 2 && sala.estado !== 'esperando-jugadores') {
        // Redirigir al GameView
        console.log('LobbyView: Dos jugadores encontrados, navegando a GameView.');
        // ¡Ojo! Necesitas asegurarte de que GameView tenga el userId correcto.
        // Aquí pasamos los datos del "usuario simulado" al GameView.
        navigation.navigate('Game', { userId: simulatedUserId, userName: simulatedUserName });
      }
    });

    // Listener para errores del servidor
    socket.on('ERROR', (error) => {
      console.error('LobbyView - Error del servidor:', error);
      Alert.alert('Error del Servidor', error.mensaje || 'Ha ocurrido un error desconocido.');
      setIsLoading(false); // Asegúrate de quitar el spinner en caso de error
    });

    // Limpiar listeners al desmontar el componente
    return () => {
      socket.off('ESTADO_SALA_ACTUALIZADO');
      socket.off('ERROR');
    };
  }, [navigation, simulatedUserId, simulatedUserName]); // Dependencias para re-ejecutar

  // --- Funciones para interactuar con el Backend (vía Socket.IO) ---

  const handleJoinGame = async () => {
    // Si la sala ya tiene 2 jugadores, no permitas unirse
    if (currentRoomState && currentRoomState.jugadores.length >= 2) {
      Alert.alert('Sala Llena', 'Esta sala ya tiene dos jugadores. Intenta más tarde.');
      return;
    }
    if (!simulatedUserId || !simulatedUserName) {
        Alert.alert('Error', 'No se pudo generar ID o nombre de usuario simulado. Intenta recargar.');
        return;
    }

    console.log(`[Lobby] Intentando unirse a la sala con usuario simulado:`, { id: simulatedUserId, usuario: simulatedUserName });
    setIsLoading(true); // Mostrar spinner
    // Envía el evento UNIRSE_JUEGO con los datos del usuario simulado
    socket.emit('UNIRSE_JUEGO', {
      usuario: {
        id: simulatedUserId,
        usuario: simulatedUserName, // El backend espera un objeto 'usuario' con 'id' y 'usuario'
        // Puedes añadir otros campos si tu backend los necesita: email, fechaNac, etc.
      }
    });
  };

  const onSearchRoom = () => {
    Alert.alert('Funcionalidad Pendiente', 'La búsqueda de salas aún no está implementada en el backend actual.');
  };

  const onCreateRoom = () => {
    Alert.alert('Funcionalidad Pendiente', 'La creación de salas múltiples aún no está implementada en el backend actual.');
  };

  const onPlayRandom = () => {
    // Misma lógica que unirse a la única sala existente
    handleJoinGame();
  };

  // Si se está cargando (esperando al otro retador)
  if (isLoading) {
    return <LoadingScreen isLoading={isLoading} text="Esperando al otro retador" />;
  }

  // Contenido principal del Lobby
  return (
    <View style={styles.container}>
      <View style={styles.lobby}>
        <View style={styles.userInfo}>
          <View style={styles.personalInfo}>
            <Image
              source={require("../assets/icon.png")}
              style={styles.avatar}
            />
            <Text style={[styles.whiteText, styles.bigText, styles.containerUserTexts]}>
              <Text style={{display: "block", textAlign: "center"}}>Usuario: {simulatedUserName}</Text>
              <Text style={{display: "block", textAlign: "center"}}>Victorias: --</Text>
              <Text style={{display: "block", textAlign: "center"}}>Derrotas: --</Text>
            </Text>
          </View>
          <Button cb={onPlayRandom}>Jugar cualquier partida</Button>
        </View>
        <View style={styles.listRooms}>
          <View style={styles.containerListRooms}>
            <View style={styles.containerHorizontalContent}>
              <Text style={[styles.whiteText, styles.textInfo]}>Buscar sala</Text>
              <TextInput style={styles.inputTxt}></TextInput>
              <Button cb={onSearchRoom}>Buscar</Button>
            </View>
            <View style={styles.displayListRooms}>
              {/* Aquí renderizamos la "sala única" del backend */}
              {currentRoomState ? (
                <Room
                  isPlaying={currentRoomState.estado !== 'esperando-jugadores'}
                  user1={currentRoomState.jugadores[0] || null}
                  user2={currentRoomState.jugadores[1] || null}
                  selectRoom={handleJoinGame} 
                />
              ) : (
                <Text style={styles.whiteText}>Cargando información de la sala...</Text>
              )}
              {currentRoomState && currentRoomState.jugadores.length < 2 && (
                <Text style={styles.whiteText}>Esperando a 2 jugadores...</Text>
              )}
            </View>
            <View style={styles.containerHorizontalContent}>
              <Text style={[styles.whiteText, styles.textInfo]}>Nombre de la nueva sala</Text>
              <TextInput style={styles.inputTxt}></TextInput>
              <View style={{flexDirection: "column", alignItems: "center"}}>
                <Text style={[styles.whiteText, styles.textInfo]}>Privado</Text>
                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
              </View>
              <Button cb={onCreateRoom}>Crear sala</Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 24,
    backgroundColor: "#130e0c",
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
  lobby: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 1920,
    marginHorizontal: "auto",
    flexDirection: "row",
    width: "80%",
    gap: 16,
  },
  userInfo:
  {
    width: "40%",
    flexDirection: "column",
    backgroundColor: "#3a2a23",
    padding: 24,
    borderRadius: 16,
    height: "fit-content",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  listRooms:
  {
    width: "60%",
    flexDirection: "column",
    backgroundColor: "#3a2a23",
    padding: 24,
    borderRadius: 16,
    height: "fit-content"
  },
  displayListRooms:
  {
    backgroundColor: "#1f1714bb",
    padding: 24,
    borderRadius: 16,
    marginVertical: 24
  },
  personalInfo:
  {
    flexDirection: "column",
    width: "80%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  avatar:
  {
    width: 200,
    height: 200
  },
  containerHorizontalContent:
  {
    flexDirection: "row",
    gap: 16,
    alignItems: "center"
  }
  ,
  whiteText:
  {
    color: "#fff"
  },
  bigText:
  {
    fontSize: 28,
  },
  textInfo:
  {
    fontSize: 18
  },
  inputTxt:
  {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 6,
    marginVertical: 8,
    fontSize: 18
  }
});

