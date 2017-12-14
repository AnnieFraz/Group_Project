var should = require("should");
var request = require("request");
var expect = require("chai").expect;
var baseUrl = "https://app.ticketmaster.com/discovery/v2/events.json?";
var util = require("util");

//Testing a json file from the ticketmaster api
describe('returns Ticketmaster api test', function() {
    it('returns results from keyword=music', function(done) {
        request.get({ url: baseUrl +"city"+"Boston"+"&apikey=5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG&size=4&page=1" },
            function(error, response, body) {
            		var bodyObj = JSON.parse(body);
                    console.log(body);
                done();
            });
    });
});