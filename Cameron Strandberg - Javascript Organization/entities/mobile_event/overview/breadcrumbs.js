define(['app', 'backbone.picky'], function(QuickMobile){
    QuickMobile.module('Entities', function(Entities, QuickMobile, Backbone, Marionette, $, _){
        Entities.Breadcrumbs = Backbone.Model.extend({
            initialize: function(){
                var selectable = new Backbone.Picky.Selectable(this);
                _.extend(this, selectable);
            }
        });

        Entities.BreadcrumbsCollection = Backbone.Collection.extend({
            model: Entities.Breadcrumbs,
            initialize: function(){
                var singleSelect = new Backbone.Picky.SingleSelect(this);
                _.extend(this, singleSelect);
            }
        });

        var initializeBreadcrumbs = function(id){
            if(QuickMobile.userRole === 'agent'){
                Entities.headers = new Entities.BreadcrumbsCollection([
                    {
                        id: 1,
                        appId: id,
                        name: "Details",
                        url: "details",
                        navigationTrigger: "details:show"
                    },
                    {
                        id: 2,
                        appId: id,
                        name: "Brand",
                        url: "brand",
                        navigationTrigger: "brand:show"
                    },
                    {
                        id: 3,
                        appId: id,
                        name: "Features",
                        url: "features",
                        navigationTrigger: "features:show"
                    }
                ]);
            }
            if(QuickMobile.userRole === 'customer' || QuickMobile.userRole === 'partner'){
                Entities.headers = new Entities.BreadcrumbsCollection([
                    {
                        id: 1,
                        appId: id,
                        name: "Details",
                        url: "details",
                        navigationTrigger: "details:show"
                    }
                ]);
            }
        };

        var API = {
            getHeaders: function(id){
                if (Entities.headers === undefined){
                    initializeBreadcrumbs(id);
                }
                return Entities.headers;
            }
        }

        QuickMobile.reqres.setHandler("header:entities", function(id){
            return API.getHeaders(id);
        });
    });
    return ;
});
