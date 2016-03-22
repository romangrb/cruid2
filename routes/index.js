var express = require('express');
var router = express.Router();

// server routes ===========================================================
// handle things like api calls
// authentication routes

// frontend routes =========================================================
// route to handle all angular requests
/* GET home page. */
router.get('/', function(req, res, next) {
  /*res.render('index', { title: 'Express' });*/
  res.sendfile('./public/index.html');
});

module.exports = router;
