(function () {
  
  "use strict";
  
  angular.module('galleryApp')
    .filter('toShortNameImg', function ($filter) {
        return function (input) {
            return input;
        };
    });

})();

