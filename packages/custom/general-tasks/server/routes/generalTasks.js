'use strict';

var Grid = require('gridfs-stream');
var tasks = require('../controllers/general-tasks');

// Task authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.task.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(GeneralTasks, app, auth, database) {
  var gfs = new Grid(database.connection.connections[0].db, database.connection.mongo);
  var mean = require('meanio');

    //Setting up the gtasks api
    //var tasks = require('../controllers/general-tasks');
    app.get('/general-tasks', auth.requiresAdmin, tasks.all);
    app.post('/general-tasks', auth.requiresAdmin, tasks.create);
    app.put('/general-tasks', auth.requiresAdmin, tasks.updateMaterial);
    app.get('/general-tasks/:taskId', auth.requiresAdmin, tasks.show);
    app.put('/general-tasks/:taskId', auth.requiresAdmin, tasks.update);
    app.delete('/general-tasks/:taskId', auth.requiresAdmin, tasks.destroy);
    app.delete('/general-tasks/:taskId/:index', auth.requiresAdmin, tasks.destroyMatItem);

    //app.route('/tasks/list')
    //  .get(auth.requiresAdmin, tasks.all)
    //  .post(auth.requiresAdmin, tasks.create);

    app.param('taskId', tasks.task);

//  app.get('/generalTasks/example/anyone', function(req, res, next) {
//    res.send('Anyone can access this');
//  });

//  app.get('/generalTasks/example/auth', auth.requiresLogin, function(req, res, next) {
//    res.send('Only authenticated users can access this');
//  });

//  app.get('/generalTasks/example/admin', auth.requiresAdmin, function(req, res, next) {
//    res.send('Only users with Admin role can access this');
//  });

//  app.get('/generalTasks/example/render', function(req, res, next) {
//    GeneralTasks.render('index', {
//      package: 'general-tasks'
//    }, function(err, html) {
      //Rendering a view from the Package server/views
//      res.send(html);
//    });
//  });
};
