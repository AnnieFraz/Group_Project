  //Testing the server - once set up
var express = require('express'); // (npm install --save express)
var request = require('supertest');
const expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var url = 'mongodb://localhost:27017/name_picker';

////////////////////////////////////////////////////  Test 1  //////////////////////////////////////////////////////////////////
//Testing that we can connect to our server
function dataBaseconnect(MongoClient, url) {
     MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        db.close();
     });
    
}
////////////////////////////////////////////////////  Test 2  //////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////  Test 3  //////////////////////////////////////////////////////////////////
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
 ////////////////////////////////////////////////////  Test 4  //////////////////////////////////////////////////////////////////
console.log('Starting valid user lookup');
console.log('Should return users data');
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var collectionSearch =db.collection('users');
    var emailNew = "timblakemun@aol.com";
    collectionSearch.find({email: emailNew}).toArray(function(err,items) {
            if(err){
                return;
            };
             if(items == '') {
               console.log('User does not exist!');
            }
            else {
            console.log('User exists: ' + items.toArray());
            };
        });
        db.close();
 });
 ////////////////////////////////////////////////////  Test 5  //////////////////////////////////////////////////////////////////
console.log('Starting invalid user lookup');
console.log('Should return an error');
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var collectionSearch =db.collection('users');
    var emailNew = "timblakemun855887@aol.com";
    collectionSearch.find({email: emailNew}).toArray(function(err,items) {
            if(err){
                return;
            };
             if(items == '') {
               console.log('User does not exist!');
            }
            else {
            console.log('User exists: ' + items.toArray());
            };
        });
        db.close();
 });
 ////////////////////////////////////////////////////  Test 6  //////////////////////////////////////////////////////////////////
console.log('Starting adding saved events test');
console.log('Should return users data');
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var collectionSearch =db.collection('savedEvents');
    var userId = '22';
    collectionSearch.insert({
       user_id: "22", name: "Underground Clawfish Fight", 
       id: "1",
       time: "11:00(PM)", date: "12/27/2017",
       picture_url: "https://vignette.wikia.nocookie.net/starwars/images/e/e2/Clawfish.jpg/revision/latest?cb=20110303190054",
       location: "Behind the Otter Express, CSUMB", zip: "93933"});
                 }).catch(function () {
                        console.log("Insertion");
                        });
////////////////////////////////////////////////////  Test 7  //////////////////////////////////////////////////////////////////
console.log('Starting new user creation test');
console.log('Should return a insertion propmt');
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
                    user_id : "26",
                    first_name : "Bradly",
                    last_name : "Thompson",
                    password : "Password123",
                    email : "timblakemuney4687@aol.com",
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
 ////////////////////////////////////////////////////  Test 8  //////////////////////////////////////////////////////////////////
console.log('Starting valid data return');
console.log('Should return users data');
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var collectionSearch =db.collection('users');
    var emailNew = "timblakemun@aol.com";
    collectionSearch.find({email: emailNew}).toArray(function(err,items) {
            if(err){
                return;
            };
             if(items == '') {
               console.log('User does not exist!');
            }
            else {
            console.log('User exists: ' + items.toArray());
            };
        });
        db.close();
 });
 ////////////////////////////////////////////////////  Test 9  //////////////////////////////////////////////////////////////////
console.log('Starting invalid empty data return');
console.log('Should return error saying empty results');
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var collectionSearch =db.collection('users');
    var emailNew = "timblakemun@aol.com";
    collectionSearch.find({email: emailNew}).toArray(function(err,items) {
            if(err){
                return;
            };
             if(items == '') {
               console.log('User does not exist because of empty results');
            }
            else {
            console.log('User exists: ' + items.toArray());
            };
        });
        db.close();
 });
 console.log('Finished testing');
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
