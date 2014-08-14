define(['marionette'], function(Marionette){
    Marionette.Region.TopNotification = Marionette.Region.extend({
        constructor: function(){
            Backbone.Marionette.Region.prototype.constructor.apply(this, arguments);
            this.on("show", this.showAlert, this);
        },
        showAlert: function(){
            // var that = this;
            // setTimeout(function(){
            //     that.$el.find('.alert').remove();
            // }, 2000)
        }
    });
    return Marionette.Region.TopNotification;
});
