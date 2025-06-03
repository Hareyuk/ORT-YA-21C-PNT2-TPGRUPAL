import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Linking,
  Image,
} from "react-native";
import estilos from "./styles";
import { useAuthUser } from "../../../hooks/userLogged";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const { logInUser } = useAuthUser();

  const iniciarSesion = ()=>
    {
        logInUser({usuario,contrasena,});
    };

  return (
    <ScrollView contentContainerStyle={estilos.contenedor}>
      <View style={estilos.encabezado}>
        <Image
          source={require("../../../assets/icon.png")}
          style={estilos.logo}
        />
        <Text style={estilos.tituloPrincipal}>Zoro Defenders TCG</Text>
      </View>

      <Text style={estilos.subtitulo}>Iniciar sesión</Text>

      <TextInput
        style={estilos.input}
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        style={estilos.input}
        placeholder="Contraseña"
        value={contrasena}
        onChangeText={setContrasena}
        secureTextEntry
      />

      <TouchableOpacity style={estilos.boton} onPress={iniciarSesion}>
        <Text style={estilos.textoBoton}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Linking.openURL("/")}>
        <Text style={estilos.link}>
          ¿Olvidaste tu contraseña? Haz click aquí.
        </Text>
      </TouchableOpacity>

      <Text style={estilos.copyright}>© 2025 - Nombres de integrantes</Text>
    </ScrollView>
  );
}