define([
    'app',
    'hbs!apps/mobile_event/overview/features/common/template/feature_comp'
], function( QuickMobile, CompTemplate){
    QuickMobile.module('ME_Overview.MAConfig.Views', function(Views, QuickMobile, Backbone, Marionette, $, _){
        Views.Comp = Marionette.ItemView.extend({
            template: CompTemplate,
            className: 'well',
            events: {
                'click a' : 'configureFeature',
                'click .js-manage-features': 'manageFeatures'
            },
            configureFeature: function(e){
                e.preventDefault();

                var name = $(e.target).parent().data('displayname');
                var requesturl = $(e.target).parent().data('formrequesturl');
                var submiturl = $(e.target).parent().data('formsubmiturl');
                var isJSON = $(e.target).parent().data('isjson');

                this.trigger('get:featureconfig', name, requesturl, submiturl, isJSON);
            },
            manageFeatures: function(e){
                e.preventDefault();
                this.trigger('configure:features');
            }
        });
    });
    return QuickMobile.ME_Overview.MAConfig.Views;
});
