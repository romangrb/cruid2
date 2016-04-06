  var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    multer = require('multer');
  
  var db = require('./model/db'),
    blob = require('./model/blobs');
  
  var routes = require('./routes/index'),
    blobs = require('./routes/blobs');
  
  var app = express();
  
  app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "https://cruid2-romangrb.c9users.io/upload");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  
  app.use('/', routes);
  app.use('/blobs', blobs);
  // Serving from the same express Server no CORS required
  app.use(express.static('./'));
  // multers disk storage settings
  
  var storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + 
        file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
  });
  
  var upload = multer({
    storage: storage
  }).single('file');

  /** API path that will upload the files */
  app.post('/upload', function(req, res, next){
    
    req.on('end', function() {
      console.log("end");
      // empty 200 OK response for now
      //res.writeHead(200, "OK", {'Content-Type': 'text/html'});
      //res.end();
    });
    
    upload(req, res, function(err){
      if(err){
        res.json({error_code:1, err_desc:err});
        return;
      }
      res.json({error_code:0,err_desc:null});
    });
    
  });
  
  // error handlers
  
  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
          res.status(err.status || 500);
          res.render('error', {
              message: err.message,
              error: err
          });
      });
  }
  
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
  
  module.exports = app;
