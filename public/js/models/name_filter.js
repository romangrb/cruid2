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
          
          var ptrn = new RegExp(c.IMG_PTRN), 
            imgSearchId = str.search(ptrn);
            
          str = ( imgSearchId > -1 ) ? str.slice( 0, imgSearchId ) : str;
            
          return str;
            
        };
    }]);

})(angular);