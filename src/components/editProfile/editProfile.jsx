import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import estilos from "./estiloEditProfile";

export default function EditProfile({ navigation }) {
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const guardarCambios = () => {
    console.log("Guardar:", { newEmail, newPassword, confirmPassword });
    // aquí tu lógica: llamada API, validaciones, etc.
  };

  const eliminarCuenta = () => {
    console.log("Eliminar cuenta");
    // lógica de borrado
  };

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <View style={estilos.row}>
        {/* IZQUIERDA */}
        <View style={estilos.left}>
          <Text style={estilos.titulo}>Editar perfil</Text>
          <Image
            source={require("../../../assets/icon.png")}
            style={estilos.avatar}
          />

          <TextInput
            style={estilos.input}
            placeholder="Nuevo email"
            value={newEmail}
            onChangeText={setNewEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={estilos.input}
            placeholder="Nueva contraseña"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <TextInput
            style={estilos.input}
            placeholder="Confirmar nueva contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[estilos.boton, estilos.botonGuardar]}
            onPress={guardarCambios}
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
