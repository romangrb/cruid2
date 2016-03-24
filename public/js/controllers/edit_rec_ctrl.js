(function(){
  
  "use strict";
  
  angular
    .module('galleryApp')
      .controller('editRecCtrl', ['$scope', 'RestService', 'vDataService', function ($scope, RestService, vDataService) {
        
      $scope.recCollection = vDataService.getVdata();
      
      console.log('virtD', vDataService.getVdata());
      
      
    }]);

})();