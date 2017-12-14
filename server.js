//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.

//(Focus on This Variable)
//var url = 'mongodb://localhost:27017/name_picker';  
var url = 'mongodb://admin123:admin123@ds147799.mlab.com:47799/name_picker';
// var url = 'mongodb://heroku_65bffdk0:Sax0ph0ne@ds137336.mlab.com:37336/heroku_65bffdk0/name_picker'
//(Focus on This Variable)

// Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    // do some work here with the database.

    //Close connection
    db.close();
  }
});