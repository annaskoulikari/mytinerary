const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("./authController");

const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"]
});

const addSocketIdtoSession = (req, res, next) => {
  console.log("this is socket id", req.query.socketId);
  req.session.socketId = req.query.socketId;

  //   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  //   res.header("Access-Control-Allow-Credentials", "true");
  next();
};

router.get("/google", addSocketIdtoSession, googleAuth);

router.get("/google/callback", googleAuth, authController.google);

module.exports = router;
