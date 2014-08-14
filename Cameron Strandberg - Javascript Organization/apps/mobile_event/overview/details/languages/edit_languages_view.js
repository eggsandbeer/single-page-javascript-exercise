define([
    'app',
    'hbs!apps/mobile_event/overview/details/languages/templates/edit_languages',
    'backbone.syphon'], function(QuickMobile, EditLanguagesTpl){
    QuickMobile.module("ME_Overview.Languages.EditView", function(EditView, QuickMobile, Backbone, Marionette, $, _){
        EditView.EditLanguages = Marionette.ItemView.extend({
            template: EditLanguagesTpl,
            events: {
                'click .js-submit': 'submitClicked',
                'click .btn-link, .modal-backdrop, .error' : 'closeModal',
                'click .badge.default' : 'defaultLanguage'
            },
            onShow: function(){
                // this.$el.find('li:last').remove();
            },
            submitClicked: function(e){
                e.preventDefault();
                var data = Backbone.Syphon.serialize(this);
                this.trigger("form:submit", data);
            },
            closeModal: function(e){
                e.preventDefault();
                this.trigger('close');
                this.trigger('restore:languages')
            },
            defaultLanguage: function(e){
                this.$el.find('.badge-info.display').removeClass('display');
                this.$el.find('.badge.default').removeClass('no-display');
                this.$el.find('.hidden-default').prop('checked', false);
                this.$el.find('.selected-checkbox').removeClass('disabled').attr('disabled', false);

                $(e.target).parent().find('.badge.default').addClass('no-display');
                $(e.target).parent().find('.badge-info').addClass('display');
                $(e.target).parent().find('.selected-checkbox').prop('checked', true).attr('disabled', true);
                $(e.target).parent().find('.hidden-default').prop('checked', true);
            }
        });
    });
    return QuickMobile.ME_Overview.Languages.EditView;
});
