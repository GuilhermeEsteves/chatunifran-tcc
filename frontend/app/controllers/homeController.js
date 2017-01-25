angular.module('chatunifran').controller('homeController', function($scope, $filter, $timeout,$rootScope){
	$scope.tela = 'Home';
	$scope.forms = {};
	$scope.usuariosLogados = [];

	// if($rootScope.usuario){
	// 	alert();
	// 	// socket = io('http://localhost:3000',{ query: "iduser=" + $rootScope.usuario._id });
	// }
	
	// $scope.teste = function(){
    //   console.log(socket);
    //   socket.emit('transa','asdasd');
    // }

    // socket.on('refreshUsers',function(usuariosLogado){
	//   alert();
    //   console.log(usuariosLogado);
    // });
    
	// socket.on('visits',function(visitas){
	// 	alert('transa');
	// 	$scope.usuariosLogados = visitas;
	// 	$scope.$apply();
    // });
	// socket.emit('transa');

	// $scope.teste = function(){
	// };

	// socket.on('transa2',function(){
	// 	alert('deu certo');
	// });

	// socket.on('message',function(disconect){
	// 	alert('Usuario ' + disconect.saiu + ' saiu');
	// 	$scope.usuariosLogados = disconect.usuariosLogado;
	// 	$scope.$apply();
	// });
});
