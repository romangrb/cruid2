(function(){
  
  "use strict";
  
  angular
    .module('galleryApp')
      .controller('createRecCtrl', ['$scope', 'RestService', 'Upload', function ($scope, RestService, Upload) {
      
      $scope.tagline = 'This is Create controler !';

      $scope.submit = function(){
        //check if from is valid
        if ($scope.upload_form.file.$valid && $scope.file) { 
            $scope.upload($scope.file);
        }
      };
      
      $scope.upload = function (file) {
        Upload.upload({
          url: 'https://cruid2-romangrb.c9users.io/upload', //webAPI exposed to upload the file
          data:{file:file} //pass file as data throw ng-model
        }).then(function (resp) {
          if(resp.data.error_code === 0){ //validate success
            console.info('Success response  : ' + resp.config.data.file.name);
          } else {
            console.error('an error occured');
          }
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