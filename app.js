//function to add users to the database
//facebook login push
  /*
  facebook
  user_id N
  first name Y
  last name Y
  password N
  email Y
  city N
  picture_url Y
  */
  
//google login push
/*
  google api:
  user_id N
  first name Y
  last name Y
  password N
  email Y
  city N
  picture_url Y
  */
var isEqual = function (value, other) {

var index = require('./routes/index');
var users = require('./routes/users');
var events = require('./routes/events');

    // If the two objects are not the same type, return false
    if (type !== Object.prototype.toString.call(other)) return false;

    // If items are not an object or array, return false
    if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

    // Compare the length of the length of the two items
    var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
    var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
    if (valueLen !== otherLen) return false;

    // Compare two items
    var compare = function (item1, item2) {
        // Code will go here...
    };

    // Compare properties
    var match;
    if (type === '[object Array]') {
        for (var i = 0; i < valueLen; i++) {
            compare(value[i], other[i]);
        }
    } else {
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                compare(value[key], other[key]);
            }
        }
    }

    // If nothing failed, return true
    return true;

};

var insertUserAPI = function(firstName,lastName,emailNew,image) {
  var MongoClient = require('mongodb').MongoClient, assert = require('assert');
  // Connection URL
  var url = 'mongodb://localhost:27017/name_picker';
  MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  // Get the documents collection
  var collectionSearch = db.collection('users');
  //finding duplicate emails
  collectionSearch.find({email: emailNew}).toArray(function(err,items){
      console.log(items + "   : email Search");
      if(items == ''){
        console.log("Valid Email");
        var id= Math.floor(Math.random() * 100000) + 1;
        id = id.toString();
        console.log(id);
        var pasta = db.collection('users');
        pasta.insert({  user_id: id, first_name: firstName, last_name: lastName, 
          password: "Password123", email: emailNew, city: "Set Your City", 
          picture_url: image}).catch(function () {
            console.log("Promise Rejected");
          });
      }
      else{
        console.log("Invalid Email");
      }
  });
    db.close();
    return;
  });
}



//function to add events into the database
var insertEvent = function(eventName, eventTime, eventDate, image, eventLocation, eventZip, event_id) {
  var lastEvent_id = 0;
  var MongoClient = require('mongodb').MongoClient, assert = require('assert');
  // Connection URL
  var url = 'mongodb://localhost:27017/myproject';
  MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  //find the apropriate event id
  var collectionSearch = db.events.find({id: toString(lastEvent_id)});
  while (collectionSearch != null)
  {
    lastEvent_id += 1;
    collectionSearch = db.events.find({id: toString(lastEvent_id)})
  }
  // Get the documents collection
  var collection = db.collection('events');
  // Insert some documents
  collection.insert({
  name: eventName, id: toString(lastEvent_id),
  time: eventTime, date: eventDate,
  picture_url: image,
  location: eventLocation, zip: eventZip}, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted"+collectionSearch.name)
    db.close();
    });
  });
}


var saveEvent = function(userID, eventName, eventDate, eventTime, eventLocation, eventZip, image) {
  var MongoClient = require('mongodb').MongoClient, assert = require('assert');
  var url = 'mongodb://localhost:27017/myproject';

// Use connect method to connect to the server
  MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  var collectionSearch = db.savedEvents.find({user_id: toString(userID)});
  // Get the documents collection
  if(collectionSearch != null)
  {
    collectionSearch = collectionSearch.find({name: eventName});
    if (collectionSearch != null)
    {
      console.log("Duplicate Event, aborting insertion!");
      return null;
    }
  }
  var collection = db.collection('savedEvents');
  collection.insert({
    user_id: userID, name: eventName,
    time: eventTime, date: eventDate,
    picture_url: image,
    location: eventLocation, zip: eventZip
  })
  // Find some documents
   assert.equal(err, null);
    console.log("Inserted"+ collectionSearch)
    db.close();
  });
}

//function to find users fromm the database
var findUser = function(userID) {
  var MongoClient = require('mongodb').MongoClient, assert = require('assert');
  var url = 'mongodb://localhost:27017/name_picker';
  var notFound = '';
  userID = userID.toString();
// Use connect method to connect to the server
  MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  var result= db.collection("users");
  result.find({user_id: userID}).toArray(function(err,items){
    console.log(items);
    if (items == notFound)
  {
    console.log("User does not exist.      " + items);
  }
  else
  {
    console.log("Found the following records "+ JSON.stringify(items));
     return items;
  }
  });
  // Get the documents collection
  // Find some documents
    db.close();
   
    
  });
}

