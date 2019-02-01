const express = require("express");
const router = express.Router();
const passport = require("passport");

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

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.send("you've reached the callback URI");
});

module.exports = router;
