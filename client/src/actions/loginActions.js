import { CHECK_ACCOUNT, AUTH_SIGN_UP } from "./types";
import axios from "axios";

export const checkAccount = (email, password) => dispatch => {
  console.log("checking account", email, password);
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

export const oauthGoogle = accessToken => {
  return async dispatch => {
    console.log("we received", accessToken);
    const res = await axios.post("/auth/googlelogin", {
      access_token: accessToken
    });
    dispatch({
      type: AUTH_SIGN_UP,
      payload: res.data
    });
    console.log("res", res);
    localStorage.setItem("user", res.data.token);
  };
};

export const oauthFacebook = data => {
  return async dispatch => {
    console.log("we received", data);
    const res = await axios.post("/auth/facebooklogin", {
      access_token: data
    });
    dispatch({
      type: AUTH_SIGN_UP,
      payload: res.data
    });
    console.log("res", res);
    localStorage.setItem("user", res.data.token);
  };
};
