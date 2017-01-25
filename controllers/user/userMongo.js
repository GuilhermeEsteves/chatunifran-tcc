var userSchema = require('../../config/mongo/schemas/userSchema.js'),
    mongo = require('../../config/mongo/mongo.js')(userSchema.name, userSchema.funcionalidade),
    mongooseModel = require('mongoose').model(userSchema.name);

module.exports = {
    add: add,
    getAll: getAll,
    getLogin: getLogin,
    getById: getById
};


function add(user, res, next) {
    mongo.save(user, function (err, user) {
        if (err) {
            var error = new errorObject(400, 'Um erro ocorreu ao salvar os dados', err.message, err.code);
            res.status(error.statusCode).json(error.body);
            next(error);
        }
        else {
            res.status(200).json(user);
            next();
        }
    });
}

function getAll(callback) {
    mongooseModel.find({}).exec(callback);
}

function getLogin(req, res, next) {
    mongooseModel.find({
        rga: req.params.rga,
        password: req.headers.password
    }).exec(function (err, user) {
            if (err) {
                var objectError = new errorObject(400, 'Um erro ocorreu ao buscar os dados', err.message, err.code);
                res.status(objectError.statusCode).json(objectError.body);
                next(objectError.body);
            }
            else {
                if(user.length == 0){
                    res.status(401);
                    res.send("Código de acesso ou senha inválidos.");
                }
                else
                    res.status(200).json(user[0]);
                next();
            }
        });
}

function getById(id, callback) {
    mongooseModel.find({_id:id}).exec(callback);
}