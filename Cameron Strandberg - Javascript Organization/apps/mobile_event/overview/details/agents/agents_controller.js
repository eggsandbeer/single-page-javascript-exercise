define([
    'app',
    'apps/mobile_event/overview/details/agents/agents_view',
    'apps/common/alerts/views/alert_view'
],
function(QuickMobile, View, AlertView){
    QuickMobile.module('ME_Overview.Agents', function(Agents, QuickMobile, Backbone, Marionette, $, _){
        Agents.Controller = {
            showAgents: function(id, layout){
                require(["entities/mobile_event/overview/agents"], function(AgentsCollection){
                    var fetchingAgents = QuickMobile.request("agents:entities", id);

                    $.when(fetchingAgents).done(function(agents){

                        if (agents !== undefined) {
                            var agentsView = new View.Agents({
                                collection: agents
                            });
                        }

                        layout.agentsRegion.show(agentsView);

                        agentsView.on('agents:edit', function(){
                            var fetchingUnAssignedAgents = QuickMobile.request("unassigned_agents:entities", id);

                            $.when(fetchingUnAssignedAgents).done(function(unassigned_agents){
                                require(['apps/mobile_event/overview/details/agents/edit_agents_view'], function(EditAgentsView){

                                    var view = new EditAgentsView.EditAgentsComp({
                                        model: unassigned_agents
                                    });

                                    view.on('form:submit', function(data){
                                        var self = this;

                                        var newAgent = QuickMobile.request("agents:entity:new");

                                        // We have to add the collection id to the model so it can be used in the URL. Just don't submit it.
                                        newAgent.set('col_id', id);

                                        var savingAgent = newAgent.save(data);

                                        $.when(savingAgent).done(function(){

                                            var getAgents = agents.fetch();

                                            $.when(getAgents).done(function(){
                                                var title = "Saved",
                                                    message = 'Your Assigned Agents settings have been updated.';

                                                var view  = new AlertView.View({
                                                    alert_class: 'alert-success',
                                                    title: title,
                                                    message: message
                                                });

                                                QuickMobile.topNotificationRegion.show(view);

                                                agentsView.render();
                                                self.trigger("close");
                                            }).fail(function(response){
                                                var title = "Error",
                                                    message = 'There was been a problem with saving your data.';

                                                var view  = new AlertView.View({
                                                    alert_class: 'alert-error',
                                                    title: title,
                                                    message: message
                                                });

                                                QuickMobile.topNotificationRegion.show(view);
                                            });
                                        }).fail(function(response){

                                            var title = "Error",
                                                message = 'There was been a problem with saving your data.';

                                            var view  = new AlertView.View({
                                                alert_class: 'alert-error',
                                                title: title,
                                                message: message
                                            });

                                            QuickMobile.topNotificationRegion.show(view);
                                        });
                                    });
                                    QuickMobile.modalRegion.show(view);
                                });
                            });
                        });

                        agentsView.on('itemview:agent:delete', function(itemView, model){

                            model.set('col_id', id);

                            var deleteAssignedAgent = model.destroy()

                            $.when(deleteAssignedAgent).done(function(){
                                var title = "Success",
                                    message = 'You have deleted an agent.';

                                var view  = new AlertView.View({
                                    alert_class: 'alert-success',
                                    title: title,
                                    message: message
                                });

                                QuickMobile.topNotificationRegion.show(view);
                                agentsView.render();

                            }).fail(function(response){
                                var title = "Error",
                                    message = 'There was an error making your delete request.';

                                var view  = new AlertView.View({
                                    alert_class: 'alert-error',
                                    title: title,
                                    message: message
                                });

                                QuickMobile.topNotificationRegion.show(view);
                            });
                        });

                        agentsView.on('itemview:agent:edit', function(itemView, model){
                            require(['apps/mobile_event/overview/details/agents/edit_agent_view'],function(EditAgentsView){

                                model.store();

                                var view = new EditAgentsView.Agent({
                                    model: model
                                });

                                // We have to add the collection id to the model so it can be used in the URL. Just don't submit it.
                                model.set('col_id', id);

                                view.on('form:submit', function(data){

                                    model.set('assignedFunction', data.assignedFunction)

                                    var self = this,
                                        updatingAgent = model.save();

                                    $.when(updatingAgent).done(function(){

                                        var title = "Saved",
                                            message = model.get('agent')+' has been updated as: '+model.get('assignedFunction');

                                        var view  = new AlertView.View({
                                            model: model,
                                            alert_class: 'alert-success',
                                            title: title,
                                            message: message
                                        });

                                        QuickMobile.topNotificationRegion.show(view);
                                        self.trigger("close");
                                        model.store();
                                        agentsView.render();

                                    }).fail(function(response){

                                        var title = "Error",
                                            message = 'There has been an error.';

                                        var view  = new AlertView.View({
                                            model: model,
                                            alert_class: 'alert-error',
                                            title: title,
                                            message: message
                                        });

                                        QuickMobile.topNotificationRegion.show(view);
                                        self.trigger("close");
                                    });
                                });

                                view.on('agent:restore', function(){
                                    model.restore()
                                });

                                QuickMobile.modalRegion.show(view);
                            });
                        });
                    });
                });
            }
        }
    });
    return QuickMobile.ME_Overview.Agents.Controller;
});
