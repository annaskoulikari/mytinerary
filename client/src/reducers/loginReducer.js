import { CHECK_ACCOUNT, GOOGLE_LOGIN, AUTH_SIGN_UP } from "../actions/types";

const initialState = {
  loggedInUser: [],
  loggedInUserGoogle: [],
  isAuthenticated: false,
  token: "",
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
        token: action.payload,
        isAuthenticated: true,
        errorMessage: ""
      };
    default:
      return state;
  }
}
