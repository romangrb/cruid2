(function(angular, $){

  'use strict';

  angular
    .module('galleryApp')
      .factory('imgEditService', ['constant', '$timeout' , function(c, $timeout) { 
         
        var Img = {
          
          rotate: function (id){
            
            this.__crntAngle[id] = this.__crntAngle[id] || 0 ;
            
            this.__crntAngle[id] += c.DFLT_STEP_ANG;
            this.__crntAngle[id] = (this.__crntAngle[id] > c.MAX_ANG)? c.DFLT_STEP_ANG :  this.__crntAngle[id];
            
          },
          
          rotateGetVal :  function (id){
            
            return this.__crntAngle[id];
            
          },
          
          rotateClearAllData :  function (id){
            
            this.__crntAngle = {};
            
          },
          
          rotateClearId :  function (id){
            
            if (this.__crntAngle[id]!=null) delete this.__crntAngle[id];
            
          },
          
          rotateClearDataId :  function (id){
            
            this.__crntAngle[id] = 0;
            
          },
          
          getCopy: function (file_data, addData){
            
            if (!file_data && !addData) return; 
            
            var those = this,
              backup = angular.copy(file_data.data, backup);
              
              for (var key in backup) those.__OBJ_TEMPLATE[key] = backup[key];
              
              return those.__OBJ_TEMPLATE;
          },
          
          convertToJSON : function (srcObj, templateObj) {
            
            for (var key in templateObj){
              templateObj[key] = (srcObj[key]) ? srcObj[key] : templateObj[key];
            }
            
            return JSON.stringify(templateObj);
              
          },
         
          setProp : function (objName) {
            
            var obj = {};
              obj[objName] = null;
              this.__OBJ_TEMPLATE = obj;
              
          },
          
          getTypeBitImg : function(str) {
    
            for (var key in this.__typePattHash){
              if (this.__typePattHash[key].test(str)) return key;
            }
            return '';
          },
          
          testName : function (name) {
            
            var ptrn = new RegExp(c.IMG_VALID_PTRN); 
              return ptrn.test(name);
              
          },
          
        };
        
        function PrivProtMethEdit (){
            
          var those = this;
            
          this.__DFLT_KEY_D_BIT = c.DFLT_KEY_D_BIT;
          
          this.__OBJ_TEMPLATE = {};
          
          this.__crntAngle = {};
          
          this.__typePattHash = {
            
            GIF : /gif/i,
            JPG : /jpg/i,
            JPEG : /jpeg/i,
            TIFF : /tiff/i,
            PNG : /png/i,
            BMP : /bmp/i
        
          };
          
        }
        
        PrivProtMethEdit.prototype = Img;
       
        return PrivProtMethEdit;
        
      }]);
      
})(angular, jQuery);        
 