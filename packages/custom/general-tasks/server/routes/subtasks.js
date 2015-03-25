'use strict';

var Grid = require('gridfs-stream');
var subtasks = require('../controllers/subtasks');

// Task authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.subtask.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Subtasks, app, auth, database) {
  var gfs = new Grid(database.connection.connections[0].db, database.connection.mongo);
  var mean = require('meanio');

    //Setting up the gtasks api
    //var tasks = require('../controllers/general-tasks');
    app.get('/subtasks', auth.requiresAdmin, subtasks.all);
    app.post('/subtasks', auth.requiresAdmin, subtasks.create);
    app.get('/subtasks/:subtaskId', auth.requiresAdmin, subtasks.show);
    app.put('/subtasks/:subtaskId', auth.requiresAdmin, subtasks.update);
    app.delete('/subtasks/:subtaskId', auth.requiresAdmin, subtasks.destroy);

    //app.route('/tasks/list')
    //  .get(auth.requiresAdmin, tasks.all)
    //  .post(auth.requiresAdmin, tasks.create);

    app.param('subtaskId', subtasks.subtask);
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
