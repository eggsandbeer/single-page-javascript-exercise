define(['app', 'hbs!apps/common/alerts/templates/alert'], function(QuickMobile, AlertTpl){
    QuickMobile.module('Common.AlertView', function(AlertView, QuickMobile, Backbone, Marionette, $, _){
        AlertView.View = Marionette.ItemView.extend({
            template: AlertTpl,
            onRender: function(){
                if(this.options.title){
                    this.$el.find('.title').html(this.options.title);    
                }
                if(this.options.alert_class){
                    this.$el.find('.alert').addClass(this.options.alert_class);    
                }
                if(this.options.message){
                    this.$el.find('.message').html(this.options.message);                    
                }
            }
        });
    });
    return QuickMobile.Common.AlertView;
});
