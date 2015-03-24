'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Bids, app, auth, database) {

  app.get('/bids/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/bids/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/bids/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/bids/example/render', function(req, res, next) {
    Bids.render('index', {
      package: 'bids'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
