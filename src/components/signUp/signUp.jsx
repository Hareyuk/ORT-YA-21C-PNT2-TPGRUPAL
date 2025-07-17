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
  const [usuarioTocado, setUsuarioTocado] = useState(false);
  const [emailTocado, setEmailTocado] = useState(false);
  const [confirmarEmailTocado, setConfirmarEmailTocado] = useState(false);
  const [contrasenaTocada, setContrasenaTocada] = useState(false);
  const [confirmarContrasenaTocada, setConfirmarContrasenaTocada] = useState(false);
  const [selectedPfp, setSelectedPfp] = useState(null);

  const { apiPostCreateUser } = useApiHooks();

  useEffect(() => {
    validarFormulario();
  }, [usuario, email, confirmarEmail, contrasena, confirmarContrasena, selectedPfp]);

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
      pfp: selectedPfp
    };

    try {
      await apiPostCreateUser(data);
      navigation.navigate('Home');
    } catch (e) {
      // Mostrar error de conexión o guardado si querés
    }
  };

  return (
    <ScrollView contentContainerStyle={estilos.contenedor}>
      <View style={estilos.encabezado}>
        <Image
          source={require("../../../assets/img/emblem.png")}
          style={estilos.logo}
        />
      </View>

      <Text style={estilos.subtitulo}>Crear cuenta</Text>
{/*999999999999999999999999999999*/}

{/* Selección de Imagen de Perfil */}
      <View style={estilos.section}>
        <Text style={[estilos.label, estilos.txtCentrado]}>Selecciona tu Imagen de Perfil:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={estilos.pfpOptionsContainer}>
          {randomUrlsImg.map((url, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedPfp(url)}
              style={[
                estilos.pfpOption,
                selectedPfp === url && estilos.selectedPfpOption, // Aplica el estilo de resaltado
              ]}
            >
              <Image source={{ uri: url }} style={estilos.pfpImage} />
            </TouchableOpacity>
          ))}
        </ScrollView>
        {errores.pfp && <Text style={estilos.errorTexto}>{errores.pfp}</Text>}
      </View>
      {/* Fin Selección de Imagen de Perfil */}


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
        placeholder="Fecha de nacimiento (MM/DD/AAAA)"
        value={fechaNacimiento}
        onChangeText={setFechaNacimiento}
      />

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
