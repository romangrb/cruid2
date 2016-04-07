  var express = require('express');
  var bodyParser = require('body-parser');
  var multer = require('multer');
  var storageCustomUpload = require('../model/storage_custom_upload_engine');
  var router = express.Router();
  
  // enable CORS
  router.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "https://cruid2-romangrb.c9users.io/upload");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  router.use(bodyParser.json());  
  
  /*var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname+new Date());
    }
  });*/
  var upConf = {
    onFileUploadComplete: function (file, req, res) {
      console.log('11111111');
    },
    dest: "./uploads/"
    
  };
  
  
  var upload = multer(upConf).array('file', 2);
  
  router.post('/',function(req,res){
    upload(req, res, function(err) {
      //console.log(req.body);
      //console.log(req.files);
      if(err) {
        res.json({error_code:1, err_desc:err});
        return;
      }
      res.json({error_code:0, err_desc:null});
      console.log(this.onFileUploadComplete);
      });
    
      
  });

  module.exports = router;
  
  console.log("UPLOAD MODULE IS LOADED");
  // http://stackoverflow.com/questions/32045027/multer-callbacks-not-working
  // https://www.npmjs.com/package/multer#multer-opts
  /*  var uploadConf = (multer({
    limits: {
      fieldNameSize: 10000,
      files: 20,
      fields: 50
    },
    dest: '../uploads',
    rename: function (fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase();
    },
    onFileUploadStart: function (file) {
        console.log(file.name + ' is starting ...');
    },
    onFileUploadComplete: function (file, req, res) {
        console.log(file.name + ' uploading is ended ...');
        console.log("File name : "+ file.name +"\n"+ "FilePath: "+ file.path);
    },
    onError: function (error, next) {
        console.log("File uploading error: => "+error);
        next(error);
    },
    onFileSizeLimit: function (file) {
        console.log('Failed: ', file.originalname +" in path: "+file.path);
        fs.unlink(path.join(__dirname, '../uploads') + file.path); // delete the partially written file
    }

  }));*/

   
/*var express = require('express');
var app = express();
var multer = require('multer');
var s3 = require('multer-s3');
 
var upload = multer({
  storage: s3({
    dirname: 'uploads/photos',
    bucket: 'some-bucket',
    secretAccessKey: 'some secret',
    accessKeyId: 'some key',
    region: 'us-east-1',
    filename: function (req, file, cb) {
      cb(null, Date.now())
    }
  })
})
 
app.post('/upload', upload.array('photos', 3), function(req, res, next){
  res.send('Successfully uploaded!');
});*/
