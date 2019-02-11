var Account = require("../models/account");

module.exports = (req, res, next, done) => {
  let user = req.body;

  Account.findOne({ email: user.user }).then(account => {
    console.log("this should be account.faovurite", account.favourite);
    var itineraries = account.favourite;
    console.log("this should be itineraries", itineraries);
    req.itineraries = itineraries;
    console.log("this should be re1.itineraries", req.itineraries);
  }),
    next();
};
