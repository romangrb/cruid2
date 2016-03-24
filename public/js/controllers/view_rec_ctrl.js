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
        $scope.recCollection = recHash;
        
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
      
      $scope.selectAll = function(elem){
        
        recHash = objCycle(recHash, true, false);
        $scope.recCollection = recHash;
        console.info('hash', recHash, elem);
      };
      
      $scope.unSelectAll = function(){
        recHash = objCycle(recHash, false, false);
        console.info('hash', recHash);
      };
      
      $scope.shufleAll = function(){
        recHash = objCycle(recHash, false, true);
        console.info('hash', recHash);
      };
      
      function objCycle(targObj, isSelected, isShufle){
        
        if (!Object.keys(targObj).length) return;
        
        for (var key in targObj) {
          
          if (!isShufle) {
            targObj[key].selected = isSelected;
          }else{
            
            targObj[key].selected = isSelected;
            
          }
        }
        
        return targObj;
      }
      
      
     
    }]);

})();