import { useContext, createContext } from "react";
import { API_URL, API_CARDS, API_GAME, API_USERS } from '@env';

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
  //API CARDS
});

export function ApiHooksProvider({ children }) {
  const apiBase = process.env.EXPO_PUBLIC_API_URL;
  const apiUsers = process.env.EXPO_PUBLIC_API_USERS;
  const apiRooms = process.env.EXPO_PUBLIC_API_CARDS;
  const apiCards = process.env.EXPO_PUBLIC_API_GAME;


  let responseOk = true;
  const apiUrl = apiBase + apiUsers;

  // Helper for POST/PUT requests with JSON body
  const fetchJson = async (url, method, bodyObj) => {
    let responseOk = true;
    console.log(`[fetchJson] Intentando ${method} a URL: ${url}`);
    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(bodyObj),
      });
      if (!res.ok) {
        responseOk = false;
        const errorData = await res.text();
        console.error('Server error:', {
          status: errorData.status,
          statusText: errorData.statusText,
          error: errorData
        });
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      else
      {
        const data = await res.json();
        responseOk = data;
        //console.log('Success response:', data);
      }
      return responseOk;
    } catch (e) {
      responseOk = false;
      throw new Error("ERROR: " + e.message);
    }
  };

  // Helper for GET requests
  const fetchGet = async (url) => {
    try {
      const res = await fetch(url, { method: 'GET' });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res;
    } catch (e) {
      throw new Error("ERROR: " + e.message);
    }
  };

  // API ROOMS
  const apiJoinRoom = async (id, user) => {
    return fetchJson(apiBase + apiRooms + "/unirse", 'POST', {
      id,
      usuario: user,
    });
  };

  const apiSendSelectedOrderCards = async (id, orderCards) => {
    return fetchJson(apiBase + apiRooms + "/ordenar", 'POST', {
      id,
      nuevoOrden: orderCards,
    });
  };

  const apiPlayRound = async () => {
    return fetchJson(apiBase + apiRooms + "/jugar", 'POST', {});
  };

  const apiPlayNextRound = async () => {
    return fetchJson(apiBase + apiRooms + "/siguiente", 'POST', {});
  };

  const apiGetRoom = async () => {
    return fetchGet(apiBase + apiRooms + "/sala");
  };

  // API USERS
  const apiGetUserById = async (id) => {
    return fetchGet(apiBase + apiUsers + `/${id}`);
  };

  const apiGetUsers = async () => {
    return fetchGet(apiBase + apiUsers);
  };

  const apiPostLoginuser = async (formData) => {
    return fetchJson(apiBase + apiUsers + `/login`, 'POST', formData);
  };

  const apiPostCreateUser = async (formData) => {
    return fetchJson(apiBase + apiUsers, 'POST', formData);
  };

  const apiPutUpdateUser = async (id, formData) => {
    return fetchJson(apiBase + apiUsers + `/${id}`, 'PUT', formData);
  };

  const apiDeleteUser = async (id) => {
    return fetchJson(apiBase + apiUsers + `/${id}`, 'DELETE', {});
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
