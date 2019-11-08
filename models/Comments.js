const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  content: String
});

module.exports = Comments = mongoose.model("Comments", commentsSchema);
