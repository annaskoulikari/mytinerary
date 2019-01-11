import { combineReducers } from "redux";
import cityReducer from "./cityReducer";
import itineraryReducer from "./itineraryReducer";
import activityReducer from "./activityReducer";

export default combineReducers({
  cities: cityReducer,
  itineraries: itineraryReducer,
  activities: activityReducer
});
