'use strict';

var Grid = require('gridfs-stream');
var units = require('../controllers/units');

// Task authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.unit.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Units, app, auth, database) {
  var gfs = new Grid(database.connection.connections[0].db, database.connection.mongo);
  var mean = require('meanio');

    console.log('SETTING UP UNIT ROUTES');
    //Setting up the units api
    app.get('/units', auth.requiresAdmin, units.all);
    app.post('/units', auth.requiresAdmin, units.create);
    app.get('/units/:unitId', auth.requiresAdmin, units.show);
    app.put('/units/:unitId', auth.requiresAdmin, units.update);
    app.delete('/units/:unitId', auth.requiresAdmin, units.destroy);

    app.param('unitId', units.unit);

};
