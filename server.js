var routerTest = require("./routes/test");
var routerItinerary = require("./routes/itineraryRoute");
var routerActivity = require("./routes/activityRoute");
var routerComment = require("./routes/commentRoute");
var routerCountry = require("./routes/countryRoute");
var routerAccount = require("./routes/accountRoute");
var routerLogin = require("./routes/loginRoute");
var routerAuth = require("./routes/authRoute");
var routerAuth2 = require("./routes/authRoute2");
var routerProfile = require("./routes/profileRoute");
var passportSetup = require("./config/passport-setup");
var profilePageRoute = require("./routes/profileBackendRoute");
var favouriteRoute = require("./routes/favouriteRoute");
require("dotenv").config();
var cors = require("cors");
var passport = require("passport");

const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const fs = require("fs");
var https = require("https");

var express = require("express");

const certOptions = {
  key: fs.readFileSync(path.resolve("./ssl/server.key")),
  cert: fs.readFileSync(path.resolve("./ssl/server.crt"))
};
var app = express();

const server = https.createServer(certOptions, app);

var port = process.env.PORT || 5000;
server.listen(port, () => console.log(`server running on port ${port}`));

const session = require("express-session");

console.log("server is starting");

var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
var bodyParser = require("body-parser");

require("dotenv").config();

const socketio = require("socket.io");

const http = require("http");

// const server = http.createServer(app);
//const server = http.Server(app);

const io = socketio.listen(server);

io.sockets.on("connection", function(socket) {
  console.log("A client is connected!");
});

//middleware

app.use(bodyParser.json());
app.use(methodOverride("_method"));

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

app.use(
  session({
    secret: "process.env.secret",
    resave: true,
    saveUninitialized: true
  })
);

// var io = require("socket.io").listen(server);

// console.log("this is io", io);
// console.log("this is io id", io.id);
// const io = socketio.listen(server);
app.set("io", io);

console.log("this is app", app.io);

app.use(express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.db_url, {
  useNewUrlParser: true,
  useCreateIndex: true
});

let gfs;

var conn = mongoose.createConnection(process.env.db_url);
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");

  // all set!
});

const storage = new GridFsStorage({
  url: process.env.db_url,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

app.post("/uploads", upload.single("file"), (req, res) => {
  console.log("we reached upload backend route");
  res.send("yup we got your image upload");
  // res.json({ file: req.file });
});

// app.post("/uploads", (req, res) => {
//   console.log("we reached upload backend route");
//   // res.json({ file: req.file });
// });

mongoose.Promise = global.Promise;

app.use("/itinerary/uploads", express.static("uploads"));
app.use("/activity/uploads", express.static("uploads"));

mongoose.connection
  .once("open", () => {
    console.log("Connection has been made, now make fireworks...");
  })
  .on("error", function(error) {
    console.log("Connection error:", error);
  });

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
app.use("/testProfile", routerProfile);
app.use("/auth", routerAuth);
app.use("/profileBackendRoute", profilePageRoute);
app.use("/favourite", favouriteRoute);

// app.use
// app.use("/auth", routerAuth2);
