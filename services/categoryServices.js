import { api, requestConfig } from "@/utils/config"

import { getUser as getUserToken } from "@/utils/userUtils";

const getAll = async() => {
  const config = requestConfig("GET", null);

  const res = await fetch(api + "/categories/", config).then((res) => res.json());

  return res;
}

const categoryService = {
  getAll,
};

export default categoryService;