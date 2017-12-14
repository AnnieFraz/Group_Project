

//Test invalid user lookup

//Test valid user lookup

//Test saved events

//Test new user creation

//Test succesfull return of data

//Test succesful return of empty data




  //Testing the server - once set up
var express = require('express'); // (npm install --save express)
var request = require('supertest');
const expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var url = 'mongodb://localhost:27017/name_picker';

//Testing that we can connect to our server
function dataBaseconnect(MongoClient, url) {
     MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        db.close();
     });
    
}
console.log('Starting valid email insertion test');
console.log('Should return the the users information after succesful insertion');
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var collectionSearch =db.collection('users');
    var emailNew = "timblakemuney4687@aol.com";
    collectionSearch.find({email: emailNew}).toArray(function(err,items) {
            if(err){
                return;
            };
            if(items == '') {
                console.log("Valid Email");
                collectionSearch.insert({
                    user_id : "22",
                    first_name : "Chad",
                    last_name : "Alpha",
                    password : "Password123",
                    email : "timblakemun@aol.com",
                    city : "Set Your City",
                    picture_url : "https://ichef-1.bbci.co.uk/news/624/cpsprodpb/4F6B/production/_87513302_chad_habre_g.jpg"
                 }).catch(function () {
                        console.log("Insertion");
                     });
            }
            else {
            console.log('invalid email');
            }
        });
        db.close();
 });
 
console.log('Starting Invalid email insertion');
console.log('Should return invalid email error');
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var collectionSearch =db.collection('users');
    var emailNew = "timblakemun@aol.com";
    collectionSearch.find({email: emailNew}).toArray(function(err,items) {
            if(err){
                return;
            };
             if(items == '') {
                console.log("Valid Email");
                collectionSearch.insert({
                    user_id : "22",
                    first_name : "Chad",
                    last_name : "Alpha",
                    password : "Password123",
                    email : "timblakemun@aol.com",
                    city : "Set Your City",
                    picture_url : "https://ichef-1.bbci.co.uk/news/624/cpsprodpb/4F6B/production/_87513302_chad_habre_g.jpg"
                 }).catch(function () {
                        console.log("Insertion");
                     });
            }
            else {
            console.log('invalid email');
            };
        });
        db.close();
 });
console.log('Starting valid user lookup');
console.log('Should return users data');






//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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