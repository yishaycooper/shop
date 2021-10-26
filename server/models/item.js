const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: String,
    category: String,
    price: String,
    img: String
});

module.exports = mongoose.model('Item', ItemSchema);