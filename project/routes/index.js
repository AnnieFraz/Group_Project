var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: process.env.TICKET_MASTER_API_KEY });
});

router.get('/test', function(req, res, next) {
  res.render('events', {data : 'data'});
});

module.exports = router;