define(['app', 'hbs!apps/mobile_event/overview/features/common/template/feature_config'], function(QuickMobile, Template){
    QuickMobile.module('ME_Overview.MAFeatureConfig.View', function(View, QuickMobile, Backbone, Marionette, $, _){
        View.ConfigView = Marionette.ItemView.extend({
            template: Template,
            events: {
                'click .js-submit' : 'saveData',
                'click .btn-link' : 'closeModal',
                'click .fieldYesnoRadio button' : 'yesNoRadioToggle',
                'click #lang': 'languageUpdate'
            },
            yesNoRadioToggle: function(e){
                var targetval = $(e.target).data('value');
                $(e.target).parent().next('input').val(targetval);
            },
            onShow: function(){
                this.languageUpdate();
            },
            languageUpdate : function(e){
                var val = $('#lang').val();
                this.$el.find('.input_stringkey').closest('.control-group').hide();
                this.updateLang(val);
            },
            updateLang: function(lang) {
                $('.input_stringkey.'+lang).closest('.control-group').show();
            },
            saveData: function(e){
                e.preventDefault();
                var data = Backbone.Syphon.serialize(this);
                this.trigger('comp:save', data);
            },
            closeModal: function(e){
                e.preventDefault();
                this.trigger('close');
            }
        });
    });
    return QuickMobile.ME_Overview.MAFeatureConfig.View;
});
