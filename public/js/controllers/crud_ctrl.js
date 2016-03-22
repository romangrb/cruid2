(function(){
  
  "use strict";
  
  angular
    .module('galleryApp').controller('crudCtrl', ['$scope', 'RestService', function ($scope, RestService) {
        
      $scope.tagline = 'This is crud controler !';	
        
    }]);

})();