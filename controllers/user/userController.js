var userMongo = require('./userMongo.js');

module.exports = {
    add: add,
    getAll: getAll,
    getLogin: getLogin,
    getById: getById
};

function getAll(req, res, next) {
    userMongo.getAll(function(err, usuariosList){
        if (err) {
            var objectError = new errorObject(400, 'Um erro ocorreu ao buscar os dados', err.message, err.code);
            res.status(objectError.statusCode).json(objectError.body);
            next(objectError.body);
        }
        else {
            res.status(200).json(usuariosList);
            next();
        }
    });
}

function getLogin(req, res, next) {
    if(!req.params.rga || !req.headers.password){
        res.status(401);
        res.send("Login não autorizado.");
        return;
    }
    
    if(usersSocket.filter(function(e){return e.user.rga == req.params.rga}).length){
        res.status(401).send('Usuário já conectado.');
        return;
    }
    
    console.log(req.params.rga);
    console.log(req.headers.password);
    userMongo.getLogin(req, res, next);
}

function add(req, res, next) {
    // var aluno = {
    //     nome: "Dayane Martins",
    //     sexo: "Feminino",
    //     curso: "Ciência da Computação",
    //     periodo: "8º Semestre",
    //     status: 1,
    //     userName: "dayanemartins",
    //     rga: 1256166,
    //     password: "123",
    //     tipoUser: "Aluno"
    // };

    var aluno = {
        nome: "Heitor Cunha",
        sexo: "Masculino",
        status: 1,
        userName: "heitorcunha",
        rga: 006,
        password: "123",
        typeUser: "Professor"
    };

    userMongo.add(aluno, res, next);
}

function getById(id,callback){
    userMongo.getById(id,callback);
}