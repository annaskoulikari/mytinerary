import { CREATE_ACCOUNT } from "./types";

import axios from "axios";

export const createAccount = (
  userName,
  password,
  email,
  firstName,
  lastName,
  country
) => {
  console.log("adding account");
  axios
    .post(`/testAccount/accounts`, {
      userName,
      password,
      email,
      firstName,
      lastName,
      country
    })
    .then(res => {
      console.log(res);
      console.log(res.data);
    });
  return {
    type: CREATE_ACCOUNT,
    userName,
    password,
    email,
    firstName,
    lastName,
    country
  };
};
