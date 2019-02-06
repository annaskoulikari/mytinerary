const router = require("express").Router();

console.log("reached profile page route file");

router.get("/", (req, res) => {
  console.log("yay we sent the req.user", req.user);
  res.json(req.user);
});

module.exports = router;
