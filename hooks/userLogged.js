import { useContext, useState, createContext, useEffect } from "react";
import { useApiHooks } from "./apiHooks";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';

const UserLoggedStatusContext = createContext(
  {
    isUserLogged: false,
    logInUser: () => {},
    logOutUser: () => {},
    dataUser: null,
    //isLoading: true
  }
);

export function UserLoggedStatusProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [tokenUser, setTokenUser] = useState(null);
  //const [isLoading, setIsLoading] = useState(true);

  const { apiPostLoginuser } = useApiHooks();

  const logInUser = async (data) => {
    //Request user login here
    let responseOk = true;
    const dataUser = await apiPostLoginuser(data);
    const jsonData = await dataUser.json();
    if(dataUser) {
      console.log("DATOS DE USUARIO LOGEADO: ", jsonData);      
      setTokenUser(dataUser)
      setIsUserLogged(true);
    }
    
    else
    {
      responseOk = false;
      //Error notificacion
    }
    return responseOk;
  }
  const logOutUser = () => {
    //Close
    console.log("Sesión cerrada");
    setIsUserLogged(false)
  };

  const value = {
    isUserLogged,
    logInUser,
    logOutUser,
    dataUser: tokenUser,
    userId: userId
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