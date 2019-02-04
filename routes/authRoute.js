const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  }),
  (req, res) => {
    console.log("you reached me!");
  }
);

router.get("/logout", (req, res) => {
  res.send("logoutinggg");
});

// router.get(
//   "/google/redirect",
//   passport.authenticate("google", { failureRedirect: "/", session: false }),
//   function(req, res) {
//     var token = req.user.token;
//     res.redirect("http://localhost3000?token=" + token);
//   }
// );

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  console.log(req);
  const user = req.user;
  const token = jwt.sign(
    {
      email: user.email,
      name: user.firstName + " " + user.lastName
    },
    process.env.JWT_KEY,
    {
      expiresIn: "24h"
    }
  );
  res.status(200).json({
    message: "Auth successful",
    token: token,
    userName: user.userName,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  });
  res.redirect("http://localhost:3000/loginPage");
  console.log("I redirected you");
});

module.exports = router;

// router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
//   console.log(req);
//   const user = req.user;
//   const token = jwt.sign(
//     {
//       email: user.email,
//       name: user.firstName + " " + user.lastName
//     },
//     process.env.JWT_KEY,
//     {
//       expiresIn: "24h"
//     }
//   );
//   return res.status(200).json({
//     message: "Auth successful",
//     token: token,
//     userName: user.userName,
//     email: user.email,
//     firstName: user.firstName,
//     lastName: user.lastName
//   });
// });

// module.exports = router;