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
  
//здесь происходит сама загрузка
router.post('/', function(req, res, next) {
    
    if (req.url!='/') next();
    
    var form = new multiparty.Form();
    
    var uploadFile = {uploadPath: '', type: '', size: 0};
    
    var maxSize = 20 * 1024 * 1024; //2MB
    
    var supportMimeTypes = ['image/jpg', 'image/jpeg', 'image/png'];
    
    var errors = [];

    form.on('error', function(err){
        if(fs.existsSync(uploadFile.path)) {
            //если загружаемый файл существует удаляем его
            fs.unlinkSync(uploadFile.path);
            console.log('error');
        }
    });

    form.on('close', function() {
        //если нет ошибок и все хорошо
        if(errors.length == 0) {
            //сообщаем что все хорошо
            res.send({status: 'ok', text: 'Success'});
        } else {
        if(fs.existsSync(uploadFile.path)) {
            //если загружаемый файл существует удаляем его
            fs.unlinkSync(uploadFile.path);
        }
        //сообщаем что все плохо и какие произошли ошибки
        res.send({status: 'bad', errors: errors});
        }
    });

    
    // при поступление файла
    form.on('part', function(part) {
      
        part.on('error', function(){
          
          res.on('error', function(){});
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
            //пропускаем
            //вообще здесь нужно как-то остановить загрузку и перейти к onclose !!!!
            part.resume();
            
        }
        
    });

    // парсим форму
    form.parse(req);
});
 
  router.use(function(req, res){
    res.send(404, 'Page not found');
  });
  
  module.exports = router;
  
  console.log("UPLOAD MODULE IS LOADED");
  