var express = require('express');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

app.use(express.static(require('path').join(__dirname, '/frontend')));

app.set('views', __dirname + '/frontend');
app.set('view engine', 'vash');
app.engine('html', require('vash').renderFile);

(function loadJsonBodyParser() {
    var bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ limit: '20mb',extended:true }));
    app.use(bodyParser.json());
})();

    
require("./config/mongo/radius.js");

var userController = require('./controllers/user/userController.js'),
    talkController = require('./controllers/talk/talkController.js');


(function loadModelViewControllers() {
    require('express-load')('controllers')
        .then('routes')
        .into(app);
})();

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

global.usersSocket = [];

io.on('connection', function(socket){

  if(socket.handshake.query['iduser'] && 
        usersSocket.filter(function(e){ return e.user._id == socket.handshake.query['iduser']}).length == 0)
  {

        userController.getById(socket.handshake.query['iduser'],function(err, user){
            if (!err) {
                usersSocket.push({
                  user: user[0],
                  socket: socket
                });

                io.sockets.emit('refreshUsersOnlineChat',getUsersOnline());
            }
        });
  }

  //io.sockets.emit('refreshUsersOnlineChat',getUsersOnline());

  socket.on('getUsersOnline',function(data){
      io.sockets.emit('refreshUsersOnlineChat',getUsersOnline());
  });

  socket.on('sendMessage',function(data){

    var talk = {
        _id: data.idTalk,
        users: [data.userSend,data.userReceive],
        message: {
          user: data.userSend,
          text: data.message,
        }
    };

    talkController.add(talk,function(talkNew){
        var socketReceive = usersSocket.filter(function(e){return e.user._id == data.userReceive})[0];
        var userSend = usersSocket.filter(function(e){return e.user._id == data.userSend})[0].user;
        io.sockets.connected[socketReceive.socket.id].emit('receiveMessage',
            {
                message: data.message,
                idUserSend: userSend._id,
                idTalk: talkNew._id
            });
    });
    
  });
  
  socket.on('forceDisconnect',function(){
    socket.disconnect();
  });

  socket.on('disconnect', function(){
    
    //socket.emit('transa');

    // usuarios = usuarios.filter(function(e){
    //   return e.rgm != socket.handshake.query['login'];
    // });

    // usuariosLogado = usuariosLogado.filter(function(e){
    //   return e != socket.handshake.query['login'];
    // });

    // socket.broadcast.emit('message', {saiu: socket.handshake.query['login'],usuariosLogado: usuariosLogado});

    usersSocket = usersSocket.filter(function(e){return e.socket.id != socket.id});

    io.sockets.emit('refreshUsersOnlineChat',getUsersOnline());
  });

  function getUsersOnline(){
    usersOnline = [];
    for(var i = 0; i < usersSocket.length; i++)
        usersOnline.push(usersSocket[i].user);
    
      return usersOnline;
  }

});


//Todo mundo;
// io.sockets.emit('refreshUsersPessoasOnline',usersOnline);

//Todo mundo menos o que disparou
// socket.broadcast.emit('users_count', clients);