define(['app', 'apps/mobile_event/overview/breadcrumbs_app', 'apps/common/helpers/geturl'], function(QuickMobile, BreadCrumbs, GetURL){
    QuickMobile.module('ME_Overview', function(ME_Overview, QuickMobile, Backbone, Marionette, $, _){

        ME_Overview.startWithParent = true;

        QuickMobile.module('Routers.ME_Overview', function(ME_OverviewRouter, QuickMobile, Backbone, Marionette, $, _){
            ME_Overview.Router = Marionette.AppRouter.extend({
                appRoutes: {
                    'details': 'showDetails',
                    'brand': 'showBrand',
                    'features': 'showFeatures',
                    '*path': 'defaultRedirect'
                }
            });

            var API = {
                showDetails: function(id){
                    require(['apps/mobile_event/overview/overview_controller'], function(OverViewController){
                        if (id === undefined){
                            var id = GetURL();
                        }

                        OverViewController.showDetailsLayOut(id);
                        BreadCrumbs.initialize(id);
                    });
                },
                showBrand: function(id){
                    require(['apps/mobile_event/overview/overview_controller'], function(OverViewController){
                        if (id === undefined){
                            var id = GetURL();
                        }

                        OverViewController.showBrandLayOut(id);
                        BreadCrumbs.initialize(id);

                    });
                },
                showFeatures: function(id){
                    require(['apps/mobile_event/overview/overview_controller'], function(OverViewController){
                        if (id === undefined){
                            var id = GetURL();
                        }

                        OverViewController.showFeaturesLayOut(id);
                        BreadCrumbs.initialize(id);
                    });
                },
                defaultRedirect: function(){
                    var id = GetURL();

                    // QuickMobile.navigate('details');
                    API.showDetails(id);
                }
            };

            QuickMobile.on('details:show', function(id){
                API.showDetails(id);
                QuickMobile.navigate('details');
            });

            QuickMobile.on('brand:show', function(id){
                API.showBrand(id);
                QuickMobile.navigate('brand');
            });

            QuickMobile.on('features:show', function(id){
                API.showFeatures(id);
                QuickMobile.navigate('features');
            });

            QuickMobile.addInitializer(function(){
                new ME_Overview.Router({
                    controller: API
                });
            });
        });
    });
    return QuickMobile.ME_OverviewRouter;
});
