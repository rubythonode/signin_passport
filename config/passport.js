// config/passport.js

var LocalStrategy = require('passport-local').Strategy;
var mysql         = require('mysql');
var dbconfig      = require('./database.js');
var connection    = mysql.createConnection(dbconfig);

module.exports = function(passport) {

// passport session setup ==================================================
// user.email 세션 저장
  passport.serializeUser(function(user, done) {
    console.log('serializeUser:', user.email);
    done(null, user.email);
  });

// 최신 User객체 정보 취득
  passport.deserializeUser(function(email, done) {
    connection.query('SELECT password FROM USERS WHERE email= ?', [email], function(err, rows) {
      var user = {'email': email, 'password': rows[0].password};
      console.log('deserializeUser:', user);
      return done(null, user);
    });
  });

// LOCAL SIGNIN =============================================================
// Passport Configuration
  passport.use(
    new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, email, password, done) {
      connection.query('SELECT password FROM USERS WHERE email= ?', [email], function(err, rows) {
        if(err) {
          console.log('DB Error: ', err);
          return done(err);
        }

        if(!rows.length) {
          console.log('Incorrect email.');
          return done(null, false, req.flash('info', 'Incorrect email'));
        } else if(rows[0].password !== password){
          console.log('Incorrect password: %s != %s', rows[0].password, password);
          return done(null, false, req.flash('info', 'Incorrect password'));
        } else {
          console.log('Successfully authenticated!!');
          var user = {'email': email, 'password': password};
          return done(null, user);
        }
      });
    })
  );
};
