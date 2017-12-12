var should = require("should");
var request = require("request");
var expect = require("chai").expect;
var baseUrl = "//ajax.googleapis.com/ajax/libs/jquery/1.9.0/";
var util = require("util");

describe('returns Google api test', function() {
    it('returns result', function(done) {
        request.get({ url: baseUrl +"jquery.min.js" },
            function(error, response, body) {
            		var bodyObj = JSON.parse(body);
                    console.log(body);
                done();
            });
    });
});