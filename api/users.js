const express = require("express");
const router = express.Router();
const pagination = require("../middleware/pagination");
const Users = require("../models/User");

router.get("/", pagination(Users), (req, res) => {
  res.json(res.paginatedResults);
});

module.exports = router;
