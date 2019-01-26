var routerTest = require("./routes/test");
var routerItinerary = require("./routes/itineraryRoute");
var routerActivity = require("./routes/activityRoute");
var routerComment = require("./routes/commentRoute");
var routerCountry = require("./routes/countryRoute");
var routerAccount = require("./routes/accountRoute");
var routerLogin = require("./routes/loginRoute");
require("dotenv").config();

console.log("server is starting");

var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

// START OF STUFF I DID TO UPLOAD IMAGE

// const path = require("path");
// const crypto = require("crypto");
// const GridFsStorage = require("multer-gridfs-storage");
// const Grid = require("gridfs-stream");
// const multer = require("multer");

// END OF STUFF I DID TO UPLOAD IMAGE

var app = express();

app.use(express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  process.env.db_url,
  { useNewUrlParser: true, useCreateIndex: true }
);

mongoose.Promise = global.Promise;

app.use("/itinerary/uploads", express.static("uploads"));
app.use("/activity/uploads", express.static("uploads"));

mongoose.connection
  .once("open", () => {
    //init stream
    console.log("Connection has been made, now make fireworks...");
    // gfs = Grid(
    //   "mongodb://user_1:1Greecepuppy@ds013559.mlab.com:13559/mytinerary",
    //   mongoose.mongo
    // );
    // gfs.collection("uploads");
  })
  .on("error", function(error) {
    console.log("Connection error:", error);
  });

// START OF STUFF I DID TO UPLOAD IMAGE

// Create our storage engine (aka storage object)

// const storage = new GridFsStorage({
//   url: "mongodb://user_1:1Greecepuppy@ds013559.mlab.com:13559/mytinerary",
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString("hex") + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: "uploads"
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });

// const upload = multer({ storage });

// END OF STUFF I DID TO UPLOAD IMAGE

// route

// get

//post

// app.post("/upload", upload.single("file"), (req, res) => {
//   res.json({ file: req.file });
// });

var port = process.env.PORT || 5000;

//Init gfs

let gfs;

// app.get("/", (req, res) => res.send("HELLO WORLD"));

// var router = express.Router();

app.get("/test", function(req, res) {
  res.send("Hello World");
});

app.use("/testRouter", routerTest);
app.use("/testItinerary", routerItinerary);
app.use("/testActivity", routerActivity);
app.use("/testComment", routerComment);
app.use("/testCountry", routerCountry);
app.use("/testAccount", routerAccount);
app.use("/testLogin", routerLogin);

app.listen(port, () => console.log(`server running on port ${port}`));
