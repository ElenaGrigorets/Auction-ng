var Item = require('./Item');
var express = require('express');
var router = express.Router();

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// const itemScheme = new Schema({name: String, description: String, price: Number, users: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User"
//     }
//   ]}, {versionKey: false});
// const Item = mongoose.model("Item", itemScheme);
const jsonParser = express.json();

router.get("/", function(req, res){

  Item.find({}, function(err, items){

    if(err) return console.log(err);
    res.send(items)
  });
});

// app.get("/api/users/:id", function(req, res){
//
//   const id = req.params.id;
//   User.findOne({_id: id}, function(err, user){
//
//     if(err) return console.log(err);
//     res.send(user);
//   });
// });
//
router.post("/create", function (req, res) {

  if(!req.body) return res.sendStatus(400);

  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const users = req.body.users;
  const item = new Item({name: name, description: description, price: price, users:users});
console.log(req.body);
  item.save(function(err){
    if(err) return console.log(err);
    res.send(item);
  });
});
//
// app.delete("/api/users/:id", function(req, res){
//
//   const id = req.params.id;
//   User.findByIdAndDelete(id, function(err, user){
//
//     if(err) return console.log(err);
//     res.send(user);
//   });
// });
//
// app.put("/api/users", jsonParser, function(req, res){
//
//   if(!req.body) return res.sendStatus(400);
//   const id = req.body.id;
//   const userName = req.body.name;
//   const userAge = req.body.age;
//   const newUser = {age: userAge, name: userName};
//
//   User.findOneAndUpdate({_id: id}, newUser, {new: true}, function(err, user){
//     if(err) return console.log(err);
//     res.send(user);
//   });
// });

module.exports = router;
