  var express = require('express');
  var bodyParser = require('body-parser');
  var router = express.Router();
  var fs = require('fs');
  //var path = require('path');
  var Busboy  = require('busboy');
  //var lwip  = require('lwip');
  var winston  = require('winston');
  var getTypeFormat = require('../services/convert_type');
  var DbCrud = require('../services/crud_mongose_db');
  var imgEdit = require('../services/edit_img');
  var up_config = require('../model/upload_model_constant');
  
  var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({ 
        level: 'error' 
      }),
      new (winston.transports.File)({
        filename: up_config.LOG_PATH + 'info',
        level: 'info'
      })
    ]
  });
  
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
      this_newCollectionDb = null;
          
      DbCrud.create({}).save(function (err, cb) {
        
        function errHandler(errMsg){   
              
          errMsg = errMsg || undefined;
              
          if (fs.existsSync(uploadFile.path_img)) fs.unlinkSync(uploadFile.path_img);
          if (fs.existsSync(uploadFile.path_tmb)) fs.unlinkSync(uploadFile.path_tmb);
              
          cb.remove(this_newCollectionDb);
          // logging error / info
          logger.info(errMsg);
          
          req.unpipe(busboy);
          // `Connection: close` is important here, to ensure the socket is closed after
          // we write our response.
          res.writeHead(400, { 'Connection': 'close'});
          res.end();
          
        }
      
      if (err) {
          
          errHandler({ type:500, time: new Date(), message: 1 });

      }
      
    var busboy = new Busboy({ headers: req.headers }); 
      this_newCollectionDb = cb;
        
      uploadFile.id = this_newCollectionDb._id;
      uploadFile.path_tmb = up_config.UPLOAD_PATH_TMB + uploadFile.id;
      uploadFile.path_img = up_config.UPLOAD_PATH_IMG + uploadFile.id;
      
      busboy.on('file', function(fieldname, file, filename) {
        
        uploadFile.path_img += '.' + up_config.DFLT_TRUMB_TYPE;
        uploadFile.name = uploadFile.additionallData.name;
        
        //file.pipe(fs.createWriteStream(uploadFile.path_img));
        
        file.on('data', function(data) {
          
        });
        
        file.on('end', function() {
          
          try {
            
            var name  = uploadFile.name,
              src_img = uploadFile.path_img,
              src_tmb = uploadFile.path_tmb,
              upData;
            
            upData = { name: name, src_img: src_img, src_tmb: src_tmb, is_deleted: false };
            
            DbCrud.updateById(this_newCollectionDb._id, upData).exec(function(err, cb) {
              
              if (err) return errHandler({ type:500, time: new Date(), message: up_config.DB_CREATE_ERR_message });
              
            });
            
            res.send({status: 201 , text: 'created'});
              
          } catch (err) {
            errHandler({ type:500, time: new Date(), message: 3 });
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
              
              errHandler({ type:580, time: new Date(), message: data.err });
                
              return;
            }
            
            uploadFile.path_tmb += '.'+ up_config.DFLT_TRUMB_TYPE;
            
            data.cb.writeFile(uploadFile.path_tmb, function(err){
              
              if (err) throw err;
              
              console.log('trumbnail created', uploadFile.path_tmb);
              
            });
            console.log('trumbnail created', uploadFile.path_tmb);
              
          };
          
          imgEdit.createTrumb(prop, cb, resultCb);
         
        } catch (err) {
          
          errHandler({ type:580, time: new Date(), message:'err' });
            
        }
       
      });
      
      busboy.on('finish', function() {
        
        try {
          
          res.end();
          
        } catch (err) {
          
          errHandler({ type:580, time: new Date(), message: 'Problem with finish parsing data error' });
          
        }
        
        console.log('Done parsing form!');
        
      });
      
      busboy.on('error', function (err) {
        
        errHandler({ type:580, time: new Date(), message: 'Bussboy error, msg :' + err });
        console.log('ERROR!!!', err);
      });
      
      
      req.on('close', function () {
        
        errHandler(400, { type:580, time: new Date(), message: 'PROBLEM ON CL'});
        
      });
   
      req.pipe(busboy);
      
    });
      
  });
  
  router.use(function(req, res){
    res.send(404, up_config.PAGE_NOT_FOUND_message);
  });
  
  module.exports = router;
  
  console.log("UPLOAD MODULE IS LOADED");
  