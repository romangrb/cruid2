(function(angular){

  'use strict';

  angular
    .module('galleryApp')
      .service('random', function() { 
        
        return {
          
          makeId : function(ln){
            ln = ln || 5;
            var str = '',
             possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        
            for( var i=0; i < ln; i++ )
                str += possible.charAt(Math.floor(Math.random() * possible.length));
            return str;
            }
            
          };
        
      });
      
})(angular);
