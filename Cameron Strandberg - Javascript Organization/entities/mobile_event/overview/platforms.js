define(['app', 'backbone.memento'], function(QuickMobile){
    QuickMobile.module('Entities', function(Entities, QuickMobile, Backbone, Marionette, $, _){

        Entities.Platforms = Backbone.Model.extend({
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
                            url: baseUrl+this.id+'/platforms'
                        });
                    break;
                    case "update":
                        config =_.extend({
                            method: 'PUT',
                            url: baseUrl+this.id+'/platforms',
                            data: JSON.stringify(model.pick(
                                "platforms"
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

        Entities.UnSupportedLink = Backbone.Model.extend({
            initialize: function(options) {
                _.extend(this, new Backbone.Memento(this));

                this.id = options.id;
            },
            sync: function(method, model, options){
                var baseUrl = window.location.origin+'/qp-api/v1/master-app/'+this.id+'/unsupported-link';

                var config = {}

                switch(method){
                    case "create":
                    break;
                    case "read":
                        config = _.extend(config, {
                            method: "GET",
                            url: baseUrl
                        });
                    break;
                    case "update":
                        config =_.extend(config, {
                            method: 'PUT',
                            url: baseUrl
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
            },
            validate: function(attrs, options){
                var errors = {};

                if (! attrs.url){
                    errors.url = 'This field cannot be blank';
                }
                if (! _.isEmpty(errors)) {
                    return errors;
                }
            }
        });

        var API = {
            getPlatformsEntities: function(platformsId){
                var platforms = new Entities.Platforms({id: platformsId}),
                    defer = $.Deferred();

                platforms.fetch({
                    success: function(data){
                        defer.resolve(data);
                    },
                    error: function(data){
                        defer.resolve(data);
                    }
                });

                return defer.promise();
            },
            getUnSupportedLink: function(linkId){
                var link = new Entities.UnSupportedLink({id: linkId}),
                    defer = $.Deferred();

                link.fetch({
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

        QuickMobile.reqres.setHandler("platforms:entities", function(id){
            return API.getPlatformsEntities(id);
        });

        QuickMobile.reqres.setHandler("platforms:unsupportedlink", function(id){
            return API.getUnSupportedLink(id);
        });
    });
    return;
});
