define(['app', 'hbs!apps/mobile_event/overview/features/common/template/features_custom_item', 'backbone.syphon'], function(QuickMobile, ItemTemp){
    QuickMobile.module('ME_Overview.Features.Common', function(Common, QuickMobile, Backbone, Marionette, $, _){
        Common.CustomItemView = Marionette.ItemView.extend({
            template: ItemTemp,
            tagName: 'div',
            events: {
                'click' : 'toggleFeature',
                'click .js-submit': 'saveEventTrigger',
                'click .btn-link': 'closeModal'
            },
            saveEventTrigger: function(e){
                e.preventDefault();
                if(!$(e.target).hasClass('disabled')){
                    var data = Backbone.Syphon.serialize(this);
                    this.trigger('comp:save', data);
                }
            },
            closeModal:function(e){
                e.preventDefault();
                this.trigger('comp:close');
            }
        });
    });
    return QuickMobile.ME_Overview.Features.Common;
});
