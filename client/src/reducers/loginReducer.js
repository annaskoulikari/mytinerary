import { CHECK_ACCOUNT } from "../actions/types";

const initialState = {
  loggedInUser: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHECK_ACCOUNT:
      console.log("reducer");
      return {
        ...state,
        loggedInUser: action.payload
      };
    default:
      return state;
  }
}
