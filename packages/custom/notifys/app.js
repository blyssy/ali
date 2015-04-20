'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Notifys = new Module('notifys');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Notifys.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Notifys.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  /*Notify.menus.add({
    title: 'notify example page',
    link: 'notify example page',
    roles: ['authenticated'],
    menu: 'main'
  }); */
  
  //Notify.aggregateAsset('css', 'notify.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Notify.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Notify.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Notify.settings(function(err, settings) {
        //you now have the settings object
    });
    */
  Notifys.angularDependencies(['toaster']);
  return Notifys;
});
