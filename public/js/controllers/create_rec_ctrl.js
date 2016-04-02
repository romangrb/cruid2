(function(){
  
  "use strict";
  
  angular
    .module('galleryApp')
      .controller('createRecCtrl', ['$scope', 'RestService', 'Upload', 'constant', function ($scope, RestService, Upload, constant) {

      $scope.submit = function(){
        //check if from is valid
        if ($scope.upload_form.file.$valid && $scope.file) { 
            $scope.upload($scope.file);
        }
      };
      
      $scope.showFiles = function(data){
        $scope.file_collection = createImgCollection(data);
      };
      
      function createImgCollection(data){
        
      if (!angular.isArray(data)||data.length<1) return;
      
        var dataHash = {};
        angular.forEach(data, function(value, key) {
          console.log(key, value.name);
          this[key] = value;
        }, dataHash);
        return dataHash;
      }
      
      $scope.close = function(id, data){
       // $scope.isClosed = true;
        console.info(id, data ,'close');
      };
      
      $scope.upload = function(data){
        //console.info(data, 'upload');
      };
      
      /*$scope.upload = function (file) {
        console.info(file);
        Upload.upload({
          url: constant.UPLOAD_URL, //webAPI exposed to upload the file
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
      };*/
     
    }]);

})();