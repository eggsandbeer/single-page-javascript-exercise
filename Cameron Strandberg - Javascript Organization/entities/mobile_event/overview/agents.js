define(['app', 'backbone.memento'], function(QuickMobile){
    QuickMobile.module('Entities', function(Entities, QuickMobile, Backbone, Marionette, $, _){

        Entities.AssignedAgent = Backbone.Model.extend({
            initialize: function(){
                _.extend(this, new Backbone.Memento(this));
            },
            parse: function(response, options){
                if(options.method === 'PUT'){
                    return response.body
                } else {
                    return response
                }
            },
            sync: function(method, model, options){
                if (!window.location.origin) {
                    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
                }
                var baseUrl = window.location.origin+'/qp-api/v1/master-app/'+model.get('col_id')+'/assigned-agents/';
                var config = {};

                switch(method){
                    case "create":
                        config = _.extend(config, {
                            method: "POST",
                            url: baseUrl,
                            data: JSON.stringify(model.pick(
                                "agentId", "assignedFunction"
                            ))
                        });
                    break;
                    case "read":
                    break;
                    case "update":
                        config =_.extend({
                            method: "PUT",
                            url: baseUrl+model.get('id'),
                            data: JSON.stringify(model.pick(
                                "assignedFunction"
                            ))
                        });
                    break;
                    case "delete":
                        config =_.extend({
                            method: "DELETE",
                            url: baseUrl+model.get('id')
                        });
                    break;
                };
                options = _.extend(options, config);

                return Backbone.Model.prototype.sync.call(this, method, model, options);
            }
        });

        Entities.AssignedAgents = Backbone.Collection.extend({
            initialize: function(options){
                var memento = new Backbone.Memento(this);
                _.extend(this, memento);
                this.id = options.id;
            },
            urlRoot: function(){
                return window.location.origin;
            },
            url: function(){
                return '/qp-api/v1/master-app/'+this.id+'/assigned-agents'
            },
            parse: function(response){

                _.each(response.body.agents, function(value, key, list){
                    response.body.agents[key].functions = response.body.functions
                });

                return response.body.agents;
            },
            model: Entities.AssignedAgent
        });

        Entities.UnAssignedAgents = Backbone.Model.extend({
            initialize: function(options){
                var memento = new Backbone.Memento(this);
                _.extend(this, memento);
                this.id = options.id;
            },
            urlRoot: function(){
                return window.location.origin;
            },
            url: function(){
                return '/qp-api/v1/master-app/'+this.id+'/available-agents'
            },
            parse: function(response){
                if(response.body.agents.length === 0){
                    response.body.noagents = "All agents have been assigned";
                }
                return response.body;
            }
        });

        var API = {
            getAgentsEntities: function(appId){
                var agents = new Entities.AssignedAgents({ id: appId }),
                    defer = $.Deferred();

                agents.fetch({
                    success: function(data){
                        defer.resolve(data);
                    },
                    error: function(data){
                        defer.resolve(data);
                    }
                });
                return defer.promise();
            },
            getAgentsEntity: function(agentId){
                var agent = new Entities.AssignedAgent({id: agentId});
                var defer = $.Deferred();

                agent.fetch({
                    success: function(data){
                        defer.resolve(data);
                    },
                    error: function(data){
                        defer.resolve(data);
                    }
                });
                return defer.promise();
            },
            getUnAssignedAgents: function(appId) {
                var unassigned_agents = new Entities.UnAssignedAgents({ id: appId }),
                    defer = $.Deferred();

                unassigned_agents.fetch({
                    success: function(data){
                        defer.resolve(data);
                    },
                    error: function(data){
                        defer.resolve(data);
                    }
                });

                return defer.promise();
            }
        }

        QuickMobile.reqres.setHandler("agents:entities", function(id){
            return API.getAgentsEntities(id);
        });

        QuickMobile.reqres.setHandler("agents:entity", function(id){
            return API.getAgentsEntity(id);
        });

        QuickMobile.reqres.setHandler("agents:entity:new", function(id){
            return new Entities.AssignedAgent();
        });

        QuickMobile.reqres.setHandler("unassigned_agents:entities", function(id){
            return API.getUnAssignedAgents(id);
        });
    });
    return;
});
