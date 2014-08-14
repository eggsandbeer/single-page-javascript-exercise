define(['app', 'apps/mobile_event/overview/brand/colours/colours_view', 'backbone.syphon'], function(QuickMobile, View){
    QuickMobile.module('ME_Overview.Colours', function(Colours, QuickMobile, Backbone, Marionette, $, _){
        Colours.Controller = {
            showColours: function(id, layout){
                require(["entities/mobile_event/overview/colours"], function(ColoursCollection){
                    var fetchingColours = QuickMobile.request("colours:entity", id);

                    $.when(fetchingColours).done(function(colours){

                        if (colours !== undefined) {
                            var coloursView = new View.Colours({
                                model: colours
                            });
                        }

                        colours.store()

                        layout.coloursRegion.show(coloursView);

                        coloursView.on('brand:colorsave', function(colours){
                            var data = Backbone.Syphon.serialize(this);
                            var savingColours = colours.save(data);

                            $.when(savingColours).done(function(){
                                require(['apps/common/alerts/views/alert_view'], function(AlertView){
                                    var title = "Saved",
                                        message = 'Your branding colours have been saved.';

                                    var view  = new AlertView.View({
                                        alert_class: 'alert-success',
                                        title: title,
                                        message: message
                                    });

                                    QuickMobile.topNotificationRegion.show(view);
                                });

                                colours.store();
                            }).fail(function(response){
                                require(['apps/common/alerts/views/alert_view'], function(AlertView){
                                    var title = "Error",
                                        message = 'There has been an error saving your settings';

                                    var view  = new AlertView.View({
                                        alert_class: 'alert-error',
                                        title: title,
                                        message: message
                                    });

                                    QuickMobile.topNotificationRegion.show(view);
                                });

                                colours.restore();
                            });
                        });

                        coloursView.on('brand:colorreset', function(colours){
                            colours.restore()
                            coloursView.render(colours)
                        });
                    });
                });
            }
        }
    });
    return QuickMobile.ME_Overview.Colours.Controller;
});
