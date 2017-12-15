var express = require('express');
var router = express.Router();
var https = require('https');

var counter = 0;

const options = {
        hostname: "app.ticketmaster.com",
        port: 443,
        path: '/discovery/v2/events.json?apikey=' + process.env.TICKET_MASTER_API_KEY + '&size=5'
};
    
function makeApiRequest(sendBackResponseToBrowser) {
    var apiResponse = '';
    https.get(options, function(response) {
        response.setEncoding('utf8');
        response.on('data', function(chunk) {
            apiResponse += chunk;
        });
        
        response.on('end', function() {
            var responseJSON = JSON.parse(apiResponse);
            // console.log("events api");
            // console.log(responseJSON._embedded.events);
            responseJSON = responseJSON._embedded.events;
            sendBackResponseToBrowser(responseJSON);
        });
    }).on("error", function(e) {
        console.log("Got an error: " + e.message);
    });
}



function searchEvents(searchCriteria, searchValue, pageCount, sendBackResponseToBrowser) {
    const options2 = {
        hostname: "app.ticketmaster.com",
        port: 443,
        path: '/discovery/v2/events.json?' + searchCriteria + '=' + searchValue + '&apikey=' + process.env.TICKET_MASTER_API_KEY + '&size=' + pageCount,
    };
    
    
    //Getting the date
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    
    if (dd < 10) {
    dd = '0' + dd;
    }
    if (mm < 10) {
    mm = '0' + mm;
    }
    // 2017-12-06T16:37:00Z
    let today = yyyy + '-' + mm + '-' + dd + 'T00:00:00Z';
        
    var apiResponse = '';
    https.get(options2, function(response) {
        response.setEncoding('utf8');
        response.on('data', function(chunk) {
            apiResponse += chunk;
        });
        
        response.on('end', function() {
            var responseJSON = JSON.parse(apiResponse);
            // console.log("events api");
            // console.log(responseJSON._embedded.events);
            responseJSON = responseJSON._embedded.events;
            sendBackResponseToBrowser(responseJSON);
        });
    }).on("error", function(e) {
        console.log("Got an error: " + e.message);
    });
}


module.exports.makeApiRequest = makeApiRequest;
module.exports.searchEvents = searchEvents;