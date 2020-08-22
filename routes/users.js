const User = require('./User');
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// const userScheme = new Schema({name: String, password: String}, {versionKey: false});
// const User = mongoose.model("User", userScheme);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/create", function (req, res) {

  if(!req.body) return res.sendStatus(400);

  const name = req.body.name;
  const password = req.body.password;
  const user = new User({name: name, password: password});
  console.log(req.body);
  user.save(function(err){
    if(err) return console.log(err);
    res.send(user);
  });
});

module.exports = router;
