import api from "./api";

export function getCategories() {
  return api
    .get(`/categories`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function getCategory(id) {
  return api
    .get(`/categories/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function createCategory(categoryData, accessToken) {
  return api
    .post("/categories", categoryData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function updateCategory(categoryData, accessToken) {
  return api
    .put(`/categories`, categoryData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function deleteCategory(id, accessToken) {
  return api
    .delete(`/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}
