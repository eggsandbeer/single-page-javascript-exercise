define(['app', 'apps/mobile_event/overview/details/languages/languages_view'], function(QuickMobile, View){
    QuickMobile.module('ME_Overview.Languages', function(Languages, QuickMobile, Backbone, Marionette, $, _){
        Languages.Controller = {
            showLanguages: function(id, layout){
                require(["entities/mobile_event/overview/languages"], function(){
                    var fetchingLanguages = QuickMobile.request("languages:entity", id);

                    $.when(fetchingLanguages).done(function(languages){
                        if (languages !== undefined) {
                            var languagesView = new View.Languages({
                                model: languages
                            });
                        }

                        layout.languagesRegion.show(languagesView);

                        languagesView.on('languages:edit', function(model){
                            require(['apps/mobile_event/overview/details/languages/edit_languages_view', 'apps/common/alerts/views/alert_view'], function(EditLanguagesView, AlertView){

                                var view = new EditLanguagesView.EditLanguages({
                                    model: languages
                                });

                                languages.store();

                                view.on('form:submit', function(data){
                                    var l = _.clone(model.get('languages'));

                                    _.each(l, function(key, value){
                                        l[value].selected = data['languages'][value].enabled;
                                        l[value].isDefault = data['languages'][value].isDefault;
                                    });

                                    languages.set('languages', l);

                                    if(languages.save()){

                                        languagesView.render();

                                        this.trigger("close");

                                        var title = "Saved",
                                            message = 'Your language settings have been updated';

                                        var view  = new AlertView.View({
                                            alert_class: 'alert-success',
                                            title: title,
                                            message: message
                                        });

                                        QuickMobile.topNotificationRegion.show(view);

                                        languages.store();
                                    }
                                });

                                view.on('restore:languages', function(){
                                    languages.restore();
                                    languagesView.render();
                                });

                                QuickMobile.modalRegion.show(view);
                            });
                        });
                    });
                });
            }
        }
    });
    return QuickMobile.ME_Overview.Languages.Controller;
});
