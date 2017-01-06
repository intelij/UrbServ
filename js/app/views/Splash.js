/*global define*/
/*jslint nomen: true*/
define(function (require) {
    "use strict";
    var  $ 			=	require('jquery'),
		jqm 		= 	require('jquery.mobile'),
		_ 			=	require('underscore-min-1.8.3'),
        Backbone 	= 	require('backbone-min-1.2.1'),
        tpl 		= 	require('text-2.0.14!tpl/SplashTempl.html'),
        template	= 	_.template(tpl),
        _this,
        SplashView;
    SplashView = Backbone.View.extend({
		el : '#page_container',
	    initialize : function () {
			this.render();
	    },
	    render : function () {
            this.$el.html(template).trigger('create');
			$('#urb_splash').css("height",$.mobile.getScreenHeight());
            return this;
	    }
	});
	return SplashView;
});


