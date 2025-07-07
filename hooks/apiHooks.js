import { useContext, createContext } from "react";
import { fetchPostPut, fetchGet } from "./hookFetch";
const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_CARDS = process.env.EXPO_PUBLIC_API_CARDS;

const API_GAME = process.env.EXPO_PUBLIC_API_GAME;
const API_USERS = process.env.EXPO_PUBLIC_API_USERS;

const ApiHooksContext = createContext({
  //API ROOMS
  apiJoinRoom: () => {},
  apiSendSelectedOrderCards: () => {},
  apiPlayRound: () => {},
  apiPlayNextRound: () => {},
  apiGetRoom: () => {},
  //API USERS
  apiGetUserById: () => {},
  apiGetUsers: () => {},
  apiPostLoginuser: () => {},
  apiPostCreateUser: () => {},
  apiPutUpdateUser: () => {},
  apiDeleteUser: () => {},
  apiGetNewToken: ()=>{},
  //API CARDS
});

export function ApiHooksProvider({ children }) {
  const apiBase = process.env.EXPO_PUBLIC_API_URL;
  const apiUsers = process.env.EXPO_PUBLIC_API_USERS;
  const apiRooms = process.env.EXPO_PUBLIC_API_CARDS;
  const apiCards = process.env.EXPO_PUBLIC_API_GAME;

// API ROOMS 
  const apiJoinRoom = async (id, user) => {
    return fetchPostPut(`${apiCards}/unirse`, 'POST', {
      id,
      usuario: user,
    });
  };

  const apiSendSelectedOrderCards = async (id, orderCards) => {
    return fetchPostPut(`${apiCards}/ordenar`, 'POST', {
      id,
      nuevoOrden: orderCards,
    });
  };

  const apiPlayRound = async () => {
    return fetchPostPut(`${apiCards}/jugar`, 'POST', {});
  };

  const apiPlayNextRound = async () => {
    return fetchPostPut(`${apiCards}/siguiente`, 'POST', {});
  };

  const apiGetRoom = async () => {
    return fetchGet(`${apiCards}/sala`);
  };

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

  const apiGetNewToken = async (id) => { 
    return fetchPostPut(`${apiUsers}/getnewtoken`, 'POST', { id: id });
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
    //API ROOMS
    apiJoinRoom,
    apiSendSelectedOrderCards,
    apiPlayRound,
    apiPlayNextRound,
    apiGetRoom,
    //API USERS
    apiGetUserById,
    apiGetUsers,
    apiPostLoginuser,
    apiPostCreateUser,
    apiPutUpdateUser,
    apiDeleteUser,
    apiGetNewToken
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
