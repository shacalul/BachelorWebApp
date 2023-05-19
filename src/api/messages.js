import api from "./api";

export function getMessages() {
  return api
    .get(`/messages`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function getMessage(id) {
  return api
    .get(`/messages/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function createMessage(messageData) {
  return api
    .post("/messages", messageData)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function updateMessage(messageData) {
  return api
    .put(`/messages`, messageData)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function deleteMessage(id) {
  return api
    .delete(`/messages/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}
