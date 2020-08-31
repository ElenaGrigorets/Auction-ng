const User = require('./User');
const express = require('express');
const router = express.Router();
const passport = require('passport');

const mongoose = require('mongoose')
// const Schema = mongoose.Schema;


// const userScheme = new Schema({name: String, password: String}, {versionKey: false});
// const User = mongoose.model("User", userScheme);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//hashing a password before saving it to the database

router.get("/testUser", function(req, res){
  console.log("test Users");
  res.sendStatus(200);
});

router.post("/create", function (req, res) {

  if(!req.body) return res.sendStatus(400);

  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const login = req.body.login;
  const password = req.body.password;
  const user = new User({email: email, firstName: firstName, lastName: lastName, login: login, password: password});
  console.log(req.body);
  user.save(function(err){
    if(err) return console.log(err);
    res.send(user);
  });
});
// app.post('/api/login', auth.authenticate);
router.post("/login", function (req, res, next) {
  console.log("in login" + req.body);
  req.body.login = req.body.login.toLowerCase();
  const auth = passport.authenticate('local', function(err, user) {
    if(err) {return next(err);}
    if(!user) {
      console.log("403?")
      res.sendStatus(403); }
    console.log("we are here?")
    req.logIn(user, function(err) {
      if(err) {return next(err);}
      res.send({success:true, user: user});
    })
  });
  auth(req, res, next);


  // if(!req.body) return res.sendStatus(400);
  //
  // const email = req.body.email;
  // const firstName = req.body.firstName;
  // const lastName = req.body.lastName;
  // const login = req.body.login;
  // const password = req.body.password;
  // const user = new User({email: email, firstName: firstName, lastName: lastName, login: login, password: password});
  // console.log(req.body);
  // user.save(function(err){
  //   if(err) return console.log(err);
  //   res.send(user);
  // });
});

router.get('/currentIdentity', function(req, res) {

  // User.find({}, function(err, items){
  //   if(err) return console.log(err);
  //   let returnedItems = [];
  //   items.forEach(item => returnedItems.push(item.transform()));
  //   res.send(returnedItems)
  // });
  console.log("fffff")
  res.status(200).send(req.user);
  res.end();
});

// // GET /logout
// router.get('/currentIdentity', function(req, res, next) {
//   console.log("in current identity");
//   // next();
// });

// GET /logout
router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;
