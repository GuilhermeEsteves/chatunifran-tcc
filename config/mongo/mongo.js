var mongoose = require('mongoose');

module.exports = function (collectionName, funcionalidade) {
    var model = mongoose.model(collectionName);
    return {
        //MONGO UPDATE/INSERT
        save: function (newData, callback) {
            newData = model(newData);
            newData.save(function (err, data) {
                callback(err, data);
            });
        },
        getById: function (id, callback) {
            model.findById(id)
                .select('-__v')
                .exec(function (err, data) {
                    callback(err, data);
                });
        },
        getAll: function (objectQuery, callback) {
            model.find(objectQuery)
                .select('-__v')
                .exec(function (err, lista) {
                    callback(err, lista);
                });
        },
        update: function (newData, callback) {
            model.findOneAndUpdate({ _id: newData._id }, newData, { upsert: true }, function (err, oldData) {
                callback(err, newData, oldData);
            });
        },
        remove: function (id, callback) {
            model.remove({ _id: id }, function (err, result, a, b) {
                callback(err, result);
            });
        },
        removeAll: function (query, callback) {
            model.remove(query, function (err, result, a, b) {
                callback(err, result);
            });
        }
    };
};

function gerarLog(funcionalidade, collectionName, data) {
    //GerarLog
    logModel = mongoose.model(logSchema.logSchemaName(collectionName));
    mongooseSchema = logModel({
        usuarioLog: data.usuarioAlteracao || data.usuarioInclusao,
        dataLog: new Date(),
        funcionalidade: funcionalidade,
        dados: data
    });
    mongooseSchema.save();
}