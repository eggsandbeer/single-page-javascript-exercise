define([
    'app',
    'hbs!apps/mobile_event/overview/details/staff/templates/unassigned-staff-comp',
    'hbs!apps/mobile_event/overview/details/staff/templates/unassigned-staff-item',
    'hbs!apps/mobile_event/overview/details/staff/templates/unassigned-staff-empty',
    'backbone.syphon'
],function(QuickMobile, UnassignedAgentsCompTpl, UnassignedAgentsItemTpl, UnassignedEmptyTpl){
    QuickMobile.module("ME_Overview.UnassignedAgents.View", function(View, QuickMobile, Backbone, Marionette, $, _){

        View.UnAssignedStaffItemView = Marionette.ItemView.extend({
            tagName: 'option',
            onRender: function(){
                this.$el.val(this.model.get('id'));

            },
            template: UnassignedAgentsItemTpl,
        });

        View.NoStaff = Marionette.ItemView.extend({
            template: UnassignedEmptyTpl,
            tagName: "div",
            className: "alert alert-info"
        });

        View.UnAssignedStaffCompView = Marionette.CompositeView.extend({
            template: UnassignedAgentsCompTpl,
            itemView : View.UnAssignedStaffItemView,
            itemViewContainer: '.unassigned-staff-container',
            events: {
                'click .js-submit' : 'submitForm',
                'click .btn-link, .close, .modal-backdrop' : 'closeModal',
                'click .js-create-staff': 'switchModal'
            },
            onRender: function(){
                var nostaff = this.collection.map(function(model){
                  return model.get('nostaff');
                });
                if(nostaff[0] === true){
                    this.$el.find('select').attr('disabled', true);
                    this.$el.find('.btn-primary-qs').addClass('disabled').removeClass('js-submit');
                }
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
                var self = this;
                this.trigger('close');
                setTimeout(function(){
                    self.trigger('switchto:create:staff');
                }, 600);
            }
        });
    });
    return QuickMobile.ME_Overview.UnassignedAgents.View;
});



