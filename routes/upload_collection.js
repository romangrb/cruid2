  var express = require('express');
  var bodyParser = require('body-parser');
  var router = express.Router();
  var fs = require('fs');
  //var path = require('path');
  var Busboy  = require('busboy');
  //var lwip  = require('lwip');
  var getTypeFormat = require('../services/convert_type');
  var DbCrud = require('../services/crud_mongose_db');
  var imgEdit = require('../services/edit_img');
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
    
    var uploadFile = {path_img: '', path_tmb: '', img_type: '', size: 0, name: '', id: '', additionallData : {} },
      errors = [],
      this_newCollectionDb = null;
          
      DbCrud.create({}).save(function (err, cb) {
            
      if (err) return console.log(up_config.DB_CREATE_ERR_MSG); // provide log!!
        
      var busboy = new Busboy({ headers: req.headers });
      
      this_newCollectionDb = cb;
        
      uploadFile.id = this_newCollectionDb._id;
      uploadFile.path_tmb = up_config.UPLOAD_PATH_TMB + uploadFile.id;
      uploadFile.path_img = up_config.UPLOAD_PATH_IMG + uploadFile.id;
      
      busboy.on('file', function(fieldname, file, filename) {
        
        uploadFile.path_img += '.' + uploadFile.additionallData.imgType;

        file.pipe(fs.createWriteStream(uploadFile.path_img));
        
        file.on('data', function(data) {
          
          if (errors.length != up_config.NO_ERR_LN) {
          
           busboy.abort();
           
           data.resume();
           
          } 
          
        });
        
        file.on('end', function() {
          
          try {
            
            if (errors.length !== up_config.NO_ERR_LN) throw new Error(errors);
            
            var name = uploadFile.name,
              src_img = uploadFile.path_img,
              src_tmb = uploadFile.path_tmb,
              upData;
            
            if (name == null) throw new Error(up_config.DB_ATTR_REC_MSG); 
            
            upData = { name: name, src_img: src_img, src_tmb: src_tmb, is_deleted: false};
            
            DbCrud.updateById(this_newCollectionDb._id, upData).exec(function(err, cb) {
              
              if (err) return next(up_config.DB_CREATE_ERR_MSG);
              
            });
            
            res.send({status: 201 , text: 'created'});
              
          } catch (err) {
            
            if (fs.existsSync(uploadFile.path_img)) fs.unlinkSync(uploadFile.path_img);
            if (fs.existsSync(uploadFile.path_tmb)) fs.unlinkSync(uploadFile.path_tmb);
            
            cb.remove(this_newCollectionDb);
            
            res.send({status: '405', text: errors});
            
          }
            
        });
        
      });
      
      busboy.on('field', function(fieldname, val) {
        
        try {
          
          uploadFile.additionallData = JSON.parse(val);
          
          var prop = {
            data : uploadFile.additionallData.imgTrumbBitD,
            ang : uploadFile.additionallData.imgTrumbAng,
          };
          
          var cb = function(obj){},
           resultCb = function(data){
            
            if (data.err) return console.log(data);
            
            uploadFile.path_tmb += '.'+data.type;
            
            data.cb.writeFile(uploadFile.path_tmb, function(err){
              
              if (err) throw err;
              
              console.log('trumbnail created', uploadFile.path_tmb);
              
            });
            
          };
          
          imgEdit.createTrumb(prop, cb, resultCb);
         
        } catch (e) {
          
        /*if (fs.existsSync(uploadFile.path_img)) fs.unlinkSync(uploadFile.path_img);
          if (fs.existsSync(uploadFile.path_tmb)) fs.unlinkSync(uploadFile.path_tmb);
        
          cb.remove(this_newCollectionDb);
        */
          console.log('FN ERROR ...');
        }
       
      });
      
      busboy.on('finish', function() {
        
        res.end(); 
        console.log('Done parsing form!');
        
      });
      
      busboy.on('error', function (err) {
        console.log('ERROR!!!', err);
      });
      
      busboy.on('abort', function (err) {
        console.log('ABORT !!!', err);
      });
      
      req.on('close', function () {
        console.log('FILE ABORTED CLIENT SIDE');
        
        if (fs.existsSync(uploadFile.path_img)) fs.unlinkSync(uploadFile.path_img);
        if (fs.existsSync(uploadFile.path_tmb)) fs.unlinkSync(uploadFile.path_tmb);
        
        cb.remove(this_newCollectionDb);
        
        res.send({status: '405', text: errors});
        
      });
   
      req.pipe(busboy);
      
    });
      
  });
  
  router.use(function(req, res){
    res.send(404, up_config.PAGE_NOT_FOUND_MSG);
  });
  
  module.exports = router;
  
  console.log("UPLOAD MODULE IS LOADED");
  