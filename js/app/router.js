/*global define*/
/*jslint nomen: true*/
define(function (require) {
	"use strict";
    var $			 	 = require('jquery'),
        Backbone	 	 = require('backbone-min-1.2.1'),
		SplashView	 	 = require('app/views/Splash'),
		ExplainView	 	 = require('app/views/ExplainView'),
		VideoView	 	 = require('app/views/VideoView'),
		LoginView		 = require('app/views/LoginView'),
        RegisterView	 = require('app/views/RegisterView'),
        OtpConfirmView   = require('app/views/OtpConfirmView'),
        UserDetailsView  = require('app/views/UserDetailsView'),
        HomeView		 = require('app/views/HomeView'),
        AccountSettingsView  = require('app/views/AccountSettingsView'),   
     	SubCategoryView	 = require('app/views/SubCategoryView'),
     	BookServiceView	 = require('app/views/BookServiceView');
      
	return Backbone.Router.extend({
		routes : {
			"" 					: "splash",
			"video"				: "video",
			"explain"			: "explain",
            "login"             : "login",
            "register"          : "register",
            "confirmOtp"        : "confirmOtp",
            "userDetails"       : "userDetails",
            "home"              : "home",
            "category:i"        : "category",
            "accountsettings"   :  "accountsettings",
            "subcategory:i"     : "subcategory"
		},
		//Initiating SplashView
		splash : function () {
           // var WsUrl = "http://192.168.94.1/phpfiles1/";
             var WsUrl = "http://www.urbserv.in/urbadmin/urbServ_app/";
            localStorage.setItem('WsUrl',WsUrl);
          //  localStorage.setItem('isRegistered','true');
		var me = this, splashview,
                iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);
			if (!iOS) {
				splashview = new SplashView();
			}
			function splashtologin() {
                /*if (localStorage.getItem('isRegistered') === "false" || localStorage.getItem('isRegistered') === null) {
					me.navigate("#signup", {
						trigger : true,
						replace : true
					});
				} else*/
				if (localStorage.getItem('installed') === "false" || localStorage.getItem('installed') === null) {
					me.navigate("#video", {
						trigger : true,
						replace : true
					});
				}
                   else if (localStorage.getItem('flagLogin') === "false" || localStorage.getItem('flagLogin') === null) {
					me.navigate("#login", {
						trigger : true,
						replace : true
					});
				} else if(localStorage.getItem('flagLogin') === "true" ) {
                    me.navigate("#home", {
						trigger : true,
						replace : true
					});
                
                }
				}
			setTimeout(splashtologin, 1000);
		},
		video:function(){
		 	var videoView = new VideoView(); 	
		},
		explain:function(){
		 	var explainView = new ExplainView(); 	
		},
        login : function(){
            var loginView = new LoginView(); 
        },
        register : function(){
            var registerView = new RegisterView(); 
        },
        confirmOtp : function(){
            var otpConfirmView = new OtpConfirmView(); 
        },
        userDetails : function(){
            var userDetailsView = new UserDetailsView(); 
        },
        home : function(){
			var homeView = new HomeView();
		},
        accountsettings : function(){
            var accountSettingsView = new AccountSettingsView();
        },
		category : function(){
			var subCategoryView = new SubCategoryView();
		},
		subcategory:function(){
			var bookServiceView = new BookServiceView();
		}
		
	});

});
