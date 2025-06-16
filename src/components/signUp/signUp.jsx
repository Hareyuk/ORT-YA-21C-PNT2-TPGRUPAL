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
import estilos from "./estiloSignUp";
import { useApiHooks } from "../../../hooks/apiHooks.js";

export default function SignUp() {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [confirmarEmail, setConfirmarEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  
  const { apiPostCreateUser } = useApiHooks();

  const crearCuenta = async () => {
    //Validar


    const data = {
      usuario: usuario,
      email: email,
      fechaNac: fechaNacimiento,
      contrasenia: contrasena,
    };
    console.log("Datos de registro:", data);
    const validarForm = true; //Aquí iría la función que valida los campos
    if(!validarForm)
    {
      //Error notificacion al registrarse
    }

    try
    {
      const responseOk = await apiPostCreateUser(data);
      //Todo OK, mandar a inicio con notificación de registro correcto  
    }
    catch(e)
    {
      //Prevenir error
      //Notificación de que hubo un error
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

      <Text style={estilos.subtitulo}>Crear cuenta</Text>

      <TextInput
        style={estilos.input}
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        style={estilos.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={estilos.input}
        placeholder="Confirmar Email"
        value={confirmarEmail}
        onChangeText={setConfirmarEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={estilos.input}
        placeholder="Fecha de nacimiento (DD/MM/AAAA)"
        value={fechaNacimiento}
        onChangeText={setFechaNacimiento}
      />
      <TextInput
        style={estilos.input}
        placeholder="Contraseña"
        value={contrasena}
        onChangeText={setContrasena}
        secureTextEntry
      />
      <TextInput
        style={estilos.input}
        placeholder="Confirmar contraseña"
        value={confirmarContrasena}
        onChangeText={setConfirmarContrasena}
        secureTextEntry
      />

      <TouchableOpacity style={estilos.boton} onPress={crearCuenta}>
        <Text style={estilos.textoBoton}>Crear cuenta</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Linking.openURL("#")}>
        <Text style={estilos.link}>
          ¿Olvidaste tu contraseña? Haz click aquí.
        </Text>
      </TouchableOpacity>

      <Text style={estilos.copyright}>© 2025 - Axel Dumas, Martín Palma Sabino y Dylan Sosa Domecq</Text>
    </ScrollView>
  );
}