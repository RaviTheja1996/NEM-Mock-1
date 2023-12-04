import { DELETE_USER, EDIT_USER, FETCH_USER, FETCH_USERS } from "./actionTypes";

const initialState = {
  userDelete: {},
  userEdit: {},
  user: {},
  users: [],
  booked_slots: [],
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case DELETE_USER:
      {
        return { ...state, userDelete: payload };
      }
    case EDIT_USER:
      {
        return { ...state, userEdit: payload };
      }
    case FETCH_USER:
      {
        return { ...state, user: payload };
      }
    case FETCH_USERS:
      {
        return { ...state, users: payload };
      }
    default: {
      return state;
    }
  }
};
