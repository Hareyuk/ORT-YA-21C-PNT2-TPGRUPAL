import { useContext, createContext } from "react";
import { fetchPostPut, fetchGet } from "./hookFetch";

const ApiHooksContext = createContext({
  
  //API USERS
  apiGetUserById: () => {},
  apiGetUsers: () => {},
  apiPostLoginuser: () => {},
  apiPostCreateUser: () => {},
  apiPutUpdateUser: () => {},
  apiDeleteUser: () => {},
  
  //API CARDS
});

export function ApiHooksProvider({ children }) {
  const apiBase = process.env.EXPO_PUBLIC_API_URL;
  const apiUsers = process.env.EXPO_PUBLIC_API_USERS;
  


  // API USERS
  const apiGetUserById = async (id) => {
    return fetchGet(`${apiUsers}/${id}`);
  };

  const apiGetUsers = async () => {
    return fetchGet(apiUsers); 
  };

  const apiPostLoginuser = async (formData) => {
    return fetchPostPut(`${apiUsers}/login`, 'POST', formData);
  };

  const apiPostCreateUser = async (formData) => {
    return fetchPostPut(apiUsers, 'POST', formData);
  };

  const apiPutUpdateUser = async (id, formData) => {
    return fetchPostPut(`${apiUsers}/${id}`, 'PUT', formData);
  };

  const apiDeleteUser = async (id) => {
    return fetchPostPut(`${apiUsers}/${id}`, 'DELETE', {});
  };

  

  const value = {
    
    //API USERS
    apiGetUserById,
    apiGetUsers,
    apiPostLoginuser,
    apiPostCreateUser,
    apiPutUpdateUser,
    apiDeleteUser
    //API CARDS
  };

  return (
    <ApiHooksContext.Provider value={value}>
      {children}
    </ApiHooksContext.Provider>
  );
}

export function useApiHooks() {
  const context = useContext(ApiHooksContext);
  if (!context) {
    throw new Error("ApiHooksContext must be used within apiHooksProvider");
  }
  return context;
}
