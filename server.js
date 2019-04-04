require("dotenv").config();
var cors = require("cors");
var passport = require("passport");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");

var http = require("http");

var express = require("express");

var app = express();

const server = http.createServer(app);

var port = process.env.PORT || 5000;
server.listen(port, () => console.log(`server running on port ${port}`));

const session = require("express-session");

var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

//middleware
var bodyParser = require("body-parser");

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

app.use(express.static("uploads"));
app.use("/uploads", express.static("uploads"));

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true
});

let gfs;

var conn = mongoose.createConnection(process.env.MONGODB_URI);
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");

  // all set!
});

const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
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
  res.send("yup we got your image upload");
});

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

app.use("/testRouter", require("./routes/test"));
app.use("/testItinerary", require("./routes/itineraryRoute"));
app.use("/testActivity", require("./routes/activityRoute"));
app.use("/testComment", require("./routes/commentRoute"));
app.use("/testCountry", require("./routes/countryRoute"));
app.use("/testAccount", require("./routes/accountRoute"));
app.use("/testLogin", require("./routes/loginRoute"));
app.use("/testProfile", require("./routes/profileRoute"));
app.use("/auth", require("./routes/authRoute"));
app.use("/favourite", require("./routes/favouriteRoute"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "client", "build", "index.html"));
  });
}
