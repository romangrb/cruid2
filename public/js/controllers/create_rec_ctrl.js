(function(angular){
  
  "use strict";
  
  angular
    .module('galleryApp')
      .controller('createRecCtrl', ['$scope', 'RestService', 'Upload', 'constant', function ($scope, RestService, Upload, constant) {
  
      // initiate upload service
      var upload; 
      
      $scope.upload = function(key, data){

        if (data == null) return;
           
        upload = Upload.upload({
          url: constant.UPLOAD_URL,
          data:{file:data} 
        });
         
        $scope.getRequest();
        
      };
      
      $scope.uploadAll = function(files){
    
        angular.forEach(files, function(value, key) {
          
          upload = Upload.upload({
            url: constant.UPLOAD_URL,
            data:{file:value}
          });
        
        $scope.getRequest();

        });
        
      };
      
      $scope.abort = function () {
        if (upload == null) return;
        upload.getRequest();
      };

      $scope.getRequest = function () {
        
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
      
      $scope.showFiles = function(data){
        $scope.file_collection = createImgCollection(data);
      };
      
      function createImgCollection(data){
        
      if (!angular.isArray(data)||data.length<1) return;
      
      var dataHash = {};
      
        angular.forEach(data, function(value, key) {
          this[key] = value;
        }, dataHash);
        return dataHash;
      }
      
      // for directive eather drag is supported or not
      $scope.isDroppable = true;
     
    }]);

})(angular);

// https://pixabay.com/
// http://jsfiddle.net/3t50b3fw/  drag&drop example
// https://cnpmjs.org/package/angular-file-upload-shim
// https://github.com/danialfarid/ng-file-upload
 