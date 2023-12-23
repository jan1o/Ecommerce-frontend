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

const getUserCart = async () => {
  const token = getUserToken().token;
  const config = requestConfig("GET", null, token);

  const res = await fetch(api + "/cart/", config).then((res) => res.json());
  return res;
}

const updateProductAmount = async (id, amount) => {
  const token = getUserToken().token;
  const data = {
    id: id,
    amount: amount
  }
  const config = requestConfig("PUT", data, token);

  const res = await fetch(api + "/cart/updateProductAmount", config).then((res) => res.json());

  return res;
}

const removeProductfromCart = async (product) => {
  const token = getUserToken().token;
  const data = {
    id: product
  }
  const config = requestConfig("PUT", data, token);

  const res = await fetch(api + "/cart/removeProduct", config).then((res) => res.json());

  return res;
}

const cartService = {
  addProductToCart,
  getUserCart,
  updateProductAmount,
  removeProductfromCart,
};

export default cartService;