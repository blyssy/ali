'use strict';

//var Grid = require('gridfs-stream');
var factors = require('../controllers/companyFactors');

// Factor authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.factor.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(CompanyFactors, app, auth, database) {
  //var gfs = new Grid(database.connection.connections[0].db, database.connection.mongo);
  //var mean = require('meanio');

    //Setting up the factors api
    app.get('/company-factors', auth.requiresAdmin, factors.all);
    //app.post('/company-factors', auth.requiresAdmin, factors.create);
    app.get('/company-factors/:factorId', auth.requiresAdmin, factors.show);
    app.put('/company-factors/:factorId', auth.requiresAdmin, factors.update);
    //app.delete('/company-factors/:factorId', auth.requiresAdmin, factors.destroy);

    app.param('factorId', factors.factor);
};
