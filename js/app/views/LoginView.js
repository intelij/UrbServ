/*global define*/
/*jslint nomen: true*/
define(function (require) {
    "use strict";
    var  $ 			=	require('jquery'),
		jqm 		= 	require('jquery.mobile'),
		_ 			=	require('underscore-min-1.8.3'),
        Backbone 	= 	require('backbone-min-1.2.1'),
        tpl 		= 	require('text-2.0.14!tpl/LoginTempl.html'),
        template	= 	_.template(tpl),
        _this,
        LoginView;
    LoginView = Backbone.View.extend({
		el : '#page_container',
	    initialize : function () {
			this.render();
            
	    },
	    render : function () {
            this.$el.html(template).trigger('create');
            $('#home').css("height",$.mobile.getScreenHeight());
            return this;
	    },
		events : {
            "click #login_btn" : "login",
            "click #register_btn" : "register"
		},
        newsignup :  function(){
            window.location.replace("#signup");
        },
		login : function(){
            $.mobile.loading('show',{
                text : 'logging in...',
                textVisible: true,
                theme: 'a',
                html:''
            });

            
            var status, flagLogin, emailLogin, passwordLogin, userId, password;
            flagLogin          = false;
            status             = navigator.onLine ? 'online' : 'offline';
            emailLogin         = $("#email").val();
                /*$("#email").val();*/
            passwordLogin      = $("#password").val();
                /*$("#password").val();*/
            var jsonval = {
					"user" : {
						"email"       : emailLogin,
						"password"    : passwordLogin
					}
				};
//            //userId    = "9550080088";
//            //password  = "ground1";
            $.ajax({
                type:'POST',
                url:localStorage.getItem('WsUrl')+"userLogin.php",
                data: {mobileNo:emailLogin, password:passwordLogin},
                dataType: 'JSON',
                success: function(data, status){
                   console.log(data);
                 if (data.status === "Success") {
                     localStorage.setItem('flagLogin', "true");
                     localStorage.setItem('LoginCreds', JSON.stringify(jsonval));
                     localStorage.setItem('userId', emailLogin);
                     window.location.replace("#home");
                     $.mobile.loading('show',{
                        text : 'fetching data...',
                        textVisible: true,
                        theme: 'a',
                        html:''
                    });
                    }
                else {
                        $.mobile.loading('hide');
                        swal("Invalid Credentials!", "Failed to login", "warning");
                     }
                },
                failure: function(status){
                    console.log(status)
                   $.mobile.loading('hide');
                  if (data.status === 200) {
                          swal("Invalid Credentials!", "Failed to login", "warning");
                        } else {
                        swal("Unable to reach the server.", "Please check your internet connection!", "warning");
                  }
                }
            });
			//window.location.href = "#dashboard";
		},
        register : function(){
            window.location.replace("#register");
        }
	});
	return LoginView;
});


