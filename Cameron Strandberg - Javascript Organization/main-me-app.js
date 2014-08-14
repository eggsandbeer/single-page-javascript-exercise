define(['app'], function (QuickMobile) {
    QuickMobile.on('initialize:after', function(){
        if(Backbone.history){
            require([
                'apps/mobile_event/overview/overview_app'
            ],
            function(){
                Backbone.history.start();
            });
        }
    });
    QuickMobile.start();
});


