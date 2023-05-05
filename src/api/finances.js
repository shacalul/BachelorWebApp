import api from "./api";

export function getFinances() {
  return api
    .get(`/finances`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

