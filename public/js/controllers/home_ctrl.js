(function(){
  
  "use strict";
  
  angular
    .module('galleryApp').controller('homeCtrl', ['$scope', 'RestService', function ($scope, RestService) {
        
    	$scope.tagline = 'The home page';	
        
    }]);

})();