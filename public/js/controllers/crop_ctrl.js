(function(angular){
  
  "use strict";
  
  angular
    .module('galleryApp')
      .controller('cropCtrl', ['$scope', '$location', 'RestService', 'Upload', 'vDataService', 'constant', 'random', function ($scope, $location, RestService, Upload, vDataService, constant, random) {
        
        $scope.myImage = '';
        $scope.myCroppedImage = '';
       		
        $scope.getBit = function (){
        	console.log($scope.myCroppedImage); 
        };
        
        console.log(vDataService.getVdata(), 123);
        
        
        $scope.path = "D:\\w\\brown-200873.jpg";
        
        $scope.img = "lala";
        
        var handleFileSelect=function(evt) {
          
          var file=evt.currentTarget.files[0];
          var reader = new FileReader();
          
          reader.onload = function (evt) {
            $scope.$apply(function($scope){
              $scope.myImage=evt.target.result;
            });
          };
          reader.readAsDataURL(file);
        };
        
        angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
        
        $scope.loadBegin = function(){
          console.info('Crop begin');   
        };
        
        $scope.loadDone = function(){
          console.info('Crop done');   
        };
        
        $scope.loadError = function(){
          console.info('Crop Err');   
        };
     
    }]);

})(angular);