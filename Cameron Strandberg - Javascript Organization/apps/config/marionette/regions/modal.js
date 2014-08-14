define(['app', 'marionette', 'bootstrap/modal'], function(QuickMobile, Marionette, Modal){
    Marionette.Region.Modal = Marionette.Region.extend({
        constructor: function(){
            Backbone.Marionette.Region.prototype.constructor.apply(this, arguments);
            this.on("show", this.showModal, this);
        },
        showModal: function(view){
            view.on("close", this.hideModal, this);

            this.$el.modal('show');

            require(['app'],function(QuickMobile){
                QuickMobile.topNotificationRegion.close();
            });
        },
        hideModal: function(){
            this.$el.modal('hide');
        }
    });
    return Marionette.Region.Modal;
});
