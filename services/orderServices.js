import { api, requestConfig } from "@/utils/config"

import { getUser as getUserToken } from "@/utils/userUtils";

const getUserOrders = async() => {
  const token = getUserToken().token;
  const config = requestConfig("GET", null, token);

  const res = await fetch(api + "/orders/userOrders", config).then((res) => res.json());

  return res;
}

const orderService = {
  getUserOrders,
};

export default orderService;