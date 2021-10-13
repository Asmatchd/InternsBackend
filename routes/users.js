var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const User = require("../models/user");

/* GET users listing. */
router.post("/allUsers", function (req, res) {
  User.find({})
    .then((users) => {
      res.json({ status: "200", allUsers: users });
    })
    .catch(() => {
      res.json({
        status: "404",
        msg: "Internal error, please try again later",
      });
    });
});

//add new user in db
router.post("/signUp", (req, res) => {
  let userData = req.body;

  User.findOne({ phone: userData.phone })
    .then((user) => {
      if (user) {
        res.json({
          status: "404",
          msg: "Phone already associated with another account",
        });
      } else {
        User.create({
          name: userData.name,
          phone: userData.phone,
          email: userData.email,
          password: userData.password,
        })
          .then((user) => {
            //success callback
            res.json({
              status: "200",
              data: user,
              msg: "Your account successfully created please Sign In.",
            });
          })
          .catch((err) => {
            res.json({ status: "404", msg: err.message });
          });
      }
    })
    .catch((err) => {
      res.json({
        status: "404",
        msg: "Internal error, please try again later",
      });
    });
});

// find user from db with out password encryption
router.post("/signIn", (req, res, next) => {
  let userData = req.body;
  console.log("====================================");
  console.log(userData);
  console.log("====================================");

  User.findOne({ password: userData.password, phone: userData.phone })
    .then((user) => {
      if (user) {
        res.json({ status: "200", data: user, msg: "Successfully loggedIn" });
      } else {
        res.json({ status: "404", msg: "User not found" });
      }
    })
    .catch((err) => {
      res.json({
        status: "404",
        msg: "Internal error, please try again later",
      });
    });
});

module.exports = router;
