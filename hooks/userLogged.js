import { useContext, useState, createContext, useEffect } from "react";
import { useApiHooks } from "./apiHooks";
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import AsyncStorage from "../src/services/AsyncStorage";
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
    //isLoading: true
  }
);

export function UserLoggedStatusProvider({ children }) {
   useEffect(() => {
    // Necesitamos que al levantar nuestra app, se verifique si hay un auth en el AsyncStorage
    AsyncStorage.getData(AUTH_KEY).then((data) => {
      //console.log("Encuentro el token en el AsyncStorage", data);
      if (data) {
        setUserToken(data);
      }
    });
  }, []);

  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [userCountry, setUserCountry] = useState(null)
  //const [isLoading, setIsLoading] = useState(true);

  //useEffect para obtener datos del token cada vez que se inicia sesión
  useEffect(() => {
    if(userToken) //Si existe token, hay usuario para obtener datos
    {
      const decoded = jwtDecode(userToken);
      //console.log('Usuario decodificado: ', decoded);
      setUserData(decoded);
      setIsUserLogged(true);
      //console.log('Ya está iniciado sesión');

      /* socket.on('PAIS_DETECTADO', (sala) => {
      console.log('LobbyView - Estado de la sala actualizado:', sala);
      // Si la sala ahora tiene 2 jugadores y el juego ha comenzado (o está esperando orden)
      if (sala.jugadores.length === 2 && sala.estado !== 'esperando-jugadores') {
        console.log('LobbyView: Dos jugadores encontrados, navegando a GameView.');
        navigation.navigate('Game', { userId: userData.id, userName: userData });
      }
    }); */
    }
  }, [userToken])
  

  const { apiPostLoginuser } = useApiHooks();

  const logInUser = async (data) => {
    //Request user login here
    let responseOk = true;
    try
    {
      const userToken = await apiPostLoginuser(data);
      if(userToken) {
        setUserToken(userToken.token);
        AsyncStorage.storeData(AUTH_KEY, userToken.token)
      }
      else
      {
        responseOk = false;
      }
    }
    catch (e)
    {
      responseOk = false;
      console.error("ERROR LOGIN: ", e);
    }
    return responseOk;
  }
  const logOutUser = () => {
    //Close
    console.log("Sesión cerrada");
    setIsUserLogged(false)
    setUserToken(null);
    setUserData(null);
    AsyncStorage.removeData(AUTH_KEY);
  };

  const value = {
    isUserLogged,
    logInUser,
    logOutUser,
    userData: userData,
    userToken: userToken,
  };

  return (
    <UserLoggedStatusContext.Provider value={value}>
      {children}
    </UserLoggedStatusContext.Provider>
  );
};

export function useAuthUser()
{
    const context = useContext(UserLoggedStatusContext);
    if (!context) {
      throw new Error("useAuthUser must be used within UserLoggedStatusProvider");
  }
    return context;
}