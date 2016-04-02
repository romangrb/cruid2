(function () {
  
  "use strict";
  
  angular.module('galleryApp')
    .constant('constant', {
      
      UPLOAD_URL : 'https://cruid2-romangrb.c9users.io/upload',
      
      MAX_IMG_NAME_LN : 30,
      DFLT_IMG_NAME_START_LN : 17,
      DFLT_IMG_NAME_DEV :  '...',
      DFLT_IMG_STR_TYPE_ERR_MSG : 'the name is not a string type',
      
    });
    
})();