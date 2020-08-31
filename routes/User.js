const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    email: String,
    firstName : String,
    lastName : String,
    login: String,
    // login: {
    //   type: String,
    //   unique: true,
    //   required: true,
    //   trim: true
    // },
    password: {
      type: String,
      required: true,
    }
}, {versionKey: false});

UserSchema.pre('save', function (next) {
  let user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

//authenticate input against database
UserSchema.statics.authenticate = function (login, password, callback) {
  UserSchema.findOne({ login: login })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        const err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
};

module.exports = mongoose.model('User', UserSchema);
