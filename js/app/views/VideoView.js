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
        tpl 		= 	require('text-2.0.14!tpl/VideoTempl.html'),
        template	= 	_.template(tpl),
        _this,
        VideoView;
	VideoView = Backbone.View.extend({
		// Instead of generating a new element, bind to the existing skeleton of
	    // the App already present in the HTML.
        el : '#page_container',
        initialize : function () {
            this.render();
        },
        render : function () {
            this.$el.html(template).trigger('create');
            $(".ui-mobile [data-role=page],.ui-mobile [data-role=dialog],.ui-page").css("height", "100%");
            
            $("#video_player")[0].play();
            $("#video_player").on('ended', function () {
                window.location.href = "#explain"; 
            });
           /*  $("#video_player")[0].bind('ended', function(){
          window.location.href = "#explain"; 
       });*/
            // var video = document.getElementById('video');
              /*  $("#video")[0].play();
                $("#video")[0].addEventListener('ended',function(){
                    window.location.href = "#explain";
                });*/
            return this;
        },
        events : {
        }
        
    }); 
	return VideoView;
});
