(function(angular){

  'use strict';

  angular
    .module('galleryApp')
      .service('clonDataService', function() { 
        
       var CloneObject = {
        
          setClone : function(obj, name){
            
            if (obj==null) return;
            
            var tmpName = name || 'name',
              tmpObj = this._getClone(obj);
                
             this._clonedColl[tmpName] = tmpObj;
          },
          
          getClonByName : function(name){
            return (name==null)? this._clonedColl[name] : undefined;
          },
          
          getAllClon : function(){
            return this._clonedColl;
          }
          
        };
        
        function privAndProtMtd (){
          
          var those = this;
          
          this._clonedColl = {};
          
          this._getClone = function(obj){
            
            if (obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
                 return obj;
               if (obj instanceof Date)
                 var temp = new obj.constructor(); //or new Date(obj);
               else
                 var temp = obj.constructor();
               for (var key in obj) {
                 if (Object.prototype.hasOwnProperty.call(obj, key)) {
                   obj['isActiveClone'] = null;
                   temp[key] = those._getClone(obj[key]);
                   delete obj['isActiveClone'];
                 }
               }
               return temp;
            };
          
        }
        
        privAndProtMtd.prototype = CloneObject;
        
          var Clone = new privAndProtMtd();
        
        return Clone;
        
      });
      
})(angular);