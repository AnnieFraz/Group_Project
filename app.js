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
  
  
  
var insertUserAPI = function(firstName,lastName,emailNew,image) {
  var lastUser_id = 0;
  var MongoClient = require('mongodb').MongoClient, assert = require('assert');
  // Connection URL
  var url = 'mongodb://localhost:27017/myproject';
  MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  // Get the documents collection
  var collectionSearch = db.users.find({user_id: toString(lastUser_id)});
  if (db.users.find({email: emailNew}) != null)
  {
    collectionSearch = db.users.find({email: emailNew});
    return collectionSearch.user_id;
  }
  while (collectionSearch != null)
  {
    lastUser_id += 1;
    collectionSearch = db.users.find({user_id: toString(lastUser_id)});
  }
  var collection = db.collection('users');
  // Insert some documents
  collection.insert({  user_id: toString(lastUser_id), first_name: firstName, last_name: lastName, 
    password: " ", email: emailNew, city: "Set Your City", 
    picture_url: image}, function(err, result) {
    assert.equal(err, null);
    var userID = collectionSearch.user_id;
    console.log("Inserted"+collectionSearch.first_name);
    db.close();
    return userID;
    });
  });
}



//function to add events into the database
var insertEvent = function(eventName, eventTime, eventDate, image, eventLocation, eventZip) {
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
    console.log("Inserted"+collectionSearch.name)
    db.close();
  });
}

//function to find users fromm the database
var findUser = function(userID) {
  var MongoClient = require('mongodb').MongoClient, assert = require('assert');
  var url = 'mongodb://localhost:27017/myproject';

// Use connect method to connect to the server
  MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  var collectionSearch = db.users.find({user_id: userID});
  if (collectionSearch == null)
  {
    console.log("User does not exist.")
    return null;
  }
  // Get the documents collection
  // Find some documents
    var results = collectionSearch.toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    db.close();
    return results;
    
    });
  });
}


/*
db.createCollection('users');

db.createCollection('api');

db.api.insert({
  api: "google", api_key: "MW0TVfdFYMXZK4Lnd_r5rywv", clientID: "246480850653-20olgfmijst2977ju9feja8rjrsld8u6.apps.googleusercontent.com"});

  db.users.insert({ 
    user_id: " ", first_name: " ", last_name: " ", 
    password: " ", email: " ", city: " ", 
    picture_url: " "});
    

  db.events.insert({
  name: " ", id: " ",
  time: " ", date: " ",
  picture_url: " ",
  location: " ", zip: " "});
  
  
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
    location: " ", zip: " ",
    });
}
*/