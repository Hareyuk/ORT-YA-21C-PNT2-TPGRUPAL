import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import estilos from "./estiloProfile";

export default function ProfileCenter() {
  const usuario = "MiUsuario";
  const victorias = "--";
  const derrotas = "--";

  return (
    <View style={estilos.row}>
      {/* Panel izquierdo */}
      <View style={estilos.left}>
        <Text style={estilos.titulo}>Mi perfil</Text>
        <Image
          source={require("../../../assets/icon.png")}
          style={estilos.avatar}
        />
        <Text style={estilos.infoText}>Usuario  {usuario}</Text>
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
