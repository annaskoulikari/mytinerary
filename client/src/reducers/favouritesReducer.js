import { GET_FAVOURITES, GET_FAVOURITE_ITINERARY } from "../actions/types";

const initialState = {
  favourites: [],
  favouriteItinerary: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FAVOURITES:
      return {
        ...state,
        favourites: action.payload
      };
    case GET_FAVOURITE_ITINERARY:
      return {
        ...state,
        favouriteItinerary: action.payload
      };
    default:
      return state;
  }
}
