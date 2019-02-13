import { POST_COMMENT } from "../actions/types";

const initialState = {
  comment: [],
  newComment: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_COMMENT:
      console.log("reducer");
      return {
        ...state,
        comment: action.payload
      };
    default:
      return state;
  }
}
