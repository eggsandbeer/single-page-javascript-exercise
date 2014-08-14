define(['app', 'hbs!apps/mobile_event/overview/details/details_layout_template', 'bootstrap/modal'], function(QuickMobile, DetailsTpl, test){
    QuickMobile.module("ME_Overview.OverView.Details", function(Details, QuickMobile, Backbone, Marionette, $, _){
        Details.LayOut = Marionette.Layout.extend({
            template: DetailsTpl,
            model: new Backbone.Model(),
            initialize: function(){
                $('#TopNotificationRegion').empty();

                _.extend(this.model.attributes, test);
            },
            regions: {
                detailsRegion: '#DetailsRegion',
                languagesRegion: '#LanguageRegion',
                platformsRegion: '#PlatformsRegion',
                agentsRegion: '#AgentsRegion',
                staffRegion: '#StaffRegion'
            }
        });
    });
    return QuickMobile.ME_Overview.OverView.Details;
});
