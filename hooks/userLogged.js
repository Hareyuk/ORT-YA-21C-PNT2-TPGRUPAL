import { useContext, useState, createContext, useEffect } from "react";
import { useApiHooks } from "./apiHooks";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import AsyncStorage from "../src/services/AsyncStorage";

const UserLoggedStatusContext = createContext(
  {
    isUserLogged: false,
    logInUser: () => {},
    logOutUser: () => {},
    userData: null,
    userToken: null
    //isLoading: true
  }
);

export function UserLoggedStatusProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isUserLogged, setIsUserLogged] = useState(false);
  //const [isLoading, setIsLoading] = useState(true);

  const { apiPostLoginuser, apiGetUserById } = useApiHooks();

  const logInUser = async (data) => {
    //Request user login here
    let responseOk = true;
    try
    {
      const userToken = await apiPostLoginuser(data);    
      if(userToken) {
        setUserToken(userToken);

        setUserData(jsonData);
        setIsUserLogged(true);
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