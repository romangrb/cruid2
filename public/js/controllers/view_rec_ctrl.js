(function(){
  
  "use strict";
  
  angular
    .module('galleryApp')
      .controller('viewRecCtrl', ['$scope', 'RestService', function ($scope, RestService) {
        
      $scope.tagline = ' Name';
      
      // for selection rec collection
      var recId = {};
      $scope.recCollection = {};
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
        
        //var hashRec = data.data; 
          /*recId = initRecMirror(hashRec, recId);*/
          $scope.listImg = recId = data.data;
     
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
      
      /*function initRecMirror(srcObg, targObj){
        
       for (var key in srcObg){
          targObj[key] = srcObg[key]['_id'];
        }
        return targObj;
      }*/
      
      $scope.selectAll = function(obj){
        
        console.info('fuc', recId[0]._id);
        
      };
      
      
      
      
      
      
    }]);

})();