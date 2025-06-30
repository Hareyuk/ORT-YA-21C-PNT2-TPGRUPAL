import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import estilos from "./estiloProfile";
import { useAuthUser } from "../../../hooks/userLogged";

export default function ProfileCenter() {
  const {userData} = useAuthUser();
  const foto = userData.pfp;
  const usuario = userData.usuario;
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
        <Text style={estilos.infoText}>
          Victorias: {victorias}{"\n"}Derrotas: {derrotas}
        </Text>
        <TouchableOpacity style={estilos.boton}>
          <Text style={estilos.textoBoton}>Editar perfil</Text>
        </TouchableOpacity>
      </View>

      {/* Panel derecho */}
      <View style={estilos.right}>
        <Image
          source={require("../../../assets/icon.png")}
          style={estilos.placeholder}
        />
      </View>
    </View>
  );
}
