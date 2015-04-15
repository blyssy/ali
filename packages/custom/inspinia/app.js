'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Inspinia = new Module('inspinia');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Inspinia.register(function(system, app, auth, database) {

  app.set('views', __dirname + '/server/views');
  
  //We enable routing. By default the Package Object is passed to the routes
  Inspinia.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  /*Inspinia.menus.add({
    title: 'inspinia example page',
    link: 'inspinia example page',
    roles: ['authenticated'],
    menu: 'main',
    icon: 'glyphicon glyphicon-asterisk'
  });*/
  
  //Inspinia.aggregateAsset('css', 'inspinia.css');
  Inspinia.aggregateAsset('css', 'style.css', {global:true, weight: 5});
  Inspinia.aggregateAsset('css', 'animate.css', {global:true});
  Inspinia.aggregateAsset('css', 'bootstrap.css', {global:true});
  Inspinia.aggregateAsset('css', '../lib/font-awesome/css/font-awesome.css', {global:true});
  Inspinia.aggregateAsset('css', 'plugins/toastr/toastr.min.css', {global:true});
  Inspinia.aggregateAsset('css', '../js/plugins/gritter/jquery.gritter.css', {global:true});
  Inspinia.aggregateAsset('css', 'plugins/switchery/switchery.css', {global:true});
  Inspinia.aggregateAsset('css', 'plugins/iCheck/custom.css', {global:true});

  Inspinia.aggregateAsset('js', 'bootstrap.js', {global:true, weight: -4, group: 'footer'});
  Inspinia.aggregateAsset('js', 'jquery-2.1.1.js', {global:true, weight: -5, group: 'footer'});
  Inspinia.aggregateAsset('js', 'plugins/metisMenu/jquery.metisMenu.js', {global:true, weight: -1, group: 'footer'});
  Inspinia.aggregateAsset('js', 'plugins/slimscroll/jquery.slimscroll.min.js', {global:true, weight: 0, group: 'footer'});
  Inspinia.aggregateAsset('js', 'plugins/flot/jquery.flot.js', {global:true, weight: 1, group: 'footer'});
  Inspinia.aggregateAsset('js', 'plugins/flot/jquery.flot.tooltip.min.js', {global:true, weight: 2, group: 'footer'});
  Inspinia.aggregateAsset('js', 'plugins/flot/jquery.flot.spline.js', {global:true, weight: 3, group: 'footer'});
  Inspinia.aggregateAsset('js', 'plugins/flot/jquery.flot.resize.js', {global:true, weight: 4, group: 'footer'});
  Inspinia.aggregateAsset('js', 'plugins/flot/jquery.flot.pie.js', {global:true, weight: 5, group: 'footer'});
  Inspinia.aggregateAsset('js', 'plugins/peity/jquery.peity.min.js', {global:true, weight: 6, group: 'footer'});
  Inspinia.aggregateAsset('js', 'demo/peity-demo.js', {global:true, weight: 7, group: 'footer'});

  Inspinia.aggregateAsset('js', 'inspinia.js', {global:true, weight: 8, group: 'footer'});
  Inspinia.aggregateAsset('js', 'plugins/pace/pace.min.js', {global:true, weight: 9, group: 'footer'});
  Inspinia.aggregateAsset('js', 'plugins/jquery-ui/jquery-ui.min.js', {global:true, weight: 10, group: 'footer'});
  Inspinia.aggregateAsset('js', 'plugins/gritter/jquery.gritter.min.js', {global:true, weight: 11, group: 'footer'});
  Inspinia.aggregateAsset('js', 'plugins/sparkline/jquery.sparkline.min.js', {global:true, weight: 12, group: 'footer'});
  Inspinia.aggregateAsset('js', 'demo/sparkline-demo.js', {global:true, weight: 13, group: 'footer'});
  Inspinia.aggregateAsset('js', 'plugins/chartJs/Chart.min.js', {global:true, weight: 14, group: 'footer'});
  Inspinia.aggregateAsset('js', 'plugins/toastr/toastr.min.js', {global:true, weight: 15, group: 'footer'});
  Inspinia.aggregateAsset('js', 'plugins/jasny/jasny-bootstrap.min.js', {global:true, weight: 16, group: 'footer'});
  Inspinia.aggregateAsset('js', 'plugins/switchery/switchery.js', {global:true, weight: 17, group: 'footer'});
  Inspinia.aggregateAsset('js', 'plugins/iCheck/icheck.min.js', {global:true, weight: 18, group: 'footer'});
  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Inspinia.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Inspinia.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Inspinia.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    //Inspinia.angularDependencies(['ui-switchery']);

  return Inspinia;
});
