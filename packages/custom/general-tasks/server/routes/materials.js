'use strict';

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
module.exports = function(Materials, app, auth, database) {

    console.log('SETTING UP MATERIAL ROUTES');
    //Setting up the materials api
    app.get('/materials', auth.requiresAdmin, materials.all);
    app.post('/materials', auth.requiresAdmin, materials.create);
    app.get('/materials/:materialId', auth.requiresAdmin, materials.show);
    app.put('/materials/:materialId', auth.requiresAdmin, materials.update);
    app.delete('/materials/:materialId', auth.requiresAdmin, materials.destroy);

    app.param('materialId', materials.material);
};
