// add comment

import { POST_COMMENT, ADD_COMMENT } from "./types";
import axios from "axios";

export const postComment = itinerary_id => dispatch => {
  console.log("axiosing");
  console.log(itinerary_id);
  axios.get(`/testComment/comments/${itinerary_id}`).then(res => {
    console.log(res);
    dispatch({
      type: POST_COMMENT,
      payload: res.data
    });
  });
};

let config = {
  withCredentials: true,
  headers: { Authorization: "Bearer " + localStorage.getItem("user") }
};

export const addComment = (itinerary_id, user, comment) => {
  console.log("adding comment" + user + comment);
  console.log(localStorage.getItem("user"));
  axios
    .post(
      `/testComment/comments`,
      {
        itinerary_id,
        user,
        comment
      },
      config
    )
    .then(res => {
      console.log(res);
      console.log(res.data);
    });
  return {
    type: ADD_COMMENT,
    itinerary_id,
    user,
    comment
  };
};
