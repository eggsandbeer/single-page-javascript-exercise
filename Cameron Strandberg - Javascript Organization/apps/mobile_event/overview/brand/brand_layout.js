define(['app', 'hbs!apps/mobile_event/overview/brand/brand_layout_template', 'bootstrap/modal'], function(QuickMobile, BrandTpl, test){
    QuickMobile.module("ME_Overview.OverView.Brand", function(Brand, QuickMobile, Backbone, Marionette, $, _){
        Brand.LayOut = Marionette.Layout.extend({
            template: BrandTpl,
            events: {
                'click .js-submit': 'saveColours',
                'click .js-reset': 'resetColours',
            },
            regions: {
                coloursRegion: '#ColoursRegion'
            },
            initialize: function(){
                $('#TopNotificationRegion').empty();
            },
            saveColours: function(e){
                e.preventDefault();
                this.coloursRegion.currentView.trigger('brand:colorsave', this.coloursRegion.currentView.model);
            },
            resetColours: function(e){
                e.preventDefault();
                this.coloursRegion.currentView.trigger('brand:colorreset', this.coloursRegion.currentView.model);
            }
        });
    });
    return QuickMobile.ME_Overview.OverView.Brand;
});
