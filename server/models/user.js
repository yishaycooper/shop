const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    pass: String,
    admin: Boolean
});

module.exports = mongoose.model('User', UserSchema);