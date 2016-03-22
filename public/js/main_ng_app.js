(function(){
  
  "use strict";
  
  var galleryApp = angular.module("galleryApp", ['ngRoute', 'ngAnimate']);
  
    galleryApp.config(function($routeProvider) {
      $routeProvider
      	.when('/', {
    			templateUrl: '/views/home.html',
    			controller: 'homeCtrl'
    		})
    		.when('/home', {
    			templateUrl: '/views/home.html',
    			controller: 'homeCtrl'
    		})
    		.when('/crud', {
    			templateUrl: 'views/crud.html',
    			controller: 'crudCtrl'	
    		});
    });
    
  return galleryApp;
  
})();  

