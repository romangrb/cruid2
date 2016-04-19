(function(angular){

  'use strict';

  angular
    .module('galleryApp')
      .directive('rotateTrumbDirct', function() { 
        
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                	
                scope.$watch(attrs.trumbDegrees, function (rotateDegrees) {
                    	
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
