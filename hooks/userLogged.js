import { useContext, useState, createContext } from "react";
import { useApiHooks } from "./apiHooks";
const UserLoggedStatusContext = createContext(
  {
    isUserLogged: false,
    logInUser: () => {},
    logOutUser: () => {},
    dataUser: null
  }
);

export function UserLoggedStatusProvider({ children }) {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [tokenUser, setTokenUser] = useState(null);

  const { apiPostLoginuser } = useApiHooks();

  const logInUser = async (data) => {
    //Request user login here
    const {user, pass} = data;
    const dataUser = await apiPostLoginuser(user, pass);
    if(dataUser) setTokenUser(dataUser)
    else return null;
    setIsUserLogged(true);
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
    dataUser: tokenUser
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