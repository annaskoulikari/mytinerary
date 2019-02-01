const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  console.log(req.headers["authorization"]);
  const token = req.headers.authorization.split(" ")[1];
  console.log("this is line 7", token);
  let decoded = jwt.verify(token, process.env.JWT_KEY, (err, authData) => {
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      return authData;
    }
  });
  req.decoded = decoded;

  console.log("this is line 9", decoded);
  console.log("this is decoded", decoded);

  // req.userData = decoded;
  // console.log(req);
  // next();

  //  catch (error) {
  //   return res.status(401).json({
  //     message: "Auth failed5"
  //   });
  // }
  next();
};
