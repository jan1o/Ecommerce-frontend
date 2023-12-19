import { api, requestConfig } from "@/utils/config"
import { getUser as getUserToken } from "@/utils/userUtils";
import awsService from "./awsServices";

const getUser = async() => {
  const token = getUserToken().token;
  const config = requestConfig("GET", null, token);
  
  const res = await fetch(api + "/users/profile", config).then((res) => res.json());

  return res;
}

const updateUser = async(data) => {
  if(data.image){
    const image = data.image;

    let imageURL;
    awsService.sendFile(image, "users").then((res) => imageURL = res.data);
    
    data.image = imageURL;
  }

  const token = getUserToken().token;

  const config = requestConfig("PUT", data, token);

 try {
  
  const res = await fetch(api + "/users/", config).then((res) => res.json());
  return res;

 } catch (error) {
  console.log("error");
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