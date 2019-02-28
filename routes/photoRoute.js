var express = require("express");
var router = express.Router();
var ProfilePhoto = require("../models/profilePhoto");
const fs = require("fs");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/uploads", upload.single("profilePhoto"), (req, res) => {
  console.log("this is req.file", req.file);
  // var profilePhoto = new ProfilePhoto();
  // profilePhoto.img.data = fs.readFileSync(req.file.file.path);
  // profilePhoto.img.contentType = "image/png";
  // profilePhoto.save();
  // console.log("this is req from photo", req);
  // console.log("this is req.file from photo", req.files);

  res.send("sending something back to say we reach upload path");
});

module.exports = router;
