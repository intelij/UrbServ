/*global require*/
/*jslint nomen: true*/
require.config({
	baseUrl : 'js/lib',
	// Require.js allows us to configure mappings to paths
	// as demonstrated below:
	paths : {
		app : '../app',
		tpl : '../../tpl'
	},
	waitSeconds : 6000,
	shim : {
		'cordova' : {},
		'backbone-min-1.2.1' : {
			deps : [ 'underscore-min-1.8.3', 'jquery' ],
			exports : 'Backbone'
		},
		'underscore-min-1.8.3' : {
			exports : '_'
		},
		'app/jqm-config' : {
			deps : [ 'jquery' ],
			exports : '$'
		},
		'jquery.mobile' : {
			deps : [ 'jquery' ],
			exports : '$'
		}/*,
		'jquery.easing.1.3' : {
			deps : [ 'jquery' ],
			exports : '$'
		},
		'jquery.quicksand' : {
			deps : [ 'jquery' ],
			exports : '$'
		}*/
	}
});
require(['jquery', 'jquery.mobile', 'backbone-min-1.2.1', 'ChartNew', 'app/jqm-config', 'app/router' ],
		function ($, jqm, Backbone, Chart, config, Router) {
        "use strict";
        var router = new Router();
        Backbone.history.start({
            hashChange : true
        });
    });
