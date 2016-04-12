  var express   = require('express');
  var path      = require('path');
  var routes    = require('./routes/index');
  var crud_db_ctrl = require('./routes/crud_collection_db');
  var upload_ctrl  = require('./routes/upload_collection');
  var app       = express();
  var dbConfig  = require('./model/db');
  var dbModel   = require('./model/db_schema');

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static('./'));
  
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  
  app.use('/', routes);
  app.use('/img', crud_db_ctrl);
  app.use('/upload', upload_ctrl);

  module.exports = app;