import { View, Text, StyleSheet, TextInput, Image, Alert, ActivityIndicator } from "react-native";
import Button from "../src/components/button";
import Checkbox from 'expo-checkbox';
import { useState, useEffect } from "react";
import Room from "../src/components/room/room";
import LoadingScreen from "../src/components/loading/loading";
import { useNavigation } from "@react-navigation/native";
import socket from '../src/services/socketService';
import { useTokenUser } from "../hooks/hookToken";

export default function LobbyView() {

  const { userData } = useTokenUser();
  const pfp = userData.pfp;
  const wins = userData.wins;
  const losses = userData.losses;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setChecked] = useState(false); //For private rooms
  const [currentRoomState, setCurrentRoomState] = useState(null);



  // --- Lógica de Socket.IO para recibir el estado de la sala ---
  useEffect( () => {
    setIsLoading(true);
    socket.on('ESTADO_SALA_ACTUALIZADO', (sala) => {
    setCurrentRoomState(sala);
      
    // Si la sala ahora tiene 2 jugadores
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
  
    setIsLoading(false);
      
    socket.emit('SOLICITAR_SALA_INICIAL');
    
    return () => {
      socket.off('ESTADO_SALA_ACTUALIZADO');
      socket.off('ERROR');
    };
  }, []);

  // --- Funciones para interactuar con el Backend (vía Socket.IO) ---

  const handleJoinGame = async () => {
    try
    {
      if (currentRoomState && currentRoomState.jugadores.length >= 2) {
        Alert.alert('Sala Llena', 'Esta sala ya tiene dos jugadores. Intenta más tarde.');
        return;
      }
    }
    catch (e)
    {
      console.error('ERROR en handle join: ', e); 
    }
    
    setIsLoading(true); 

    socket.emit('UNIRSE_JUEGO', {
      usuario: {
        id: userData.id,
        usuario: userData, 
      }
    });
  };

  // Contenido principal del Lobby
  return (
    <View style={styles.container}>
      <View style={styles.lobby}>
        <View style={styles.userInfo}>
          <View style={styles.personalInfo}>
            <Image
              source={pfp}
              style={styles.avatar}
            />
            <Text style={[styles.whiteText, styles.bigText, styles.containerUserTexts]}>
              <Text style={{display: "block", textAlign: "center"}}>{userData.usuario}</Text>
              <Text style={{display: "block", textAlign: "center"}}>Victorias: {wins}</Text>
              <Text style={{display: "block", textAlign: "center"}}>Derrotas: {losses}</Text>
            </Text>
          </View>
        </View>
        <View style={styles.listRooms}>
          <View style={styles.containerListRooms}>
            <View style={styles.containerHorizontalContent}>
              <Text style={[styles.whiteText, styles.textInfo]}>Buscar sala</Text>
              <TextInput style={styles.inputTxt}></TextInput>
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
            </View>
            <View style={styles.containerHorizontalContent}>
              <Text style={[styles.whiteText, styles.textInfo]}>Nombre de la nueva sala</Text>
              <TextInput style={styles.inputTxt}></TextInput>
              <View style={{flexDirection: "column", alignItems: "center"}}>
                <Text style={[styles.whiteText, styles.textInfo]}>Privado</Text>
                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
              </View>
            </View>
          </View>
        </View>
      </View>
      <LoadingScreen isLoading={isLoading} text="Esperando al otro retador" />;
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

