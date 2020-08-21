const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./User');

var ItemSchema = new Schema({
    name : String,
    description : String,
    price : Number,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, {versionKey: false});

module.exports = mongoose.model('Item', ItemSchema);