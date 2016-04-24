(function(angular){

  'use strict';

  angular
    .module('galleryApp')
      .directive('cropDirct', ['$compile', '$templateRequest', function($compile, $templateRequest){
        return {
            restrict : 'C',
            scope : false,
            link: function (scope, element, attrs) {
                 
                  scope.$watch(attrs.cropIdCheck, function (val) {
                   
                    if (val == attrs.cropId) {
                        // Load the html through $templateRequest
                        var template2 = null;
                        $templateRequest('views/crop_edit.html').then(function(html){
                          
                        var newScope = scope.$new(); // create a new scope from the current scope
                        var template = angular.element(html);
                        template2 = template;
                        var content = $compile(template)(newScope); // compile and link to the new scope
                        element.append(content); // add to the DOM
                        // .. then later, we want to update the content of the element ...
                        newScope.$destroy(); // destroy the scope and all child scopes
                        var newScope2 = scope.$new(); // create a new scope
                        var content2 = $compile(template2)(newScope2); // compile and link
                        content.replaceWith(content2); // replace the html content with the new content
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