var express = require('express');
var router = express.Router();
var async = require('async');

var https = require('https');//"https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + process.env.TICKET_MASTER_API_KEY + "&size=4&page="+page
console.log("working..");
const options = {
    hostname: "app.ticketmaster.com",
    port: 443,
    path: '/discovery/v2/events.json?apikey=' + process.env.TICKET_MASTER_API_KEY + '&size=4',
};

function makeApiRequest(sendBackResponseToBrowser) {
    // console.log("anything");
    var apiResponse = '';
    
    https.get(options, function(response) {
        response.setEncoding('utf8');
        response.on('data', function(chunk) {
            apiResponse += chunk;
        });
        
        response.on('end', function() {
            var responseJSON = JSON.parse(apiResponse);
            console.log("makeApiRequest");
            console.log(responseJSON);
            //var images = responseJSON.images;
            //var imageURI = images[Math.floor(Math.random() * images.length)].display_sizes[0].uri;
            
            sendBackResponseToBrowser(null, responseJSON);
        });
    }).on("error", function(e) {
        console.log("Got an error: " + e.message);
    });
}



/* GET home page. */
router.get('/', function(req, res, next) {
    async.parallel([
    makeApiRequest,
    ],
    function(err, results) {
        // var data = results[0];
        //var result = results[1];
        // console.log("async");
        // console.log(data);
        // console.log(results);
        

        res.render('events', { events : results[0]._embedded.events });
    });
//   var data;
//   makeApiRequest(function(events) {
//       data = events;
      
//   console.log("start: ");
//   console.log(data);
    //   res.render('profile', {title: process.env.TICKET_MASTER_API_KEY});
    //  console.log("result"); 
//   });
//   res.render('events', { title: process.env.TICKET_MASTER_API_KEY });
});

router.get('/test', function(req, res, next) {
    console.log('*********************here*****************');
//   res.json( {
//       msg: 'hello there',
//      }); 
//   res.render('profile');  
res.render('profile');
});

module.exports = router;