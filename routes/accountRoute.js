const express = require("express");
const router = express.Router();
const Account = require("../models/account");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: fileFilter
});

router.post("/accounts", upload.single("file"), (req, res, next) => {
  Account.findOne(
    {
      email: req.body.email
    },
    function(err, existingAccount) {
      console.log(existingAccount);
      if (err) throw err;
      if (existingAccount == null) {
        console.log("this is a new account, I will add it");
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            const account = new Account({
              profilePhoto: req.file.path,
              userName: req.body.userName,
              password: hash,
              email: req.body.email,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              country: req.body.country
            });
            Account.create(account).then(function(account) {
              res.send(account);
            });
          }
        });
      } else {
        console.log("account exists");
        res.json(null);
      }
    }
  );
});

router.post("/uploads", upload.single("profile"), (req, res) => {
  console.log("this is req.file", req.file);

  res.send("sending something back to say we reach upload path");
});

module.exports = router;
