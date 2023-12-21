import { api, requestConfig } from "@/utils/config"

import { getUser as getUserToken } from "@/utils/userUtils";

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
  getUserFavorites,
  processFavoriteProduct,
};

export default productService;