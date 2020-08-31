const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = function () {
  console.log("LocalStrategy called");
  passport.use(new LocalStrategy({
      usernameField : 'login',
      passwordField : 'password'
    },
    function(login, password, done) {
      User.authenticate(login, password, function(err, user) {
        if (err) {
          return done(err);
        }

        if(!user) {
          return done(null, false, {message: 'Invalid username or password'});
        }

        return done(null, user);
      })
    }))
};



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
