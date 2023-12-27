import { api, requestConfig } from "@/utils/config"

import { getUser as getUserToken } from "@/utils/userUtils";

const getUserOrders = async() => {
  const token = getUserToken().token;
  const config = requestConfig("GET", null, token);

  const res = await fetch(api + "/orders/userOrders", config).then((res) => res.json());

  return res;
}

const getAllOrders = async () => {
  const token = getUserToken().token;
  const config = requestConfig("GET", null, token);

  const res = await fetch(api + "/orders/", config).then((res) => res.json());

  return res;
}

const updateOrderStatus = async (order, data) => {
  const token = getUserToken().token;
  const config = requestConfig("PUT", data, token);

  const res = await fetch(api + "/orders/updateOrder/" + order, config).then((res) => res.json());

  return res;
}

const orderService = {
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
};

export default orderService;