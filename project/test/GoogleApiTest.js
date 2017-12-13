//setting up variables
var should = require("should");
var request = require("request");
var expect = require("chai").expect;
var baseUrl = "https://apis.google.com";
var util = require("util");

//getting a json file from an api
describe('returns Google api test', function() {
    it('returns result', function(done) {
        request.get({ url: baseUrl +"/js/platform.js" },
            function(error, response, body) {
            		var bodyObj = JSON.parse(body);
                    console.log(body);
                done();
            });
    });
});