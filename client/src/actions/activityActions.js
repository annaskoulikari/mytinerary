import { FETCH_ACTIVITIES } from "./types";
import axios from "axios";

export const fetchActivities = itinerary_id => dispatch => {
  console.log("axiosing");
  axios.get(`/testActivity/activities/${itinerary_id}`).then(res => {
    console.log(res);
    dispatch({
      type: FETCH_ACTIVITIES,
      payload: res.data
    });
  });
};
