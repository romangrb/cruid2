(function(angular){

  'use strict';

  angular
    .module('galleryApp')
      .directive('rotateDirct', function() { 
        
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
            	var thisElemId = element[0].attributes.tmpid;
                scope.$watch(attrs.degrees, function (rotateDegrees) {
                	if (!thisElemId) return;
                    var r = 'rotate(' + rotateDegrees + 'deg)';
                      if (scope.tmpId == thisElemId.value){
                        element.css({
                          '-moz-transform': r,
                          '-webkit-transform': r,
                          '-o-transform': r,
                          '-ms-transform': r
                        });
                      }
                });
            }
        };
    });
      
})(angular);  
