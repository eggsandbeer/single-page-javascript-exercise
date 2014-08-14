define([
    'app',
    'hbs!apps/mobile_event/overview/details/agents/templates/agents',
    'hbs!apps/mobile_event/overview/details/agents/templates/agent',
    'hbs!apps/mobile_event/overview/details/agents/templates/no_agents'
    ],
    function(QuickMobile, AgentsTpl, AgentTpl, NoAgentsTpl){
    QuickMobile.module("ME_Overview.Agents.View", function(View, QuickMobile, Backbone, Marionette, $, _){
        View.Agent = Marionette.ItemView.extend({
            template: AgentTpl,
            events: {
                'click .js-delete' : 'deleteAgent',
                'click .js-edit' : 'editAgent',
            },
            deleteAgent: function(e){
                this.trigger('agent:delete', this.model);
            },
            editAgent: function(){
                this.trigger('agent:edit', this.model);
            }
        });

        View.NoAgents = Marionette.ItemView.extend({
            template: NoAgentsTpl,
            tagName: "div",
            className: "alert alert-info"
        });

        View.Agents = Marionette.CompositeView.extend({
            template: AgentsTpl,
            emptyView: View.NoAgents,
            itemView : View.Agent,
            itemViewContainer: '.agents-container',
            className :'accordion-group',
            events: {
                'click .js-overview-modal': 'ModalShow'
            },
            ModalShow: function(e){
                e.preventDefault();
                e.stopPropagation();
                this.trigger("agents:edit", this.model);
            }
        });
    });
    return QuickMobile.ME_Overview.Agents.View;
});
