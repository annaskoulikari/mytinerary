import { FETCH_ACTIVITIES } from "./types";
import axios from "axios";

export const fetchActivities = itinerariesArray => dispatch => {
  console.log("axiosing");
  axios
    .post("/testActivity/activitiesAll", { itinerariesArray })
    .then(res => {
      console.log(res);
      dispatch({
        type: FETCH_ACTIVITIES,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
