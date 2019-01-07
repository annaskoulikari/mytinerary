var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
  name: {
    type: String
  },
  country: {
    type: String
  }
});

const City = mongoose.model("cities", schema);

module.exports = City;
