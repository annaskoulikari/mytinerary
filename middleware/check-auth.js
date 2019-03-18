const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  let decoded = jwt.verify(token, process.env.JWT_KEY, (err, authData) => {
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      return authData;
    }
  });
  req.decoded = decoded;

  next();
};
