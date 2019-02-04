var routerTest = require("./routes/test");
var routerItinerary = require("./routes/itineraryRoute");
var routerActivity = require("./routes/activityRoute");
var routerComment = require("./routes/commentRoute");
var routerCountry = require("./routes/countryRoute");
var routerAccount = require("./routes/accountRoute");
var routerLogin = require("./routes/loginRoute");
var routerAuth = require("./routes/authRoute");
var passportSetup = require("./config/passport-setup");
require("dotenv").config();
// var cors = require("cors");
var passport = require("passport");

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

// END OF STUFF I DID TO UPLOAD IMAGE\

var app = express();

app.use(passport.initialize());
app.use(passport.session());

// app.use(cors());

app.use(express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.db_url, {
  useNewUrlParser: true,
  useCreateIndex: true
});

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

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// app.use((req, res, next) => {
//   const origin = req.get("origin");

//   // TODO Add origin validation
//   res.header("Access-Control-Allow-Origin", origin);
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma"
//   );

//   // intercept OPTIONS method
//   if (req.method === "OPTIONS") {
//     res.sendStatus(204);
//   } else {
//     next();
//   }
// });

//ADDED THIS

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

//app.use(passport.initialize());

app.use("/testRouter", routerTest);
app.use("/testItinerary", routerItinerary);
app.use("/testActivity", routerActivity);
app.use("/testComment", routerComment);
app.use("/testCountry", routerCountry);
app.use("/testAccount", routerAccount);
app.use("/testLogin", routerLogin);
app.use("/auth", routerAuth);

app.listen(port, () => console.log(`server running on port ${port}`));
