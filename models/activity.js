var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schemaAction = new Schema({
  name: {
    type: String
  },
  itineraryItem: {
    type: String
  },
  city: {
    type: String
  },
  itinerary_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  activityImgage: {
    type: String
  }
});

const Activity = mongoose.model("activity", schemaAction);

module.exports = Activity;
