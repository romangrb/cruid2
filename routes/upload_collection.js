  var express = require('express');
  var bodyParser = require('body-parser');
  var router = express.Router();
  var fs = require('fs');
  var path = require('path');
  var Busboy  = require('busboy');
  var getTypeFormat = require('../services/convert_type');
  var DbCrud = require('../services/crud_mongose_db');
  var up_config = require('../model/upload_model_constant');
  
  // enable CORS
  router.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "https://cruid2-romangrb.c9users.io/upload");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  router.use(bodyParser.json());
  
  router.post('/', function(req, res, next) {
  
    if (req.url!=='/') next();
    
    var uploadFile = {uploadPath: '', type: '', size: 0, name: '', id: '', additionallData : {} },
      errors = [],
      this_newCollectionDb = null;
    
      DbCrud.create({}).save(function (err, cb) {
            
      if (err) return console.log(up_config.DB_CREATE_ERR_MSG); // provide log!!
        
      var busboy = new Busboy({ headers: req.headers });
      
      
      this_newCollectionDb = cb;
        
      uploadFile.id = this_newCollectionDb._id;
      
      
      busboy.on('file', function(fieldname, file, filename) {
         console.log(uploadFile.additionallData, 3);
        
        //uploadFile.type = req.headers;
        
        uploadFile.path = up_config.UPLOAD_PATH + uploadFile.id;// + getTypeFormat(file.filename);
        
        //file.pipe(fs.createWriteStream(uploadFile.path));
        
        /*file.on('data', function(data) {
          
          if (errors.length == up_config.NO_ERR_LN) {
             
          } else {
           
           busboy.abort();
           
           data.resume();
              
          }
         // console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        });*/
        
        file.on('end', function() {
          
          try {
            
            if (errors.length !== up_config.NO_ERR_LN) throw new Error(errors);
            
            var name = uploadFile.name,
              src = uploadFile.path,
              upData;
            
            if (name == null) throw new Error(up_config.DB_ATTR_REC_MSG); 
            
            upData = { name: name, src: src, is_deleted: false };
            
           /* DbCrud.updateById(this_newCollectionDb._id, upData).exec(function(err, cb) {
              
              if (err) return next(up_config.DB_CREATE_ERR_MSG);
              
            });*/
             
            res.send({status: 201 , text: 'created'});
              
          } catch (err) {
            
            if (fs.existsSync(uploadFile.path)) fs.unlinkSync(uploadFile.path);
            
            cb.remove(this_newCollectionDb);
            
            res.send({status: '405', text: errors});
            
          }
           
            
        });
        
      });
      
      busboy.on('field', function(fieldname, val) {
        
        try {
          uploadFile.additionallData = JSON.parse(val);
        } catch (e) {
          console.log('PARSE ERR');
        }
          
      });
      
      busboy.on('error', function (err) {
        console.log('ERROR!!!', err);
      });

      busboy.on('finish', function() {
        
        res.end(); 
        console.log('Done parsing form!');
        
      });
      
      busboy.on('aborted', function() {
        // DO SOMETHING HERE ... maybe return error to the client
        console.log('aborted');
      });
      
      req.pipe(busboy);
      
    });
    
    req.on('close', function () {
        console.log('FILE ABORTED CLIENT SIDE');
        
        if (fs.existsSync(uploadFile.path)) fs.unlinkSync(uploadFile.path);
          
        res.send({status: '405', text: errors});
      
      });
    
    
  });
 
  router.use(function(req, res){
    res.send(404, up_config.PAGE_NOT_FOUND_MSG);
  });
  
  module.exports = router;
  
  console.log("UPLOAD MODULE IS LOADED");
  