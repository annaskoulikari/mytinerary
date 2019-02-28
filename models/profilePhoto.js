var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schemaPhoto = new Schema({
  img: { type: String }
});
var ProfilePhoto = mongoose.model("ProfilePhoto", schemaPhoto);

module.exports = ProfilePhoto;
