var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  comment: {
    type: String
  },
  user: {
    type: String
  },
  itinerary_id: {
    type: mongoose.Schema.Types.ObjectId
  }
});

const Comment = mongoose.model("comments", commentSchema);

module.exports = Comment;
