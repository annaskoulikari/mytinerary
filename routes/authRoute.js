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

// router.get(
//   "/google/redirect",
//   passport.authenticate("google", { failureRedirect: "/", session: false }),
//   function(req, res) {
//     var token = req.user.token;
//     res.redirect("http://localhost3000?token=" + token);
//   }
// );

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  //console.log(req);
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
  const accessToken = token;
  //req.user.token = token;
  console.log("this is req.user", req.user);
  console.log("this is the token", token);
  //res.send(req.user);
  res.render("http://localhost:3000/loginPage", { token: accessToken });
  //res.redirect("/profilePage");

  // res.status(200).json({
  //   message: "Auth successful",
  //   token: token,
  //   userName: user.userName,
  //   email: user.email,
  //   firstName: user.firstName,
  //   lastName: user.lastName
  // });
  //res.redirect("http://localhost:3000/loginPage");
  // console.log("I redirected you");
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

// router.route('/oauth/facebook')
// .post(passport.authenticate('facebookToken', { session: false }), async (req, res, next) => {
//   // Generate token
//   const token = signToken(req.user);
//   res.status(200).json({ token });
// },);

module.exports = router;
