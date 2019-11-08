const express = require("express");
const router = express.Router();
const pagination = require("../middleware/pagination");
const Comments = require("../models/Comments");

router.get("/", pagination(Comments), (req, res) => {
  res.json(res.paginatedResults);
});

module.exports = router;
