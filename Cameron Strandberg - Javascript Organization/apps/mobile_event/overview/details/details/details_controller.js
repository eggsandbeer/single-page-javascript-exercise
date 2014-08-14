define(['app', 'apps/mobile_event/overview/details/details/details_view'], function(QuickMobile, View){
    QuickMobile.module('ME_Overview.Details', function(Details, QuickMobile, Backbone, Marionette, $, _){
        Details.Controller = {
            showDetails: function(id, layout){
                require(["entities/mobile_event/overview/details"], function(DetailModel){
                    var fetchingContact = QuickMobile.request("details:entity", id);
                    $.when(fetchingContact).done(function(details){

                        if (details !== undefined) {
                            if(QuickMobile.userRole !== 'agent'){
                                var detailsView = new View.DetailsReduced({
                                    model: details
                                });
                            } else {
                                var detailsView = new View.Details({
                                    model: details
                                });
                            }

                        }

                        layout.detailsRegion.show(detailsView);

                        detailsView.on('details:edit', function(model){
                            require(['apps/mobile_event/overview/details/details/edit_details_view'], function(EditDetailsView){

                                model.store();

                                var view = new EditDetailsView.EditDetails({
                                    model: model
                                });

                                view.on('details:restore', function(){
                                    model.restore();
                                });

                                view.on('form:submit', function(data){
                                    var self = this;

                                    var savingDetails = model.save(data);

                                    if(savingDetails){
                                        $.when(savingDetails).done(function(){
                                            require(['apps/common/alerts/views/alert_view'], function(AlertView){

                                                var title = "Saved",
                                                    message = 'Project Detail settings have been updated';

                                                var view  = new AlertView.View({
                                                    alert_class: 'alert-success',
                                                    title: title,
                                                    message: message
                                                });

                                                QuickMobile.topNotificationRegion.show(view);
                                            });
                                            model.store();
                                            detailsView.render();
                                            self.trigger("close");
                                        }).fail(function(){
                                            require(['apps/common/alerts/views/alert_view'], function(AlertView){

                                                var title = "Error",
                                                    message = 'Server Error. Your Project Details have not been updated.';

                                                var view  = new AlertView.View({
                                                    alert_class: 'alert-error',
                                                    title: title,
                                                    message: message
                                                });

                                                QuickMobile.topNotificationRegion.show(view);
                                            });
                                            model.store();
                                            detailsView.render();
                                            self.trigger("close");
                                        });
                                    } else {
                                        view.triggerMethod("form:data:invalid", model.validationError);
                                    }
                                });

                                QuickMobile.modalRegion.show(view);
                            });
                        });
                    });
                });
            }
        }
    });
    return QuickMobile.ME_Overview.Details.Controller;
});
