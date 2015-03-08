'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Admin = new Module('admin');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Admin.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Admin.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Admin.menus.add({
    title: 'Admin Users',
    link: 'users',
    roles: ['admin'],
    menu: 'main'
  });
  
  Admin.aggregateAsset('css', 'admin.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Admin.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Admin.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Admin.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    Admin.aggregateAsset('js', '../lib/ng-clip/src/ngClip.js', {
        absolute: false,
        global: true
    });

    Admin.aggregateAsset('js', '../lib/zeroclipboard/dist/ZeroClipboard.js', {
        absolute: false,
        global: true
    });

    Admin.angularDependencies(['ngClipboard']);

    // We enable routing. By default the Package Object is passed to the routes
    Admin.routes(app, auth, database);

  return Admin;
});
