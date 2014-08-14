define(['app', 'hbs!apps/mobile_event/overview/features/features_layout_template'], function(QuickMobile, FeaturesTpl, test){
    QuickMobile.module("ME_Overview.OverView.QEFeatures", function(QEFeatures, QuickMobile, Backbone, Marionette, $, _){
        QEFeatures.LayOut = Marionette.Layout.extend({
            template: FeaturesTpl,
            initialize: function(){
                $('#TopNotificationRegion').empty();
            },
            regions: {
                MAConfigRegion: '#MAConfigRegion',
                QEConfigRegion: '#QEConfigRegion'
            }
        });
    });
    return QuickMobile.ME_Overview.OverView.QEFeatures;
});
