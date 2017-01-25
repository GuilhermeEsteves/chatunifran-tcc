angular.module('chatunifran').config(['$routeProvider', '$locationProvider', 
        function ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'view/home.html',
			controller: 'homeController',
			title: 'Home',
			caseInsensitiveMatch: true
		})
		.when('/login', {
			controller: 'homeController',
			title: 'Login',
			template: '',
			caseInsensitiveMatch: true
		})
		.when('/home', {
			templateUrl: 'view/home.html',
			controller: 'homeController',
			title: 'Home',
			caseInsensitiveMatch: true
		})
		.when('/chat-geral', {
			templateUrl: 'view/chatGeral/chatGeralIndex.html',
			controller: 'homeController',
			title: 'Chat Geral',
			caseInsensitiveMatch: true
		})
		.when('/minhas-conversas', {
			templateUrl: 'view/minhasConversas/minhasConversasIndex.html',
			controller: 'homeController',
			title: 'Minhas Conversas',
			caseInsensitiveMatch: true
		})
		.when('/salas', {
			templateUrl: 'view/sala/salaIndex.html',
			controller: 'homeController',
			title: 'Salas',
			caseInsensitiveMatch: true
		})
		.when('/pessoas-online', {
			templateUrl: 'view/pessoasOnline/pessoasOnlineIndex.html',
			controller: 'pessoasOnlineController',
			title: 'Pessoas Online',
			caseInsensitiveMatch: true
		})
		.when('/chat', {
			templateUrl: 'view/chat/index.html',
			controller: 'chatController',
			title: 'Chat',
			caseInsensitiveMatch: true
		})
		.when('/404', {
			templateUrl: '/view/404.html',
			title: 'Página não encontrada :c'
		})
		.otherwise({
			redirectTo: '/404'
		});
		
	$locationProvider.html5Mode(false);
 }]);