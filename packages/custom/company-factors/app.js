'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var CompanyFactors = new Module('company-factors');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
CompanyFactors.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  CompanyFactors.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  CompanyFactors.menus.add({
    title: 'Company Information',
    link: 'company information',
    roles: ['admin', 'mtc'],
    menu: 'main',
    icon: 'fa fa-tasks'
  });
  
  CompanyFactors.aggregateAsset('css', 'companyFactors.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    CompanyFactors.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    CompanyFactors.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    CompanyFactors.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return CompanyFactors;
});
