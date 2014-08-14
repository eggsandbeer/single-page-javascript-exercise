define([
    'app',
    // details related
    'apps/mobile_event/overview/details/details_layout',
    'apps/mobile_event/overview/details/details/details_controller',
    'apps/mobile_event/overview/details/languages/languages_controller',
    'apps/mobile_event/overview/details/platforms/platforms_controller',
    'apps/mobile_event/overview/details/agents/agents_controller',
    'apps/mobile_event/overview/details/staff/staff_controller',
    // brands related
    'apps/mobile_event/overview/brand/brand_layout',
    'apps/mobile_event/overview/brand/colours/colours_controller',
    // features related
    'apps/mobile_event/overview/features/features_layout',
    'apps/mobile_event/overview/features/common/features_controller',
    // include feature layouts to pass to common controller
    'apps/mobile_event/overview/features/qe_config/qe_layout',
    'apps/mobile_event/overview/features/ma_config/ma_layout'
    ],
    function(
        QuickMobile,
        DetailsLayout,
        DetailsController,
        LanguagesController,
        PlatformsController,
        AgentsController,
        StaffController,
        BrandLayout,
        ColoursController,
        FeaturesLayout,
        FeaturesController,
        QELayout,
        MALayout
    ){ QuickMobile.module('ME_Overview.OverView', function(OverView, QuickMobile, Backbone, Marionette, $, _){
        OverView.Controller = {
            // Important point!!! We are passing this layout view instance to all controllers so they can use its region references to render out out many views on this page.
            showDetailsLayOut : function(id){

                var detailsLayout = new DetailsLayout.LayOut();

                QuickMobile.execute('set:active:header', 'details');

                detailsLayout.on('show', function(){

                    if(QuickMobile.userRole === 'customer'){
                        DetailsController.showDetails(id, detailsLayout);
                        PlatformsController.showPlatforms(id, detailsLayout);
                        StaffController.showStaff(id, detailsLayout);
                    }
                    if(QuickMobile.userRole === 'agent'){
                        DetailsController.showDetails(id, detailsLayout);
                        LanguagesController.showLanguages(id, detailsLayout);
                        PlatformsController.showPlatforms(id, detailsLayout);
                        AgentsController.showAgents(id, detailsLayout);
                        StaffController.showStaff(id, detailsLayout);
                    }
                    if(QuickMobile.userRole === 'partner'){
                        DetailsController.showDetails(id, detailsLayout);
                        PlatformsController.showPlatforms(id, detailsLayout);
                    }

                });

                QuickMobile.mainRegion.show(detailsLayout);
            },
            showBrandLayOut : function(id){
                if(QuickMobile.userRole === 'agent'){
                    var brandLayout = new BrandLayout.LayOut();

                    QuickMobile.execute('set:active:header', 'brand');

                    brandLayout.on('show', function(){
                        ColoursController.showColours(id, brandLayout);
                    });

                    QuickMobile.mainRegion.show(brandLayout);
                }
            },
            showFeaturesLayOut : function(id){
                if(QuickMobile.userRole === 'agent'){
                    var featuresLayout = new FeaturesLayout.LayOut();

                    QuickMobile.execute('set:active:header', 'features');

                    featuresLayout.on('show', function(){
                        FeaturesController.startLayout(id, featuresLayout, QELayout);
                        FeaturesController.startLayout(id, featuresLayout, MALayout);
                    });
                    QuickMobile.mainRegion.show(featuresLayout);
                }
            }
        }
    });
    return QuickMobile.ME_Overview.OverView.Controller;
});
