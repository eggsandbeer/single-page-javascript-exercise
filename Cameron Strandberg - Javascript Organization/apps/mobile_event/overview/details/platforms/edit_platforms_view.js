define([
    'app',
    'hbs!apps/mobile_event/overview/details/platforms/templates/edit_platforms',
    'backbone.syphon'],
function(QuickMobile, EditPlatformsTpl){
    QuickMobile.module("ME_Overview.Platforms.EditPlatforms", function(EditPlatforms, QuickMobile, Backbone, Marionette, $, _){
        EditPlatforms.View = Marionette.ItemView.extend({
            template : EditPlatformsTpl,
            className: 'left',
            events: {
                'click .fieldBuilderCheckbox > div' : 'togglePlatform',
                'click .js-submit' : 'submitClicked',
                'click .btn-link, .modal-backdrop, .close' : 'closeModal',
            },
            modelEvents: {
                'change': 'colChange'
            },
            submitClicked: function(e){
                e.preventDefault();
                var data = Backbone.Syphon.serialize(this);
                this.trigger("form:submit", data);
            },
            closeModal: function(e){
                e.preventDefault();
                this.trigger('close');
                this.trigger('platforms:restore');
            },
            colChange: function(){
                this.trigger("checkenabled:platforms")

                if($('#TopNotificationRegion .alert').length){
                    this.$el.find('.btn-primary').removeClass('disabled');
                }
            },
            togglePlatform: function(e){
                e.preventDefault();

                if ($(e.target).hasClass('active') === true) {
                    $(e.target).removeClass('active');
                    $(e.target).next('input').prop('checked', false);
                } else {
                    $(e.target).addClass('active');
                    $(e.target).next('input').prop('checked', true);

                    if($('#TopNotificationRegion .alert').length){
                        QuickMobile.topNotificationRegion.close();
                        this.$el.find('.btn-primary').removeClass('disabled');
                    }
                }
            }
        });
    });
    return QuickMobile.ME_Overview.Platforms.EditPlatforms;
});



