import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import Button from "../src/components/button";
import Checkbox from 'expo-checkbox';
import { useState, useEffect } from "react";
import Room from "../src/components/room/room";
import LoadingScreen from "../src/components/loading/loading";
import { useNavigation } from "@react-navigation/native";

export default function LobbyView() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setChecked] = useState(false); //For private rooms
  let placeholderRoom =
  {
    isPlaying: false,
    user1: null,
    user2: null
  };
  let placeholderJugadores =
  [
    { id: '1', usuario: 'player1', email: 'player1@gmail.com', fechaNac: "17/10/2000",  contrasenia: "1234"},
    { id: '2', usuario: 'player100', email: 'player100@gmail.com', fechaNac: "11/10/2000",  contrasenia: "1234"},
  ];
  const posJug1 = 0;
  const posJug2 = 1;
  const onSearchRoom = ()=>
  {
    console.log("Buscar");
  }

  const onCreateRoom = ()=>
  {
    console.log("Crear room");
  }
  
  const onChooseRoom = async () => {
    console.log("Elegir room");
    placeholderRoom.user2 = placeholderJugadores[0];
    console.log("Conectándose a la sala...");
    setIsLoading(true);
    
    // Simulate waiting for another player
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsLoading(false);
    console.log("¡Enemigo encontrado!");
    placeholderRoom.user2 = placeholderJugadores[1];
    navigation.navigate("/game", {placeholderRoom});
  }

  const onPlayRandom = ()=>
  {
    console.log("Jugar partida random");
  }
  
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
              <Text style={{display: "block", textAlign: "center"}}>Usuario</Text>
              <Text style={{display: "block", textAlign: "center"}}>Victorias: --</Text>
              <Text style={{display: "block", textAlign: "center"}}>Derrotas: --</Text>
            </Text>
          </View>
          <Button cb={()=>{onPlayRandom()}}>Jugar cualquier partida</Button>
        </View>
        <View style={styles.listRooms}>
          <View style={styles.containerListRooms}>
            <View style={styles.containerHorizontalContent}>
              <Text style={[styles.whiteText, styles.textInfo]}>Buscar sala</Text>
              <TextInput style={styles.inputTxt}></TextInput>
              <Button cb={onSearchRoom}>Buscar</Button>
            </View>
            <View style={styles.displayListRooms}>
              <Room isPlaying={placeholderRoom.isPlaying} user1={placeholderRoom.user1} user2={placeholderRoom.user2} selectRoom={onChooseRoom}></Room>
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
      <LoadingScreen isLoading={isLoading} text="Esperando al otro retador"></LoadingScreen>
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