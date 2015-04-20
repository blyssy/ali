'use strict';

var notifys = require('../controllers/notifys');

// Task authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.bid.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Notifys, app, auth, database) {
    //Setting up the gtasks api
    app.get('/notifys', notifys.all);
    app.post('/notifys', notifys.create);
    //app.put('/notifys', auth.requiresAdmin, notifys.updateMaterial);
    app.get('/notifys/:notifyId', notifys.show);
    app.put('/notifys/:notifyId', notifys.update);
    app.delete('/notifys/:notifyId', notifys.destroy);

    app.param('notifyId', notifys.notify);
};
