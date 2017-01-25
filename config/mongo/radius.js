var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment'),
    // mongoDbPath = 'mongodb://localhost:27017/chatunifran',
    mongoDbPath = 'mongodb://ec2-35-160-117-193.us-west-2.compute.amazonaws.com:27017/chatunifran',
    user = 'chatunifran',
    pass = '123'

var mongoOptions = {
    server: {
        auto_reconnect: true
    },
    user: user,
    pass: pass
};

mongoose.connect(mongoDbPath);

var db = mongoose.connection;
autoIncrement.initialize(db);

//User
var user = require('./schemas/userSchema.js');

mongoose.model(user.name, user.schema).schema.plugin(autoIncrement.plugin, {
    model: user.name,
    startAt: 1,
    incrementBy: 1
});

//Talk
var talk = require('./schemas/talkSchema.js');

mongoose.model(talk.name, talk.schema).schema.plugin(autoIncrement.plugin, {
    model: talk.name,
    startAt: 1,
    incrementBy: 1
});

db.on('error', function (err) {
    console.error('MongoDB connection error:', err);
});
db.once('open', function callback() {
    console.info('MongoDB connection is established with user ');
});
db.on('disconnected', function () {
    console.error('MongoDB disconnected!');
    mongoose.connect(mongoDbPath);
});
db.on('reconnected', function () {
    console.info('MongoDB reconnected!');
});