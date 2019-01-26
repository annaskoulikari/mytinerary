import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

// OLD WAY OF DOING THINGS

// const initialState = {};

// const middleware = [thunk];

// console.log("this is the store");

// const store = createStore(
//   rootReducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;

// NEW WAY OF DOING THINGS

const initialState = {};

//const middleware = [thunk];

console.log("this is the store");

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

export default store;
