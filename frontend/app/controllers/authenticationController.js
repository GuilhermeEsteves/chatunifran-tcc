angular.module('chatunifran').controller('authenticationController', ['$rootScope', '$location', 
					'$scope', '$route', '$timeout', '$cookies', 'gearLogin','gearSidenav', 
						function($rootScope, $location, $scope, $route, $timeout, $cookies, gearLogin,gearSidenav){

	$scope.logInfo = {};

	$scope.app = 'chatunifran';
	$scope.client = '';
	$rootScope.usuario = $cookies.getObject('chatUnifran');

	$rootScope.$watch('usuario', function(value, oldValue){
		if (value === oldValue){
			return;
		}
		if (!value){
			gearLogin.logout().then(function(){ $location.path('/login') });
		}
		else{
			gearLogin.login().then(function(){ $location.path() === '/login' && $location.path('/') });
		}
	});

	$scope.options = [
		[
			{
				icon: 'power_settings_new',
				name: 'Sair',
				action: function(){
					$cookies.remove('chatUnifran');
					delete $rootScope.usuario;
					socket.disconnect();
				}
			}
		]
	];
	
	var hash = $location.$$html5 ? '' : '#/';
	$scope.menuList = [
		{
			id: 1,
			name: 'Home',
			link: hash + ''
		},
		{
			id: 2,
			name: 'Chat',
			link: hash + 'chat'
			// list: [
			// 	{
			// 		id: 2,
			// 		name: 'Criar Sala',
			// 		link: hash + 'sdf/fg',
			// 		favorite: true,
			// 		position: 5
			// 	}
				
			// ]
		}
	];

	$scope.openMenu = function(){
		gearSidenav.left.open();
	};
	$scope.closePanel = function(){
		gearSidenav.open.close();
	};
	$scope.$on('$routeChangeSuccess', function() {
		$rootScope.usuario = $cookies.getObject('chatUnifran');
		gearSidenav.open && gearSidenav.open.close();
		document.title = $route.current.title ? ($route.current.title + ' - ' + $scope.app) : ($scope.app + ' - ' + $scope.client);
	});


	$scope.logIn = function(){

        if(!$scope.logInfo.usuario){
            $scope.errorMessage = 'Digite um código de acesso';
            angular.element('#txt-log-user').focus();
            return;
        }

        if(!$scope.logInfo.senha){
            $scope.errorMessage = 'Digite uma senha';
            angular.element('#txt-log-pass').focus();
            return;
        }

        $scope.loading = true;

        $.ajax({
            url : '/api/login/' 
                        + angular.element('#txt-log-user').val(),
            headers: {
                    'password' : angular.element('#txt-log-pass').val()
                },
            success: function(data){
                $timeout(function(){
                    $rootScope.usuario = data;
                    $cookies.putObject('chatUnifran', $rootScope.usuario);
					// socket = io('/',{ query: "iduser=" + $rootScope.usuario._id });
                    $scope.logInfo = {};
                    delete $scope.loading;
                    console.log($rootScope.usuario);
				}, 500);
               
            },
            error: function(xhr){
				console.log(xhr);
                $timeout(function(){
                    $scope.errorMessage = xhr.responseText;
                    angular.element('#txt-log-pass').select();
                    delete $scope.loading;
				}, 500);
            }
        });
	};

	$scope.$watch('logInfo', function(){
		delete $scope.errorMessage;
	}, true);
}]);