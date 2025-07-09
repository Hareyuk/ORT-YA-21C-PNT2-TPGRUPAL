import { useContext, useState, createContext, useEffect } from "react";
import { useApiHooks } from "./apiHooks";
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import {useTokenUser} from './hookToken'
import AsyncStorage from "../src/services/AsyncStorage";
const AUTH_KEY = '@auth_data';

const UserLoggedStatusContext = createContext(
  {
    logInUser: () => { },
    logOutUser: () => { }
  }
);

export function UserLoggedStatusProvider({ children }) {
  // Estados
  
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); // Nuevo estado para controlar la carga inicial
  const { apiPostLoginuser } = useApiHooks();
  const {setUserToken, userToken} = useTokenUser();

  // --- Primer useEffect: Cargar el token desde AsyncStorage al iniciar la app ---
  useEffect(() => {

    const loadStoredToken = async () => {
      try {
        setIsLoadingAuth(true); // Se inicia el proceso de carga
        const data = await AsyncStorage.getData(AUTH_KEY);
        if (data) {
          setUserToken(data);      
        }
      } catch (e) {
        console.error("Error al cargar el token de AsyncStorage:", e);
        await AsyncStorage.removeData(AUTH_KEY);
      } finally {
        setIsLoadingAuth(false);
      }
    };

    if (!userToken) loadStoredToken();
  }, []);

  // Funciones de autenticación
  const logInUser = async (data) => {
    let success = false;
    try {
      const response = await apiPostLoginuser(data); 
      setUserToken(response.token)
      success = true;
    } catch (e) {
      throw new Error("ERROR LOGIN (en logInUser): ", e)
    }
    return success;

  };

  const logOutUser = async () => {
    console.log("Sesión cerrada");
    await AsyncStorage.removeData(AUTH_KEY);
    setUserToken(null);
  };

  const value = {
    logInUser,
    logOutUser
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