import { FETCH_CITIES } from "./types";
import axios from "axios";

// export const fetchCities = () => dispatch => {
//   axios
//     .get("/testRouter")
//     .then(res => {
//       console.log(res);
//     })
//     .then(cities =>
//       dispatch({
//         type: FETCH_CITIES,
//         payload: cities
//       })
//     );
// };

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
