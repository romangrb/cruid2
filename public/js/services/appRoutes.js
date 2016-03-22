angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})
		.when('/home', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})
		.when('/nerds', {
			templateUrl: 'views/nerd.html',
			controller: 'NerdController'
		})
		.when('/geeks', {
			templateUrl: 'views/geek.html',
			controller: 'GeekController'	
		})
		.when('/blobs', {
			templateUrl: 'views/ext.html',
			controller: 'MainController'	
		});

	$locationProvider.html5Mode(true);

}]);