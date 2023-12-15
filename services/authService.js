import { api, requestConfig } from "@/utils/config"

//Register an user
const register = async(data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/register", config).then((res) => res.json()).catch((err => err));

    if(res._id){
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;
    
  } catch(error){
    console.log(error);
  }
}

//logout an user
const logout = () => {
  localStorage.removeItem("user");
};

//sign in an user
const login = async (data) => {
  const config = requestConfig("POST", data);

  try {
    
    const res = await fetch(api + "/users/login", config).then((res) => res.json()).catch((err) => err);

    if(res._id) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;

  } catch (error) {
    console.log(error);
  }
}

//Validate if user token is valid
const validateUser = async (token) => {
  const config = requestConfig("POST", null, token);

  try {

    const res = await fetch(api + "/users/validateUser", config);

    return res;


  } catch (error) {
    console.log(error);
  }
}

const authService = {
  register,
  logout,
  login,
  validateUser,
};

export default authService;