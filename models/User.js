const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  username: String
});

module.exports = User = mongoose.model("User", userSchema);
