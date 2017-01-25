var talkMongo = require('./talkMongo.js');

module.exports = {
    add: add,
    getByUsers: getByUsers
};

function add(talk, callback){
    var arrayReverse = talk.users.toString().split(',').reverse().map(Number);
    var query = {$or:[{users:talk.users},{users:arrayReverse}]};

    talkMongo.getByUsers(query,function(err,talkFind){
        if(!talkFind.length){
            talk.messages = [talk.message];

            talkMongo.add(talk,function(err,talkNew){
                if(err){
                    return;
                }

                callback(talkNew);
            });

            return;
        }

        talkFind[0].messages.push(talk.message);

        talkMongo.update(talkFind[0],function (err,talkOld, talkNew){
            if(err){
                return;
            }

            callback(talkNew);
        });
    });
}

function getByUsers(req,res, next){
    if(!req.query.users){
        res.status(400).send('Header sem users.');
        return;
    }

    var array = req.query.users.map(Number);
    var arrayReverse = array.toString().split(',').reverse().map(Number);
    var query = {$or:[{users:array},{users:arrayReverse}]};
    
    talkMongo.getByUsers(query,function(err,talk){
        if(!talk.length){
            res.status(200).json({_id:null,messages:[]});
            return false;
        }

        if(talk[0].messages.length > 10){
            talk[0].messages = talk[0].messages.splice(talk[0].messages.length - 10, 10);
        }

        res.status(200).json(talk[0]);
    });
}

function getMessagesNotReadByUser(idUser){
    talkMongo.getContainsIdUser(idUser,function(err, talks){
        
    });
}