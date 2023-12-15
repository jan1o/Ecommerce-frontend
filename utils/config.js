export const api = "http://localhost:5000/api";

export const requestConfig = (method, data, token = null) => {
  let config;

  if(method === "DELETE" || data === null) { //DELETE e PUT vazio
    config = {
      method,
      headers: {},
    }
  } else {                                   //POST e PUT
    config = {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
    }
  }

  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }

  return config;
}