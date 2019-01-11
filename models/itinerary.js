var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schemaItinerary = new Schema({
  itineraryImage: {
    type: String
  },
  profileName: {
    type: String
  },
  title: {
    type: String
  },
  likes: {
    type: Number
  },
  hours: {
    type: Number
  },
  expense: {
    type: String
  },
  hashtags: {
    type: [String]
  },
  city: {
    type: String
  }
});

const Itinerary = mongoose.model("itinerary", schemaItinerary);

module.exports = Itinerary;
