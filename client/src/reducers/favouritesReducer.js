import {
  GET_FAVOURITES,
  GET_FAVOURITE_ITINERARY,
  ADD_TO_FAVOURITES
} from "../actions/types";

const initialState = {
  favourites: [],
  addedFavourite: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FAVOURITES:
      return {
        ...state,
        favourites: action.payload
      };
    case ADD_TO_FAVOURITES:
      return {
        ...state,
        addedFavourite: action.payload
      };
    default:
      return state;
  }
}
