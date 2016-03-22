(function(){

  'use strict';

  angular
    .module('sampleApp')
      .factory('RestService', ['$http', '$location','$route', function($http, $location, $route) { 
         
        var RestQueryBuild = {  
          constructor : function fn(){
            this._DEFLT_BASE = '/blobs';
          },
          getData : function(restQuery){
            return $http.get(this._DEFLT_BASE + restQuery);
          }
        };
        
        function PrivProtMethRest (){
          
          var those = this;
          
          this._changeBase = function(url){
            those._DEFLT_BASE = url;
          }
          
        };
        
        PrivProtMethRest.prototype = RestQueryBuild;
       
        return PrivProtMethRest;
        
      }]);
      
})();        
        
       
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
  
