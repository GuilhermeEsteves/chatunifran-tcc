angular.module('chatunifran').controller('chatController', function($scope, $filter, $timeout,$rootScope){
	$scope.tela = 'Chat';
	$scope.forms = {};
	$scope.users = [];
	$scope.talkActive = {};
	$scope.bloquedTalk = true;

	socket = io('/',{ query: "iduser=" + $rootScope.usuario._id });
	init();
	

	function init(){
		$.get('/api/users',{idUserResquest: $rootScope.usuario._id}).success(function(data){
			$scope.users = data.filter(function(e){return e._id != $rootScope.usuario._id});

			socket.emit('getUsersOnline');
		}).error(function(){

		});
	}

	$scope.openChat = function(user){

		$.get('/api/talk',{users: [ user._id, $rootScope.usuario._id]})
		.success(function(data){
			loadMessages(data);

			$scope.talkActive = {
				_id: data._id,
				user: user
			}

			$scope.bloquedTalk = !$scope.users.filter(function(e){return e._id == $scope.talkActive.user._id})[0].online;
			$scope.users.filter(function(e){return e._id == $scope.talkActive.user._id})[0].messageCount = 0;

			$scope.$apply();

			$('#modalChat').modal({backdrop: 'static', keyboard: false});
		}).error(function(){
			// console.log('Falha ao abrir conversa');
		});
	};

	$scope.closeChat = function(){
		$scope.talkActive = {};
		$('#divChat').slideUp(function(){
        	$('#divUsersOnline').slideDown();
		});
    }

	socket.on('refreshUsersOnlineChat',function(data){
		// console.log(data);
		for(var i = 0; i < $scope.users.length; i++)
			$scope.users[i]["online"] = data.filter(function(e){ return e._id == $scope.users[i]._id }).length;

		if($scope.talkActive.user){
			$scope.bloquedTalk = !$scope.users.filter(function(e){return e._id == $scope.talkActive.user._id})[0].online;
		} 
			
		$scope.$apply();
	});

	$scope.sendMessage = function(){

		$('#divTalk').append('<li style="flex-direction: row-reverse;"> ' +
                                '<img src="content/img/users/' + $rootScope.usuario._id + '.jpg">' +
                                '<div style="background-color: #f5f5f5;" class="message">' + $scope.txtMessage + '</div>' +
                            '</li>');

		socket.emit('sendMessage',{
			idTalk: $scope.talkActive._id,
			userSend: $rootScope.usuario._id, 
			userReceive: $scope.talkActive.user._id, 
			message: $scope.txtMessage 
		});

		$scope.txtMessage = '';
		$('#txtMessage').focus();
		$("#divTalk").animate({ scrollTop: 1000 }, 500);
    };

	socket.on('receiveMessage',function(data){
		console.log($scope.talkActive.user && $scope.talkActive.user._id == data.idUserSend);
		if($scope.talkActive.user && $scope.talkActive.user._id == data.idUserSend){
			$('#divTalk').append
					('<li>' +
						'<img src="content/img/users/' + data.idUserSend+ '.jpg">' +
						'<div class="message"><p>' + data.message  + '</p></div></li>' +
					'<li>');
			$("#divTalk").animate({ scrollTop: 10000 }, 500);

			return;
		}

		var userSend = $scope.users.filter(function(e){return e._id == data.idUserSend})[0];
		$scope.users.filter(function(e){return e._id == data.idUserSend})[0].messageCount 
					= userSend.messageCount ? ++userSend.messageCount : 1; 

	    notifyBrowser(userSend._id,userSend.nome,data.message);
		audio.play();
		$scope.$apply();
	});

	function loadMessages(talk){
		$('#divTalk').empty();
		for(var i = 0; i < talk.messages.length; i++){
			if(talk.messages[i].user == $rootScope.usuario._id)
				$('#divTalk').append
					('<li style="flex-direction: row-reverse;"> ' +
						'<img src="content/img/users/' + talk.messages[i].user + '.jpg">' +
						'<div style="background-color: #f5f5f5;" class="message">' + talk.messages[i].text + '</div>' +
					'</li>');
			else
				$('#divTalk').append
					('<li>' +
						'<img src="content/img/users/' + talk.messages[i].user+ '.jpg">' +
						'<div class="message"><p>' + talk.messages[i].text  + '</p></div></li>' +
					'<li>');
		}

		var trueDivHeight = $('divTalk').scrollHeight;
		var divHeight = $('divTalk').height();
		var scrollLeft = trueDivHeight - divHeight;
		$("#divTalk").animate({ scrollTop: 1000 }, 1000);		
	}

	$scope.sendMessageKeyPress = function(event){
        if(event.which === 13)
            $scope.sendMessage();
    }

	function notifyBrowser(idUser,nameUser,message) {
		if (!Notification) {
			alert('Notificacao nao disponivel para seu navegador'); 
			return;
		}

		if (Notification.permission !== "granted")
			Notification.requestPermission();
		else {
			var notification = new Notification('Mensagem de ' + nameUser, {
				icon: '/content/img/users/' + idUser + '.jpg',
				body: message,
			});

			notification.onclick = function () {
				
			};
		}
	}
});