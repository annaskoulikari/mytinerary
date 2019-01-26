import { FETCH_COUNTRIES } from "./types";
import axios from "axios";

export const fetchCountries = () => dispatch => {
  console.log("axiosing ITINEARRIES THOUGH");
  axios.get(`/testCountry/countries`).then(res => {
    console.log(res);
    dispatch({
      type: FETCH_COUNTRIES,
      payload: res.data
    });
  });
};
