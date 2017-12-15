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

// Routing to index.ejs
router.get('/', function(req, res, next) {
  res.render('index');
});
// Routing to events.ejs
router.get('/events', function(req, res, next) {
    res.render('events');
});
// Routing to profile.ejs
router.get('/profile', function(req, res, next) {
    res.render('profile', {savedEvents: undefined});
});
// Routing to home.ejs
router.get('/home', function(req, res, next) {
    res.render('home');
});

// Routing that handles the post operation for the facebook login
router.post('/handle_login', function(req, res, next) {
   console.log('it worked'); 

   var item = {
       user_id: req.body.id,
       first_name: req.body.first_name,
       last_name: req.body.last_name,
       password: 'fb_login',
       email: req.body.email,
       city: 'N/A',
       picture_url: req.body.picture.data.url
   }
   
});
// Routing post that saves the information from the facebook login
router.post('/save_event', function(req, res, next) {
    console.log('save events!'); 
    var event = {
      user_id: req.body.user_id,
      event_title: req.body.event_title,
      event_class: req.body.event_class,
      event_img: req.body.event_img,
      event_url: req.body.event_url
    };
    
    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection('savedEvents').insertOne(event, function(err, result) {
            assert.equal(null, err);
            console.log('event saved');
            db.close();
        })
    });
    
    console.log("finish!!!!!");
    
});
// routing that handles the saved events to the profile
router.get('/fetch_saved_events', function(req, res, next) {
    console.log('fetching events');
    var id = req.query.id;
    // console.log(req.query.id);
    var resultArray = [];
    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        var cursor = db.collection('savedEvents').find({user_id : id});
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function() {
            db.close();
            //console.log(resultArray);
            console.log('fin fetching ...');
            res.render('profile', {saved_events: resultArray});
        });
    });
});


module.exports = router;
