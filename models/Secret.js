const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  textSecret: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Secret = mongoose.model("Secret", UserSchema);

module.exports = Secret;
