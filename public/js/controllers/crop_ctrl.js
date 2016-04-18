(function(angular){
  
  "use strict";
  
  angular
    .module('galleryApp')
      .controller('cropCtrl', ['$scope', '$location', 'RestService', 'Upload', 'vDataService', 'constant', 'random', function ($scope, $location, RestService, Upload, vDataService, constant, random) {
        
        $scope.trumbImg = '';
        $scope.trumbCroppedImg = '';
       		
        $scope.getThumbnailData = function (){
        	console.log($scope.trumbCroppedImg); 
        };
        
        var data = vDataService.getVdata();
        
        var getThumbnaiView = function(fdata){
          
          var file=fdata,
           reader = new FileReader();
          
          reader.onload = function (evt) {
            $scope.$apply(function($scope){
              $scope.trumbImg=evt.target.result;
            });
          };
          reader.readAsDataURL(file);
        };
        
        if (data && Object.keys(data).length!=0) getThumbnaiView(data);
         
        angular.element(document.querySelector('#fileInput')).on('change',getThumbnaiView);
        
        $scope.loadBegin = function(){
          console.info('Crop begin');   
        };
        
        $scope.loadDone = function(){
          console.info('Crop done');   
        };
        
        $scope.loadError = function(){
          console.warn('Crop Errror');   
        };
     
    }]);

})(angular);