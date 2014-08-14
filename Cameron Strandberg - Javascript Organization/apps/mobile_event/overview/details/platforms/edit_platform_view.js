define(['app', 'hbs!apps/mobile_event/overview/details/platforms/templates/edit_platform', 'backbone.syphon'], function(QuickMobile, EditPlatformTpl){
    QuickMobile.module("ME_Overview.Platforms.EditPlatform", function(EditPlatform, QuickMobile, Backbone, Marionette, $, _){
        EditPlatform.View = Marionette.ItemView.extend({
            template: EditPlatformTpl,
            events: {
                'click .js-submit': 'submitClicked',
                'click .btn-link, .close, .modal-backdrop' : 'closeModal'
            },
            submitClicked: function(e){
                e.preventDefault();
                var data = Backbone.Syphon.serialize(this);
                this.trigger("form:submit", data);
            },
            closeModal: function(e){
                e.preventDefault();
                this.trigger('close');
                this.trigger('platform:restore');
            },
            onFormDataInvalid: function(errors){
                var $view = this.$el;

                var clearFormErrors = function(){
                    var $form = $view.find("form");

                    $form.find(".help-inline.error").each(function(){
                        $(this).remove();
                    });

                    $form.find(".control-group.error").each(function(){
                        $(this).removeClass('error');
                    });
                }

                var markErrors = function(value, key){
                    var $controlGroup = $view.find('#Platforms-'+key).parent(),
                        $errorEl = $("<small></small>").addClass('help-inline error').text(value);

                    $controlGroup.append($errorEl).addClass("error");
                }

                clearFormErrors();
                _.each(errors, markErrors);
            }
        });
    });
    return QuickMobile.ME_Overview.Platforms.EditPlatform;
});
