define(['app', 'backbone.memento'], function(QuickMobile){
    QuickMobile.module('Entities', function(Entities, QuickMobile, Backbone, Marionette, $, _){
        Entities.Colours = Backbone.Model.extend({
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
                            url: baseUrl+this.id+'/branding'
                        });
                    break;
                    case "update":
                        config =_.extend({
                            method: "PUT",
                            url: baseUrl+this.id+'/branding',
                            data: JSON.stringify(model.pick(
                                'barTintColor', 'foreground1Colour', 'foreground2Colour', 'header1Colour'
                            ))
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
            getColoursEntity: function(coloursId){
                var colours = new Entities.Colours({ id: coloursId });
                    defer = $.Deferred();

                colours.fetch({
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

        QuickMobile.reqres.setHandler("colours:entity", function(id){
            return API.getColoursEntity(id);
        });

    });
    return;
});
