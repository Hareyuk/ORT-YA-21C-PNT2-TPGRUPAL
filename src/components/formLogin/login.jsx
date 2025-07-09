import React, { useState, useEffect } from "react";
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
import LoadingScreen from "../loading/loading";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errores, setErrores] = useState({});
  const [formValido, setFormValido] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usuarioTocado, setUsuarioTocado] = useState(false);
  const [contrasenaTocada, setContrasenaTocada] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false)


  const { logInUser } = useAuthUser();

  useEffect(() => {
    validarFormulario();
  }, [usuario, contrasena]);

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (usuario.trim().length === 0) {
      nuevosErrores.usuario = "El campo usuario es obligatorio.";
    }

    if (contrasena.trim().length === 0) {
      nuevosErrores.contrasena = "La contraseña es obligatoria.";
    }

    setErrores(nuevosErrores);
    setErrorLogin(false)
    setFormValido(Object.keys(nuevosErrores).length === 0);
    return Object.keys(nuevosErrores).length === 0;
  };

  const iniciarSesion = async () => {
    const valido = validarFormulario();
    if (!valido) return;

    setIsLoading(true);

    try {
      const data = { usuario: usuario, contrasenia: contrasena };
      await logInUser(data);
      setIsLoading(false);
      console.log('Data recibido: ', data);
      navigation.navigate("Home");
    } catch (e) {
      setIsLoading(false);
      setErrorLogin("No pudo ingresarse al usuario")
    }
  };

  return (
    <ScrollView contentContainerStyle={estilos.contenedor}>
      <View style={estilos.encabezado}>
        <Image
          source={require("../../../assets/icon.png")}
          style={estilos.logo}
        />
      </View>

      <Text style={estilos.subtitulo}>Iniciar sesión</Text>

      <TextInput
        style={estilos.input}
        placeholder="Usuario"
        value={usuario}
        onChangeText={text => {
          setUsuario(text);
          if (!usuarioTocado) setUsuarioTocado(true);
        }}
        textContentType="username"
        autoComplete="username"
      />
      {errores.usuario && usuarioTocado && (
        <Text style={{ color: "red" }}>{errores.usuario}</Text>
      )}

      <TextInput
        style={estilos.input}
        placeholder="Contraseña"
        type="password"
        value={contrasena}
        onChangeText={text => {
          setContrasena(text);
          if (!contrasenaTocada) setContrasenaTocada(true);
        }}
        textContentType="password"
        autoComplete="password"
        secureTextEntry
      />
      {errores.contrasena && contrasenaTocada && (
        <Text style={{ color: "red" }}>{errores.contrasena}</Text>
      )}

      {errorLogin && (
        <Text style={{ color: "red" }}>{errorLogin}</Text>
      )}


      <TouchableOpacity
        style={[
          estilos.boton,
          { backgroundColor: formValido ? "#3a2a23" : "#ccc" },
        ]}
        onPress={iniciarSesion}
        disabled={!formValido}
      >
        <Text style={estilos.textoBoton}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Linking.openURL("/")}>
        <Text style={estilos.link}>
          ¿Olvidaste tu contraseña? Haz click aquí.
        </Text>
      </TouchableOpacity>

      <Text style={estilos.copyright}>
        © 2025 - Axel Dumas, Martín Palma Sabino y Dylan Sosa Domecq
      </Text>

      <LoadingScreen isLoading={isLoading} text="Esperando al otro retador" />
    </ScrollView>
  );
}
