import { useContext, createContext } from "react";
//import { API_URL, API_CARDS, API_GAME, API_USERS } from '@env';


const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_CARDS = process.env.EXPO_PUBLIC_API_CARDS;

const API_GAME = process.env.EXPO_PUBLIC_API_GAME;
const API_USERS = process.env.EXPO_PUBLIC_API_USERS;

console.log("DEBUG (process.env): API_URL:", API_URL); // ¡Mantén este log!
console.log("DEBUG (process.env): API_USERS:", API_USERS)

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
  const fetchJson = async (endpointPath, method, bodyObj) => {
    const url = `${apiBase}${endpointPath}`;
    console.log(url)
    //let responseOk = true;
    console.log(`[fetchJson] Intentando ${method} a URL: ${url}`);
    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: bodyObj ? JSON.stringify(bodyObj) : undefined,
      });
      if (!res.ok) {
        //responseOk = false;
        let errorData = null;
        try {
       const contentType = res.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            errorData = await res.json();
          } else {
            errorData = await res.text();
          }
        } catch (parseError) {
          errorData = `Error al parsear la respuesta de error: ${parseError.message}. Contenido: ${await res.text()}`;
        }
        console.error('Server error (fetchJson):', {
          status: res.status,
          statusText: res.statusText,
          url: res.url,
          responseBody: errorData,
        });

        throw new Error(`HTTP error! Status: ${res.status}. Message: ${JSON.stringify(errorData)}`);
      }
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await res.json();
      } else {
     
       console.warn(`[fetchJson] Respuesta OK (${res.status}) pero no es JSON. URL: ${url}`);
        return {};
      } 
      
    } catch (e) {
       console.error('[fetchJson] Error en la solicitud:', e.message);
      throw new Error("ERROR de red o procesamiento: " + e.message);
    }
  };

  // Helper for GET requests
  const fetchGet = async (endpointPath) => {
    const url = `${apiBase}${endpointPath}`;
    try {
      const res = await fetch(url, { method: 'GET' });
      if (!res.ok) {
        let errorData = null;
        try {
          const contentType = res.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            errorData = await res.json();
          } else {
            errorData = await res.text();
          }
        } catch (parseError) {
          errorData = `Error al parsear la respuesta de error GET: ${parseError.message}. Contenido: ${await res.text()}`;
        }
        console.error('Server error (fetchGet):', {
          status: res.status,
          statusText: res.statusText,
          url: res.url,
          responseBody: errorData,
        });
        throw new Error(`HTTP error! Status: ${res.status}. Message: ${JSON.stringify(errorData)}`);
      }

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await res.json();
      } else {
        // Si no es JSON, por ejemplo, un 204 No Content
        console.warn(`[fetchGet] Respuesta OK (${res.status}) pero no es JSON. URL: ${url}`);
        return {};
      }
    } catch (e) {
      console.error('[fetchGet] Error en la solicitud GET:', e.message);
      throw new Error("ERROR de red o procesamiento GET: " + e.message);
    }
  };



// API ROOMS 
  const apiJoinRoom = async (id, user) => {
    return fetchJson(`${apiCards}/unirse`, 'POST', {
      id,
      usuario: user,
    });
  };

  const apiSendSelectedOrderCards = async (id, orderCards) => {
    return fetchJson(`${apiCards}/ordenar`, 'POST', {
      id,
      nuevoOrden: orderCards,
    });
  };

  const apiPlayRound = async () => {
    return fetchJson(`${apiCards}/jugar`, 'POST', {});
  };

  const apiPlayNextRound = async () => {
    return fetchJson(`${apiCards}/siguiente`, 'POST', {});
  };

  const apiGetRoom = async () => {
    return fetchGet(`${apiCards}/sala`);
  };

  // API USERS
  const apiGetUserById = async (id) => {
    return fetchGet(`${apiUsers}/${id}`);
  };

  const apiGetUsers = async () => {
    return fetchGet(apiUsersPath); // Aquí si la ruta base es solo /api/usuarios
  };

  const apiPostLoginuser = async (formData) => {
    // Aquí el endpoint es /login, y fetchJson le añade apiBase + apiUsersPath
    return fetchJson(`${apiUsers}/login`, 'POST', formData);
  };

  const apiPostCreateUser = async (formData) => {
    return fetchJson(apiUsers, 'POST', formData);
  };

  const apiPutUpdateUser = async (id, formData) => {
    
    return fetchJson(`${apiUsers}/${id}`, 'PUT', formData);
  };

  const apiDeleteUser = async (id) => {
    return fetchJson(`${apiUsers}/${id}`, 'DELETE', {});
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
