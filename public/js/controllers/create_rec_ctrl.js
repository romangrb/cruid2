(function(){
  
  "use strict";
  
  angular
    .module('galleryApp')
      .controller('createRecCtrl', ['$scope', 'RestService', 'Upload', 'constant', function ($scope, RestService, Upload, constant) {
      
      // init upload service
      var upload; 
      
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
          (resp.data.error_code === 0)?
          console.info('Success response  : ' + resp.config.data.file.name):
          console.error('an error occured');
        }, function (resp) {
          console.warn('Error status: ' + resp.status);
          console.error('Error status: ' + resp.status);
        }, function (evt) { 
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
          $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
      
      };
     
    }]);

})();

// https://pixabay.com/
// http://jsfiddle.net/3t50b3fw/  drag&drop example
// https://cnpmjs.org/package/angular-file-upload-shim
