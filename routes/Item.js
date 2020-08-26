const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./User');

const ItemSchema = new Schema({
    name : String,
    description : String,
    price : Number,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, {versionKey: false});

ItemSchema.method('transform', function() {
  let obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

module.exports = mongoose.model('Item', ItemSchema);
