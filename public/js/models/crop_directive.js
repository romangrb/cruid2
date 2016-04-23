(function(angular){

  'use strict';

  angular
    .module('galleryApp')
      .directive('cropDirct', ['$compile', '$templateRequest', function($compile, $templateRequest){
        return {
            restrict : 'C',
            scope : true,
            link: function (scope, element, attrs) {
                  
                  scope.$watch(attrs.cropIdCheck, function (val) {
                   
                    if (val == attrs.cropId) {
                        // Load the html through $templateRequest
                        $templateRequest('views/crop_edit.html').then(function(html){
                          // Convert the html to an actual DOM node
                          var template = angular.element(html);
                          // Append it to the directive element
                          element.append(template);
                          // And let Angular $compile it
                          $compile(template)(scope);
                        }, function (err) {
                            // called asynchronously if an error occurs
                            console.error('error in directory', err);
                        });
                    }
                    
                 });
                 
            }
            
        };
        
      }]);
    
    
})(angular)