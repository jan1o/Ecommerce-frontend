import { api, requestConfig } from "@/utils/config"

import { getUser as getUserToken } from "@/utils/userUtils";

const getProductById = async(id) => {
  const config = requestConfig("GET", null);

  const res = await fetch(api + "/products/product/" + id, config).then((res) => res.json());

  return res;
}

const getNewest = async() => {
  const config = requestConfig("GET", null);

  const res = await fetch(api + "/products/newest", config).then((res) => res.json());

  return res;
}

const getBest = async() => {
  const config = requestConfig("GET", null);

  const res = await fetch(api + "/products/best", config).then((res) => res.json());

  return res;
}

const searchProductByName = async(name) => {
  const config = requestConfig("GET", null);

  const res = await fetch(api + "/products/search/product/" + name, config).then((res) => res.json());

  return res;
}

const searchProductByCategory = async(category) => {
  const config = requestConfig("GET", null);

  const res = await fetch(api + "/products/search/category/" + category, config).then((res) => res.json());

  return res;
}

const getUserFavorites = async() => {
  const token = getUserToken().token;
  const config = requestConfig("GET", null, token);
  
  const res = await fetch(api + "/products/userFavorites", config).then((res) => res.json());

  return res;
}

const processFavoriteProduct = async(product) => {
  const token = getUserToken().token;
  const config = requestConfig("PUT", null, token);

  const res = await fetch(api + "/products/like/" + product, config);

  return res;
}

const productService = {
  getProductById,
  getNewest,
  getBest,
  searchProductByName,
  searchProductByCategory,
  getUserFavorites,
  processFavoriteProduct,
};

export default productService;