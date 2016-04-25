(function (angular) {
  
  "use strict";
  
  angular.module('galleryApp')
    .filter('toOnlyNameImg', ['$filter', 'constant', function ($filter, c) {
        
        return function (str) {
          
          try { 
            if (typeof(str)!= 'string') throw new Error(c.DFLT_IMG_STR_TYPE_ERR_MSG);
          }
          
          catch(err) {
            
            console.error('\n', ' message : ' + err, 
                          '\n' , ' fileName : ' + err.fileName,
                          '\n' , ' line : ' + err.lineNumber
                         );
          }
          
          var imgSearchId = str.search(c.IMG_PTRN);
            
          str = ( imgSearchId > -1 ) ? str.slice(0, imgSearchId) : str;

          return str;
            
        };
    }]);

})(angular);