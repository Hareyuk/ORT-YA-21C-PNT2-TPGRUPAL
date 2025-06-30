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
    'https://drive.google.com/u/0/drive-viewer/AKGpihaDxu8kZZPPlPTqqE1_gzvObKo_Ji8_FTHBs_i6SVL0uZ3HVoyzRfy1rhjlaQc9ibAcc4vGWEUcB1BqJv5bWrrfnUmkxS7YU1Y',
    'https://drive.google.com/u/0/drive-viewer/AKGpihbWk2rcnPmt_ojhmLRcsCfXGaI5zn89Atn6xAfRusZ_goZRJq0Jb5_0B8xidyRIEjvXravylYGMDupYiBrX4ogJFfVLamUWOhU',
    'https://drive.google.com/u/0/drive-viewer/AKGpihbW2ertni9p_3plDGDaX2nooJEE7Suyli5uLbr4tcuXU-dWnXDlmD2QJp2dPdGgfchh7J5yOwg8_f7-SxbqRgAcxI9AEBR3aBg',
    'https://drive.google.com/u/0/drive-viewer/AKGpihbHBt7310oIJe-B105mA4nNR3hVA6YP5uaIWVj5vtivygJa27A7aKslpi9Fttd8yTb7vTSHh3g7sLvtjDqVk6jKilaVh58vLpA',
    'https://drive.google.com/u/0/drive-viewer/AKGpihbHX6vd1lr0rrMViB2HBs2OJzzBKlWvFer8EVntUFQSC-U9Kqqt_DFdVIG_D0t8gV9dd0dXg_qUHZbRP5oycTWLqUfpTMa4hA',
    'https://drive.google.com/u/0/drive-viewer/AKGpihaowLs5wXBCqNzQCJGn7hmym4YxFVVQcVdxY6Yxc_ucX2qKaHVj7BNbJlAOgWfmjfN2-vwJ5CkP3bzUSLHZtUTMjSqwlhsE0-k'
  ]
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [confirmarEmail, setConfirmarEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [errores, setErrores] = useState({});
  const [formValido, setFormValido] = useState(false);
  const [usuarioTocado, setUsuarioTocado] = useState(false);
  const [emailTocado, setEmailTocado] = useState(false);
  const [confirmarEmailTocado, setConfirmarEmailTocado] = useState(false);
  const [contrasenaTocada, setContrasenaTocada] = useState(false);
  const [confirmarContrasenaTocada, setConfirmarContrasenaTocada] = useState(false);


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
    const randomImg = randomUrlsImg[Math.floor(Math.random() * (randomUrlsImg.length + 1))]
    const data = {
      usuario,
      email,
      fechaNac: fechaNacimiento,
      contrasenia: contrasena,
      //pfp: randomImg
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
  onChangeText={text => {
    setUsuario(text);
    if (!usuarioTocado) setUsuarioTocado(true);
  }}
/>
{errores.usuario && usuarioTocado && (
  <Text style={{ color: "red" }}>{errores.usuario}</Text>
)}

<TextInput
  style={estilos.input}
  placeholder="Email"
  value={email}
  onChangeText={text => {
    setEmail(text);
    if (!emailTocado) setEmailTocado(true);
  }}
  keyboardType="email-address"
  autoCapitalize="none"
/>
{errores.email && emailTocado && (
  <Text style={{ color: "red" }}>{errores.email}</Text>
)}

<TextInput
  style={estilos.input}
  placeholder="Confirmar Email"
  value={confirmarEmail}
  onChangeText={text => {
    setConfirmarEmail(text);
    if (!confirmarEmailTocado) setConfirmarEmailTocado(true);
  }}
  keyboardType="email-address"
  autoCapitalize="none"
/>
{errores.confirmarEmail && confirmarEmailTocado && (
  <Text style={{ color: "red" }}>{errores.confirmarEmail}</Text>
)}

<TextInput
  style={estilos.input}
  placeholder="Contraseña"
  value={contrasena}
  onChangeText={text => {
    setContrasena(text);
    if (!contrasenaTocada) setContrasenaTocada(true);
  }}
  secureTextEntry
/>
{errores.contrasena && contrasenaTocada && (
  <Text style={{ color: "red" }}>{errores.contrasena}</Text>
)}

<TextInput
  style={estilos.input}
  placeholder="Confirmar contraseña"
  value={confirmarContrasena}
  onChangeText={text => {
    setConfirmarContrasena(text);
    if (!confirmarContrasenaTocada) setConfirmarContrasenaTocada(true);
  }}
  secureTextEntry
/>
{errores.confirmarContrasena && confirmarContrasenaTocada && (
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
