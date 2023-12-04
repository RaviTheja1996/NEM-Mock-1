import axios from "axios";
import { DELETE_USER, EDIT_USER, FETCH_USERS } from "./actionTypes";

export const register = (obj) => (dispatch) => {
  return axios.post(
    `https://giddy-raincoat-bee.cyclic.app/users/contacts`,
    obj
  );
};

export const DeleteContact = (obj) => async (dispatch) => {
  // console.log(`obj in action.js deleteContact is = ${obj}`);
  console.log(obj);
  return axios.delete(
    `https://giddy-raincoat-bee.cyclic.app/users/delete?id=${obj._id}`,
    obj
  ).then((res) => { dispatch({ type: DELETE_USER, payload: obj }); });
};

export const EditContact = (obj) => async (dispatch) => {
  console.log(obj);
  dispatch({ type: EDIT_USER, payload: obj });
  return axios.patch(`https://giddy-raincoat-bee.cyclic.app/users/update`, obj);
};

export const fetchUsers = () => (dispatch) => {
  return axios.get(`https://giddy-raincoat-bee.cyclic.app/users/`).then((res) => {
    // console.log(`fetching users data in action.js fetchUsers method = ${res.data}`);
    console.log(res.data);
    dispatch({ type: FETCH_USERS, payload: res.data.contacts });
  });
}
