angular.module('chatunifran').config(['$routeProvider','$locationProvider',
    function($routeProvider,$locationProvider){
        $routeProvider
		.when('/index', {
			templateUrl: 'views/index.html',
			controller: '',
			title: 'Home',
			caseInsensitiveMatch: true
		})
		.when('/404', {
			templateUrl: 'views/404.html',
			title: 'Página não encontrada :c'
		})
		.otherwise({
			redirectTo: '/404'
		});
	    $locationProvider.html5Mode(false);
}]);