  var express = require('express'),
    router = express.Router(),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    multer = require('multer');
  
  router.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "https://cruid2-romangrb.c9users.io/upload");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  router.use(logger('dev'));
  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(cookieParser());
  router.use(express.static(path.join(__dirname, 'public')));
  
  // Serving from the same express Server no CORS required
  router.use(express.static('./'));
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
  router.post('/upload', function(req, res, next){
    
    upload(req, res, function(err){
      if(err){
        res.json({error_code:1, err_desc:err});
        return;
      }
      res.json({error_code:0,err_desc:null});
    });
    
  });


module.exports = router;
