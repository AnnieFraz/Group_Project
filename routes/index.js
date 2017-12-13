//Setting up express and a router.
var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/name_picker';

// mongo.connect(url, function(err, db) {
//     //assert.equal(null, err);
//     var cursor = db.collection('users').find();
//     cursor.forEach(function(doc, err) {
//     //   assert.equal(null, err);
//             console.log(doc);
//     }, function() {
//       db.close();
//     });
//     // db.close();
//   });

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
