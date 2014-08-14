define(["jquery"], function($){
    "use strict";
    
    var getURL = function(){
        var URL = window.location.pathname,
            d =  URL.split(/\//),
            l = d.length;

        return d[l-1]
    }
    return getURL
});
