'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Inspinia, app, auth, database) {

  app.get('/inspinia/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/inspinia/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/inspinia/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/inspinia/example/render', function(req, res, next) {
    Inspinia.render('index', {
      package: 'inspinia'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
