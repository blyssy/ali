'use strict';

var Grid = require('gridfs-stream');
var equipments = require('../controllers/equipments');

// Task authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.equipment.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Equipments, app, auth, database) {
  var gfs = new Grid(database.connection.connections[0].db, database.connection.mongo);
  var mean = require('meanio');

    //Setting up the equipments api
    app.get('/equipments', auth.requiresAdmin, equipments.all);
    app.post('/equipments', auth.requiresAdmin, equipments.create);
    app.get('/equipments/:equipmentId', auth.requiresAdmin, equipments.show);
    app.put('/equipments/:equipmentId', auth.requiresAdmin, equipments.update);
    app.delete('/equipments/:equipmentId', auth.requiresAdmin, equipments.destroy);

    app.param('equipmentId', equipments.equipment);

};
