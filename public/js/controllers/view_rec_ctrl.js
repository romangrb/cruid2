(function(){
  
  "use strict";
  
  angular
    .module('galleryApp')
      .controller('viewRecCtrl', ['$scope', 'RestService', function ($scope, RestService) {
        
      $scope.tagline = ' Name';
      
      // Activating the dropdown menu
      
      $(document).ready(function(){
        $(".dropdown-button").dropdown();
      });
      
      // Activating tooltips
      $(document).ready(function(){
        $('.tooltipped').tooltip({delay: 50});
      });
      
      
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

})();