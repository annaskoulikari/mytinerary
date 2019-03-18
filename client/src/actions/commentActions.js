// add comment

import { POST_COMMENT } from "./types";
import axios from "axios";

export const postComment = itinerariesArray => dispatch => {
  console.log("axiosing");

  axios
    .post("/testComment/commentsAll", {
      itinerariesArray: itinerariesArray
    })
    .then(res => {
      console.log(res);
      dispatch({
        type: POST_COMMENT,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

let config = {
  withCredentials: true,
  headers: { Authorization: "Bearer " + localStorage.getItem("user") }
};

export const addComment = (
  itinerary_id,
  comment,
  itinerariesArray
) => dispatch => {
  console.log("you reached the addComment actioncreator");
  axios
    .post(
      `/testComment/comments`,
      {
        itinerary_id,
        comment,
        itinerariesArray
      },
      config
    )
    .then(res => {
      console.log(res);
      console.log(res.data);
      dispatch({
        type: POST_COMMENT,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
