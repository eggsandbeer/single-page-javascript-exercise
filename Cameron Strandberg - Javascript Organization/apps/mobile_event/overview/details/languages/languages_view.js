define(['app',
    'hbs!apps/mobile_event/overview/details/languages/templates/languages'
    ], function(QuickMobile, LanguagesTpl){
    QuickMobile.module("ME_Overview.Languages.ShowLanguages", function(ShowLanguages, QuickMobile, Backbone, Marionette, $, _){
        ShowLanguages.Languages = Marionette.ItemView.extend({
            template: LanguagesTpl,
            className :'accordion-group',
            events: {
                'click .js-overview-modal': 'ModalShow'
            },
            onRender: function(){
                if(typeof String.prototype.trim !== 'function') {
                    String.prototype.trim = function() {
                        return this.replace(/^\s+|\s+$/g, '');
                    }
                }

                var bigtext = this.$el.find('#Enabled').text().trim(),
                    removedcomma = bigtext.substring(0, bigtext.length - 1);

                this.$el.find('#Enabled').text(removedcomma);
            },
            ModalShow: function(e){
                e.preventDefault();
                e.stopPropagation();
                this.trigger("languages:edit", this.model);
            }
        });
    });
    return QuickMobile.ME_Overview.Languages.ShowLanguages;
});



