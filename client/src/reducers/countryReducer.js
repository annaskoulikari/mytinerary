import { FETCH_COUNTRIES } from "../actions/types";

const initialState = {
  country: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_COUNTRIES:
      return {
        ...state,
        country: action.payload
      };
    default:
      return state;
  }
}
