define([
    'app',
    'hbs!apps/mobile_event/overview/details/staff/templates/assigned-staff-container',
    'hbs!apps/mobile_event/overview/details/staff/templates/assigned-staff-item',
    'hbs!apps/mobile_event/overview/details/staff/templates/no-assigned-staff'
    ],
    function(QuickMobile, AssignedStaffContainerTpl, AssignedStaffItemTpl, NoAssignedStaff){
    QuickMobile.module("ME_Overview.AssignedStaff.View", function(View, QuickMobile, Backbone, Marionette, $, _){
        View.AssignedStaffItemView = Marionette.ItemView.extend({
            template: AssignedStaffItemTpl,
            events: {
                'click .js-delete' : 'deleteAgent',
                'click .js-edit' : 'editAgent',
            },
            deleteAgent: function(e){
                this.trigger('staff:delete', this.model);
            }
        });

        View.NoStaff = Marionette.ItemView.extend({
            template: NoAssignedStaff,
            tagName: "div",
            className: "alert alert-info"
        });

        View.AssignedStaffCompositeView = Marionette.CompositeView.extend({
            template: AssignedStaffContainerTpl,
            emptyView: View.NoStaff,
            itemView : View.AssignedStaffItemView,
            itemViewContainer: '.assignedstaff-container',
            className :'accordion-group',
            events: {
                'click .js-overview-modal': 'ModalShow'
            },
            onRender: function(){
                if(QuickMobile.userRole === 'agent'){
                    this.$el.find('.btn-primary').remove();
                }
            },
            ModalShow: function(e){
                e.preventDefault();
                e.stopPropagation();
                this.trigger("assignedstaff:edit", this.model);
            }
        });
    });
    return QuickMobile.ME_Overview.AssignedStaff.View;
});
