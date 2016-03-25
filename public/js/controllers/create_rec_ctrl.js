(function(){
  
  "use strict";
  
  angular
    .module('galleryApp')
      .controller('createRecCtrl', ['$scope', 'RestService', function ($scope, RestService) {
        
      $scope.tagline = 'This is Create controler !';
      
      var RestServ = new RestService();
      
      var item = {};
      
      $scope.createRec = function(obj){
        
        console.log(obj);
        
      }
     
      
      
     
      
    }]);

})();