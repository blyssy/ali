'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Upgrades = new Module('upgrades');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Upgrades.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Upgrades.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Upgrades.menus.add({
    title: 'Material Upgrades',
    link: 'upgrades',
    roles: ['builder'],
    menu: 'main',
    icon: 'fa fa-pencil'
  });
  
  Upgrades.aggregateAsset('css', 'upgrades.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Upgrades.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Upgrades.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Upgrades.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Upgrades;
});
