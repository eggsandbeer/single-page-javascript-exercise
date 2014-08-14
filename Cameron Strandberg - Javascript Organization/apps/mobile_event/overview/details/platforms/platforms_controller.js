define(['app', 'apps/mobile_event/overview/details/platforms/platforms_view'], function(QuickMobile, View){
    QuickMobile.module('ME_Overview.Platforms', function(Platforms, QuickMobile, Backbone, Marionette, $, _){
        Platforms.Controller = {
            showPlatforms: function(id, layout){
                require(["entities/mobile_event/overview/platforms"], function(PlatformsModel){
                    var fetchingPlatforms = QuickMobile.request("platforms:entities", id);

                    $.when(fetchingPlatforms).done(function(platforms){
                        if (platforms !== undefined) {
                            var platformsView = new View.Platforms({
                                model: platforms
                            });
                        }
                        platforms.store();
                        layout.platformsRegion.show(platformsView);

                        platformsView.on('managelink:edit', function(platforms){
                            require(['apps/mobile_event/overview/details/platforms/edit_platform_view'], function(EditPlatformView){

                                var fetchingUnsupportedLink = QuickMobile.request('platforms:unsupportedlink', id);

                                $.when(fetchingUnsupportedLink).done(function(link){
                                    var view = new EditPlatformView.View({
                                        model: link
                                    });

                                    link.store();

                                    view.on('form:submit', function(data){
                                        var self = this;
                                        var savingLink = link.save(data);

                                        if(savingLink){
                                            $.when(savingLink).done(function(){
                                                require(['apps/common/alerts/views/alert_view'], function(AlertView){

                                                    var title = "Saved",
                                                        message = 'Your download links have been updated';

                                                    var view  = new AlertView.View({
                                                        alert_class: 'alert-success',
                                                        title: title,
                                                        message: message
                                                    });

                                                    QuickMobile.topNotificationRegion.show(view);
                                                });
                                                link.store();
                                                self.trigger("close");

                                            }).fail(function(response){
                                                require(['apps/common/alerts/views/alert_view'], function(AlertView){

                                                    var title = "Error",
                                                        message = 'Your download link has not been updated';

                                                    var view  = new AlertView.View({
                                                        alert_class: 'alert-error',
                                                        title: title,
                                                        message: message
                                                    });

                                                    QuickMobile.topNotificationRegion.show(view);
                                                });

                                                link.restore();
                                                self.trigger("close");
                                            });
                                        } else {
                                            view.triggerMethod("form:data:invalid", link.validationError);
                                        }

                                    });
                                    view.on('platform:restore', function(){
                                        link.restore();
                                    });
                                    QuickMobile.modalRegion.show(view);
                                });
                            });
                        });

                        platformsView.on('platforms:edit', function(platforms){
                            require(['apps/mobile_event/overview/details/platforms/edit_platforms_view'], function(EditPlatformsView){

                                var original_platforms = _.clone(platforms.get('platforms'));

                                var view = new EditPlatformsView.View({
                                    model: platforms
                                });

                                platforms.store();

                                view.on('form:submit', function(data){
                                    var self = this;
                                    var clonedplatforms = _.clone(platforms.get('platforms'));

                                    _.each(clonedplatforms, function(key, value){
                                        clonedplatforms[value].enabled = data['platforms'][value].enabled;
                                    });

                                    platforms.set('platforms', clonedplatforms);

                                    var savingPlatforms = platforms.save();

                                    $.when(savingPlatforms).done(function(){
                                        require(['apps/common/alerts/views/alert_view'], function(AlertView){
                                            var title = "Saved",
                                                message = 'Your platform settings have been updated';

                                            var eview  = new AlertView.View({
                                                alert_class: 'alert-success',
                                                title: title,
                                                message: message
                                            });

                                            QuickMobile.topNotificationRegion.show(eview);
                                        });

                                        platforms.store();
                                        platformsView.render();
                                        self.trigger("close");

                                    }).fail(function(response){
                                        require(['apps/common/alerts/views/alert_view'], function(AlertView){
                                            var title = "Error",
                                                message = 'There was a problem saving your platforms.';

                                            var eview  = new AlertView.View({
                                                alert_class: 'alert-error',
                                                title: title,
                                                message: message
                                            });

                                            QuickMobile.topNotificationRegion.show(eview);
                                        });
                                        self.trigger("close");
                                        platforms.restore();
                                    });
                                });

                                view.on('platforms:restore', function(){
                                    platforms.restore();
                                });

                                QuickMobile.modalRegion.show(view);
                            });
                        });

                    });
                });
            }
        }
    });
    return QuickMobile.ME_Overview.Platforms.Controller;
});
