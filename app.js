var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}


var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  //insertDocuments(db, function() {
     // findDocuments(db, function() {
     
  db.close();
     // });
  //});
});
/*
db.createCollection('users');


  db.users.insert({ 
    user_id: " ", first_name: " ", last_name: " ", 
    password: " ", email: " ", city: " ", 
    picture_url: " "});
    

  db.events.insert({
  name: " ", id: " ",
  time: " ", date: " ",
  picture_url: " ",
  location: " ", zip: " "});
  
  
  
  google api:
  user_id N
  first name Y
  last name Y
  password N
  email Y
  city N
  picture_url Y
  
  
  Eventfull api:
  name        
  id          N
  time
  date
  pictur_url
  location
  zip
  
*/
