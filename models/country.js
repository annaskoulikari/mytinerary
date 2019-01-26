var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var countrySchema = new Schema({
  country: {
    type: String
  }
});

const Country = mongoose.model("country", countrySchema);

module.exports = Country;