findUser('4');
insertUserAPI('Chad','Beta','iamChadbeta@gmail.com','https://ichef-1.bbci.co.uk/news/624/cpsprodpb/4F6B/production/_87513302_chad_habre_g.jpg');
console.log("tests finished");

/*
db.createCollection('users');

db.createCollection('api');

db.api.insert({
  api: "google", api_key: "MW0TVfdFYMXZK4Lnd_r5rywv", clientID: "246480850653-20olgfmijst2977ju9feja8rjrsld8u6.apps.googleusercontent.com"});

  db.users.insert({ 
    user_id: "2", first_name: "Tim", last_name: "Allen", 
    password: "nope", email: "timtoolman@gmail.com", city: "New York", 
    picture_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTI5ODY0NTAwOF5BMl5BanBnXkFtZTcwOTI3NjQxMw@@._V1_UX214_CR0,0,214,317_AL_.jpg"});
    

  db.events.insert({
  name: "Underground Clawfish Fight", id: "1",
  time: "11:00(PM)", date: "12/27/2017",
  picture_url: "https://vignette.wikia.nocookie.net/starwars/images/e/e2/Clawfish.jpg/revision/latest?cb=20110303190054",
  location: "Behind the Otter Express, CSUMB", zip: "93933"});
  
  
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
// Connection URL
var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  db.close();
});
  

  
  Eventfull api:
  name        Y
  id          N
  time        Y
  date        Y
  pictur_url   Y
  location     Y
  zip         Y
  
  var myCursor = db.users.find({user_id: 0});
  var myDocument = myCursor.hasNext() ? myCursor.next() : null;
  if (myDocument) {
    var myName = myDocument.user_id;
    console.log(tojson(myName));
    
    db.createCollection('savedEvents');
    
    db.savedEvents.insert({
    user_id: " " name: " ", 
    id: " ",
    time: " ", date: " ",
    picture_url: " ",
    location: " ", zip: " ",});
    
    use name_picker;
    db.createCollection('users');
    db.createCollection('events');
    db.createCollection('savedEvents');
    db.users.insert({ 
      user_id: "1", first_name: "Tim", last_name: "Allen", 
      password: "nope", email: "timtoolman@gmail.com", city: "New York", 
      picture_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTI5ODY0NTAwOF5BMl5BanBnXkFtZTcwOTI3NjQxMw@@._V1_UX214_CR0,0,214,317_AL_.jpg",
      google: '', facebook: '', standard: '' 
    });
    db.events.insert({
      name: "Underground Clawfish Fight", id: "1",
      time: "11:00(PM)", date: "12/27/2017",
      picture_url: "https://vignette.wikia.nocookie.net/starwars/images/e/e2/Clawfish.jpg/revision/latest?cb=20110303190054",
      location: "Behind the Otter Express, CSUMB", zip: "93933"});

     db.savedEvents.insert({
      user_id: "1", name: "Underground Clawfish Fight", 
      id: "1",
      time: "11:00(PM)", date: "12/27/2017",
      picture_url: "https://vignette.wikia.nocookie.net/starwars/images/e/e2/Clawfish.jpg/revision/latest?cb=20110303190054",
      location: "Behind the Otter Express, CSUMB", zip: "93933"});
  */
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
function connectToDB(callback) {
  MongoClient.connect("mongodb://localhost:27017/name_picker", function(err, db) {
      if(err) {
        console.log("Could not connect to MongoDB");
        return callback(err, null); 
      }
      
      callback(null, db); 
  }); 
}

function fetchUser(db, callback) {
    var collection = db.collection('students');
  
    collection.find({email: userEmail}).toArray(function(err, items) {
        if (err) {
            return callback(err, null); 
        } 
        
        callback(null, items); 
    });
}
/* GET home page. */
router.get('/', function(req, res, next) {
    async.waterfall([
        connectToDB,
        fetchUser
    ], function (err, students) {
        console.log(students); 
        res.render('index', { title: 'Students', students: students });
    });
});
