import React, { createContext, useState, useContext } from "react";
import { View, Text } from "react-native";

const NotificadorContext = createContext();

export function NotificadorProvider({ children }) {
  const [mensaje, setMensaje] = useState(null);

  const mostrarMensaje = (texto) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(null), 3000); // Oculta a los 3s
  };

  return (
    <NotificadorContext.Provider value={{ mostrarMensaje }}>
      {children}
      {mensaje && (
        <View
          style={{
            position: "absolute",
            bottom: 40,
            left: 20,
            right: 20,
            backgroundColor: "#cc0000",
            padding: 12,
            borderRadius: 8,
            zIndex: 9999,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>{mensaje}</Text>
        </View>
      )}
    </NotificadorContext.Provider>
  );
}

export const useNotificador = () => useContext(NotificadorContext);
