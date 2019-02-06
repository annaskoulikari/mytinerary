// OLD VERSION

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();
const Account = require("../models/account");
const GooglePlusTokenStrategy = require("passport-google-plus-token");

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

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

// older version

// passport.use(
//   new GoogleStrategy(
//     {
//       callbackURL: "http://localhost:5000/auth/google/callback",
//       clientID: process.env.clientID,
//       clientSecret: process.env.clientSecret
//     },
//     (accessToken, refreshToken, profile, done) => {
//       console.log(profile);
//       Account.findOne({ email: profile.emails[0].value }).then(currentUser => {
//         if (currentUser) {
//           console.log("user is", currentUser);
//           done(null, currentUser);
//         } else {
//           new Account({
//             userName: profile.displayName,
//             firstName: profile.name.givenName,
//             lastName: profile.name.familyName,
//             email: profile.emails[0].value
//           })
//             .save()
//             .then(newAccount => {
//               console.log("new user created:", +newAccount);
//               done(null, newAccount);
//             });
//         }
//       });
//     }
//   )
// );

//SOCKET VERSION

// const passport = require("passport");
// // const { OAuth2Strategy: GoogleStrategy } = require("passport-google-oath");
// const GoogleStrategy = require("passport-google-oauth2").Strategy;
// require("dotenv").config();
// const Account = require("../models/account");

// module.exports = () => {
//   //Allowing passport to serialize and deserialize users
//   passport.serializeUser((user, cb) => cb(null, user));

//   passport.deserializeUser((obj, cb) => cb(null, obj));

//   //   const callback = (accessToken, refreshToken, profile, cb) =>
//   //     cb(null, profile);

//   const callback = (accessToken, refreshToken, profile, cb) => {
//     console.log(profile);
//     Account.findOne({ email: profile.emails[0].value }).then(currentUser => {
//       if (currentUser) {
//         console.log("user is", currentUser);
//         done(null, currentUser);
//       } else {
//         new Account({
//           userName: profile.displayName,
//           firstName: profile.name.givenName,
//           lastName: profile.name.familyName,
//           email: profile.emails[0].value
//         })
//           .save()
//           .then(newAccount => {
//             console.log("new user created:", +newAccount);
//             done(null, newAccount);
//           });
//       }
//     });
//   };

//   passport.use(
//     new GoogleStrategy(
//       {
//         callbackURL: "http://localhost:5000/auth/google/redirect",
//         clientID: process.env.clientID,
//         clientSecret: process.env.clientSecret
//       },
//       callback
//     )
//   );
// };
