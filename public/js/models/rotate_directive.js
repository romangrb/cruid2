(function(angular){

  'use strict';

  angular
    .module('galleryApp')
      .directive('rotateDirct', function() { 
       
        return {
          
          restrict: 'C',
          link: function (scope, element, attrs) {
           console.log(element);
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