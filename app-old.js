/**
 * Module dependencies.
 */
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mysql = require('mysql');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var port = process.env.PORT || 3000;
var app = express();

var connection = require('./config/database.js');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
  secret: 'ungmo2',
  key: 'signin',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 8 * 60 * 60 * 1000 } //8 Hour : Session expiration time
}));
app.use(passport.initialize());
app.use(passport.session());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

passport.serializeUser(function(user, done) {
  console.log('serialize: %s %s', user.email, user.password);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log('deserialize: %s %s', user.email, user.password);
  done(null, user);
});

// Passport Configuration
passport.use(new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    //if(username=='111' && password=='222'){
    //  var user = { 'username':username, 'password':password};
    //  return done(null,user);
    //}else{
    //  return done(null,false);
    var stmt = 'SELECT * from USERS WHERE email="' + email + '" AND ' + 'password="' + password + '"';
    console.log(stmt);
    connection.query(stmt, function (err, rows) {
      if (!err) {
        console.log('The solution is: ', rows);
        if (rows.length != 0) {
          var user = {'email': email, 'password': password};
          return done(null, user);
        } else {
          return done(null, false);
        }
      }
      else {
        console.log('Error while performing Query.:'+err);
      }
    });
  })
);

//app.all('/', function(req, res) {
//  //res.sendFile('index0.html', {root: __dirname + '/public/'}); // load the signin.html file
//  res.sendFile(path.join(__dirname + '/public/signin.html')); // load the signin.html file
//});


app.get('/', function(req, res) {
  res.render('index',{name: 'Lee'});
})
//app.post('/signin', function(req, res) {
//  var username = req.body.username;
//  var password = req.body.password;
//  console.log(req.body);
//  console.log("post received: %s %s", username, password);
//
//  passport.authenticate('local', {
//    successRedirect: '/signinSuccess',
//    failureRedirect: '/signinFailure'
//  });
//
//  //res.send('signin page');
//});


app.post('/signin', passport.authenticate('local', {
  successRedirect: '/signinSuccess',
  failureRedirect: '/signinFailure'
}));

app.get('/signinSuccess', function(req, res) {
  console.log("Successfully authenticated: " + req.user.email);
  //res.send('success');
  res.render('index', {name: req.user.email});
});

app.get('/signinFailure', function(req, res) {
  console.log("Failed to authenticate");
  //res.send('failure');
});


//http.createServer(app).listen(app.get('port'), function () {
app.listen(app.get('port'), function () {
  console.log('Example app listening on port '+ app.get('port'));
});