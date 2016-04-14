  var express = require('express');
  var bodyParser = require('body-parser');
  var router = express.Router();
  var fs = require('fs');
  var multiparty = require('multiparty');
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
    
    var form = new multiparty.Form();
    
    var uploadFile = {uploadPath: '', type: '', size: 0, name: ''};
    
    var errors = [];

    form.on('error', function(err){
      //if (fs.existsSync(uploadFile.path)) fs.unlinkSync(uploadFile.path);
      errors.push(err);
    });
    
    form.on('close', function() {

      try {
          
        if (errors.length !== up_config.NO_ERR_LN) throw new Error(errors);
          
      } catch (err) {
          
        if (fs.existsSync(uploadFile.path)) fs.unlinkSync(uploadFile.path);
          
        res.send({status: '405', text: errors});
        console.log(err.message);
      }
      
      res.send({status: 201 , text: 'created'});
      
    });
    
    form.on('part', function(part) {
      
      part.on('error', function(){
        res.send(406 , up_config.NOT_ACCEPTABLE_MSG);
      });
      
      uploadFile.size = part.byteCount;
      uploadFile.type = part.headers['content-type'];
      uploadFile.name = part.filename;
      uploadFile.path = up_config.UPLOAD_PATH + uploadFile.name;
      
      var name = uploadFile.name,
          path = up_config.UPLOAD_PATH;
            
      if (name == null || path == null) throw new Error(up_config.DB_ATTR_REC_MSG);
      
      DbCrud.createNewImg(name, path).save(function (err, cb) {
            
        if (err) throw new Error(up_config.DB_CREATE_ERR_MSG);
          
        console.log('create', cb);
            
      });
      
      if (uploadFile.size > up_config.MAX_SIZE) {
          errors.push(up_config.LIM_SIZE_ERR);
      }
      
      if (up_config.SUPPORT_MIME_TYPES.indexOf(uploadFile.type) == -1) {
          errors.push(up_config.MIME_TYPE_ERR + uploadFile.type);
      }

      if (errors.length == up_config.NO_ERR_LN) {

        var out = fs.createWriteStream(uploadFile.path);
          part.pipe(out);
          
      } else {
     
          part.resume();
          
      }

    });
    
    form.parse(req);
    
  });
 
  router.use(function(req, res){
    res.send(404, up_config.PAGE_NOT_FOUND_MSG);
  });
  
  module.exports = router;
  
  console.log("UPLOAD MODULE IS LOADED");
  