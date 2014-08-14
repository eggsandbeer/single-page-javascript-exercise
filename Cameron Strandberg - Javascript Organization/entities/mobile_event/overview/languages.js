define(['app', 'backbone.memento'], function(QuickMobile){
    QuickMobile.module('Entities', function(Entities, QuickMobile, Backbone, Marionette, $, _){
        Entities.Language = Backbone.Model.extend({
            initialize: function(options) {
                _.extend(this, new Backbone.Memento(this));

                this.id = options.id;
            },
            sync: function(method, model, options){
                if (!window.location.origin) {
                    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
                }

                var baseUrl = window.location.origin+'/qp-api/v1/master-app/';

                var config = {}

                switch(method){
                    case "create":
                    break;
                    case "read":
                        config = _.extend(config, {
                            method: "GET",
                            url: baseUrl+this.id+'/languages'
                        });
                    break;
                    case "update":
                        config =_.extend({
                            method: "PUT",
                            url: baseUrl+this.id+'/languages'
                        });
                    break;
                    case "delete":
                    break;
                };
                options = _.extend(options, config);

                return Backbone.Model.prototype.sync.call(this, method, model, options);
            },
            parse: function(response){
                return response.body;
            }
        });

        var API = {
            getLanguagesEntity: function(languagesId){

                var languages = new Entities.Language({ id: languagesId });
                var defer = $.Deferred();

                languages.fetch({
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

        QuickMobile.reqres.setHandler("languages:entity", function(id){
            return API.getLanguagesEntity(id);
        });

    });
    return;
});



