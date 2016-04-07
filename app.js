  var express   = require('express');
  var path      = require('path');
  var routes    = require('./routes/index');
  var blobs     = require('./routes/blobs');
  var app       = express();
  var dbConfig  = require('./model/db');
  var dbModel   = require('./model/blobs');
  
  app.use(express.static(path.join(__dirname, 'public')));
  
  app.use('/', routes);
  app.use('/blobs', blobs);
  
  app.use(express.static('./'));
  
  
  module.exports = app;
