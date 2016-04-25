(function (angular) {
  
  "use strict";
  
  angular.module('galleryApp')
    .constant('constant', {
      
      UPLOAD_URL : 'https://cruid2-romangrb.c9users.io/upload',
      
      MAX_IMG_NAME_LN : 30,
      DFLT_IMG_NAME_START_LN : 17,
      DFLT_IMG_NAME_DEV :  '...',
      DFLT_IMG_STR_TYPE_ERR_MSG : 'the name is not a string type',
      MAX_ANG : 360,
      DFLT_STEP_ANG : 90,
      TMP_ID_NAME : 'tmpId',
      DATA_NAME : 'data',
      DFLT_TRUMB_ID : 'trumb',
      CROP_KEY : 'cropData',
      MODULE_VIEW_CLASS_NAME : '.modal-content',
      IMG_PTRN : '.(gif|jpg|jpeg|tiff|png)$'
      
    });
    
})(angular);