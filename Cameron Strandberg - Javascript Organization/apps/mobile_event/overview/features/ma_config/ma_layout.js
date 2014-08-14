define(['app', 'hbs!apps/mobile_event/overview/features/ma_config/templates/ma_layout'], function(QuickMobile, MAConfigLayoutTpl){
    QuickMobile.module("ME_Overview.MAConfig.MAFeatures", function(MAFeatures, QuickMobile, Backbone, Marionette, $, _){
        MAFeatures.Layout = Marionette.Layout.extend({
            template: MAConfigLayoutTpl,
            className: 'accordion-group',
            regions: {
                MAStandardRegion: '#MAStandardRegion',
                MACustomRegion: '#MACustomRegion'
            }
        });
    });
    return QuickMobile.ME_Overview.MAConfig.MAFeatures;
});
