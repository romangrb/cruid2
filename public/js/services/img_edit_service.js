(function(angular, $){

  'use strict';

  angular
    .module('galleryApp')
      .factory('imgEditService', ['constant', function(c) { 
         
        var Img = {
          
          rotate: function (id){
            
            this.__crntAngle[id] = this.__crntAngle[id] || 0 ;
            
            this.__crntAngle[id] += constant.DFLT_STEP_ANG;
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
              those = this;
              
            reader.onload = function (evt) {
              cropData = evt.target.result;
            };
            
            reader.onloadend = function (evt) {
              
              those.__OBJ_TEMPLATE.data = cropData;
              
              return those.__OBJ_TEMPLATE;
            };
              
            reader.readAsDataURL(file_data, reader);
          
            return  $.when(reader.onloadend());
          },
          
          
          setProp : function (objName) {
            
            var obj = {};
              obj[objName] = {'data' : null};
              this.__OBJ_TEMPLATE = obj;
              
          },
          
          testName : function (name) {
            
            var ptrn = new RegExp(c.IMG_VALID_PTRN); 
              return ptrn.test(name);
              
          },
          
        };
        
        function PrivProtMethEdit (){
          
          var those = this;
          
          this.__OBJ_TEMPLATE = {'data' : null};
          
          this.__crntAngle = {};
        }
        
        PrivProtMethEdit.prototype = Img;
       
        return PrivProtMethEdit;
        
      }]);
      
})(angular, jQuery);        
 