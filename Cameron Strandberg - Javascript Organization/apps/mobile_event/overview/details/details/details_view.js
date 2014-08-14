define(['app', 'hbs!apps/mobile_event/overview/details/details/templates/details','hbs!apps/mobile_event/overview/details/details/templates/details-reduced', 'datepicker'], function(QuickMobile, DetailsTpl, DetailsReducedTpl){
    QuickMobile.module("ME_Overview.Details.View", function(View, QuickMobile, Backbone, Marionette, $, _){
        View.Details = Marionette.ItemView.extend({
            template: DetailsTpl,
            className: 'accordion-group',
            events: {
                'click .js-overview-modal': 'ModalShow'
            },
            ModalShow: function(e){
                e.preventDefault();
                e.stopPropagation();
                this.trigger("details:edit", this.model);
            },
        });
        View.DetailsReduced = Marionette.ItemView.extend({
            template: DetailsReducedTpl,
            className: 'accordion-group'
        });
    });
    return QuickMobile.ME_Overview.Details.View;
});
