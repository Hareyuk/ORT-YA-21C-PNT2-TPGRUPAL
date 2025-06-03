import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import Button from "../src/components/button";
import Checkbox from 'expo-checkbox';
import { useState } from "react";
import Room from "../src/components/room/room";

export default function LobbyView() {
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
  const [isChecked, setChecked] = useState(false); //For private rooms
  const onSearchRoom = ()=>
  {
    console.log("Buscar");
  }

  const onCreateRoom = ()=>
  {
    console.log("Crear room");
  }
  
  const onChooseRoom = ()=>
  {
    console.log("Elegir room");
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
              <Room isPlaying={placeholderRoom.isPlaying} user1={placeholderRoom.user1} user2={placeholderRoom.user2} selectRoom={()=>onChooseRoom()}></Room>
            </View>
            <View style={styles.containerHorizontalContent}>
              <Text style={[styles.whiteText, styles.textInfo]}>Nombre de la nueva sala</Text>
              <TextInput style={styles.inputTxt}></TextInput>   
              <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
              <Text style={[styles.whiteText, styles.textInfo]}>Privado</Text>
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
    paddingVertical: "1.5em",
    backgroundColor: "#130e0c",
  },
  lobby: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 1920,
    marginHorizontal: "auto",
    flexDirection: "row",
    width: "80%",
    gap: "1em",
  },
  userInfo:
  {
    width: "40%",
    flexDirection: "column",
    backgroundColor: "#3a2a23",
    padding: "1.5em",
    borderRadius: "1em",
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
    padding: "1.5em",
    borderRadius: "1em",
    height: "fit-content"
  },
  displayListRooms:
  {
    backgroundColor: "#1f1714bb",
    padding: "1.5em",
    borderRadius: "1em",
    marginVertical: "1.5em"
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
    gap: "1em",
    alignItems: "center"
  }
  ,
  whiteText:
  {
    color: "#fff"
  },
  bigText:
  {
    fontSize: "1.75em",
  },
  textInfo:
  {
    fontSize: "1.15em"
  },
  inputTxt:
  {
    backgroundColor: "#fff",
    paddingVertical: "0.4em",
    paddingHorizontal: "0.25em",
    borderRadius: "0.35em",
    marginVertical: "0.5em",
    fontSize: "1.15em"
  }
});