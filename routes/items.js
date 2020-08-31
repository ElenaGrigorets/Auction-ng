const Item = require('./Item');
const express = require('express');
const router = express.Router();

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
    let returnedItems = [];
    items.forEach(item => returnedItems.push(item.transform()));
    res.send(returnedItems)
  });
});


router.get("/testItems", function(req, res){
  console.log("test Items");
  res.sendStatus(200);
});

router.get("/:id", function(req, res){

  const id = req.params.id;
  Item.findOne({_id: id}, function(err, item){

    if(err) return console.log(err);
    if (item !== null) {
      res.send(item.transform());
    }

  });
});

router.post("/create", function (req, res) {

  if(!req.body) return res.sendStatus(400);

  const id = req.body.id;
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const users = req.body.users;
  const item = new Item({id: id, name: name, description: description, price: price, users:users});
console.log(req.body);
  item.save(function(err){
    if(err) return console.log(err);
    res.send(item.transform());
  });
});

router.delete("/:id/delete", function (req, res) {

  const id = req.params.id;
  Item.deleteOne({_id: id}, function(err){

    if(err) return console.log(err);
    res.sendStatus(200);
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
router.put("/update", function(req, res){

  if(!req.body) return res.sendStatus(400);
  const item = req.body;
  console.log(req.body);
  Item.findOneAndUpdate({_id: item.id}, item, function(err){
    if(err) return console.log(err);
    res.sendStatus(200);
  });
});

module.exports = router;
