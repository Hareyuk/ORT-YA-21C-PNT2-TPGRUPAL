import { useContext, useState, createContext, useEffect } from "react";
import AsyncStorage from "../src/services/AsyncStorage";
const AUTH_KEY = '@auth_data';
import { jwtDecode } from "jwt-decode";

const HookToken= createContext(
    {
      userToken: null, 
      setUserToken:() => { }, 
      userData: null, 
      setUserData:() => { } 
    }
) 

export function UserTokenProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
      if (userToken) {
        if (userToken.includes('.') && userToken.split('.').length === 3) {
          try {            
            const decoded = jwtDecode(userToken);
            setUserData({
              id: decoded.id,
              usuario: decoded.usuario,
              email: decoded.email,
              pfp: decoded.pfp,
              wins: decoded.wins,
              losses: decoded.losses,
              draws: decoded.draws,
              pais: decoded.pais,
              codigoPais: decoded.codigoPais
            });
            AsyncStorage.storeData(AUTH_KEY, userToken)
          } catch (decodeError) {
            console.error("Error al decodificar el token JWT:", decodeError);
          }
        } else {
          console.warn("Token almacenado tiene formato inválido o incompleto. Eliminando.");
        }
      } else {
        setUserData(null);
      }
    }, [userToken]);

    const value = {
    
    userData,
    setUserData,
    userToken,
    setUserToken
  };

  
  return (
    <HookToken.Provider value={value}>
      {children}
    </HookToken.Provider>
  );


}

export function useTokenUser() {
  const context = useContext(HookToken);
  if (!context) {
    throw new Error("hookToken must be used within UserTokenProvider");
  }
  return context;
}