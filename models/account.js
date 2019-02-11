var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schemaAccount = new Schema({
  profilePhoto: {
    type: String
  },
  userName: {
    type: String
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  country: {
    type: String
  },
  favourite: {
    type: Array
  }
});

const Account = mongoose.model("account", schemaAccount);

module.exports = Account;
