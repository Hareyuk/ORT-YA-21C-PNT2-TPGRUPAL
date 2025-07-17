import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
  StyleSheet,
} from "react-native";
import { useApiHooks } from "../../../hooks/apiHooks.js";
import { useAuthUser } from "../../../hooks/userLogged.js";
import estilos from "./estiloEditProfile";
import { useTokenUser } from "../../../hooks/hookToken.js";

export default function EditProfile({ navigation }) {
  const { logOutUser } = useAuthUser();
  const {userData, setUserToken} = useTokenUser();

  {/*9999999999999999999999999999999999999*/}
  const pfpOptions = [
    'https://lh3.googleusercontent.com/d/1ydlHT7r6CVDXg5c4Oe9iANmX350sEawy',
    'https://lh3.googleusercontent.com/d/1r15Oc49pHDdVObz5R5o7kJCZCXQDKztU',
    'https://lh3.googleusercontent.com/d/1NqxloduuGZUIeriMsaBFS2SoVoSggReZ',
    'https://lh3.googleusercontent.com/d/1CgbAHsBmh3G3eHUGz4e5vb5EE_4ymoKy',
    'https://lh3.googleusercontent.com/d/1B_D2HcOoihx6AbKtQ4lDoRCnYffSlT8x',
    'https://lh3.googleusercontent.com/d/135Gnb9_GS_WExCgDoVWI0qksvYeNChMN'
  ];
  const [usuario, setUsuario] = useState(userData.usuario);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errores, setErrores] = useState({});
  const [formValido, setFormValido] = useState(false);
  const [selectedPfp, setSelectedPfp] = useState(userData.pfp)
  const { apiPutUpdateUser, apiDeleteUser } = useApiHooks();


  useEffect(() => {
    if (userData) {
      //setUsuario(userData.usuario || "");
      setNewEmail(userData.email || "");
      setSelectedPfp(userData.pfp || null)
    } else {

      //setUsuario("");
      setNewEmail("");
      setNewPassword("");
      setConfirmPassword("");
      setErrores({});
      setFormValido(false);
    }
  }, [userData])

  //useEffec para validar cuando cambio algo en el formulario

  useEffect(() => {
  
      validarFormulario();
    
  }, [usuario, newEmail, newPassword, confirmPassword, selectedPfp]);

  const validarFormulario = () => {
    const nuevosErrores = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/; //igual que en el back

    // Validar USUARIO (si se ingresó y es diferente al actual)
    /* if (usuario.trim() !== "" && usuario.trim().length < 5) {
      nuevosErrores.usuario = "El usuario debe tener al menos 5 caracteres (si se modifica).";
    } */

    // Validar EMAIL (si se ingresó y es diferente al actual)
    if (newEmail.trim() !== "" && !regexEmail.test(newEmail)) {
      nuevosErrores.newEmail = "El nuevo email no tiene un formato válido.";
    }

    // Validar CONTRASEÑA 
    if (newPassword.trim() !== "") {
      if (!regexContrasena.test(newPassword)) {
        nuevosErrores.newPassword =
          "La nueva contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.";
      }
      if (newPassword !== confirmPassword) {
        nuevosErrores.confirmPassword = "Las contraseñas no coinciden.";
      }
    } else if (confirmPassword.trim() !== "") { // Si solo se llenó confirmar y no la nueva contraseña
      nuevosErrores.newPassword = "Debes ingresar la nueva contraseña.";
    }

    setErrores(nuevosErrores);

    // controlar el valor actual  con los valores originales 
    const hayCambios = (
      usuario.trim() !== (userData?.usuario || "")) ||
      (newEmail.trim() !== (userData?.email || "")) ||
      (newPassword.trim() !== "") ||
      (selectedPfp !== (userData.pfp || null));

    setFormValido(Object.keys(nuevosErrores).length === 0 && hayCambios);
    return Object.keys(nuevosErrores).length === 0 && hayCambios;
  };

  const guardarCambios = async () => {

    if (!userData || !userData.id) {
      Alert.alert("Error", "No se pudo obtener la información del usuario logueado para actualizar.");
      return; // Si esta condición es verdadera, la función termina aquí.
    }

    console.log("Guardar:", { newEmail, newPassword, confirmPassword });
    const esValido = validarFormulario();
    if (!esValido) {
      Alert.alert("Error de validación", "Por favor, corrige los errores o ingresa al menos un campo a modificar.");
      return;
    }


    const dataToUpdate = {};
    if (usuario.trim() !== "" && usuario.trim() !== userData.usuario) {
      dataToUpdate.usuario = usuario.trim();
    }
    if (newEmail.trim() !== "" && newEmail.trim() !== userData.email) {
      dataToUpdate.email = newEmail.trim();
    }
    if (newPassword.trim() !== "") {
      dataToUpdate.contrasenia = newPassword; // En el back se llama 'contrasenia'
    }
    if (selectedPfp !== (userData?.pfp || null)) { 
      dataToUpdate.pfp = selectedPfp;
    }

    // Si no hay datos para actualizar (ej. el usuario no cambió nada), no hacer la llamada API
    if (Object.keys(dataToUpdate).length === 0) {
      Alert.alert("Información", "No hay cambios para guardar.");
      setFormValido(false); // Deshabilitar el botón si no hay cambios
      return;
    }

    console.log("Datos a enviar para actualizar:", dataToUpdate);

    try {
      const response = await apiPutUpdateUser(userData.id, dataToUpdate);
      setUserToken(response.token)
      navigation.navigate('Home');
    } catch (e) {
      console.error("Error al intentar actualizar perfil:", e);
    }

  };

  // --- Lógica de eliminación de cuenta ---
  const handleDeleteAccount = async () => {

    if (!userData || !userData.id) {
        Alert.alert("No se pudo obtener el ID del usuario para eliminar.");
        return;
    }

    try {
        await apiDeleteUser(userData.id);
        Alert.alert("Tu cuenta ha sido eliminada.");
        logOutUser(); 
        navigation.navigate('Home'); 
    } catch (e) {
        console.error("Error al eliminar cuenta (API):", e);
        Alert.alert("Error", "No se pudo eliminar la cuenta. Intenta de nuevo.");
    }
  };


  const eliminarCuenta = () => {
    console.log("DEBUG: Botón Eliminar cuenta presionado.");

    const confirmMessage = "¿Estás seguro de que quieres eliminar tu cuenta?";

    if (Platform.OS === 'web') {
     
      if (window.confirm(confirmMessage)) {
        handleDeleteAccount();
      }
    } else {
      
      Alert.alert(
        "Confirmar Eliminación",
        confirmMessage,
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Eliminar",
            onPress: handleDeleteAccount,
            style: "destructive",
          },
        ],
        { cancelable: true }
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <View style={estilos.row}>
        {/* IZQUIERDA */}
        <View style={estilos.left}>
          <Text style={estilos.titulo}>Editar perfil</Text>
          <Image
            source={{ uri: selectedPfp || userData?.pfp}}
            style={estilos.avatar}
          />
          {/* SECCIÓN DE SELECCIÓN DE IMAGEN DE PERFIL */}
          <View style={estilos.pfpSelectionContainer}>
            <Text style={[estilos.label, estilos.txtCentrado]}>Cambiar Imagen de Perfil:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={estilos.pfpOptionsScroll}>
              {pfpOptions.map((url, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedPfp(url)}
                  style={[
                    estilos.pfpOption,
                    selectedPfp === url && estilos.selectedPfpOption, // Aplica el estilo de resaltado si está seleccionada
                  ]}
                >
                  <Image source={{ uri: url }} style={estilos.pfpImage} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
      {/* FIN SECCIÓN DE SELECCIÓN DE IMAGEN DE PERFIL */}

          <TextInput
            disabled
            style={estilos.input}
            placeholder={usuario}
            value={usuario}
            /* onChangeText={setUsuario} */
            autoCapitalize="none"
          />
          {errores.usuario && <Text style={{ color: "red" }}>{errores.usuario}</Text>}

          <TextInput
            style={estilos.input}
            placeholder="Nuevo email"
            value={newEmail}
            onChangeText={setNewEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errores.newEmail && <Text style={{ color: "red" }}>{errores.newEmail}</Text>}

          <TextInput
            style={estilos.input}
            placeholder="Nueva contraseña"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          {errores.newPassword && <Text style={{ color: "red" }}>{errores.newPassword}</Text>}

          <TextInput
            style={estilos.input}
            placeholder="Confirmar nueva contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          {errores.confirmPassword && <Text style={{ color: "red" }}>{errores.confirmPassword}</Text>}

          <TouchableOpacity
            style={[estilos.boton, estilos.botonGuardar, { backgroundColor: formValido ? "#3a2a23" : "#ccc" }]}
            onPress={guardarCambios}
            disabled={!formValido} // Deshabilitar si no es válido o no hay cambios
          >
            <Text style={estilos.textoBoton}>Guardar cambios</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[estilos.boton, estilos.botonEliminar]}
            onPress={eliminarCuenta}
          >
            <Text style={estilos.textoEliminar}>Eliminar cuenta</Text>
          </TouchableOpacity>
        </View>

        {/* DERECHA */}
        <View style={estilos.right}>
          <Image
            source={require("../../../assets/img/bgwebform.png")}
            style={estilos.decorationBg}
          />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
  }
});
