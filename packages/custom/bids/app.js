'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Bids = new Module('bids');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Bids.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Bids.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Bids.menus.add({
    title: 'Bid Wizard',
    link: 'bid wizard',
    roles: ['authenticated'],
    menu: 'main',
    icon: 'fa fa-magic'
  });

  Bids.menus.add({
    title: 'Bid Control Center',
    link: 'bids',
    roles: ['authenticated'],
    menu: 'main',
    icon: 'glyphicon glyphicon-leaf'
  });
  
  //Bids.aggregateAsset('css', 'bids.css');
  Bids.aggregateAsset('css', 'steps/jquery.steps.css');
  //Bids.aggregateAsset('css', '../lib/switchery/dist/switchery.css');


  Bids.aggregateAsset('js', 'steps/jquery.steps.min.js');
  Bids.aggregateAsset('js', '../lib/angular-ui-utils/ui-utils.js');
  //Bids.aggregateAsset('js', '../lib/switchery/dist/switchery.js');
  //Bids.aggregateAsset('js', '../lib/angular/angular.min.js');
  //Bids.aggregateAsset('js', '../lib/angular-ui-router/release/angular-ui-router.js', {global:true, weight: -20, group: 'header'});

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Bids.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Bids.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Bids.settings(function(err, settings) {
        //you now have the settings object
    });
    */
  //Bids.angularDependencies(['ngAnimate']);
  Bids.angularDependencies(['ui.mask']);
  //Bids.angularDependencies(['ui-switchery']);

  return Bids;
});
