define([
    'app',
    'hbs!apps/mobile_event/overview/details/staff/templates/create-staff',
    'backbone.syphon'
],function(QuickMobile, CreateStaffTpl){
    QuickMobile.module("ME_Overview.CreateStaff.View", function(View, QuickMobile, Backbone, Marionette, $, _){
        View.ShowCreateStaff = Marionette.ItemView.extend({
            template: CreateStaffTpl,
            events: {
                'click .js-submit' : 'submitForm',
                'click .btn-link, .close, .modal-backdrop' : 'closeModal'
            },
            submitForm: function(e){
                e.preventDefault();
                var data = Backbone.Syphon.serialize(this);
                this.trigger('form:submit', data);
            },
            closeModal: function(e){
                e.preventDefault();
                this.trigger('close');
                this.trigger('staff:restore');
            },
            switchModal: function(e){
                e.preventDefault();
                this.trigger('close');
                var self = this;
                // setTimeout(function(){
                //     self.trigger('switchto:create:staff');
                // }, 2000);

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
                    var $controlGroup = $view.find('#Staff-'+key).closest('.control-group'),
                        $control = $view.find('#Staff-'+key).closest('.controls'),
                        $errorEl = $("<small></small>").addClass('help-inline error').text(value);

                    $controlGroup.addClass("error");
                    $control.append($errorEl);

                }

                clearFormErrors();
                _.each(errors, markErrors);
            }
        });
    });
    return QuickMobile.ME_Overview.CreateStaff.View;
});



