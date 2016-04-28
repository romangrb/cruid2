(function(angular, $){

  'use strict';

  angular
    .module('galleryApp')
      .factory('imgEditService', ['constant', function(c) { 
         
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
          
          getDecodeToStr: function (file_data){
            
            if (!file_data) return; 
            
            var reader = new FileReader(),
              cropData = null,
              those = this,
              dataKey = those.__DFLT_KEY_D_BIT;;
              
            reader.onload = function (evt) {
              cropData = evt.target.result;
            };
            
            reader.onloadend = function (evt) {
              
              those.__OBJ_TEMPLATE[dataKey] = cropData;
                            
              return those.__OBJ_TEMPLATE;
            };
              
            reader.readAsDataURL(file_data, reader);
          
            return  $.when(reader.onloadend());
          },
          
          convertToJSON : function (srcObj, templateObj) {
            
            for (var key in templateObj){
              
              templateObj[key] = (typeof(srcObj[key])==='String') ? srcObj[key] : templateObj[key];
              
            }
            
            return templateObj;
              
          },
         
          setProp : function (objName) {
            
            var obj = {};
              obj[objName] = null;
              this.__OBJ_TEMPLATE = obj;
              
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
          
        }
        
        PrivProtMethEdit.prototype = Img;
       
        return PrivProtMethEdit;
        
      }]);
      
})(angular, jQuery);        
 