'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var GeneralTasks = new Module('general-tasks');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
GeneralTasks.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  GeneralTasks.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  GeneralTasks.menus.add({
    title: 'General Tasks',
    link: 'all tasks',
    roles: ['authenticated'],
    menu: 'main'
  });

  //GeneralTasks.angularDependencies(['ngTable']);
  
  //GeneralTasks.aggregateAsset('css', 'style.css', {global:true});
  //GeneralTasks.aggregateAsset('css', 'animate.css', {global:true});
  //GeneralTasks.aggregateAsset('css', 'dataTables/dataTables.bootstrap.css');
  //GeneralTasks.aggregateAsset('css', 'dataTables/dataTables.responsive.css');
  GeneralTasks.aggregateAsset('css', '../lib/ng-table-master/dist/ng-table.css');
  GeneralTasks.aggregateAsset('js', '../lib/ng-table-master/dist/ng-table.js');
  //GeneralTasks.aggregateAsset('js', 'dataTables/dataTables.responsive.js');
  //GeneralTasks.aggregateAsset('js', 'dataTables/dataTables.tableTools.min.js');
  //GeneralTasks.aggregateAsset('js', 'dataTables/jquery.dataTables.js');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    GeneralTasks.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    GeneralTasks.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    GeneralTasks.settings(function(err, settings) {
        //you now have the settings object
    });
    */
    GeneralTasks.angularDependencies(['ngTable']);

  return GeneralTasks;
});
