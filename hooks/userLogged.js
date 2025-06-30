import { useContext, useState, createContext, useEffect } from "react";
import { useApiHooks } from "./apiHooks";
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import AsyncStorage from "../src/services/AsyncStorage"; // Asegúrate que esta ruta sea correcta
const AUTH_KEY = '@auth_data';
import { jwtDecode } from "jwt-decode";
import socket from "../src/services/socketService";

const UserLoggedStatusContext = createContext(
  {
    isUserLogged: false,
    logInUser: () => {},
    logOutUser: () => {},
    userData: null,
    userToken: null,
    userCountry: null,
    isLoadingAuth: true, 
  }
);

export function UserLoggedStatusProvider({ children }) {
  // Estados
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [userCountry, setUserCountry] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); // Nuevo estado para controlar la carga inicial

  const { apiPostLoginuser } = useApiHooks();

  // --- Primer useEffect: Cargar el token desde AsyncStorage al iniciar la app ---
  useEffect(() => {
    const loadStoredToken = async () => {
      try {
        setIsLoadingAuth(true); // Se inicia el proceso de carga
        const data = await AsyncStorage.getData(AUTH_KEY);
        // console.log("Encuentro el token en el AsyncStorage", data);
        if (data) {
          setUserToken(data); // Solo se setea el token, la decodificación va en el siguiente useEffect
        } else {
          // Si no hay token, aseguramos que los estados estén limpios
          setUserToken(null);
          setUserData(null);
          setIsUserLogged(false);
        }
      } catch (e) {
        console.error("Error al cargar el token de AsyncStorage:", e);
        // Limpiar por si hay un error en la lectura de AsyncStorage
        await AsyncStorage.removeData(AUTH_KEY);
        setUserToken(null);
        setUserData(null);
        setIsUserLogged(false);
      } finally {
        setIsLoadingAuth(false); // La carga inicial siempre finaliza aquí
      }
    };
    loadStoredToken();
  }, []); // Se ejecuta solo una vez al montar

  // --- Segundo useEffect: Decodificar el token y setear el estado de logueo ---
  // Este useEffect se ejecuta CADA VEZ que `userToken` cambia.
  useEffect(() => {
    // Validamos userToken ANTES de intentar decodificarlo
    if (userToken && typeof userToken === 'string' && userToken.trim() !== '') {
      // Opcional pero recomendado: Verificación básica del formato JWT (tres partes)
      if (userToken.includes('.') && userToken.split('.').length === 3) {
        try {
          const decoded = jwtDecode(userToken);
          console.log('Usuario decodificado:', decoded);

          // Opcional: Verificar si el token está expirado
          const currentTime = Date.now() / 1000;
          if (decoded.exp && decoded.exp < currentTime) {
              console.warn("Token JWT expirado. Eliminando token y solicitando nuevo login.");
              AsyncStorage.removeData(AUTH_KEY); // No esperamos el resultado
              setUserToken(null); // Esto causará que este useEffect se ejecute de nuevo con null
              setUserData(null);
              setIsUserLogged(false);
          } else {
              setUserData({
                  // Asignamos 'id' usando decoded.id si existe, de lo contrario, usamos decoded.usuario
                  id: decoded.id || decoded.usuario, 
                  usuario: decoded.usuario,
                  email: decoded.email,
                  
              });
              setIsUserLogged(true);
              // console.log('Ya está iniciado sesión');
          }
        } catch (decodeError) {
          
          console.error("Error al decodificar el token JWT:", decodeError);
          AsyncStorage.removeData(AUTH_KEY); // Limpiar el token inválido
          setUserToken(null); // Esto causará que este useEffect se ejecute de nuevo con null
          setUserData(null);
          setIsUserLogged(false);
        }
      } else {
        console.warn("Token almacenado tiene formato inválido o incompleto. Eliminando.");
        AsyncStorage.removeData(AUTH_KEY);
        setUserToken(null);
        setUserData(null);
        setIsUserLogged(false);
      }
    } else {
      // Si userToken es null, undefined, o vacío, aseguramos que el usuario NO esté logueado
      setIsUserLogged(false);
      setUserData(null);
    }
  }, [userToken]); // Se ejecuta cada vez que userToken cambia

  // Funciones de autenticación
  const logInUser = async (data) => {
    let success = false;
    try {
      // apiPostLoginuser ya devuelve el token directamente o lanza un error
      const response = await apiPostLoginuser(data); // Asumo que response es { token: "..." }

      if (response && response.token && typeof response.token === 'string' && response.token.trim() !== '') {
        const receivedToken = response.token;
 //console.log('DEBUG (UserLogged): TOKEN CRUDO RECIBIDO:', receivedToken); // <-- ¡Añade esta línea!
        // Validamos el token recién recibido del servidor antes de guardarlo y usarlo
        if (receivedToken.includes('.') && receivedToken.split('.').length === 3) {
            const decoded = jwtDecode(receivedToken);
            await AsyncStorage.storeData(AUTH_KEY, receivedToken); // Guardar solo si es válido
            setUserToken(receivedToken); // Esto disparará el segundo useEffect
            // setUserData(decoded); // Estos los setea el segundo useEffect ahora
            // setIsUserLogged(true);
            success = true;
            console.log("Login exitoso. Token recibido y decodificado.");
        } else {
            console.error("Token recibido del servidor tiene formato inválido. No se guardará.");
        }
      } else {
        console.error("Login fallido: No se recibió un token válido del servidor.");
      }
    } catch (e) {
      console.error("ERROR LOGIN (en logInUser): ", e);
    }
    return success;
  };

  const logOutUser = async () => {
    console.log("Sesión cerrada");
    await AsyncStorage.removeData(AUTH_KEY);
    setUserToken(null); 
    setUserCountry(null);
  };

  const value = {
    isUserLogged,
    logInUser,
    logOutUser,
    userData,
    userToken,
    userCountry,
    isLoadingAuth, 
  };

  // Pantalla de carga mientras se verifica la sesión inicial
  if (isLoadingAuth) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Verificando sesión...</Text>
      </View>
    );
  }

  return (
    <UserLoggedStatusContext.Provider value={value}>
      {children}
    </UserLoggedStatusContext.Provider>
  );
}

// Estilos (mantener al final del archivo)
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

export function useAuthUser() {
  const context = useContext(UserLoggedStatusContext);
  if (!context) {
    throw new Error("useAuthUser must be used within UserLoggedStatusProvider");
  }
  return context;
}