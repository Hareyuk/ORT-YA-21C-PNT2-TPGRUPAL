import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import estilos from "./estiloProfile";
import { useTokenUser } from "../../../hooks/hookToken";
import { useNavigation } from "@react-navigation/native";

export default function ProfileCenter() {
  const navigation = useNavigation();
  const {userData} = useTokenUser();
  const foto = userData.pfp;
  const usuario = userData.usuario;
  const email = userData.email;
  const victorias = userData.wins;
  const derrotas = userData.losses;

  return (
    <View style={estilos.row}>
      {/* Panel izquierdo */}
      <View style={estilos.left}>
        <Text style={estilos.titulo}>Mi perfil</Text>
        <Image
          source={foto}
          style={estilos.avatar}
        />
        <Text style={estilos.infoText}>{usuario}</Text>
        <Text style={estilos.infoText}>{email}</Text>
        <Text style={estilos.infoText}>
          Victorias: {victorias}{"\n"}Derrotas: {derrotas}
        </Text>
        <TouchableOpacity style={estilos.boton} onPress={()=>navigation.navigate("EditProfile")}>
          <Text style={estilos.textoBoton}>Editar perfil</Text>
        </TouchableOpacity>
      </View>

      {/* Panel derecho */}
      <View style={estilos.right}>
        <Image
          source={require("../../../assets/img/bgwebform.png")}
          style={estilos.decorationBg}
        />
      </View>
    </View>
  );
}
