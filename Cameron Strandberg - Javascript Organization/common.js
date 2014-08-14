requirejs.config({
    baseUrl: '/javascript/',
    paths : {
        jquery : '../bower_components/jquery/jquery',
        underscore : '../bower_components/underscore/underscore',
        backbone : '../bower_components/backbone-amd/backbone',
        marionette : '../bower_components/marionette/lib/core/amd/backbone.marionette',
            'backbone.wreqr' : '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
            'backbone.babysitter' : '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
            'backbone.syphon' : '../bower_components/backbone.syphon/lib/amd/backbone.syphon',
            'backbone.picky' : '../bower_components/backbone.picky/lib/amd/backbone.picky.min',
            'backbone.memento' : './lib/memento-amd/memento-amd',
        hbs: '../bower_components/require-handlebars-plugin/hbs',
        colourpicker: './lib/colourpicker/colourpicker',
        datepicker: './lib/bootstrap-datepicker/bootstrap-datepicker',
        datepicker_extension: './lib/bootstrap-datepicker/extension'
    },
    packages: [
        {
            name: "bootstrap",
            location: "./lib/bootstrap/amd/src"
        }
    ],
    map: {
      '*': { 'jquery': 'jquery-private' },
      'jquery-private': { 'jquery': 'jquery' }
    },
    shim : {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        }
    }
});
