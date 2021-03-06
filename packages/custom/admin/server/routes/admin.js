'use strict';

//var Grid = require('gridfs-stream');

// The Package is past automatically as first parameter
module.exports = function(Admin, app, auth, database) {
    //var gfs = new Grid(database.connection.connections[0].db, database.connection.mongo);
    //var mean = require('meanio');

    //Setting up the users api
    var users = require('../controllers/users');
    app.get('/admin/users', auth.requiresAdmin, users.all);
    app.post('/admin/users', auth.requiresAdmin, users.create);
    app.put('/admin/users/:userId', auth.requiresAdmin, users.update);
    app.get('/admin/users/:userId', auth.requiresLogin, users.show);
    app.delete('/admin/users/:userId', auth.requiresAdmin, users.destroy);


    //this establishes the function to call to get a single user by id
    app.param('userId', users.user);
};