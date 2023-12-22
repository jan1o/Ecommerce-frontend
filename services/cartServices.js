import { api, requestConfig } from "@/utils/config"

import { getUser as getUserToken } from "@/utils/userUtils";

const addProductToCart = async (product) => {
  const token = getUserToken().token;
  const data = {
    id: product
  }
  const config = requestConfig("PUT", data, token);

  const res = await fetch(api + "/cart/addProduct", config).then((res) => res.json());

  return res;
}


const cartService = {
  addProductToCart,
};

export default cartService;