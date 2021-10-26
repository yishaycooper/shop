
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    cartNumber: Number
});

module.exports = mongoose.model('Cart', CartSchema);


