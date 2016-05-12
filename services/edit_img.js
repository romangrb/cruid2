var lwip  = require('lwip');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var crud_config = require('../model/crud_model_constant');

var ImgEdit = {
  
  editFromProp : function (objProp) {
  
    var those = this;
     
    if (objProp.imgTrumbBitD) {
     
     var data = those.__getEncodImgFromBase64ToBuff(objProp.imgTrumbBitD);
     
     if (data) {
       
       var d = those.__cropToEqSizes(data);
       console.log('d', d);
     }
     
    }
    
  },
  
};

function ImgEditPrivProtMethProp(){
  
  var those = this;
  
  this.__imgProp = {};
  
  this.__cropToEqSizes = function(srcProp){
    
    var srcObj = {
      buff : srcProp.buff, 
      type : srcProp.type,
      tmp : 0
    };
    
    var cb = function watch(val) {
      srcObj.tmp = val;
    };
    
    /*var fn = function(cb){
      return cb()
    }*/
    // Bind the connection event with the listner1 function
    eventEmitter.on('$watch_val', cb);
    
    lwip.open(srcObj.buff, srcObj.type, function(err, image) {
       
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
          
          image.crop(imgWidth, imgHeight, function(err, cb){
             eventEmitter.emit('$watch_val', 1);
          });      
        }
        
     });
     
     return srcObj;
    
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

/*

            lwip.open(encondedImage, 'JPEG', function(err, image){
              // check err...
              if (err) throw err;
              // define a batch of manipulations and save to disk as JPEG:
              var imgWidth = image.width(),
                imgHeight = image.height();
                
              if (imgWidth != imgHeight) {
                
                var diff = imgWidth-imgHeight;
                
                if (diff>0) {
                  imgWidth = imgWidth - diff;
                } else {
                  imgHeight = imgHeight - diff;
                }
                
              }
              
              image.crop(imgWidth, imgHeight, function(err, cropped) {
                if (err) throw err;
                
                cropped.rotate(90, 'white', function(err, rtdImg) {
                  if (err) throw err;
                
                  rtdImg.writeFile("./uploads/58.jpeg", function(err){
                    if (err) throw err;
                  // done.
                  });
                
                });
                
                
              });
          });
          */