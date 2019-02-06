import { CHECK_ACCOUNT, GOOGLE_LOGIN, AUTH_SIGN_UP } from "./types";
import axios from "axios";

export const checkAccount = (email, password) => dispatch => {
  console.log("adding account", email, password);
  axios
    .post("/testLogin/login", { email, password })
    .then(res => {
      console.log(res);
      localStorage.setItem("user", res.data.token);
      dispatch({
        type: CHECK_ACCOUNT,
        payload: res.data
      });
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const googleLogin = () => dispatch => {
  console.log("I am in the google Login function in logiActions");
  axios
    .get(`/auth/google`)
    .then(res => {
      localStorage.setItem("user", res.data.token);
      console.log(res);
      dispatch({
        type: GOOGLE_LOGIN,
        payload: res.data
      });
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const oauthGoogle = data => {
  return async dispatch => {
    console.log("we received", data);
    const res = await axios.post("http://localhost:5000/auth/googlelogin", {
      access_token: data
    });
    dispatch({
      type: AUTH_SIGN_UP,
      payload: res.data.token
    });
    console.log("res", res);
    localStorage.setItem("user", res.data.token);
  };
};
