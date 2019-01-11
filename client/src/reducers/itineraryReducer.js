import { FETCH_ITINERARIES } from "../actions/types";

const initialState = {
  item: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITINERARIES:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}
