define([
    'app',
    'apps/common/breadcrumbs/list/list_view'], 
function(QuickMobile, View){
    QuickMobile.module('Breadcrumbs.List', function(List, QuickMobile, Backbone, Marionette, $, _){
        List.Controller = {
            listBreadcrumbs: function(links){
                var headers = new View.Headers({ collection: links });
            
                headers.on('brand:clicked', function(){
                    QuickMobile.trigger("contacts:list");
                });

                headers.on('itemview:navigate', function(childView, model){
                    var trigger = model.get('navigationTrigger');
                    var appId = model.get('appId');
                    var url = model.get('url');

                    QuickMobile.trigger(trigger, appId);
                });

                QuickMobile.topBreadcrumbsRegion.show(headers);
            },
            setActiveHeader: function(headerUrl){
                var links = QuickMobile.request('header:entities');
                var headerToSelect = links.find(function(header){
                    return header.get('url') === headerUrl;
                });

                headerToSelect.select();
                links.trigger('reset');
            }
        }  
    });
    return QuickMobile.Breadcrumbs.List.Controller;
});


