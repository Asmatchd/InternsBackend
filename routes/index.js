var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Server is up and Running in Feb 2022" });
});

module.exports = router;
