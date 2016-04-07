  var express = require('express');
  var bodyParser = require('body-parser');
  var multer = require('multer');
  var crypto = require('crypto');
  var path = require("path");
  //var storageCustomUpload = require('../model/storage_custom_upload_engine')('./uploads');
  var router = express.Router();
  var fs = require('fs');
  
  // enable CORS
  router.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "https://cruid2-romangrb.c9users.io/upload");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  router.use(bodyParser.json());  
  
  var storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
      
      cb(null, './uploads');
    },
    
    filename: function (req, file, cb) {
      
      crypto.pseudoRandomBytes(16, function (err, raw) {
      
      if (err) return cb(err);

      cb(null, raw.toString('hex') + path.extname(file.originalname));
      
      });
      
    }
    
  });
  
  var upload = multer({storage:storage}).array('file' ,4);
 
  router.post('/', function(req,res){
    
    upload(req, res, function(err) {
      
      if(err) {
        res.json({error_code:1, err_desc:err});
        return;
      }
      res.json({error_code:0, err_desc:null});
      
      });
      
  });

  module.exports = router;
  
  console.log("UPLOAD MODULE IS LOADED");
  // http://stackoverflow.com/questions/32045027/multer-callbacks-not-working
  // https://www.npmjs.com/package/multer#multer-opts
