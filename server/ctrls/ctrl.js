import express  from 'express';
import router from 'express-router';
const Cart = require('../models/cart');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cart', {useNewUrlParser: true, useUnifiedTopology: true});
var con = mongoose.connection;

con.once('open', function () {
    console.log("connection created");
});

const router = express.Router();


router.get('/add', function (req, res) {
    const cart = new Cart({cartNumber: 111});
    bank.value()
})

router.get('/all-carts', function (req, res) {
    Cart().find()   
})

router.get('/bank/:cart', function (req, res) {
   const c = req.params.cart;
   return Cart.find({cartNumber: c});
   
})


module.exports = router