import { FETCH_ITINERARIES } from "./types";
import axios from "axios";

export const fetchItineraries = city => dispatch => {
  console.log("axiosing ITINEARRIES THOUGH");
  let cityTosend = city.toLowerCase();
  axios.get(`/testItinerary/itineraries/${cityTosend}`).then(res => {
    console.log(city);
    console.log(res);
    dispatch({
      type: FETCH_ITINERARIES,
      payload: res.data
    });
  });
};

// export const fetchItineraries = () => dispatch => {
//   console.log("axiosing ITINEARRIES THOUGH");
//   axios.get("testItinerary/itineraries/barcelona").then(res => {
//     console.log(res);
//     dispatch({
//       type: FETCH_ITINERARIES,
//       payload: res.data
//     });
//   });
// };
