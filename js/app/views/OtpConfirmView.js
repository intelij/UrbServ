/*global define*/
/*jslint nomen: true*/
define(function (require) {
    "use strict";
    var  $ 			=	require('jquery'),
		jqm 		= 	require('jquery.mobile'),
		_ 			=	require('underscore-min-1.8.3'),
        Backbone 	= 	require('backbone-min-1.2.1'),
        tpl 		= 	require('text-2.0.14!tpl/OTPConfirmTempl.html'),
        template	= 	_.template(tpl),
        _this,
        OtpConfirmView;
    OtpConfirmView = Backbone.View.extend({
		el : '#page_container',
	    initialize : function () {
			this.render();
            
	    },
	    render : function () {
            this.$el.html(template).trigger('create');
            $('#otp_confirm').css("height",$.mobile.getScreenHeight());
            return this;
	    },
		events : {
            "click #confirm_otp_btn" : "confirmOTP"
		},
        confirmOTP :  function(){
            if( localStorage.getItem("otp") == $("#otp_register").val()){
                window.location.replace("#userDetails");
            }else{
                swal("Please check the OTP entered!", "", "warning");
            }
        }
	});
	return OtpConfirmView;
});


