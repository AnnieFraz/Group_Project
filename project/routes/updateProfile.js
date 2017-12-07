var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('updateProfile', { title: process.env.TICKET_MASTER_API_KEY });
});

module.exports = router;