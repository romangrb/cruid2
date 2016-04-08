  var express = require('express');
  var bodyParser = require('body-parser');
  var router = express.Router();
  var fs = require('fs');
  var multiparty = require('multiparty');

  // enable CORS
  router.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "https://cruid2-romangrb.c9users.io/upload");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  router.use(bodyParser.json());  
  
  router.post('/', function(req, res, next) {
    
    if (req.url!='/') next();
    
    var form = new multiparty.Form();
    
    var uploadFile = {uploadPath: '', type: '', size: 0};
    
    var maxSize = 30 * 1024 * 1024; // MB
    
    var supportMimeTypes = ['image/jpg', 'image/jpeg', 'image/png'];
    
    var errors = [];

    form.on('error', function(){
     
      if(fs.existsSync(uploadFile.path)) {
          fs.unlinkSync(uploadFile.path);
      }
      
    });
    
    form.on('close', function() {
        
      if(errors.length == 0) {
        res.send({status: 201, text: 'created'});
      } else {
        
        if(fs.existsSync(uploadFile.path)) {
           fs.unlinkSync(uploadFile.path);
        }
        
      res.send({status: '5XX', text: errors});
      
      }
      
    });
    
    form.on('part', function(part) {
        
      part.on('error', function(){
        res.send(400, 'Error of reciving');
      });
      
      uploadFile.size = part.byteCount;
      uploadFile.type = part.headers['content-type'];
      uploadFile.path = './uploads/' + new Date().getTime() + part.filename;
      
      if(uploadFile.size > maxSize) {
          errors.push('File size is ' + uploadFile.size + '. Limit is' + (maxSize / 1024 / 1024) + 'MB.');
      }
      
      if(supportMimeTypes.indexOf(uploadFile.type) == -1) {
          errors.push('Unsupported mimetype ' + uploadFile.type);
      }

      if(errors.length == 0) {
        
        var out = fs.createWriteStream(uploadFile.path);
          part.pipe(out);
          
      } else {
        
          part.resume();
          
      }
        
    });
    
    form.parse(req);
    
  });
 
  router.use(function(req, res){
    res.send(404, 'Page not found');
  });
  
  module.exports = router;
  
  console.log("UPLOAD MODULE IS LOADED");
  