import { api, requestConfig } from "@/utils/config"

const getUser = async() => {
  let token = null;
  if(typeof window !== 'undefined'){
    token = JSON.parse(localStorage.getItem('user')).token;
  }
  const config = requestConfig("GET", null, token);

  const res = await fetch(api + "/users/profile", config).then((res) => res.json());

  return res;
}

const updateUser = async(data, token) => {
  const config = requestConfig("PUT", data, token);

 try {
  
  const res = await fetch(api + "/users/", config);

  return res;

 } catch (error) {
  console.log(error);
 }
}

const validateUser = async(token) => {
  const config = requestConfig("POST", null, token);

  try {
    
    const res = await fetch(api + "/users/validateUser", config);

    return res;

  } catch (error) {
    console.log(error);
  }
}

const userService = {
  getUser,
  updateUser,
  validateUser,
};

export default userService;