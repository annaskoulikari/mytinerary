import { CHECK_ACCOUNT, AUTH_SIGN_UP } from "../actions/types";

const initialState = {
  loggedInUser: [],
  isAuthenticated: false,
  token: "",
  user: "",
  errorMessage: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHECK_ACCOUNT:
      console.log("reducer");
      return {
        ...state,
        loggedInUser: action.payload
      };

    case AUTH_SIGN_UP:
      console.log("reducer");
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        errorMessage: ""
      };
    default:
      return state;
  }
}
