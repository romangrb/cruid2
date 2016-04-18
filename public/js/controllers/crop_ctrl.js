(function(angular){
  
  "use strict";
  
  angular
    .module('galleryApp')
      .controller('cropCtrl', ['$scope', 'RestService', 'Upload', 'constant', 'random', function ($scope, RestService, Upload, constant, random) {
        
        $scope.myImage = '';
        $scope.myCroppedImage = '';
       		
        $scope.getBit = function (){
        	console.log($scope.myCroppedImage); 
        };
        
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
        
     
    }]);

})(angular);