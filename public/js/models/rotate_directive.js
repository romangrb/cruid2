(function(angular){

  'use strict';

  angular
    .module('galleryApp')
      .directive('rotateFlip', ['$scope', 'vDataService', function($scope, vDataService) { 
        var first = true;
        
  			return {
  				restrict: "A",
  				scope: {
  					flag: "=rotateFlip"
  				},
  				link: function(scope, element) {
  					scope.$watch("flag", function() {
  						_toggle(scope, element, !first);
  						first = false;
  					});
  
  					function _toggle(scope, element) {
  						element.toggleClass("rotated", scope.flag);
  					}
  				}
  			};
        
      }]);
      
})(angular);  
