// add comment

import { POST_COMMENT, ADD_COMMENT } from "./types";
import axios from "axios";

//var express = require("express");
//var router = express.Router();

export const postComment = itinerary_id => dispatch => {
  console.log("axiosing");
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

//   router.post("/comments", (req, res) => {
//     console.log(req.body);
//     const comment = new Comment({
//       comment: req.body.comment,
//       user: req.body.user,
//       itinerary_id: req.body.itinerary_id
//     });
//     Comment.create(comment).then(function(comment) {
//       res.send(comment);
//     });
//   });
//   return {
//         type: ADD_COMMENT,
//         itinerary_id,
//         user,
//         comment
//       };
// };

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
