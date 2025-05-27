import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import Button from "../src/components/button";
import Checkbox from 'expo-checkbox';
import { useState } from "react";

export default function LobbyView() {

  const [isChecked, setChecked] = useState(false);
  const onSearchRoom = ()=>
  {
    console.log("Buscar");
  }

  const onCreateRoom = ()=>
  {
    console.log("Buscar");
  }
  
  const onChooseRoom = ()=>
  {
    console.log("Buscar");
  }

  const onPlayRandom = ()=>
  {
    console.log("Buscar");
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
            <Text>Usuario</Text>
            <Text>Victorias: --</Text>
            <Text>Derrotas: --</Text>
          </View>
          <Button cb={onPlayRandom}>Jugar cualquier partida</Button>
        </View>
        <View style={styles.listRooms}>
          <View style={styles.containerListRooms}>
            <View style={styles.containerSearchRoom}>
              <Text>Buscar sala</Text>
              <TextInput></TextInput>
              <Button cb={onSearchRoom}>Buscar</Button>
            </View>
            <View style={styles.listRooms}>

            </View>
            <View style={styles.containerCreateRoom}>
              <Text>Nombre de la nueva sala</Text>
              <TextInput></TextInput>   
              <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
              <Text style={styles.paragraph}>Privado</Text>
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
    paddingVertical: "1.5em"
  },
  lobby: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 1920,
    marginHorizontal: "auto",
    flexDirection: "row"
  }
});