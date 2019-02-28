import { CREATE_ACCOUNT } from "./types";

import axios from "axios";

export const createAccount = formData => dispatch => {
  console.log(formData);
  axios
    .post(`/testAccount/accounts`, formData)
    .then(res => {
      console.log(res);
      console.log(res.data);
      dispatch({
        type: CREATE_ACCOUNT,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
