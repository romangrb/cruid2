(function(){
  
  "use strict";
  
  var galleryApp = angular.module("galleryApp", ['ngRoute', 'ngAnimate']);
  
    galleryApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
      $routeProvider.
        when('/', {
    			templateUrl: '/views/home.html',
    			controller: 'homeCtrl'
    		}).
    		when('/home', {
    			templateUrl: '/views/home.html',
    			controller: 'homeCtrl'
    		}).
    		when('/crud', {
    			templateUrl: 'views/crud.html',
    			controller: 'crudCtrl'	
    		}).
    		when('/edit_rec', {
    			templateUrl: 'views/edit_rec.html',
    			controller: 'editRecCtrl'	
    		}).
    		when('/view_rec', {
    			templateUrl: 'views/view_rec.html',
    			controller: 'viewRecCtrl'	
    		}).
    		otherwise({
          redirectTo: '/'
        });
    		$locationProvider.html5Mode(true);
    }]);
    
  return galleryApp;
  
})();  

