define([
    'app',
    'hbs!apps/mobile_event/overview/details/agents/templates/edit_agents',
    'backbone.syphon'
],function(QuickMobile, EditAgentsTpl){
    QuickMobile.module("ME_Overview.EditAgents.View", function(View, QuickMobile, Backbone, Marionette, $, _){
        View.EditAgentsComp = Marionette.ItemView.extend({
            template: EditAgentsTpl,
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
                this.trigger('agents:restore');
            }
        });
    });
    return QuickMobile.ME_Overview.EditAgents.View;
});



