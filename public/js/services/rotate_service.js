(function(angular, $){

  'use strict';

  angular
    .module('galleryApp')
      .factory('RotateService', function() { 
         
        var Rotate = {
          
          getDecodeToStr: function (file_data){
            
            var reader = new FileReader(),
              cropData = null;
               
            reader.onload = function (evt) {
              cropData = evt.target.result;
            };
            
            reader.onloadend = function (evt) {
              this.__OBJ_TEMPLATE['cropData'].data = cropData;
              return this.__OBJ_TEMPLATE;
            };
              
            reader.readAsDataURL(file_data, reader);
          
            return  $.when(reader.onloadend());
          },
          
          setProp : function (objName) {
            var obj = {};
              obj[objName].data = null;
            this.__OBJ_TEMPLATE = obj;
          }
          
        };
        
        function PrivProtMethRotate (){
          
          var those = this;
          
          this.__DEF_NAME_OBJ = function(name){
            those.setProp(name);
          },
          
          this.__OBJ_TEMPLATE = this.__OBJ_TEMPLATE || this._DEF_NAME_OBJ('cropData');
          
        }
        
        PrivProtMethRotate.prototype = Rotate;
       
        return PrivProtMethRotate;
        
      });
      
})(angular, jQuery);        
 