define([
    'app',
    'hbs!apps/mobile_event/overview/details/platforms/templates/platforms'
], function(QuickMobile, PlatformTpl){
    QuickMobile.module("ME_Overview.Platforms.View", function(View, QuickMobile, Backbone, Marionette, $, _){
        View.Platforms = Marionette.ItemView.extend({
            template: PlatformTpl,
            className: 'accordion-group',
            events: {
                'click .js-overview-modal' : 'PlatformModalShow',
                'click .js-managelink-modal': 'ManageLink',
                'click button' : 'PlatformsModalShow'
            },
            onRender: function(){
                if (QuickMobile.userRole === 'customer' || QuickMobile.userRole === 'partner'){
                    this.$el.find('.js-overview-modal').remove();
                }
            },
            PlatformModalShow: function(e){
                e.preventDefault();
                e.stopPropagation();
                this.trigger('platforms:edit', this.model);
            },
            ManageLink: function(e){
                e.preventDefault();
                e.stopPropagation();
                this.trigger('managelink:edit', this.model);
            },
            PlatformsModalShow: function(e){
                e.preventDefault();
                e.stopPropagation();
                this.trigger("platform:edit", this.model);
            }
        });
    });
    return QuickMobile.ME_Overview.Platforms.View;
});



