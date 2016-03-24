(function(){

  'use strict';

  angular
    .module('galleryApp')
      .service('vDataService', function() { 
        
        var vData = {};
        
        return {
          getVdata: function () {
              return vData;
          },
          setVdata: function(obj) {
              vData = obj;
          }
        };
        
      });
      
})();