var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var connection = require('./config/database.js');


var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', './views');
app.set('view engine', 'jade');
app.locals.pretty = true;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'ungmo2',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 8 * 60 * 60 * 1000 } //8 Hour : Session expiration time
}));
app.use(passport.initialize());
app.use(passport.session());

// user.email 세션 저장
passport.serializeUser(function(user, done) {
  console.log('serialize:', user.email);
  done(null, user.email);
});
// 최신 User객체 정보 취득
passport.deserializeUser(function(email, done) {
  var stmt = 'SELECT password from USERS WHERE email="' + email + '"';

  connection.query(stmt, function (err, rows) {
        console.log('deserialize:', email);
        var user = {'email': email, 'password': rows[0].password};
        return done(err, user);
  });
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
    //}
    var stmt = 'SELECT password from USERS WHERE email="' + email + '"';
    console.log(stmt);

    connection.query(stmt, function (err, rows) {
      if(err) {
        console.log('Error while performing Query.:'+err);
        return done(err);
      }
      console.log('Password is: ', rows);

      if(rows.length === 0) { // (!rows.length)
        console.log('Incorrect email.');
        return done(null, false);
      } else if(rows[0].password !== password){
        console.log('Incorrect password: %s != %s', rows[0].password, password);
        return done(null, false);
      } else {
        console.log('Successfully authenticated!!');
        var user = {'email': email, 'password': password};
        return done(null, user);
      }
    });
  })
);

app.get('/', function(req, res){
  res.send('Hello home page');
});

app.get('/signin', function(req, res){
  res.render('signin');
});

app.post('/auth/signin', passport.authenticate('local', {
    successRedirect: '/welcome'
    //,failureRedirect: '/signin'
  }
));

app.get('/welcome', function(req, res){
  //console.log("/welcome: " + req.user.email);
  res.render('welcome', { name: req.user.email, time: new Date(), title: 'Jade' });
});


app.listen(app.get('port'), function () {
  console.log('listening on port '+ app.get('port'));
});