// server.js

// set up ======================================================================
var express      = require('express');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport     = require('passport');
var flash        = require('connect-flash');

var app = express();


// configuration ===============================================================
require('./config/passport')(passport);

app.set('port', process.env.PORT || 3000);
app.set('views', './views');
app.set('view engine', 'jade');
//app.locals.pretty = true;
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
app.use(passport.session()); // persistent signin sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./app/routes.js')(app, passport);


// launch ======================================================================
app.listen(app.get('port'), function () {
  console.log('listening on port '+ app.get('port'));
});