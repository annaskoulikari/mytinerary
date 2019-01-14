import { POST_COMMENT, ADD_COMMENT } from "../actions/types";

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
    case ADD_COMMENT:
      console.log("reducer");
      return {
        ...state,
        newComment: {
          comment: action.comment,
          user: action.user,
          itinerary_id: action.itinerary_id
        }
      };
    default:
      return state;
  }
}
