//Setting up express and a router.
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/events', function(req, res) {
    res.render('events');
});

router.get('/profile', function(req, res) {
    res.render('profile');
});

router.get('/home', function(req, res) {
    res.render('home');
});


module.exports = router;
