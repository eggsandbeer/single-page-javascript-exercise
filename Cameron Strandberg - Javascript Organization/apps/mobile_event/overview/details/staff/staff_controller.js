define([
    'app',
    'apps/mobile_event/overview/details/staff/assignedstaff_view',
    'apps/common/alerts/views/alert_view'
],
function(QuickMobile, View, AlertView){
    QuickMobile.module('ME_Overview.Staff', function(Staff, QuickMobile, Backbone, Marionette, $, _){
        Staff.Controller = {
            showStaff: function(id, layout){
                require(["entities/mobile_event/overview/staff"], function(StaffCollection){
                    var fetchingAssignedStaff = QuickMobile.request("assignedstaff:entities", id);
                    $.when(fetchingAssignedStaff).done(function(assignedstaff){

                        var assignedStaffView = new View.AssignedStaffCompositeView({
                           collection : assignedstaff
                        });

                        layout.staffRegion.show(assignedStaffView);

                        assignedStaffView.on('itemview:staff:delete', function(itemView, model){

                            model.set('col_id', id);

                            var deleteAssignedStaff = model.destroy()

                            $.when(deleteAssignedStaff).done(function(){

                                assignedStaffView.render();
                            }).fail(function(){

                            })
                        });

                        assignedStaffView.on('assignedstaff:edit', function(){

                            var fetchingUnAssignedStaff = QuickMobile.request("unassignedstaff:entities", id);

                            $.when(fetchingUnAssignedStaff).done(function(unassigned_staff){
                                require(['apps/mobile_event/overview/details/staff/unassignedstaff_view'], function(UnassignedStaffView){

                                    var unassignedstaffview = new UnassignedStaffView.UnAssignedStaffCompView({
                                        collection: unassigned_staff
                                    });

                                    QuickMobile.modalRegion.show(unassignedstaffview);

                                    unassignedstaffview.on('switchto:create:staff', function(){
                                        require(['apps/mobile_event/overview/details/staff/createstaff_view'], function(CreateStaffView){

                                            var newUnAssignedStaff = QuickMobile.request("newunassignedstaff:entities", id);

                                            $.when(newUnAssignedStaff).done(function(newunassignedstaff){
                                                // Really dirty hack. Fix when solution found.
                                                setTimeout(function(){
                                                    var createstaffview = new CreateStaffView.ShowCreateStaff({
                                                        model: newunassignedstaff
                                                    });

                                                    QuickMobile.modalRegion.show(createstaffview);

                                                    createstaffview.on('form:submit', function(data){
                                                        var self = this;
                                                        // We have to add the collection id to the model so it can be used in the URL. Just don't submit it.
                                                        newunassignedstaff.set('col_id', id);
                                                        var savingNewStaff = newunassignedstaff.save(data);
                                                        if(savingNewStaff){
                                                            $.when(savingNewStaff).done(function(){
                                                                var title = "Saved",
                                                                    message = 'New Staff created';

                                                                var view  = new AlertView.View({
                                                                    model: newunassignedstaff,
                                                                    alert_class: 'alert-success',
                                                                    title: title,
                                                                    message: message
                                                                });

                                                                QuickMobile.topNotificationRegion.show(view);

                                                                assignedstaff.fetch();
                                                                assignedStaffView.render();
                                                                self.trigger("close");
                                                            }).fail(function(data, x, d){
                                                                var title = "Error";

                                                                var view  = new AlertView.View({
                                                                    alert_class: 'alert-error',
                                                                    title: title,
                                                                    message: data.responseText
                                                                });

                                                                QuickMobile.topNotificationRegion.show(view);
                                                            });
                                                        }else{
                                                            createstaffview.triggerMethod("form:data:invalid", newunassignedstaff.validationError);
                                                        }

                                                    });
                                               }, 1250)
                                            });
                                        });
                                    });


                                    unassignedstaffview.on('form:submit', function(data){
                                        var self = this;

                                        var newAssignStaff = QuickMobile.request("assignedstaff:entity:new");

                                        // We have to add the collection id to the model so it can be used in the URL. Just don't submit it.
                                        newAssignStaff.set('col_id', id);

                                        var savingNewAssignStaff = newAssignStaff.save(data);

                                        $.when(savingNewAssignStaff).done(function(){
                                            var title = "Saved",
                                                message = newAssignStaff.get('name')+' has been updated';

                                            var view  = new AlertView.View({
                                                model: newAssignStaff,
                                                alert_class: 'alert-success',
                                                title: title,
                                                message: message
                                            });

                                            QuickMobile.topNotificationRegion.show(view);

                                            assignedstaff.fetch();
                                            assignedStaffView.render();
                                            self.trigger("close");
                                        }).fail(function(){
                                            console.log('failure!')
                                        });

                                    });
                                });
                            });
                        });
                    }).fail(function(){
                        console.log('Initial call to assigned staff failed.')
                    });
                });
            }
        };
    });
    return QuickMobile.ME_Overview.Staff.Controller;
});
