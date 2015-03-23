'use strict';

var Grid = require('gridfs-stream');
var materials = require('../controllers/materials');

// Task authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.material.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(GeneralTasks, app, auth, database) {
  var gfs = new Grid(database.connection.connections[0].db, database.connection.mongo);
  var mean = require('meanio');

    //Setting up the materials api
    app.get('/materials', auth.requiresAdmin, materials.all);
    app.post('/materials', auth.requiresAdmin, materials.create);
    app.get('/materials/:materialId', auth.requiresAdmin, materials.show);
    app.put('/materials/:materialId', auth.requiresAdmin, materials.update);
    app.delete('/materials/:materialId', auth.requiresAdmin, materials.destroy);

    app.param('materialId', materials.material);

};
