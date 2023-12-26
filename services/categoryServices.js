import { api, requestConfig } from "@/utils/config"
import { getUser as getUserToken } from "@/utils/userUtils";
import awsService from "./awsServices";

const getAll = async() => {
  const config = requestConfig("GET", null);

  const res = await fetch(api + "/categories/", config).then((res) => res.json());

  return res;
}

const createCategory = async(data) => {
  if(data.image){
    const image = data.image;

    const randomName = Date.now() + image.name;

    awsService.sendFile(image, "categories", randomName);
    
    const imageURL = "https://mycommercetutorial.s3.sa-east-1.amazonaws.com/categories/" + randomName;

    data.image = imageURL;
  }

  const token = getUserToken().token;

  const config = requestConfig("POST", data, token);

  const res = await fetch(api + "/categories/", config).then((res) => res.json());
  return res;

}

const updateCategory = async(data) => {
  if(data.image){
    const image = data.image;

    const randomName = Date.now() + image.name;
    awsService.sendFile(image, "categories", randomName);
    
    const imageURL = "https://mycommercetutorial.s3.sa-east-1.amazonaws.com/categories/" + randomName;

    data.image = imageURL;
  }

  const token = getUserToken().token;

  const config = requestConfig("PUT", data, token);

  const res = await fetch(api + "/categories/" + data._id, config).then((res) => res.json());
  return res;
}

const deleteCategory = async(category) => {
  const token = getUserToken().token;

  const config = requestConfig("DELETE", null, token);

  const res = await fetch(api + "/categories/" + category, config).then((res) => res.json());
  return res;
}

const categoryService = {
  getAll,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default categoryService;