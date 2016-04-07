var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var router = express.Router();

router.use(function(req, res, next) { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "https://cruid2-romangrb.c9users.io/upload");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/*router.use(logger('dev'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());*/
//router.use(express.static(path.join(__dirname, 'public')));

router.use(express.static('./'));
  
  var storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, datetimestamp);
    }
    
  });
  
  var upload = multer({
    storage: storage
  }).single('file');

  //  API path that will upload the files 
  router.post('/', function(req, res, next){
   
    upload(req, res, function(err){
      if(err){
        res.json({error_code:1, err_desc:err});
        return;
      }
      res.json({error_code:0,err_desc:null});
    });
    
  });


router.route('/')
  
  .get(function(req, res, next) {
    res.send("SX");
   
  });

module.exports = router;
console.log("MODULE");






