import axios from "axios";

export const register = (obj) => (dispatch) => {
  return axios.post(
    `https://giddy-raincoat-bee.cyclic.app/users/contacts`,
    obj
  );
};

export const DeleteContact = (obj) => (dispatch) => {
  return axios.delete(
    `https://giddy-raincoat-bee.cyclic.app/users/delete`,
    obj
  );
};

export const EditContact = (obj) => (dispatch) => {
  return axios.patch(`https://giddy-raincoat-bee.cyclic.app/users/update`, obj);
};
