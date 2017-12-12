var should = require("should");
var request = require("request");
var expect = require("chai").expect;
var baseUrl = "https://app.ticketmaster.com/discovery/v2/events.json?";
var util = require("util");

describe('returns Ticketmaster api test', function() {
    it('returns result', function(done) {
        request.get({ url: baseUrl +"keyword"+"music"+"&apikey=5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG&size=4&page=1" },
            function(error, response, body) {
            		var bodyObj = JSON.parse(body);
                    console.log(body);
                done();
            });
    });
});