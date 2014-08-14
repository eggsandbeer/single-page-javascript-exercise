define(['app', 'hbs!apps/mobile_event/overview/details/details/templates/details-form', 'backbone.syphon', 'datepicker'], function(QuickMobile, EditThingTpl){
    QuickMobile.module("ME_Overview.Details.EditView", function(EditView, QuickMobile, Backbone, Marionette, $, _){
        EditView.EditDetails = Marionette.ItemView.extend({
            template: EditThingTpl,
            events: {
                'click .js-submit': 'submitClicked',
                'click .btn-link' : 'closeModal',
                'click .close, .modal-backdrop': 'restoreData'
            },
            onShow: function(){
                // set the timezone option field to the proper option.
                var timezone = this.model.get('timeZone');
                this.$el.find('.option[value="'+timezone+'"]').prop('selected', true)
                // set the status option field to the proper option.
                var status = this.model.get('status');
                this.$el.find('#ProjecStatus').val(status);

                this.datePickers();
            },
            datePickers: function(){
                var self = this;

                this.callDatePicker(
                    '#EffectiveDate',
                    self.model.get('startDate'),
                    self.model.get('endDate')
                );
                this.callDatePicker(
                    '#ActivationDate',
                    self.model.get('startDate'),
                    self.model.get('endDate')
                );
                this.callDatePicker(
                    '#ExpiryDate',
                    self.model.get('startDate'),
                    self.model.get('endDate')
                );

                this.$el.find('.modal-body').on('scroll', function(){
                    if($('.datepicker').length){
                        $('.datepicker').remove();
                    }
                });
            },
            callDatePicker: function(id, startDate, endDate){
                var date_el = this.$el.find(id);

                $(date_el).datepicker({
                    format: 'yyyy-mm-dd',
                    startDate: startDate,
                    endDate: endDate,
                    orientation: "bottom right",
                    autoclose: false,
                    keyboardNavigation: false
                });
            },
            restoreData: function(){
                this.trigger("details:restore");
            },
            submitClicked: function(e){
                e.preventDefault();
                var data = Backbone.Syphon.serialize(this);
                this.trigger("form:submit", data);
            },
            closeModal: function(e){
                e.preventDefault();
                this.trigger('close');
                this.restoreData();
            },
            ModalShow: function(e){
                e.preventDefault();
                e.stopPropagation();
                this.trigger("details:edit", this.model);
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
                    var $controlGroup = $view.find('#Details-'+key).closest('.control-group'),
                        $control = $view.find('#Details-'+key).closest('.controls'),
                        $errorEl = $("<small></small>").addClass('help-inline error').text(value);

                    $controlGroup.addClass("error");
                    $control.append($errorEl);

                }

                clearFormErrors();
                _.each(errors, markErrors);
            }
        });
    });
    return QuickMobile.ME_Overview.Details.EditView;
});
