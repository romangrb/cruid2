(function(angular){
  
  "use strict";
  
  angular
    .module('galleryApp')
      .controller('createRecCtrl', ['$scope', 'RestService', 'Upload', 'constant', function ($scope, RestService, Upload, constant) {
  
      // initiate upload service
      var upload; 
      
      $scope.upload = function(key, file_data){

        if (file_data == null) return;
        
        upload = Upload.upload({
          url: constant.UPLOAD_URL,
          data:{file:file_data}
        });
        $scope.getRequest();
        
        
      };
      
      $scope.uploadAll = function(files){
    
        angular.forEach(files, function(value, key) {
          
          upload = Upload.upload({
            url: constant.UPLOAD_URL,
            data:{files:value}
          });
        
        $scope.getRequest();

        });
        
      };
      
      $scope.abort = function () {
        if (upload == null) return;
            upload.abort();
      };

      $scope.getRequest = function () {
        
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
