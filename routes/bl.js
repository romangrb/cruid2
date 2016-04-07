var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST


router.route('/')
  
  .get(function(req, res, next) {
    res.send("SX");
   
  });

module.exports = router;