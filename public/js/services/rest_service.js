(function(angular){

  'use strict';

  angular
    .module('galleryApp')
      .factory('RestService', ['$http', '$location','$route', function($http, $location, $route) { 
         
        var RestQueryBuild = {
          
          getAllData : function(){
            return $http.get(this._DEFLT_BASE);
          },
            
          getData : function(restQuery){
            return $http.get(this._DEFLT_BASE + restQuery);
          },
          
          createData : function (dataObj) {
            return $http.post(this._DEFLT_NEW_REC, dataObj);
          }
        };
        
        function PrivProtMethRest (){
          
          var those = this;
          
          this._DEFLT_BASE = '/blobs';
          
          this._DEFLT_NEW_REC = this._DEFLT_BASE+'/new';
          
          this._changeBase = function(url){
            those._DEFLT_BASE = url;
          };
          
        }
        
        PrivProtMethRest.prototype = RestQueryBuild;
       
        return PrivProtMethRest;
        
      }]);
      
})(angular);        
        
       
       /* obj.createData = function (dataObj, restQuery) {
            return $http.post(serviceBase + restQuery, dataObj);
        };
  
        obj.getDataById = function(dataId, restQuery){
            return $http.get(serviceBase + restQuery + '/' + dataId);
        };
  
        obj.updateData= function (dataObj, dataId, restQuery) {
            return $http.put(serviceBase + restQuery + '/'  + dataId, dataObj );
        };
  
        obj.deleteData = function (dataId, restQuery) {
            return $http.delete(serviceBase + restQuery + '/' + dataId);
        };*/
  
