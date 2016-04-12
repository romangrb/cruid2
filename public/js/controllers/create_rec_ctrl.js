(function(angular){
  
  "use strict";
  
  angular
    .module('galleryApp')
      .controller('createRecCtrl', ['$scope', 'RestService', 'Upload', 'clonDataService', 'constant', function ($scope, RestService, Upload, Clon, constant) {
  
      // initiate upload service
      
       var upload = {};
        
        $scope.upload = function(key, file_data){
          
          if (file_data == null) return;
          
          Clon.setClone(Upload.upload, key);
          
          $scope.getRequest(key, file_data);
          
        };
        
        /*$scope.uploadAll = function(files){
      
          angular.forEach(files, function(value, key) {
            
            upload = Upload.upload({
              url: constant.UPLOAD_URL,
              data:{files:value}
            });
          
          $scope.getRequest();
  
          });
          
        };*/
        
        $scope.cancel = function (key, file_data) {
          
          if (file_data == null) return;
          
          upload[key].abort();
        };
  
        $scope.getRequest = function (key, file_data) {
          if (key == null) return;
          
          upload[key] = Clon.getClonByName(key)({
            url: constant.UPLOAD_URL,
            data:{files:file_data}
          });
          
          upload[key].then(function (resp) {
            console.log(resp);
            if(resp.data.error_code === 0){
              console.info('upload response  : ' + resp.config.data.files.name);
            } else if (resp.data.status>=200&&resp.data.status<300){
              console.info('file : ', resp.config.data.files.name, 'is uploaded'); 
              } else {
                console.error('Error : ', resp.data);
              }
          }, function (resp) {
             console.info('file : ', resp.config.data.files.name, 
             'aborted', '\n'+ 'status code', resp.status);
            
          }, function (evt) { 
            
            var progress = parseInt(100.0 * evt.loaded / evt.total);
  
            console.log(progress + '% ' + evt.config.data.files.name);
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