(function(angular, $){

  'use strict';

  angular
    .module('galleryApp')
      .factory('imgEditService', function() { 
         
        /* 
         crntAngle += constant.DFLT_STEP_ANG;
          crntAngle = (crntAngle>constant.MAX_ANG)? constant.DFLT_STEP_ANG :  crntAngle;
          
          $scope.angle = crntAngle;
          $scope.tmpId = id;
          upTarget.data.angle = crntAngle;*/
         
         
        var Img = {
          
          getDecodeToStr: function (file_data){
            
            if (!file_data) return; 
            
            var reader = new FileReader(),
              cropData = null,
              those = this;
              
            reader.onload = function (evt) {
              cropData = evt.target.result;
            };
            
            reader.onloadend = function (evt) {
              
              those.__OBJ_TEMPLATE['cropData'].data = cropData;
              
              return those.__OBJ_TEMPLATE;
            };
              
            reader.readAsDataURL(file_data, reader);
          
            return  $.when(reader.onloadend());
          },
          
          
          setProp : function (objName) {
            
            var obj = {};
              obj[objName] = {'data' : null};
              this.__OBJ_TEMPLATE = obj;
              
          }
          
          
        };
        
        function PrivProtMethEdit (){
          
          var those = this;
          
          this.__OBJ_TEMPLATE = {'cropData': {'data' : null}};
            
        }
        
        PrivProtMethEdit.prototype = Img;
       
        return PrivProtMethEdit;
        
      });
      
})(angular, jQuery);        
 