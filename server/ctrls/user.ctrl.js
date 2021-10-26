const express = require("express");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

const mongoose = require("mongoose");
const Cart = require("../models/cart");
const User = require("../models/user");

mongoose.connect("mongodb://localhost:27017/cartdb", {
  // give the db a name
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.log("err", err);
});
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

const router = express.Router();

router.get("/get", function (req, res) {

  User.find({}).exec(function (err, Users) {
    if (err) {
      res.send(404, "Error has occurred retrieving!");
    } else {
      res.json(Users);
    }
  });

  // User.deleteMany({}, function (err, Users) {
  //   if (err) {
  //     res.send(404, "Error has occurred!");
  //   } else {
  //     console.log(Users);
  //   }
  // });

});

module.exports = router;
