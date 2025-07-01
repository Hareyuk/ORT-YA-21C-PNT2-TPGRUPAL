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

export default function EditProfile({ navigation }) {
  const { userData, userToken, isUserLogged, isLoadingAuth, logOutUser, callUpdateTokenUser } = useAuthUser();
  const [usuario, setUsuario] = useState(userData.usuario);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errores, setErrores] = useState({});
  const [formValido, setFormValido] = useState(false);
  const [userPfp, setUserPfp] = useState(userData.pfp)
  const { apiPutUpdateUser, apiDeleteUser } = useApiHooks();


  useEffect(() => {
    if (isUserLogged && userData) {
      //setUsuario(userData.usuario || "");
      setNewEmail(userData.email || "");
    } else {

      //setUsuario("");
      setNewEmail("");
      setNewPassword("");
      setConfirmPassword("");
      setErrores({});
      setFormValido(false);
    }
  }, [isUserLogged, userData])

  //useEffec para validar cuando cambio algo en el formulario

  useEffect(() => {
    if (!isLoadingAuth) {
      validarFormulario();
    }
  }, [usuario, newEmail, newPassword, confirmPassword]);

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
    const hayCambios = (usuario.trim() !== (userData?.usuario || "")) ||
      (newEmail.trim() !== (userData?.email || "")) ||
      (newPassword.trim() !== "");

    setFormValido(Object.keys(nuevosErrores).length === 0 && hayCambios);
    return Object.keys(nuevosErrores).length === 0 && hayCambios;
  };

  const guardarCambios = async () => {

    if (!isUserLogged || !userData || !userData.id) {
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

    // Si no hay datos para actualizar (ej. el usuario no cambió nada), no hacer la llamada API
    if (Object.keys(dataToUpdate).length === 0) {
      Alert.alert("Información", "No hay cambios para guardar.");
      setFormValido(false); // Deshabilitar el botón si no hay cambios
      return;
    }

    console.log("Datos a enviar para actualizar:", dataToUpdate);

    try {
      const response = await apiPutUpdateUser(userData.id, dataToUpdate);
      console.log("Respuesta del servidor al actualizar:", response);
      if (response) {
        Alert.alert("Perfil actualizado correctamente.");
        //Actualizar info user
        callUpdateTokenUser(()=>{navigation.navigate("Profile")});
        setNewPassword("");
        setConfirmPassword("");
        setErrores({});
        setFormValido(false);
      } else {

        Alert.alert("No se pudo actualizar el perfil. Intenta de nuevo.");
      }
    } catch (e) {
      console.error("Error al intentar actualizar perfil:", e);
    }

  };

  // --- Lógica de eliminación de cuenta ---
  const handleDeleteAccount = async () => {

    if (!isUserLogged || !userData || !userData.id) {
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



  if (isLoadingAuth) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }
  if (!isUserLogged || !userData) {
    // Puedes redirigir al login o mostrar un mensaje
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>No estás logueado. Redirigiendo...</Text>
        {useEffect(() => {
          if (!isUserLogged && !isLoadingAuth) {
            navigation.navigate('Login');
          }
        }, [isUserLogged, isLoadingAuth, navigation])}
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <View style={estilos.row}>
        {/* IZQUIERDA */}
        <View style={estilos.left}>
          <Text style={estilos.titulo}>Editar perfil</Text>
          <Image
            source={userPfp}
            style={estilos.avatar}
          />
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
            source={require("../../../assets/icon.png")}
            style={estilos.placeholder}
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
