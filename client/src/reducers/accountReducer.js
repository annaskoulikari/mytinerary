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
        account: {
          userName: action.userName,
          password: action.password,
          email: action.email,
          firstName: action.firstName,
          lastName: action.lastName,
          country: action.country
        }
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
