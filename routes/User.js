const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name : String,
    password : String
}, {versionKey: false});

module.exports = mongoose.model('User', UserSchema);