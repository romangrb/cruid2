(function(){
  
  "use strict";
  
  angular
    .module('galleryApp')
      .controller('viewRecCtrl', ['$scope', '$location', 'RestService', 'vDataService', function ($scope, $location, RestService, vDataService) {
      
      // init selection rec collection
      var recHash = {},
        recSelectedHash = {};
      
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
      
      $scope.checkRec = function(id, isCheck, name){

        recHash[id].selected = isCheck;
        console.info('name', name, '\n',  id, isCheck, recHash[id]);
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
      
      $scope.edit_rec = function(){
        
        recSelectedHash = setSelectedRec(recHash, recSelectedHash);
        vDataService.setVdata(recSelectedHash);
        
        (Object.keys(recSelectedHash).length)?
            $location.path('/edit_rec'): alert('no selected');
        
      };
      
      function setSelectedRec(srcObj, targObj){
        
        if (!Object.keys(srcObj).length) return;
          targObj = {};
        
        for (var key in srcObj) {
          if (srcObj[key]['selected']) targObj[key] = srcObj[key]['hash'];
        }
        return targObj;

      }
      
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
      
      function objCycle(targObj, isSelected, isShufle){
        
        if (!Object.keys(targObj).length) return;
        
        for (var key in targObj) {
          targObj[key]['selected'] = 
            (!isShufle)? isSelected : !targObj[key]['selected'];
        }
        
        return targObj;
      }
      
    }]);

})();