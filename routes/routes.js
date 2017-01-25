module.exports = function(app){
    var userController = app.controllers.user.userController;
    var talkController = app.controllers.talk.talkController;

    app.route('/api/login/:rga*?')
        .get(userController.getLogin);

    app.route('/api/users')
        .get(userController.getAll)
        .post(userController.add);

    app.route('/api/talk')
        .get(talkController.getByUsers);

    app.get('/', function (req, res) {
        res.render('frontend/view/index.html');
    });
}