var path = require('path');

var passport=require('passport');
var User = require('./User');

module.exports = function(passport) {

  passport.serializeUser(function(user, done){
    done(null, false);
  });
  passport.deserializeUser(function(id, done){
    console.log("deserializeUser called", id);
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  //load strategy files
  require('./passport.config');
  //TODO: Facebook
  //TODO: Twitter
  //TODO: Google
}



// const passport = require('passport'),
//   LocalStrategy = require('passport-local').Strategy,
//   users = require('./User');
//
//
// module.exports = function() {
//   passport.use(new LocalStrategy(
//     function(username, password, done) {
//       const found = users.find(user => {
//         return user.userName.toLowerCase() === username;
//       });
//       if(found) {
//         return done(null, found);
//       } else {
//         return done(null, false);
//       }
//
//     }
//   ));
//
//   passport.serializeUser(function(user, done) {
//     // console.log(5, user);
//     if(user) {
//       done(null, user.id);
//     }
//   });
//
//   passport.deserializeUser(function(id, done) {
//     // console.log(3, id);
//     const found = users.find(user => {
//       return user.id === id;
//     });
//     if(found) {
//       return done(null, found);
//     } else {
//       return done(null, false);
//     }
//   })
//
// };
