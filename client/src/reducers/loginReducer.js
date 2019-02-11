import { CHECK_ACCOUNT, GOOGLE_LOGIN, AUTH_SIGN_UP } from "../actions/types";

const initialState = {
  loggedInUser: [],
  loggedInUserGoogle: [],
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
    case GOOGLE_LOGIN:
      console.log("reducer");
      return {
        ...state,
        loggedInUserGoogle: action.payload
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
