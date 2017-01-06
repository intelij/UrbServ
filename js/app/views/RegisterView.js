/*global define*/
/*jslint nomen: true*/
define(function (require) {
    "use strict";
    var  $ 			=	require('jquery'),
		jqm 		= 	require('jquery.mobile'),
		_ 			=	require('underscore-min-1.8.3'),
        Backbone 	= 	require('backbone-min-1.2.1'),
        tpl 		= 	require('text-2.0.14!tpl/RegisterTempl.html'),
        template	= 	_.template(tpl),
        _this,
        RegisterView;
    RegisterView = Backbone.View.extend({
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
            "click #getOTP_btn" : "getOTP"
		},
        getOTP :  function(){
            var otp = Math.floor((Math.random() * 100000) + 1);
            localStorage.setItem("otp",otp);
            var data = {
                        user:"Urbservt",
                        pass:123456,
                        sender:"BHASH",
                        phone:9004740702,
                        text:"Urbserv : Please use this OTP to register : "+otp,
                        priority:"dnd",
                        stype:"normal",
                    };
            if($("#register_password").val() == $("#confirm_password").val()){
                 $.ajax({
                type:'POST',
                url : localStorage.getItem('WsUrl')+"checkUser.php",
                dataType:'json',
                data:{mobileNo:$("#mobileno").val(),password:$("#confirm_password").val()},
                success: function(response, status){
                    console.log(response);
                    if(response.status == "Success"){
                         localStorage.setItem("userId",$("#mobileno").val());
                        $.ajax({
                                type:'POST',
                                url : "http://bhashsms.com/api/sendmsg.php",
                                dataType:'json',
                                data:data,
                                success: function(response, status){
                                },
                                failure: function(data,status){
                                }
                            });
                         window.location.replace("#confirmOtp");
                    }
                    else if(response.status == "Failure"){
                        swal("User already registered!", "", "warning");
                    }
                   
                },
                failure: function(data,status){
                    console.log(status);
                    console.log(data);
                }
            });
                
            }else{
                 swal("Passwords do not match!", "", "warning");
            }
        }
	});
	return RegisterView;
});


