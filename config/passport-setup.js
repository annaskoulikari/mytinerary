const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();
const Account = require("../models/account");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "http://localhost:5000/auth/google/redirect",
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      Account.findOne({ email: profile.emails[0].value }).then(currentUser => {
        if (currentUser) {
          console.log("user is", currentUser);
          done(null, currentUser);
        } else {
          new Account({
            userName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value
          })
            .save()
            .then(newAccount => {
              console.log("new user created:", +newAccount);
              done(null, newAccount);
            });
        }
      });
    }
  )
);
