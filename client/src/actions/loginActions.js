import { CHECK_ACCOUNT } from "./types";
import axios from "axios";

export const checkAccount = (email, password) => dispatch => {
  console.log("adding account", email, password);
  axios
    .post("/testLogin/login", { email, password })
    .then(res => {
      console.log(res);
      dispatch({
        type: CHECK_ACCOUNT,
        payload: res.data
      });
    })
    .catch(function(error) {
      console.log(error);
    });
};
