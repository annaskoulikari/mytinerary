import { CHECK_ACCOUNT } from "./types";
//import { ACCOUNT_EXISTS } from "./types";
import axios from "axios";

// export const checkAccount = (email, password) => {
//   console.log("adding account");
//   axios
//     .post(`/testLogin/login`, {
//       email,
//       password
//     })
//     .then(res => {
//       console.log(res);
//       console.log(res.data);
//       return {
//         type: CHECK_ACCOUNT,
//         payload: res.data
//       };
//     });
// };

//ANOTHER TRY

// export const checkAccount = (email, password) => dispatch => {
//   console.log("adding account");
//   axios
//     .post("http://localhost:5000/testLogin/login", { email, password })
//     .then(res => {
//       console.log(res);
//       dispatch({
//         type: CHECK_ACCOUNT,
//         payload: res.data
//       });
//     });
// };

//Another another try adding a catch?
export const checkAccount = (email, password) => dispatch => {
  console.log("adding account", email, password);
  axios
    .post("/testLogin/login", { email, password })
    .then(res => {
      console.log(res);
      dispatch({
        type: CHECK_ACCOUNT,
        payload: res.data
      });
    })
    .catch(function(error) {
      console.log(error);
    });
};

// export const checkAccount = (email, password) => {
//   console.log("adding account");
//   axios
//     .post(`/testLogin/login`, {
//       email,
//       password
//     })
//     .then(res => {
//       console.log(res);
//       console.log(res.data);
//     });
//   return {
//     type: CHECK_ACCOUNT,
//    email,
//    password
//   };
// };
