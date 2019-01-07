import { FETCH_CITIES } from "../actions/types";

const initialState = {
  items: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CITIES:
      console.log("reducer");
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}
