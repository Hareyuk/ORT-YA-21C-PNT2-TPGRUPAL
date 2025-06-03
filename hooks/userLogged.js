import { useContext, useState, createContext } from "react";

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
  const [dataUser, setDataUser] = useState();
  const logInUser = (data) => {
    //Request user login here
    console.log("Usuario logeado: ", data);
    
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
    dataUser
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