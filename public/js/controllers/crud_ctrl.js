(function(angular){
  
  "use strict";
  
  angular
    .module('galleryApp')
      .controller('crudCtrl', ['$scope', 'RestService', function ($scope, RestService) {
        
      $scope.tagline = 'This is crud controler !';
      
      var RestServ = new RestService();
      
      RestServ.getAllData().then(function(data){
        $scope.listImg = data.data;
      }).catch(function(err) {
        errorHandler(err);
      });
        
      function errorHandler(err){
        
        console.error(
          'name : ', err.name, '\n', 
          'message : ', err.message, '\n',
          'message : ', err.stack
        );
        
      }
    }]);

})(angular);