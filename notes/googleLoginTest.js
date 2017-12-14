
var express = require('express'),
    app = express();
 
app.get('/login', passport.authenticate('google'));
 
app.get('/auth/callback/google', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect to your app. 
        res.redirect('/');
    }
);
var passport = require('passport'),
    GoogleStrategy = require('passport-google-auth').Strategy;
 
passport.use(new GoogleOAuth2Strategy({
    clientId: '123-456-789',
    clientSecret: 'shhh-its-a-secret',
    callbackURL: 'https://www.example.com/auth/example/callback'
  },
  function(req, accessToken, refreshToken, profile, done) {
    User.findOrCreate( function (err, user) {
      done(err, user);
    });
  }
));