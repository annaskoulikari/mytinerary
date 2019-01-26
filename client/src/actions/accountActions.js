import { CREATE_ACCOUNT } from "./types";
//import { ACCOUNT_EXISTS } from "./types";
import axios from "axios";

// export const createAccount = (
//   userName,
//   password,
//   email,
//   firstName,
//   lastName,
//   country
// ) => {
//   console.log("adding account");
//   axios
//     .post(`/testAccount/accounts`, {
//       userName,
//       password,
//       email,
//       firstName,
//       lastName,
//       country
//     })
//     .then(res => {
//       console.log(res);
//       console.log(res.data);
//       if (res.data.message === "Account already exists") {
//         return {
//           type: ACCOUNT_EXISTS,
//           payload: res.data
//         };
//       } else {
//         return {
//           type: CREATE_ACCOUNT,
//           userName,
//           password,
//           email,
//           firstName,
//           lastName,
//           country
//         };
//       }
//     });
// };

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
