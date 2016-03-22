(function(){
  
  "use strict";
  
  angular
    .module('galleryApp')
      .controller('crudCtrl', ['$scope', 'RestService', function ($scope, RestService) {
        
      $scope.tagline = 'This is crud controler !';
      
      var RestServ = new RestService();
      
      RestServ.getAllData()
        .then(function(data){
          console.log(data);
          $scope.listImg = data.data;
        }).catch(function(err) {
          errorHandler(err);
        });
        
      function errorHandler(err){
        
        console.error(
          'name : ', err.name, '\n', 
          'message : ', err.message,
          'message : ', err.stack
        );
        
      }
    }]);

})();