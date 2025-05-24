import { useContext, useState, createContext } from "react";

const UserLoggedStatus = createContext(false);

export function UserLoggedStatus({ children }) {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const logInUser = () => setIsUserLogged(true);
  const logOutUser = () => setIsUserLogged(false);
  return (
    <UserLoggedStatus.Provider value={{ isUserLogged, logInUser, logOutUser }}>
      {children}
    </UserLoggedStatus.Provider>
  );
};

export function authUser()
{
    const isUserLogged = useContext(UserLoggedStatus);
    if(!isUserLogged)
    {
        throw new Error("Not logged in");
    }
    return isUserLogged;
}