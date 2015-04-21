'use strict';

var upgrades = require('../controllers/upgrades');

// Task authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.upgrade.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Upgrades, app, auth, database) {
    //Setting up the gtasks api
    app.get('/upgrades', auth.requiresLogin, upgrades.all);
    app.post('/upgrades', auth.requiresLogin, upgrades.create);
    //app.put('/upgrades', auth.requiresAdmin, upgrades.updateMaterial);
    app.get('/upgrades/:upgradeId', auth.requiresLogin, upgrades.show);
    app.put('/upgrades/:upgradeId', auth.requiresLogin, upgrades.update);
    app.delete('/upgrades/:upgradeId', auth.requiresLogin, upgrades.destroy);

    app.param('upgradeId', upgrades.upgrade);
};
