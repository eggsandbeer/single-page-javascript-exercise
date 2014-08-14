define([
    'backbone',
    'marionette',
    'apps/config/marionette/regions/modal',
    'apps/config/marionette/regions/top_notification'], function(Backbone, Marionette){

    var QuickMobile = new Backbone.Marionette.Application();

    // global role var exists in master.php as a global javascript call is not part of any API. It is used throughout app to hide els and call or not call functions.
    if(window.globalRollVar){
        QuickMobile.userRole = globalRollVar;
    }

    QuickMobile.addRegions({
        headerRegion: '.navbar .navbar-fixed-top',
        mainRegion: '#MainRegion',
        app20ComponentRegion: '.component-container .span6',
        topBreadcrumbsRegion: '#BreadcrumbsRegion',
        modalRegion: Marionette.Region.Modal.extend({
            el: '#ModalRegion'
        }),
        topNotificationRegion: Marionette.Region.TopNotification.extend({
            el: '#TopNotificationRegion'
        })
    });

    QuickMobile.navigate = function(route, options){
        options || (options = {});
        Backbone.history.navigate(route, options);
    }

    QuickMobile.getCurrentRoute = function(){
        return Backbone.history.fragment
    }

    // This is used when you want to start and stop parts of an app's subapps separately from one another.
    QuickMobile.startSubApp = function(appName, args){
        var currentApp = appName ? QuickMobile.module(appName) : null;

        if (QuickMobile.currentApp === currentApp){
            return;
        }

        if (QuickMobile.currentApp){
            QuickMobile.currentApp.stop();
        }

        QuickMobile.currentApp = currentApp;

        if (currentApp) {
            currentApp.start(args);
        }
    }
    return QuickMobile;
});
