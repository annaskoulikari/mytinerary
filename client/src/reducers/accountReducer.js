import { CREATE_ACCOUNT, ACCOUNT_EXISTS } from "../actions/types";

const initialState = {
  account: [],
  message: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_ACCOUNT:
      console.log("reducer");
      return {
        ...state,
        account: action.payload
      };
    case ACCOUNT_EXISTS:
      console.log("reducer");
      return {
        ...state,
        message: action.payload
      };
    default:
      return state;
  }
}
