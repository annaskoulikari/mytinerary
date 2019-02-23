import { GET_PROFILE } from "./types";
import axios from "axios";

let config = {
  withCredentials: true,
  headers: { Authorization: "Bearer " + localStorage.getItem("user") }
};

export const getProfile = () => dispatch => {
  console.log(localStorage.getItem("user"));
  axios.post(`/testProfile/profiles`, {}, config).then(res => {
    console.log(res);
    console.log("this is res.data", res.data);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  });
};
