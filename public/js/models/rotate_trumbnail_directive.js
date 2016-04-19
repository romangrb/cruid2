(function(angular){

  'use strict';

  angular
    .module('galleryApp')
      .directive('rotateTrumbDirct', function() { 
        
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                	
            	var thisElemId = element[0].attributes.tmpid;
               console.log(thisElemId);
                scope.$watch(attrs.degrees, function (rotateDegrees) {
                    	
                    var r = 'rotate(' + rotateDegrees + 'deg)';
                    
                        element.css({
                          '-moz-transform': r,
                          '-webkit-transform': r,
                          '-o-transform': r,
                          '-ms-transform': r
                        });
                      
                });
            }
        };
    });
      
})(angular);  
