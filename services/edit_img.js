var lwip  = require('lwip');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var crud_config = require('../model/crud_model_constant');

var ImgEdit = {
  
  createTrumb : function (objProp, cb, resultCb) {
  
    var those = this,
     data = those.__getEncodImgFromBase64ToBuff(objProp.data);
     
    if (!data) return resultCb({err:'not supported data type parsing'});
    
    those.__cropToEqSizes(data.buff, data.type);
    // Bind the connection event with the listner1 function
    cb(eventEmitter.on('$watch_val', function(callback) {
      
      if (callback.err) return resultCb({err:callback.err, cb:null});
      
      callback.cb.rotate(objProp.ang, 'white', function(err, rtdImg) {
        
        resultCb({err:err, cb:rtdImg, type:callback.type});
        
      });
      
    }));
    
  },
  
  editImg : function (objProp, cb, resultCb) {
    
  },
  
};

function ImgEditPrivProtMethProp(){
  
  var those = this;
  
  this.__cropToEqSizes = function(buff, type){

    lwip.open(buff, type, function(err, image) {
       
        if (err) throw err;
         
        var imgWidth = image.width(),
          imgHeight = image.height(),
          diff;
         
        if (imgWidth != imgHeight) {
          
          diff = imgWidth-imgHeight;
          
          if (diff > 0) {
            imgWidth = imgWidth - diff;
          } else {
            imgHeight = imgHeight - diff;
          }
          
        }
        
        image.crop(imgWidth, imgHeight, function(err, cb){
          eventEmitter.emit('$watch_val', {err:err ,cb:cb, type:type});
        });
        
     });
    
  };
  
  this.__typePattHash = {
      
    GIF : /^data:image\/gif;base64,/i,
    JPG : /^data:image\/jpg;base64,/i,
    JPEG : /^data:image\/jpeg;base64,/i,
    TIFF : /^data:image\/tiff;base64,/i,
    PNG : /^data:image\/png;base64,/i,
    BMP : /^data:image\/bmp;base64,/i

  };
  
  this.__getTypeBitImg = function(str) {
    
    for (var key in those.__typePattHash){
      if (those.__typePattHash[key].test(str)) return key;
    }
    return false;
  };
  
  this.__getEncodImgFromBase64ToBuff = function(str) {
    
    var type = those.__getTypeBitImg(str);
    
    if (!type) return false;
    
    try {
      var buffEnc =  new Buffer(str.replace(those.__typePattHash[type], ""), 'base64');
    } catch (err) {
      return false;
    }
    
    return {type:type, buff:buffEnc};
    
  };
  
}

ImgEditPrivProtMethProp.prototype = ImgEdit;

var ImgEditService = new ImgEditPrivProtMethProp;

module.exports = ImgEditService;
