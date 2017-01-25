var talkSchema = require('../../config/mongo/schemas/talkSchema.js'),
    mongo = require('../../config/mongo/mongo.js')(talkSchema.name, talkSchema.funcionalidade),
    mongooseModel = require('mongoose').model(talkSchema.name);

module.exports = {
    add: add,
    getTalk: getTalk,
    update: update,
    getById: getById,
    getByUsers: getByUsers,
    getContainsIdUser: getContainsIdUser
}

function getTalk(req, res, next) {
    // mongooseModel.find(req.query)
    //     .exec(function (err, alunosList) {
    //         if (err) {
    //             var objectError = new errorObject(400, 'Um erro ocorreu ao buscar os dados', err.message, err.code);
    //             res.status(objectError.statusCode).json(objectError.body);
    //             next(objectError.body);
    //         }
    //         else {
    //             res.status(200).json(alunosList);
    //             next();
    //         }
    //     });
}

function add(talk,callback){
    mongo.save(talk, callback);
}

function getById(_id, callback) {
    mongo.getById(_id, callback);
}

function getByUsers(query, callback) {
    mongo.getAll(query, callback);
}

function update(talk, callback){
    mongo.update(talk,callback);
}

function getContainsIdUser(idUser,callback){
    mongooseModel.find({users:{$in:[idUser]}}).exec(callback);
}