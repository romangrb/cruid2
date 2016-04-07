  var express = require('express');
  var bodyParser = require('body-parser');
  var multer = require('multer');
  var router = express.Router();
  // enable CORS
  router.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "https://cruid2-romangrb.c9users.io/upload");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  router.use(bodyParser.json());  
  
  var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname);
    }
  });
  
  var upload = multer({ storage : storage }).array('file',2);  
  
  router.post('/',function(req,res){
    upload(req, res, function(err) {
      //console.log(req.body);
      //console.log(req.files);
      if(err) {
        res.json({error_code:1, err_desc:err});
        return;
      }
      res.json({error_code:0, err_desc:null});
      });
  }); 

  module.exports = router;
  
  console.log("UPLOAD MODULE IS LOADED");






