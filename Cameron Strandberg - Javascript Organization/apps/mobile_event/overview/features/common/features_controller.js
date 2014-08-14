define(['app', 'apps/mobile_event/overview/features/common/feature_view', 'apps/common/alerts/views/alert_view'], function(QuickMobile, FeatureView, AlertView){
    QuickMobile.module('ME_Overview.Features', function(Features, QuickMobile, Backbone, Marionette, $, _){
        Features.Controller = {
            startLayout: function(app_id, mainLayout, featureLayout){
                var sublayout = new featureLayout.Layout()

                switch(featureLayout.moduleName){
                    case 'QEFeatures':
                        mainLayout.QEConfigRegion.show(sublayout);
                    break;
                    case 'MAFeatures':
                        mainLayout.MAConfigRegion.show(sublayout);
                    break;
                }

                require(["entities/mobile_event/overview/features"], function(featureEntities){
                    // Set up Master App Standard Feature Handlers
                    switch(featureLayout.moduleName){
                        case 'QEFeatures':
                            featureEntities.getQEFeaturesStandard(app_id);
                            var fetchingStandardFeatures = QuickMobile.request("qe_standard_features:entities", app_id);
                        break;
                        case 'MAFeatures':
                            featureEntities.getMAFeaturesStandard(app_id);
                            var fetchingStandardFeatures = QuickMobile.request("ma_standard_features:entities", app_id);
                        break;
                    }

                    $.when(fetchingStandardFeatures).done(function(features){

                        var standardView = new FeatureView.Comp({
                            model: features
                        });

                        switch(featureLayout.moduleName){
                            case 'QEFeatures':
                                sublayout.QEStandardRegion.show(standardView);
                            break;
                            case 'MAFeatures':
                                sublayout.MAStandardRegion.show(standardView);
                            break;
                        }
                        standardView.on('configure:features', function(){require(['apps/mobile_event/overview/features/common/standardfeatures_modalitemview'
                            ], function(StandardFeaturesItemView){

                                var standardFeaturesCompView = new StandardFeaturesItemView.StandardItemsView({
                                    model: features
                                });

                                features.store();

                                standardFeaturesCompView.on('comp:save', function(data){
                                    var c = _.clone(features.get('units'));

                                    _.each(data.units, function(key, value){
                                        c[value]['configured'] = data['units'][value];
                                    });

                                    features.set('units', c);

                                    var savingFeatures = features.save();

                                    if(savingFeatures){
                                        $.when(savingFeatures).done(function(){
                                            var title = "Saved",
                                                message = 'Your Standard Feature settings have been updated';

                                            var view  = new AlertView.View({
                                                alert_class: 'alert-success',
                                                title: title,
                                                message: message
                                            });

                                            QuickMobile.topNotificationRegion.show(view);
                                            standardView.render();

                                        }).fail(function(){
                                            var title = "Error",
                                                message = 'Server Error. Your Project Details have not updated.';

                                            var view  = new AlertView.View({
                                                alert_class: 'alert-error',
                                                title: title,
                                                message: message
                                            });

                                            QuickMobile.topNotificationRegion.show(view);

                                            features.restore();
                                            standardFeaturesCompView.render(features);
                                        });
                                    }

                                    this.trigger("close");
                                });

                                standardFeaturesCompView.on('comp:close', function(){
                                    this.trigger("close");

                                    features.restore();
                                });

                                QuickMobile.modalRegion.show(standardFeaturesCompView);
                            });
                        });
                        standardView.on('get:featureconfig', function(name, requesturl, submiturl, isJSON){

                            featureEntities.getFeatureConfig(app_id);

                            // var feature_id = model.get('id');

                            var fetchingFeatureConfig = QuickMobile.request('featureconfig:entity', app_id, name, requesturl, submiturl, isJSON);

                            $.when(fetchingFeatureConfig).done(function(feature_config_data){

                                require(['apps/mobile_event/overview/features/common/feature_config_view'], function(featureConfigView){

                                    var modalview = new featureConfigView.ConfigView({model: feature_config_data})

                                    modalview.on('comp:save', function(data){

                                        var saveConfig =  QuickMobile.request('featureconfig:entity:save', data, submiturl),
                                            self = this;

                                        $.when(saveConfig).done(function(){
                                            var title = "Saved",
                                                message = 'Your feature settings have been updated';

                                            var view  = new AlertView.View({
                                                alert_class: 'alert-success',
                                                title: title,
                                                message: message
                                            });

                                            QuickMobile.topNotificationRegion.show(view);
                                            self.trigger('close');
                                        }).fail(function(){
                                            var title = "Error",
                                                message = 'Your feature settings have been updated';

                                            var view  = new AlertView.View({
                                                alert_class: 'alert-success',
                                                title: title,
                                                message: message
                                            });

                                            QuickMobile.topNotificationRegion.show(view);
                                            self.trigger('close');
                                        });
                                    });
                                    QuickMobile.modalRegion.show(modalview);
                                });
                            }).fail(function(response){

                            });
                        });
                    });

                    switch(featureLayout.moduleName){
                        case 'QEFeatures':
                            featureEntities.getQEFeaturesTrial(app_id);
                            var fetchingCustomFeatures = QuickMobile.request("qe_trial_features:entities", app_id);
                        break;
                        case 'MAFeatures':
                            featureEntities.getMAFeaturesTrial(app_id);
                            var fetchingCustomFeatures = QuickMobile.request("ma_trial_features:entities", app_id);
                        break;
                    }

                    $.when(fetchingCustomFeatures).done(function(features){

                        var customView = new FeatureView.Comp({
                            model: features
                        });

                        switch(featureLayout.moduleName){
                            case 'QEFeatures':
                                sublayout.QECustomRegion.show(customView);
                            break;
                            case 'MAFeatures':
                                sublayout.MACustomRegion.show(customView);
                            break;
                        }

                        customView.on('configure:features', function(){
                            require(['apps/mobile_event/overview/features/common/customfeatures_modalitemview'], function(CustomFeaturesItemView){

                                var customFeaturesCompView = new CustomFeaturesItemView.CustomItemView({
                                    model: features,
                                });

                                features.store();

                                customFeaturesCompView.on('comp:save', function(data){

                                    var self = this,
                                        c = _.clone(features.get('units'));

                                    _.each(data.units, function(key, value){
                                        c[value]['configured'] = data['units'][value];
                                    });

                                    features.set('units', c);

                                    var savingFeatures = features.save();

                                    if(savingFeatures){
                                        $.when(savingFeatures).done(function(){
                                            self.trigger("close");

                                            var title = "Saved",
                                                message = 'Your Trial Feature settings have been updated';

                                            var view  = new AlertView.View({
                                                alert_class: 'alert-success',
                                                title: title,
                                                message: message
                                            });

                                            QuickMobile.topNotificationRegion.show(view);

                                            customView.render();

                                        }).fail(function(response){
                                            self.trigger("close");

                                            var title = "Error",
                                                message = 'There has been a server error. Your Trial Feature settings have not been updated';

                                            var view  = new AlertView.View({
                                                alert_class: 'alert-error',
                                                title: title,
                                                message: message
                                            });

                                            QuickMobile.topNotificationRegion.show(view);

                                            features.restore();
                                        });
                                    }
                                });

                                customFeaturesCompView.on('comp:close', function(){
                                    this.trigger("close");

                                    features.restore();
                                });

                                QuickMobile.modalRegion.show(customFeaturesCompView);
                            });
                        });
                        customView.on('get:featureconfig', function(name, requesturl, submiturl, isJSON){

                            featureEntities.getFeatureConfig(app_id);

                            // var feature_id = model.get('id');

                            var fetchingFeatureConfig = QuickMobile.request('featureconfig:entity', app_id, name, requesturl, submiturl, isJSON);

                            $.when(fetchingFeatureConfig).done(function(feature_config_data){

                                require(['apps/mobile_event/overview/features/common/feature_config_view'], function(featureConfigView){

                                    var modalview = new featureConfigView.ConfigView({model: feature_config_data})

                                    modalview.on('comp:save', function(data){

                                        var saveConfig =  QuickMobile.request('featureconfig:entity:save', data, submiturl),
                                            self = this;

                                        $.when(saveConfig).done(function(){
                                            var title = "Saved",
                                                message = 'Your feature settings have been updated';

                                            var view  = new AlertView.View({
                                                alert_class: 'alert-success',
                                                title: title,
                                                message: message
                                            });

                                            QuickMobile.topNotificationRegion.show(view);
                                            self.trigger('close');
                                        }).fail(function(){
                                            var title = "Error",
                                                message = 'Your feature settings have been updated';

                                            var view  = new AlertView.View({
                                                alert_class: 'alert-success',
                                                title: title,
                                                message: message
                                            });

                                            QuickMobile.topNotificationRegion.show(view);
                                            self.trigger('close');
                                        });
                                    });
                                    QuickMobile.modalRegion.show(modalview);
                                });
                            }).fail(function(response){

                            });
                        });
                    });
                });
            }
        }
    });
    return QuickMobile.ME_Overview.Features.Controller;
});
