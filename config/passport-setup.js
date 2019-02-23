// OLD VERSION

const passport = require("passport");
require("dotenv").config();
const Account = require("../models/account");
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const FacebookTokenStrategy = require("passport-facebook-token");

passport.use(
  "googleToken",
  new GooglePlusTokenStrategy(
    {
      clientID:
        "71133190926-d8mjt4mslu36qa3md2efuql8md35sjg9.apps.googleusercontent.com",
      clientSecret: process.env.clientSecret
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("this is profile from google", profile);
      Account.findOne({ email: profile.emails[0].value }).then(currentUser => {
        if (currentUser) {
          console.log("user is", currentUser);
          let user = currentUser;
          done(null, user);
        } else {
          new Account({
            profilePhoto: profile.photos[0].value,
            userName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value
          })
            .save()
            .then(newAccount => {
              console.log("new user created:", +newAccount);
              let user = newAccount;
              done(null, user);
            });
        }
      });
    }
  )
);

passport.use(
  "facebookToken",
  new FacebookTokenStrategy(
    {
      clientID: process.env.clientIDFB,
      clientSecret: process.env.clientSecretFB
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("this is profile", profile);
      Account.findOne({ email: profile.emails[0].value }).then(currentUser => {
        if (currentUser) {
          console.log("user is", currentUser);
          let user = currentUser;
          done(null, user);
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
              let user = newAccount;
              done(null, user);
            });
        }
      });
    }
  )
);
