(function(angular){
  
  "use strict";
  
  angular
    .module('galleryApp')
      .controller('createRecCtrl', ['$scope', 'RestService', 'Upload', 'constant', 'random', function ($scope, RestService, Upload, constant, random) {
  
      // initiate upload service
      
      var upload = {};
       // rotate function for directive
       // https://jsfiddle.net/romangrb/nz4jdwuf/7/
       // current angle for route 
      var crntAngle = 0;  
       
      	$scope.tmpId = null;
      	
        $scope.rotate = function (id) {
          	
        	if (!id) return;
          	
          crntAngle += 90;
          crntAngle = (crntAngle>360)? 90 :  crntAngle;
          
              $scope.angle = crntAngle;
              $scope.tmpId = id; 
          };
            
        $scope.upload = function(key, file_data){
            
          if (file_data == null || key == null) return;
            // add additionall data
            console.log(file_data, 1);
          /*  upload[key] = Upload.upload({
              url: constant.UPLOAD_URL,
              data:{files:file_data}
            });
            
          $scope.getRequest(key);*/
          
        };
        
        $scope.uploadAll = function(files){
      
          if (files == null) return;
          
          angular.forEach(files, function(value, key) {
            /*upload[key] = Upload.upload({
              url: constant.UPLOAD_URL,
              data:{files:value}
            });
          
          $scope.getRequest(key);*/
  
          });
          
        };
        
        $scope.cancel = function (key) {
          
          if (key == null || upload[key]==null) return;
          
          upload[key].abort();
          
        };
        
        $scope.cancelAll = function () {
          
          if (Object.keys(upload).length===0) return;
          
          angular.forEach(upload, function(upload_value) {
            upload_value.abort();
          });

        };
        
        $scope.getRequest = function(key){
         
          upload[key].then(function (resp) {

            if(resp.data.error_code === 0){
              console.info('upload response  : ' + resp.config.data.files.name);
            } else if (resp.data.status>=200&&resp.data.status<300){
              console.info('file : ', resp.config.data.files.name, 'is uploaded');
                if (upload[key]) delete upload[key];
              } else {
                console.error('Error : ', resp.data);
                if (upload[key]) delete upload[key];
              }
          }, function (resp) {
             console.info('file : ', resp.config.data.files.name, 
             'aborted', '\n'+ 'status code', resp.status);
              if (upload[key]) delete upload[key];
          }, function (evt) { 
            
            var progress = parseInt(100.0 * evt.loaded / evt.total);
  
            console.log(progress + '% ' + evt.config.data.files.name);
            $scope.progress = 'progress: ' + progress + '% ';
          });
        
        };
        
        $scope.showFiles = function(data){
          
          upload = {};
          
          $scope.file_collection = createImgCollection(data);
        };
        
        function createImgCollection(data){
          
        if (!angular.isArray(data)||data.length<1) return;
        
        var dataHash = {};
        
          angular.forEach(data, function(value, key) {
            value['tmpId'] = random.makeId();
            this[key] = value;
          }, dataHash);
          
          return dataHash;
        }
        
        // for directive eather drag is supported or not
        $scope.isDroppable = true;
     
    }]);

})(angular);