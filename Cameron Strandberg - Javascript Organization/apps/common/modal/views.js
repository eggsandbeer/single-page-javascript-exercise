define(['app', 'hbs!apps/common/modal/templates/modal_comp'], function(QuickMobile, ModalCompTemplate){
    QuickMobile.module('Common.ModalView', function(ModalView, QuickMobile, Backbone, Marionette, $, _){
        ModalView.CompView = Marionette.CompositeView.extend({
            template: ModalCompTemplate,
            itemViewContainer: '.content',
            events: {
                'click .js-submit': 'saveEventTrigger',
                'click .btn-cancel': 'closeModal'
            },
            serializeData: function(){
                return {
                    title: this.options.title,
                    subtitle: this.options.subtitle,
                    parentId: this.options.parentId
                }
            },
            saveEventTrigger: function(e){
                e.preventDefault();
                this.trigger('comp:save', this.model);
            },
            closeModal:function(e){
                e.preventDefault();
                this.trigger('comp:close');
            }
        });

    });
    return QuickMobile.Common.ModalView;
});
