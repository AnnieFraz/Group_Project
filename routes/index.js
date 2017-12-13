//Setting up express and a router.
var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

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

//   mongo.connect(url, function(err, db) {
//     assert.equal(null, err);
//     db.collection('user-data').insertOne(item, function(err, result) {
//       assert.equal(null, err);
//       console.log('Item inserted');
//       db.close();
//     });
//   });

//   res.redirect('/');
  
//   db.users.insert({ 
//       user_id: "1", first_name: "Tim", last_name: "Allen", 
//       password: "nope", email: "timtoolman@gmail.com", city: "New York", 
//       picture_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTI5ODY0NTAwOF5BMl5BanBnXkFtZTcwOTI3NjQxMw@@._V1_UX214_CR0,0,214,317_AL_.jpg"});

router.post('/handle_login', function(req, res) {
   console.log('it worked'); 
   //console.log(req.body);
   
   var item = {
       user_id: req.body.id,
       first_name: req.body.first_name,
       last_name: req.body.last_name,
       password: 'fb_login',
       email: req.body.email,
       city: 'N/A',
       picture_url: req.body.picture.data.url
   }
   
   mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection('users').insertOne(item, function(err, result) {
          assert.equal(null, err);
          console.log('Item inserted');
          db.close();
        });
    });
   
});


module.exports = router;
