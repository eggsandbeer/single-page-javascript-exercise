define(['app', 'hbs!apps/mobile_event/overview/features/common/template/features_standard_item', 'backbone.syphon'], function(QuickMobile, ItemTemp){
    QuickMobile.module('ME_Overview.Features.Common', function(Common, QuickMobile, Backbone, Marionette, $, _){
        Common.StandardItemsView = Marionette.ItemView.extend({
            template: ItemTemp,
            tagName: 'div',
            events: {
                'click .feature-container' : 'toggleFeature',
                'click .js-submit': 'saveEventTrigger',
                'click .btn-link': 'closeModal'
            },
            toggleFeature: function(e){
                e.preventDefault();
                $(e.target).find('.icon-ok').toggleClass('hidden');

                var cb = $(e.target).closest('.feature-container').find('input[type=checkbox]');

                if(cb.prop('checked') === false){
                    cb.prop('checked', true);
                } else {
                    cb.prop('checked', false);
                }
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
