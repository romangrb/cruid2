(function(angular){
  
  "use strict";
  
  angular
    .module('galleryApp')
      .controller('createRecCtrl', ['$scope', 'RestService', 'Upload', 'constant', function ($scope, RestService, Upload, constant) {
      
      // init upload service
      var upload;
      
      $scope.isDroppable = true;
      
      $scope.submit = function(){
        if (!$scope.upload_form.file.$valid && !$scope.file) return;
           
        upload = Upload.upload({
          url: constant.UPLOAD_URL,
          data:{file:$scope.file} 
        });
           
        $scope.upload();
      };
      
      $scope.abort = function () {
        if (upload == null) return;
        upload.abort();
      };

      $scope.upload = function () {
        
        upload.then(function (resp) {
          if(resp.data.error_code === 0){
            console.info('upload response  : ' + resp.config.data.file.name);
          } else if (resp.data.status>=200&&resp.data.status<300){
            console.info('file : ', resp.config.data.file.name, 'is uploaded'); 
            } else {
              console.error('Error : ', resp.data);
            }
        }, function (resp) {
           console.info('file : ', resp.config.data.file.name, 
           'aborted', '\n'+ 'status code', resp.status);
          
        }, function (evt) { 
          
          var progress = parseInt(100.0 * evt.loaded / evt.total);
          
          console.log(progress + '% ' + evt.config.data.file.name);
          $scope.progress = 'progress: ' + progress + '% ';
        });
      
      };
     
    }]);

})(angular);

// https://pixabay.com/
// http://jsfiddle.net/3t50b3fw/  drag&drop example
// https://cnpmjs.org/package/angular-file-upload-shim
