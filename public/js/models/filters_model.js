(function (angular) {
  
  "use strict";
  
  angular.module('galleryApp')
    .filter('toShortNameImg', ['$filter', 'constant', function ($filter, c) {
        
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
          
          var imgStr = str,
            strLn = str.length,
            DFLT_IMG_NAME_DEV_LN = c.DFLT_IMG_NAME_DEV.length,
            DFLT_IMG_NAME_END_LN = c.MAX_IMG_NAME_LN-c.DFLT_IMG_NAME_START_LN-DFLT_IMG_NAME_DEV_LN;
          
          if (strLn > c.MAX_IMG_NAME_LN){
            
          str+=' ';  
          
          imgStr =  str.slice(0, c.DFLT_IMG_NAME_START_LN)+
                    c.DFLT_IMG_NAME_DEV+
                    str.slice(strLn-DFLT_IMG_NAME_END_LN, -1);
          }
          
          return imgStr;
  
        };
    }]);

})(angular);