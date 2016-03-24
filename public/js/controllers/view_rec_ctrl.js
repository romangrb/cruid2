(function(){
  
  "use strict";
  
  angular
    .module('galleryApp')
      .controller('viewRecCtrl', ['$scope', 'RestService', function ($scope, RestService) {
        
      $scope.tagline = ' Name';
      
      // for selection rec collection
      var recHash = {};
        $scope.recCollection = {};
        $scope.confirmed = false;
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
        recHash = convToHashData($scope.listImg, recHash);
        
      }).catch(function(err) {
        errorHandler(err);
      });
        
      function convToHashData (srcObj, targObj){
        // if hash is not emptied than set empty
        if (Object.keys(targObj).length) targObj = {};
        
        angular.forEach(srcObj, function(value, key){
          var hashKeyId = value._id,
            obj = {};
            
            obj.hash = value;
            obj['selected'] = false;
            
            targObj[hashKeyId] = obj;
           
        });
        
        return targObj;
      }
       
      function errorHandler(err){
        
        console.error(
          'name : ', err.name, '\n', 
          'message : ', err.message, '\n',
          'message : ', err.stack
        );
        
      }
      
      $scope.checkRec = function(id, isCheck){

        recHash[id].selected = isCheck;
        
        console.info(id, isCheck, recHash[id]);
        
      };
      
      $scope.selectAll = function(obj){
        
        console.info('hash', recHash);
        
      };
      
      $scope.shufleAll = function(obj){
        
        console.info('hash', recHash);
        
      };
     
    }]);

})();