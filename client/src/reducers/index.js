import { combineReducers } from "redux";
import cityReducer from "./cityReducer";
import itineraryReducer from "./itineraryReducer";
import activityReducer from "./activityReducer";
import commentReducer from "./commentReducer";
import countryReducer from "./countryReducer";
import accountReducer from "./accountReducer";
import loginReducer from "./loginReducer";

console.log("this is the combined reducer");

export default combineReducers({
  cities: cityReducer,
  itineraries: itineraryReducer,
  activities: activityReducer,
  comments: commentReducer,
  newComment: commentReducer,
  countries: countryReducer,
  accounts: accountReducer,
  message: accountReducer,
  loggedInUser: loginReducer,
  loggedInUserGoogle: loginReducer
});
