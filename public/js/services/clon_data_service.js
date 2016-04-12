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
            return (name!=null)? this._clonedColl[name] : undefined;
          },
          
          getAllClon : function(){
            return this._clonedColl;
          },
   
        };
        
        function privAndProtMtd (){
          
            var those = this;
            
            this._clonedColl = {};
            //http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object
            this._getClone = function(src, /* INTERNAL */ _visited) {
                    
              if(src == null || typeof(src) !== 'object'){
                  return src;
              }
          
              // Initialize the visited objects array if needed
              // This is used to detect cyclic references
              if (_visited == undefined){
                  _visited = [];
              }
              // Otherwise, ensure src has not already been visited
              else {
                  var i, len = _visited.length;
                  for (i = 0; i < len; i++) {
                      // If src was already visited, don't try to copy it, just return the reference
                      if (src === _visited[i]) {
                          return src;
                      }
                  }
              }
          
              // Add this object to the visited array
              _visited.push(src);
          
              //Honor native/custom clone methods
              if(typeof src.clone == 'function'){
                  return src.clone(true);
              }
          
              //Special cases:
              //Array
              if (Object.prototype.toString.call(src) == '[object Array]') {
                  //[].slice(0) would soft clone
                  ret = src.slice();
                  var i = ret.length;
                  while (i--){
                      ret[i] = those._getClone(ret[i], _visited);
                  }
                  return ret;
              }
              //Date
              if (src instanceof Date){
                  return new Date(src.getTime());
              }
              //RegExp
              if(src instanceof RegExp){
                  return new RegExp(src);
              }
              //DOM Elements
              if(src.nodeType && typeof src.cloneNode == 'function'){
                  return src.cloneNode(true);
              }
          
              //If we've reached here, we have a regular object, array, or function
          
              //make sure the returned object has the same prototype as the original
              var proto = (Object.getPrototypeOf ? Object.getPrototypeOf(src): src.__proto__);
              if (!proto) {
                  proto = src.constructor.prototype; //this line would probably only be reached by very old browsers 
              }
              var ret = object_create(proto);
          
              for(var key in src){
                  //Note: this does NOT preserve ES5 property attributes like 'writable', 'enumerable', etc.
                  //For an example of how this could be modified to do so, see the singleMixin() function
                  ret[key] = those._getClone(src[key], _visited);
              }
              return ret;
        };
            //If Object.create isn't already defined, we just do the simple shim,
            //without the second argument, since that's all we need here
            var object_create = Object.create;
            if (typeof object_create !== 'function') {
                object_create = function(o) {
                    function F() {}
                    F.prototype = o;
                    return new F();
                };
            }
              
        }
        
        privAndProtMtd.prototype = CloneObject;
        
          var Clone = new privAndProtMtd();
        
        return Clone;
        
      });
      
})(angular);