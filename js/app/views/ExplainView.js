/*global define*/
/*global Swiper*/
/*global swal*/
/*global Chart*/
/*jslint nomen: true*/
define(function (require) {
	"use strict";
	var $ 			=	require('jquery'),
		jqm 		= 	require('jquery.mobile'),
		_ 			=	require('underscore-min-1.8.3'),
        Backbone 	= 	require('backbone-min-1.2.1'),
        tpl 		= 	require('text-2.0.14!tpl/ExplainTempl.html'),
        template	= 	_.template(tpl),
        _this,
        ExplainView;
	ExplainView = Backbone.View.extend({
		// Instead of generating a new element, bind to the existing skeleton of
	    // the App already present in the HTML.
        el : '#page_container',
        initialize : function () {
            this.render();
        },
        render : function () {
            this.$el.html(template).trigger('create');
            $(".ui-mobile [data-role=page],.ui-mobile [data-role=dialog],.ui-page").css("height", "100%");
            var carousel = $("#frame ul");
            carousel.itemslide({
              one_item: true //Set this for proper full screen navigation
            });
            // $("#video_player")[0].play();
            return this;
        },
        events : {
            "click #start" : "start"
        },
        start : function(ev) {
            localStorage.setItem('installed', "true");
            window.location.href = "#login";
            $(this.el).unbind();
        }
    }); 
	return ExplainView;
});
