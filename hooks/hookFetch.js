// Helper for POST/PUT requests with JSON body
  export const fetchPostPut = async (endpointPath, method, bodyObj) => {
    const url = `${apiBase}${endpointPath}`;
    console.log(url)
    
    console.log(`[fetchPostPut] Intentando ${method} a URL: ${url}`);
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
        console.error('Server error (fetchPostPut):', {
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
     
       console.warn(`[fetchPostPut] Respuesta OK (${res.status}) pero no es JSON. URL: ${url}`);
        return {};
      } 
      
    } catch (e) {
       console.error('[fetchPostPut] Error en la solicitud:', e.message);
      throw new Error("ERROR de red o procesamiento: " + e.message);
    }
  };

  // Helper for GET requests
  export const fetchGet = async (endpointPath) => {
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
