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
import estilos from "./estiloSignUp";
import { useApiHooks } from "../../../hooks/apiHooks.js";

export default function SignUp() {
  const randomUrlsImg = [
    'https://lh3.googleusercontent.com/d/1ydlHT7r6CVDXg5c4Oe9iANmX350sEawy',
    'https://lh3.googleusercontent.com/d/1r15Oc49pHDdVObz5R5o7kJCZCXQDKztU',
    'https://lh3.googleusercontent.com/d/1NqxloduuGZUIeriMsaBFS2SoVoSggReZ',
    'https://lh3.googleusercontent.com/d/1CgbAHsBmh3G3eHUGz4e5vb5EE_4ymoKy',
    'https://lh3.googleusercontent.com/d/1B_D2HcOoihx6AbKtQ4lDoRCnYffSlT8x',
    'https://lh3.googleusercontent.com/d/135Gnb9_GS_WExCgDoVWI0qksvYeNChMN'
  ]
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [confirmarEmail, setConfirmarEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [errores, setErrores] = useState({});
  const [formValido, setFormValido] = useState(false);

  const { apiPostCreateUser } = useApiHooks();

  useEffect(() => {
    validarFormulario();
  }, [usuario, email, confirmarEmail, contrasena, confirmarContrasena]);

  const validarFormulario = () => {
    const nuevosErrores = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    if (usuario.trim().length < 5) {
      nuevosErrores.usuario = "El usuario debe tener al menos 5 caracteres.";
    }

    if (!regexEmail.test(email)) {
      nuevosErrores.email = "El email no tiene un formato válido.";
    }

    if (email !== confirmarEmail) {
      nuevosErrores.confirmarEmail = "Los emails no coinciden.";
    }

    if (!regexContrasena.test(contrasena)) {
      nuevosErrores.contrasena =
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un símbolo.";
    }

    if (contrasena !== confirmarContrasena) {
      nuevosErrores.confirmarContrasena = "Las contraseñas no coinciden.";
    }

    setErrores(nuevosErrores);
    setFormValido(Object.keys(nuevosErrores).length === 0);
    return Object.keys(nuevosErrores).length === 0;
  };

  const crearCuenta = async () => {
    const esValido = validarFormulario();
    if (!esValido) return;
    const randomImg = randomUrlsImg[Math.floor(Math.random()* (randomUrlsImg.length + 1))]
    console.log(randomImg);
    const data = {
      usuario,
      email,
      fechaNac: fechaNacimiento,
      contrasenia: contrasena,
      wins: 0,
      losses: 0,
      draws: 0,
      pfp: randomImg
    };

    try {
      await apiPostCreateUser(data);
      // Podés agregar un mensaje en pantalla o redireccionar
    } catch (e) {
      // Mostrar error de conexión o guardado si querés
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
      {errores.usuario && <Text style={{ color: "red" }}>{errores.usuario}</Text>}

      <TextInput
        style={estilos.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errores.email && <Text style={{ color: "red" }}>{errores.email}</Text>}

      <TextInput
        style={estilos.input}
        placeholder="Confirmar Email"
        value={confirmarEmail}
        onChangeText={setConfirmarEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errores.confirmarEmail && (
        <Text style={{ color: "red" }}>{errores.confirmarEmail}</Text>
      )}

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
      {errores.contrasena && (
        <Text style={{ color: "red" }}>{errores.contrasena}</Text>
      )}

      <TextInput
        style={estilos.input}
        placeholder="Confirmar contraseña"
        value={confirmarContrasena}
        onChangeText={setConfirmarContrasena}
        secureTextEntry
      />
      {errores.confirmarContrasena && (
        <Text style={{ color: "red" }}>{errores.confirmarContrasena}</Text>
      )}

      <TouchableOpacity
        style={[
          estilos.boton,
          { backgroundColor: formValido ? "#3a2a23" : "#ccc" },
        ]}
        onPress={crearCuenta}
        disabled={!formValido}
      >
        <Text style={estilos.textoBoton}>Crear cuenta</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Linking.openURL("#")}>
        <Text style={estilos.link}>
          ¿Olvidaste tu contraseña? Haz click aquí.
        </Text>
      </TouchableOpacity>

      <Text style={estilos.copyright}>
        © 2025 - Axel Dumas, Martín Palma Sabino y Dylan Sosa Domecq
      </Text>
    </ScrollView>
  );
}
