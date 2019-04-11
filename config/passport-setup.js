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
      clientID: process.env.CLIENT_ID_GOOGLE,
      clientSecret: process.env.CLIENT_SECRET_GOOGLE
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("this is profile from google", profile);
      Account.findOne({ email: profile.emails[0].value }).then(currentUser => {
        if (currentUser) {
          console.log("user is", currentUser);
          let user = currentUser;
          done(null, user);
        } else {
          var profilePhoto = profile.photos[0].value;
          var profilePhotoEnlarged = profilePhoto.replace("sz=50", "sz=150");
          new Account({
            profilePhoto: profilePhotoEnlarged,
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
      clientID: process.env.CLIENT_ID_FACEBOOK,
      clientSecret: process.env.CLIENT_SECRET_FACEBOOK
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("this is profile from facebook", profile);
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
