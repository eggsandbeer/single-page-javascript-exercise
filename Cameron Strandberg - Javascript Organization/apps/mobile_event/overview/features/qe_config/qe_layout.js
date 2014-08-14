define(['app', 'hbs!apps/mobile_event/overview/features/qe_config/templates/qe_layout'], function(QuickMobile, QEConfigLayoutTpl){
    QuickMobile.module("ME_Overview.QEConfig.QEFeatures", function(QEFeatures, QuickMobile, Backbone, Marionette, $, _){
        QEFeatures.Layout = Marionette.Layout.extend({
            template: QEConfigLayoutTpl,
            className: 'accordion-group',
            regions: {
                QEStandardRegion: '#QEStandardRegion',
                QECustomRegion: '#QECustomRegion'
            }
        });
    });
    return QuickMobile.ME_Overview.QEConfig.QEFeatures;
});
