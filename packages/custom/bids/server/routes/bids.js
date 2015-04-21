'use strict';

var bids = require('../controllers/bids');

// Task authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.bid.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Bids, app, auth, database) {
    //Setting up the gtasks api
    app.get('/bids', auth.requiresLogin, bids.all);
    app.post('/bids', auth.requiresLogin, bids.create);
    //app.put('/bids', auth.requiresAdmin, bids.updateMaterial);
    app.get('/bids/:bidId', auth.requiresLogin, bids.show);
    app.put('/bids/:bidId', auth.requiresAdmin, bids.update);
    app.delete('/bids/:bidId', auth.requiresAdmin, bids.destroy);

    app.get('/requests', auth.requiresLogin, bids.all);

    app.param('bidId', bids.bid);
};
