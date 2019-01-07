import { combineReducers } from "redux";
import cityReducer from "./cityReducer";

export default combineReducers({
  cities: cityReducer
});

// const initState = {
//   posts: [
//     { name: "Barcelona", country: "Spain" },
//     { name: "Athens", country: "Greece" }
//   ]
// };

// const rootReducer = (state = initState, action) => {
//   return state;
// };

// export default rootReducer;
