// OLD VERSION

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();
const Account = require("../models/account");
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const FacebookTokenStrategy = require("passport-facebook-token");

passport.use(
  "googleToken",
  new GooglePlusTokenStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
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

      // try {
      //   console.log("profile", profile);
      //   console.log("accessToken", accessToken);
      //   console.log("refreshToken", refreshToken);

      //   const existingUser = await User.findOne({ "facebook.id": profile.id });
      //   if (existingUser) {
      //     return done(null, existingUser);
      //   }

      //   const newUser = new User({
      //     method: "facebook",
      //     facebook: {
      //       id: profile.id,
      //       email: profile.emails[0].value
      //     }
      //   });

      //   await newUser.save();
      //   done(null, newUser);
      // } catch (error) {
      //   done(error, false, error.message);
      // }
    }
  )
);

// passport.use(
//   "facebookToken",
//   new FacebookTokenStrategy(
//     {
//       clientID: process.env.clientIDFB,
//       clientSecret: process.env.clientSecretFB
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         console.log("profile", profile);
//         console.log("accessToken", accessToken);
//         console.log("refreshToken", refreshToken);

//         const existingUser = await User.findOne({ "facebook.id": profile.id });
//         if (existingUser) {
//           return done(null, existingUser);
//         }

//         const newUser = new User({
//           method: "facebook",
//           facebook: {
//             id: profile.id,
//             email: profile.emails[0].value
//           }
//         });

//         await newUser.save();
//         done(null, newUser);
//       } catch (error) {
//         done(error, false, error.message);
//       }
//     }
//   )
// );
