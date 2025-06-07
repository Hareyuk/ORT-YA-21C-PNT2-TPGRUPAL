import { useContext, createContext } from "react";
import Config from 'react-native-config';

const ApiHooksContext = createContext(
  {
    apiJoinRoom: ()=>{},
    apiSendSelectedOrderCards: ()=>{},
    apiPlayRound: ()=>{},
    apiPlayNextRound: ()=>{},
    apiGetRoom: ()=>{},
    apiGetUserById: ()=>{},
    apiGetUsers: ()=>{},
    apiPostLoginuser: ()=>{},
    apiPostCreateUser: ()=>{},
    apiPutUpdateUser: ()=>{},
    apiDeleteUser: ()=>{}
  }
);

export function apiHooksProvider({ children }) {
  const apiBase = Config.API_URL;
  const apiUsers = Config.API_USERS;
  const apiRooms = Config.API_CARDS;
  const apiCards = Config.API_GAME;

  const apiJoinRoom = async (id, user)=>
  {
    let responseOk = true;
    const apiUrl = apiBase + apiRooms + "/unirse";
    try
    {
      await fetch(apiUrl,
        {
          method: 'POST',
          body:
          {
            id: id,
            usuario: user
          }
        }
      )
    }
    catch(e)
    {
      responseOk = false;
      throw new Error("ERROR: ", e);
    }
    return responseOk;
  }

  const apiSendSelectedOrderCards = async (id, orderCards)=>
  {
    let responseOk = true;
    const apiUrl = apiBase + apiRooms + "/ordenar";
    try
    {
      await fetch(apiUrl,
        {
          method: 'POST',
          body:
          {
            id: id,
            nuevoOrden: orderCards
          }
        }
      )
    }
    catch(e)
    {
      responseOk = false;
      throw new Error("ERROR: ", e);
    }
    return responseOk;
  }

  const apiPlayRound = async ()=>
  {
    let responseOk = true;
    const apiUrl = apiBase + apiRooms + "/jugar";
    try
    {
      await fetch(apiUrl,
        {
          method: 'POST',
          body: {}
        }
      )
    }
    catch(e)
    {
      responseOk = false;
      throw new Error("ERROR: ", e);
    }
    return responseOk;
  }

  const apiPlayNextRound = async ()=>
  {
    let responseOk = true;
    const apiUrl = apiBase + apiRooms + "/siguiente";
    try
    {
      await fetch(apiUrl,
        {
          method: 'POST',
          body: {}
        }
      )
    }
    catch(e)
    {
      responseOk = false;
      throw new Error("ERROR: ", e);
    }
    return responseOk;
  }

  const apiGetRoom = async ()=>
  {
    let responseOk = false;
    const apiUrl = apiBase + apiRooms + "/sala";
    try
    {
      responseOk = await fetch(apiUrl,
        {
          method: 'GET'
        }
      )
    }
    catch(e)
    {
      throw new Error("ERROR: ", e);
    }
    return responseOk;
  }

  const apiGetUserById = async (id)=>
  {
    let responseOk = false;
    const apiUrl = apiBase + apiUsers + `/${id}`;
    try
    {
      responseOk = await fetch(apiUrl,
        {
          method: 'GET'
        }
      )
    }
    catch(e)
    {
      throw new Error("ERROR: ", e);
    }
    return responseOk;
  }

  const apiGetUsers = async ()=>
  {
    let responseOk = false;
    const apiUrl = apiBase + apiUsers;
    try
    {
      responseOk = await fetch(apiUrl,
        {
          method: 'GET'
        }
      )
    }
    catch(e)
    {
      throw new Error("ERROR: ", e);
    }
    return responseOk;
  }

  const apiPostLoginuser = async (user, pass)=>
  {
    let responseOk = false;
    const apiUrl = apiBase + apiUsers + `/login`;
    try
    {
      responseOk = await fetch(apiUrl,
        {
          method: 'POST',
          body: {
            usuarioIngresado: user,
            contraseniaIngresada: pass
          }
        }
      )
    }
    catch(e)
    {
      throw new Error("ERROR: ", e);
    }
    return responseOk;
  }

  const apiPostCreateUser = async (formData)=>
  {
    let responseOk = true;
    const apiUrl = apiBase + apiUsers + `/`;
    try
    {
      await fetch(apiUrl,
        {
          method: 'POST',
          body: formData
        }
      )
    }
    catch(e)
    {
      responseOk = false;
      throw new Error("ERROR: ", e);
    }
    return responseOk;
  }

  const apiPutUpdateUser = async (id, formData)=>
  {
    let responseOk = true;
    const apiUrl = apiBase + apiUsers + `/${id}`;
    try
    {
      await fetch(apiUrl,
        {
          method: 'POST',
          body: formData
        }
      )
    }
    catch(e)
    {
      responseOk = false;
      throw new Error("ERROR: ", e);
    }
    return responseOk;
  }

  const apiDeleteUser = async (id)=>
  {
    let responseOk = true;
    const apiUrl = apiBase + apiUsers + `/${id}`;
    try
    {
      await fetch(apiUrl,
        {
          method: 'POST',
          body: {}
        }
      )
    }
    catch(e)
    {
      responseOk = false;
      throw new Error("ERROR: ", e);
    }
    return responseOk;
  }
  
  const value = {
    apiJoinRoom,
    apiSendSelectedOrderCards,
    apiPlayRound,
    apiPlayNextRound,
    apiGetRoom,
    apiGetUserById,
    apiGetUsers,
    apiPostLoginuser,
    apiPostCreateUser,
    apiPutUpdateUser,
    apiDeleteUser,
  };

  return (
    <ApiHooksContext.Provider value={value}>
      {children}
    </ApiHooksContext.Provider>
  );
};

export function useApiHooks()
{
    const context = useContext(ApiHooksContext);
    if (!context) {
      throw new Error("ApiHooksContext must be used within ApiHooksContextProvider");
  }
    return context;
}