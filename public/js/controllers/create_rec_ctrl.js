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

//https://pixabay.com/
// http://jsfiddle.net/3t50b3fw/  drag&drop example
// https://cnpmjs.org/package/angular-file-upload-shim


/*$scope.showFiles = function(data){
        $scope.file_collection = createImgCollection(data);
};*/


/*// for multiple files:
    $scope.uploadFiles = function (files) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          Upload.upload({..., data: {file: files[i]}, ...})...;
        }
        // or send them all together for HTML5 browsers:
        Upload.upload({..., data: {file: files}, ...})...;
      }
    }
*/
/*https://github.com/danialfarid/ng-file-upload*/
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
      
      
       /*
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
      };*/
      
       /*function createImgCollection(data){
        
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
      };*/
      
        /*$scope.upload = function($files) {
        
        $scope.upload = $upload.upload({
            url: constant.UPLOAD_URL,
            method: 'PUT', // or 'POST',
            file: file
        }).progress(function(evt) {
            console.log(parseInt(100.00 * evt.loaded / evt.total) + '%');
        }).success(function(response, status, headers, config) {
            // do something
        }).error(function(response, status, headers, config) {
            // do something
        }).xhr(function(xhr) {
            // to abort, use ng-click like: ng-click="abort()"
            $scope.abort = function() {
                xhr.abort();
            };
        });
      }
    */