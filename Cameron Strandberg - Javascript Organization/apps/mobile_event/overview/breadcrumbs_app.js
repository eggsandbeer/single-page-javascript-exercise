define(['app', 'apps/common/breadcrumbs/list/list_controller'], function(QuickMobile, ListController){
    QuickMobile.module('BreadCrumbs', function(BreadCrumbs, QuickMobile, Backbone, Marionette, $, _){
        BreadCrumbs.App = {
            initialize: function(id){

                var API = {
                    listBreadcrumbs: function(links){
                        ListController.listBreadcrumbs(links);
                    }
                }

                require(['entities/mobile_event/overview/breadcrumbs'], function(){
                    var links = QuickMobile.request( 'header:entities', id);

                    API.listBreadcrumbs(links);

                    QuickMobile.commands.setHandler('set:active:header', function(name){
                         ListController.setActiveHeader(name);
                    });
                });
            }
        }
    });
    return QuickMobile.BreadCrumbs.App;
});
