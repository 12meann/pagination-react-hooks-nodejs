if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.once("open", () => console.log("Connected to Mongodb"));
db.on("error", err => console.log("err", err));

//dummy array
const posts = require("./dummyArray");

app.get("/posts", paginatedResults(posts), (req, res) => {
  res.json(res.paginatedResults);
});

//routes

app.use("/users", require("./api/users"));
app.use("/comments", require("./api/comments"));

//for dummy array
function paginatedResults(array) {
  return (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalDocuments = array.length;
    const results = {};
    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit
      };
    }
    if (endIndex < totalDocuments) {
      results.next = {
        page: page + 1,
        limit
      };
    }
    results.totalDocuments = totalDocuments;
    results.result = array.slice(startIndex, endIndex);
    res.paginatedResults = results;
    next();
  };
}

app.listen("5000", console.log("Listening at port 5000"));
