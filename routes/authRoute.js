const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get("/logout", (req, res) => {
  res.send("logoutinggg");
});

router
  .route("/googlelogin")
  .post(
    passport.authenticate("googleToken", { session: false }),
    (req, res) => {
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
      //user.token = token;
      console.log("this is user", user);
      res.status(200).json({ user: user, token: token });
    }
  );

router
  .route("/facebooklogin")
  .post(
    passport.authenticate("facebookToken", { session: false }),
    (req, res) => {
      console.log("this is req.user in facebook", req.user);
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
      //user.token = token;
      console.log("this is user", user);
      res.status(200).json({ user: user, token: token });
    }
  );

module.exports = router;
