angular.module('chatunifran').controller('pessoasOnlineController', function($scope, $filter, $timeout,$rootScope){
    $scope.tela = 'Pessoas Online';
    $scope.forms = {};
    $scope.usersOnline = [];
    $scope.userChat = {};
    $scope.txtMessage = "";

    if(!socket){
      socket = io('http://localhost:3000',{ query: "login=" + $rootScope.usuario.rgm });
    }

    socket.emit('getUsersOnline');

    socket.on('refreshUsersPessoasOnline',function(usuariosLogado){
      if(usuariosLogado)
        $scope.usersOnline = usuariosLogado.filter(function(e){return e.rgm != $rootScope.usuario.rgm});
      else
        $scope.usersOnline = [];
        
      $scope.$apply();
    });

    $scope.openChat = function(user){
      $scope.userChat = user;
      $('#divUsersOnline').slideUp(function(){
        $('#divChat').slideDown();
      });
    }

    $scope.closeChat = function(){
      $scope.userChat = {};
      $('#divChat').slideUp(function(){
        $('#divUsersOnline').slideDown();
      });
    }

    $scope.sendMessage = function(){

      $('#divTalk').append(' <li style="flex-direction: row-reverse;"> ' +
                                '<img src="content/img/users/' + $rootScope.usuario.rgm + '.jpg">' +
                                '<div style="background-color: #f5f5f5;" class="message">' + $scope.txtMessage + '</div>' +
                            '</li>');
      socket.emit('sendMessage',{
        userSend: $rootScope.usuario.rgm, 
        userReceive: $scope.userChat.rgm, 
        message: $scope.txtMessage 
      });

      $scope.txtMessage = '';
      $('#txtMessage').focus();
      $("#divTalk").animate({ scrollTop: 1000 }, 3000);
    };

    socket.on('receiveMessage',function(data){
      $('#divTalk').append('<li>' +
                                '<img src="content/img/users/' + data.rgm + '.jpg">' +
                                '<div class="message"><p>' + data.message + '</p></div></li>' +
                            '<li>');
      $("#divTalk").animate({ scrollTop: 1000 }, 3000);
    });

    $scope.sendMessageKeyPress = function(event){
        if(event.which === 13)
            $scope.sendMessage();
    }
});
