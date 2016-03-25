(function(){
  
  "use strict";
  
  var galleryApp = angular.module("galleryApp", ['ngRoute', 'ngAnimate']);
  
    galleryApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
      $routeProvider.
        /*when('/', {
    			templateUrl: '/views/home.html',
    			controller: 'homeCtrl'
    		}).*/
    		when('/', {
    			templateUrl: 'views/create_rec.html',
    			controller: 'createRecCtrl'	
    		}).
    		when('/home', {
    			templateUrl: '/views/home.html',
    			controller: 'homeCtrl'
    		}).
    		when('/crud', {
    			templateUrl: 'views/crud.html',
    			controller: 'crudCtrl'	
    		}).
    		when('/view_rec', {
    			templateUrl: 'views/view_rec.html',
    			controller: 'viewRecCtrl'	
    		}).
    		when('/create_rec', {
    			templateUrl: 'views/create_rec.html',
    			controller: 'createRecCtrl'	
    		}).
    		when('/edit_rec', {
    			templateUrl: 'views/edit_rec.html',
    			controller: 'editRecCtrl'	
    		}).
    		otherwise({
          redirectTo: '/'
        });
    		$locationProvider.html5Mode(true);
    }]);
    
  return galleryApp;
  
})();  

