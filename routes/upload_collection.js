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
    
    var uploadFile = {path_img: '', path_tmb: '', name: '', id: '', additionallData : {} },
      errors = {},
      this_newCollectionDb = null;
          
      DbCrud.create({}).save(function (err, cb) {
        
      function errHandler(errCode, errMsg){
         
         if (!errCode || !errMsg) return;
         
         var errObj = errMsg ,
            arrErr = (!errors[errCode]) ? [] : errors[errCode];
            arrErr.push(errObj);
            errors[errCode] = arrErr;
            
        /*if (fs.existsSync(uploadFile.path_img)) fs.unlinkSync(uploadFile.path_img);
        if (fs.existsSync(uploadFile.path_tmb)) fs.unlinkSync(uploadFile.path_tmb);
            
        cb.remove(this_newCollectionDb);*/
        
        console.log(fs.existsSync(uploadFile.path_img), 'path_img');
        console.log(fs.existsSync(uploadFile.path_tmb), 'path_tmb');
        //console.log(cb, this_newCollectionDb);    
        //cb.remove(this_newCollectionDb);
        
        console.log(errors);
        
      }
      
            
      if (err) {
          
          errHandler(500, {message: 59});
         // provide log!!
      }
        
      var busboy = new Busboy({ headers: req.headers });
      
      this_newCollectionDb = cb;
        
      uploadFile.id = this_newCollectionDb._id;
      uploadFile.path_tmb = up_config.UPLOAD_PATH_TMB + uploadFile.id;
      uploadFile.path_img = up_config.UPLOAD_PATH_IMG + uploadFile.id;
      
      busboy.on('file', function(fieldname, file, filename) {
        
        uploadFile.path_img += '.' + uploadFile.additionallData.imgType;
        //errors.push('busboy.on FILE');
        //file.pipe(fs.createWriteStream(uploadFile.path_img));
        
        file.on('data', function(data) {

          if (errors.length != up_config.NO_ERR_LN) {
          
           errHandler(errors);
           
           //data.resume();
           
          } 
          
        });
        
        file.on('end', function() {
          
          try {
            
            var name  = uploadFile.name,
              src_img = uploadFile.path_img,
              src_tmb = uploadFile.path_tmb,
              upData;
            
            if (name == null) throw new Error(up_config.DB_ATTR_REC_message); 
            
            upData = { name: name, src_img: src_img, src_tmb: src_tmb, is_deleted: false};
            
            /*DbCrud.updateById(this_newCollectionDb._id, upData).exec(function(err, cb) {
              
              if (err) return next(up_config.DB_CREATE_ERR_message);
              
            });*/
            
            res.send({status: 201 , text: 'created'});
            
            throw new Error();
              
          } catch (err) {
            errHandler(500, {message: 113});
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
            
            if (data.err) {
              
              errHandler(580, {message: data.err});
                
              return;
            }
            
            uploadFile.path_tmb += '.'+ data.type;
            
            /*data.cb.writeFile(uploadFile.path_tmb, function(err){
              
              if (err) throw err;
              
              console.log('trumbnail created', uploadFile.path_tmb);
              
            });*/
            console.log('trumbnail created', uploadFile.path_tmb);
              
          };
          
          imgEdit.createTrumb(prop, cb, resultCb);
         
        } catch (err) {
          
          errHandler(500, {message: '158'});
            
        }
       
      });
      
      busboy.on('finish', function() {
        
        try {
          
          res.end();
          
          throw new Error();
          
        } catch (err) {
        
          errHandler(500, {message : 'Problem with finish parsing data error'});
          
        }
        
        console.log('Done parsing form!');
        
      });
      
      busboy.on('error', function (err) {
        console.log('ERROR!!!', err);
      });
      
      
      req.on('close', function () {
       
        errHandler(400, {message: 'PROBLEM ON CL'});
        
      });
   
      req.pipe(busboy);
      
    });
      
  });
  
  router.use(function(req, res){
    res.send(404, up_config.PAGE_NOT_FOUND_message);
  });
  
  module.exports = router;
  
  console.log("UPLOAD MODULE IS LOADED");
  