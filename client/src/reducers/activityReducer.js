import { FETCH_ACTIVITIES } from "../actions/types";

const initialState = {
  activity: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ACTIVITIES:
      return {
        ...state,
        activity: action.payload
      };
    default:
      return state;
  }
}
