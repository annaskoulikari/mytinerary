import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

//import {syncHistoryWithStore} from 'react-router-redux';
//import {browserHistory} from "react-router";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

//export const history = syncHistoryWithStore(browserHistory, store);

export default store;
