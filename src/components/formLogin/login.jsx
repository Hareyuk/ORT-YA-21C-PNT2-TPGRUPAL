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
import LoadingScreen from "../loading/loading";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const { logInUser } = useAuthUser();
  const [isLoading, setIsLoading] = useState(false);

  const iniciarSesion = async ()=>
    {
        const validacion = true; 
        if(validacion)
        {
          const data = { usuario: usuario, contrasenia: contrasena}
          await logInUser(data);
          //Notificador de que se inició sesión correctamente
          setIsLoading(false);
          navigation.navigate("Home");
        }
        catch(e)
        {
          //Error notificador de que algo salió mal e intente de nuevo
        }
      }
      else
      {
        //Error notificación formulario
        //Mostrar requisitos a completar de form
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
        onChangeText={setUsuario}
      />
      <TextInput
        style={estilos.input}
        placeholder="Contraseña"
        type="password"
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

    
      <Text style={estilos.copyright}>© 2025 - Axel Dumas, Martín Palma Sabino y Dylan Sosa Domecq</Text>
      <LoadingScreen isLoading={isLoading} text="Esperando al otro retador"></LoadingScreen>
    </ScrollView>
  );
}