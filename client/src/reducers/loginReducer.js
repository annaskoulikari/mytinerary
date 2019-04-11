import { AUTH_SIGN_UP } from "../actions/types";

const initialState = {
  token: "",
  isAuthenticated: false,
  errorMessage: "",
  user: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
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
