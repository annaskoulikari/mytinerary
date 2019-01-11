import { FETCH_CITIES } from "./types";
import axios from "axios";

export const fetchCities = () => dispatch => {
  console.log("axiosing");
  axios.get("/testRouter").then(res => {
    console.log(res);
    dispatch({
      type: FETCH_CITIES,
      payload: res.data
    });
  });
};
