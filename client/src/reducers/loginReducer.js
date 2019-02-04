import { CHECK_ACCOUNT, GOOGLE_LOGIN } from "../actions/types";

const initialState = {
  loggedInUser: [],
  loggedInUserGoogle: []
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
    default:
      return state;
  }
}
