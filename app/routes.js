// app/routes.js
var util = require('util');

module.exports = function(app, passport) {

  // =====================================
  // HOME PAGE
  // =====================================
  app.get('/', isLoggedIn, function(req, res) {
    //res.send('Hello home page');
    res.redirect('/welcome');
  });

  // =====================================
  // SIGNIN
  // =====================================
  app.get('/signin', function(req, res){
    //console.log('signin: ', { messages: req.flash('info') });
    //req.flash(name) mean get and remove the flash. So if you call req.flash twice, the second call will return empty array.
    res.render('signin', { messages: req.flash('info') });
  });

  app.post('/signin', passport.authenticate('local', {
      successRedirect: '/signSuccess',
      failureRedirect: '/signFailure',
      //successRedirect: '/welcome',
      //failureRedirect: '/signin',
      failureFlash: true
    }
  ));

  app.get('/signSuccess', function(req, res) {
    console.log(req.flash('info')); // []
    res.send('sign_success');
  });

  app.get('/signFailure', function(req, res) {
    // 'Incorrect email' or 'Incorrect password'
    res.send(req.flash('info'));
  });

  // =====================================
  // SIGNOUT
  // =====================================



  // =====================================
  // WELCOME PAGE
  // =====================================
  app.get('/welcome', isLoggedIn, function(req, res){
    //console.log("/welcome: " + req.user.email);
    // get the user out of session and pass to template
    res.render('welcome', { name: req.user.email, time: new Date(), title: 'Jade' });
  });

  // route middleware to make sure
  function isLoggedIn(req, res, next) {

console.log("SESSION: " + util.inspect(req.session));

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();

    // if they aren't redirect them to the home page
    res.redirect('/signin');
  }
};