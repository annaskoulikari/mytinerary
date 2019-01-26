// add comment

import { POST_COMMENT, ADD_COMMENT } from "./types";
import axios from "axios";

//var express = require("express");
//var router = express.Router();

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

// export const addComment = {itinerary_id, user, comment} => {

//   console.log("adding comment to db and on website");

export const addComment = (itinerary_id, user, comment) => {
  console.log("adding comment");
  axios
    .post(`/testComment/comments`, {
      itinerary_id,
      user,
      comment
    })
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

// export const addComment = (itinerary_id, user, comment) => {
//   console.log("adding comment");
//   //console.log(itinerary_id, user, comment);
//   return {
//     type: ADD_COMMENT,
//     itinerary_id,
//     user,
//     comment
//   };
// };
