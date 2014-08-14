define(['app', 'backbone.memento'], function(QuickMobile){
    QuickMobile.module('Entities', function(Entities, QuickMobile, Backbone, Marionette, $, _){
        Entities.MAFeatures = {
            getFeatureConfig : function(){
                var FeatureConfig = Backbone.Model.extend({
                    initialize: function(options){
                        // Thank you wonderful JSON serving API *sarcasm*
                        this.app_id = options.app_id;
                        this.comp_name = options.comp_name;
                        this.requesturl = options.requesturl;
                        this.submiturl = options.submiturl;
                        this.isJSON = options.isJSON;
                    },
                    sync: function(method, model, options){
                        if (!window.location.origin) {
                            window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
                        }

                        var baseUrl =  window.location.origin+this.requesturl;
                        var config = {};

                        if (!this.isJSON){
                            config = {
                                dataType : 'html'
                            };
                        }

                        switch(method){
                            case "read":
                                config = _.extend(config, {
                                    method: "GET",
                                    url: baseUrl
                                });
                            break;
                        };

                        options = _.extend(options, config);

                        return Backbone.Model.prototype.sync.call(this, method, model, options);
                    },
                    parse: function(response){
                        var strRemove = function(t, s){
                            return $("<div/>").append(
                                $(t, s).remove().end()
                            ).html();
                        };

                        if (!this.isJSON){
                            var html = response;

                            var parsedhtml = strRemove("h1", html);
                            parsedhtml = parsedhtml.replace('<input name="submit" value="Submit" class="btn btn-primary" id="submit" type="submit">','');

                            response = {}
                            response.data = {};
                            response.data.form = parsedhtml;
                        } else {
                            var formdata = response.data.form,
                                parsedform = strRemove("h1", formdata);

                            response.data.form = parsedform;
                        }
                        response.data.comp_name = this.comp_name

                        return response.data
                    }
                });

                var API = {
                    getFeatureConfigEntity: function(app_id, name, requesturl, submiturl, isJSON){
                        var featureConfig = new FeatureConfig({
                            id: app_id,
                            comp_name: name,
                            requesturl: requesturl,
                            submiturl: submiturl,
                            isJSON: isJSON
                        });
                        var defer = $.Deferred();

                        featureConfig.fetch({
                            success: function(data){
                                defer.resolve(data);
                            },
                            error: function(data){
                                defer.resolve(data);
                            }
                        });
                        return defer.promise();
                    },
                    saveFeatureConfigEntity: function(data, submiturl){
                        var defer = $.Deferred();

                        $.ajax({
                            url: submiturl,
                            data: data,
                            type: "POST",
                            success: function(data){
                                defer.resolve(data);
                            },
                            error: function(data){
                                defer.resolve(data);
                            }
                        });
                        return defer.promise()
                    }
                }

                QuickMobile.reqres.setHandler("featureconfig:entity", function(app_id, name, requesturl, submiturl, isJSON){
                    return API.getFeatureConfigEntity(app_id, name, requesturl, submiturl, isJSON);
                });

                QuickMobile.reqres.setHandler("featureconfig:entity:save", function(data, submiturl){
                    return API.saveFeatureConfigEntity(data, submiturl);
                });
            },
            getMAFeaturesStandard : function(){
                MA_StandardFeatures = Backbone.Model.extend({
                    initialize: function(options) {
                        _.extend(this, new Backbone.Memento(this));
                        this.id = options.id;
                    },
                    sync: function(method, model, options){
                        if (!window.location.origin) {
                            window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
                        }

                        var baseUrl = window.location.origin+'/qp-api/v1/master-app/';

                        var config = {};

                        switch(method){
                            case "create":
                            break;
                            case "read":
                                config = _.extend(config, {
                                    method: "GET",
                                    url: baseUrl+this.id+'/container-features'
                                });
                            break;
                            case "update":
                                config =_.extend({
                                    method: "PUT",
                                    url: baseUrl+this.id+'/container-features',
                                    data: JSON.stringify(model.pick(
                                        'units'
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

                        var featurecount = 0,
                            totalfeaturecount = 0;
                        // format Names for CSS and count configued features
                        _.each(response.body.units, function(value, key){
                            var name = value.name;
                            response.body.units[key].cssName = name.replace(/\s+/g, '_');

                            if(value.configured === true){
                                featurecount++
                            }
                            totalfeaturecount++;
                        });

                        response.body.title = 'Standard Features';
                        response.body.buttontitle = 'Manage Standard Features';
                        response.body.subtitle = 'Select the standard features that you would like to use on the multi-event container app.';
                        response.body.parentId = 'StandardFeatures';
                        response.body.featurecount = featurecount;

                        if (totalfeaturecount === 0){
                            response.body.nofeatures = 'There are no standard features available for selection.';
                        } else {
                            response.body.features = true;
                        }
                        return response.body;
                    }
                });

                var API = {
                    getFeatureEntities: function(appId){
                        var features = new MA_StandardFeatures({ id: appId }),
                            defer = $.Deferred();

                        features.fetch({
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

                QuickMobile.reqres.setHandler("ma_standard_features:entities", function(id){
                    return API.getFeatureEntities(id);
                });
            },

            getMAFeaturesTrial : function(){
                MA_TrialFeatures = Backbone.Model.extend({
                    initialize: function(options) {
                        _.extend(this, new Backbone.Memento(this));

                        this.id = options.id;
                    },
                    sync: function(method, model, options){
                        var baseUrl = window.location.origin+'/qp-api/v1/master-app/';

                        var config = {}

                        switch(method){
                            case "create":
                            break;
                            case "read":
                                config = _.extend(config, {
                                    method: "GET",
                                    url: baseUrl+this.id+'/container-trial-features'
                                });
                            break;
                            case "update":
                                config =_.extend({
                                    method: "PUT",
                                    url: baseUrl+this.id+'/container-trial-features',
                                    data: JSON.stringify(model.pick(
                                        'units'
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

                        var featurecount = 0,
                            totalfeaturecount = 0;
                        _.each(response.body.units, function(value, key){
                            var name = value.name;
                            response.body.units[key].cssName = name.replace(/\s+/g, '_');

                            if(value.configured === true){
                                featurecount++
                            }
                            totalfeaturecount++;
                        });

                        response.body.title = 'Trial Features';
                        response.body.buttontitle = 'Manage Trial Features';
                        response.body.subtitle = 'Select the trial features that you would like to use on the multi-event container app.';
                        response.body.parentId = 'CustomFeatures';
                        response.body.featurecount = featurecount;

                        if (totalfeaturecount === 0){
                            response.body.nofeatures = 'There are no trial features available for selection.';
                        } else {
                            response.body.features = true;
                        }
                        return response.body;
                    }
                });
                var API = {
                    getTrialEntities: function(appId){
                        var trialfeatures = new MA_TrialFeatures({ id: appId }),
                            defer = $.Deferred();

                        trialfeatures.fetch({
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

                QuickMobile.reqres.setHandler("ma_trial_features:entities", function(id){
                    return API.getTrialEntities(id);
                });
            },
            getQEFeaturesStandard:function(){

                QE_StandardFeatures = Backbone.Model.extend({
                    initialize: function(options) {
                        _.extend(this, new Backbone.Memento(this));
                        this.id = options.id;
                    },
                    sync: function(method, model, options){
                        var baseUrl = window.location.origin+'/qp-api/v1/master-app/';

                        var config = {}

                        switch(method){
                            case "create":
                            break;
                            case "read":
                                config = _.extend(config, {
                                    method: "GET",
                                    url: baseUrl+this.id+'/event-features'
                                });
                            break;
                            case "update":
                                config =_.extend({
                                    method: "PUT",
                                    url: baseUrl+this.id+'/event-features',
                                    data: JSON.stringify(model.pick(
                                        'units'
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
                        var featurecount = 0,
                            totalfeaturecount = 0;
                        // format Names for CSS and count configued features
                        _.each(response.body.units, function(value, key){
                            var name = value.name;
                            response.body.units[key].cssName = name.replace(/\s+/g, '_');

                            if(value.configured === true){
                                featurecount++
                            }
                            totalfeaturecount++
                        });

                        response.body.title = 'Standard Features';
                        response.body.buttontitle = 'Manage Standard Features';
                        response.body.subtitle = 'Select the standard features that you would like to use on the multi-event container app.';
                        response.body.parentId = 'StandardFeatures';
                        response.body.featurecount = featurecount;

                        if (totalfeaturecount === 0){
                            response.body.nofeatures = 'There are no standard features available for selection.';
                        } else {
                            response.body.features = true;
                        }

                        return response.body;
                    }
                });

                var API = {
                    getStandardEntities: function(appId){
                        var standardfeatures = new QE_StandardFeatures({ id: appId }),
                            defer = $.Deferred();

                        standardfeatures.fetch({
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

                QuickMobile.reqres.setHandler("qe_standard_features:entities", function(id){
                    return API.getStandardEntities(id);
                });
            },

            getQEFeaturesTrial: function(){
                QE_TrialFeatures = Backbone.Model.extend({
                    initialize: function(options) {
                        _.extend(this, new Backbone.Memento(this));
                        this.id = options.id;
                    },
                    sync: function(method, model, options){
                        var baseUrl = window.location.origin+'/qp-api/v1/master-app/';

                        var config = {}

                        switch(method){
                            case "create":
                            break;
                            case "read":
                                config = _.extend(config, {
                                    method: "GET",
                                    url: baseUrl+this.id+'/event-trial-features'
                                });
                            break;
                            case "update":
                                config =_.extend({
                                    method: "PUT",
                                    url: baseUrl+this.id+'/event-trial-features',
                                    data: JSON.stringify(model.pick(
                                        'units'
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

                        var featurecount = 0,
                            totalfeaturecount = 0;
                        // format Names for CSS and count configued features
                        _.each(response.body.units, function(value, key){

                            // THIS SHOULD BE FIXED. Need better flag from backend
                            if (key === "mobiledb_service_2.0") {
                                delete response.body.units[key];
                            } else {
                                var name = value.name;
                                response.body.units[key].cssName = name.replace(/\s+/g, '_');

                                if(value.configured === true){
                                    featurecount++
                                }
                                totalfeaturecount++
                            }
                        });

                        response.body.title = 'Trial Features';
                        response.body.buttontitle = 'Manage Trial Features';
                        response.body.subtitle = 'Select the trial features that you would like to use on the multi-event container app.';
                        response.body.parentId = 'CustomFeatures';
                        response.body.featurecount = featurecount;

                        if (totalfeaturecount === 0){
                            response.body.nofeatures = 'There are no trial features available for selection.';
                        } else {
                            response.body.features = true;
                        }

                        return response.body;
                    }
                });

                var API = {
                    getTrialEntities: function(appId){
                        var trialfeatures = new QE_TrialFeatures({ id: appId }),
                            defer = $.Deferred();

                        trialfeatures.fetch({
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

                QuickMobile.reqres.setHandler("qe_trial_features:entities", function(id){
                    return API.getTrialEntities(id);
                });
            }
        }
    });
    return QuickMobile.Entities.MAFeatures;
});
