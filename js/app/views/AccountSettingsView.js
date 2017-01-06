/*global define*/
/*global Swiper*/
/*global swal*/
/*global Chart*/
/*jslint nomen: true*//*global define*/
/*jslint nomen: true*/
define(function (require) {
    "use strict";
    var  $ 			=	require('jquery'),
		jqm 		= 	require('jquery.mobile'),
		_ 			=	require('underscore-min-1.8.3'),
        Backbone 	= 	require('backbone-min-1.2.1'),
        tpl 		= 	require('text-2.0.14!tpl/AccountSettingsTempl.html'),
        template	= 	_.template(tpl),
        _this,
        AccountSettingsView;
    AccountSettingsView = Backbone.View.extend({
		el : '#page_container',
	    initialize : function () {
            console.log("asdfin ACcount sEtints")
			this.render();
            
	    },
	    render : function () {
            this.$el.html(template).trigger('create');
            $('#account_settings').css("height",$.mobile.getScreenHeight());
            $.ajax({
                type:'POST',
                url : localStorage.getItem('WsUrl')+"getUserDetails.php",
                dataType:'json',
                data:{userId : localStorage.getItem('userId')},
                success: function(response, status){
                    console.log(response);
                   $("#account_name").val(response.records[0].user_Name);
                    $("#account_mobileno").val(response.records[0].user_Mobile);
                    $("#account_address").val(response.records[0].user_Address);
                },
                failure: function(data,status){
                    console.log(status);
                    console.log(data);
                }
            });
            return this;
	    },
		events : {
            "click #update_details_btn" : "update_details",
            "click #home_menu" : "home"
		},
        update_details :  function(){
              $.ajax({
                type:'POST',
                url : localStorage.getItem('WsUrl')+"saveUserDetails.php",
                dataType:'json',
                data:{userId : localStorage.getItem('userId'), userName:$("#account_name").val(),userMobileNo:$("#account_mobileno").val(),userAddress:$("#account_address").val()},
                success: function(response, status){
                    console.log(response);
                    if(response.status == "Updated"){
                        swal("Updated successfully!", "", "success");
                       // window.location.replace("#home");
                    }
                   
                },
                failure: function(data,status){
                    console.log(status);
                    console.log(data);
                }
            });
                
        },
        home : function(){
            window.location.href = "#home";
            $(this.el).unbind();
        }
	});
	return AccountSettingsView;
});
