/*global $*/
/*jslint nomen: true*/
$(document).bind(
    "mobileinit",
    function () {
        "use strict";
        $.mobile.ajaxEnabled = false;
        $.mobile.linkBindingEnabled = false;
        $.mobile.hashListeningEnabled = false;
        $.mobile.pushStateEnabled = false;
        $.mobile.screenHeight = $.mobile.getScreenHeight();
        $.mobile.loader.prototype.options.text = "loading";
        $.mobile.loader.prototype.options.textVisible = true;
        $.mobile.loader.prototype.options.theme = "a";
        $.mobile.loader.prototype.options.html = "";
        // Remove page from DOM when it's being replaced
        $('div[data-role="page"]').on('pagehide', function (event, ui) {
            $(event.currentTarget).remove();
        });
    }
);

