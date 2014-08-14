define([
    'app',
    'hbs!apps/mobile_event/overview/brand/colours/templates/colours',
    'colourpicker'
    ],
    function(QuickMobile, ColoursTpl){
    QuickMobile.module("ME_Overview.Colours.View", function(View, QuickMobile, Backbone, Marionette, $, _){
        View.Colours = Marionette.ItemView.extend({
            template: ColoursTpl,
            itemView : View.Colour,
            itemViewContainer: '.colours-container',
            className :'accordion-group',
            events: {
                'click .miniColors-colors': '.miniColors-colors'
            },
            modelEvents: {
                'change': 'enableSave'
            },
            enableSave: function(){
                $('.js-save').removeClass('disabled');
            },
            onRender: function(){
                $(this.el).find('input').miniColors();
            }
        });
    });
    return QuickMobile.ME_Overview.Colours.View;
});
