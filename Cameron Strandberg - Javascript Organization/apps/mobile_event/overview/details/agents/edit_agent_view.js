define([
    'app',
    'hbs!apps/mobile_event/overview/details/agents/templates/edit_agent'
    ],
    function(QuickMobile, EditAgentTpl){
    QuickMobile.module("ME_Overview.Agents.EditView", function(EditView, QuickMobile, Backbone, Marionette, $, _){
        EditView.Agent = Marionette.ItemView.extend({
            template: EditAgentTpl,
            events: {
                'click .js-submit' : 'submitClicked',
                'click .btn-link, .close, .modal-backdrop' : 'closeModal'
            },
            onShow: function() {
                var agentfunction = this.model.get('assignedFunction');
                this.$el.find('option[value="'+agentfunction+'"]').prop('selected', true);
            },
            submitClicked: function(e){
                e.preventDefault();
                var data = Backbone.Syphon.serialize(this);
                this.trigger("form:submit", data);
            },
            closeModal: function(e){
                e.preventDefault();
                this.trigger('close');
                this.trigger('agent:restore');
            }
        });
    });
    return QuickMobile.ME_Overview.Agents.EditView;
});
