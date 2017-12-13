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

    // Get the value type
    var type = Object.prototype.toString.call(value);

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
var lastUser_id = 0;
  
var insertUserAPI = function(firstName,lastName,emailNew,image) {
  let validEmail =false;
  var notFound = '';
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
      if(items == notFound){
        console.log("Valid Email");
        validEmail = true
        console.log(validEmail);
      }
      else{
        console.log("Invalid Email");
      }
      console.log(lastUser_id);
      console.log("validEmail: " + validEmail);
      if(validEmail==false){
        db.close();
        return;
      }
  });
  //finding the right user_id to assign
  collectionSearch.find({user_id: toString(lastUser_id)}).toArray(function(err,items){
  while(items != notFound && lastUser_id <50) {
    lastUser_id += 1;
    items = collectionSearch.find({user_id: toString(lastUser_id)}).toArray(function(err,items){
      console.log("Last user id loop");
      });
      console.log(lastUser_id + "-----" + items);
  }
  });
  var collection = db.collection('users');
  // Insert some documents
  /*
  collection.insert({  user_id: toString(lastUser_id), first_name: firstName, last_name: lastName, 
    password: "Password123", email: emailNew, city: "Set Your City", 
    picture_url: image}, function(err, result) {
    assert.equal(err, null);
    var userID = collectionSearch.user_id;
    console.log("Inserted"+collectionSearch.first_name);
    db.close();
    return userID;
    });
    */
    db.close();
    return;
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
    console.log("User does not exist.      " + items)
  }
  else
  {
    console.log("Found the following records "+items.name);
     return items;
  }
  });
  // Get the documents collection
  // Find some documents
    db.close();
   
    
  });
}
findUser('3');
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
    location: " ", zip: " ",
    });
}
*/


