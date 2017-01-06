/*global define*/
/*jslint nomen: true*/
define(function (require) {
    "use strict";
    var  $ 			=	require('jquery'),
		jqm 		= 	require('jquery.mobile'),
		_ 			=	require('underscore-min-1.8.3'),
        Backbone 	= 	require('backbone-min-1.2.1'),
        tpl 		= 	require('text-2.0.14!tpl/UserDetailsTempl.html'),
        template	= 	_.template(tpl),
        _this,
        UserDetailsView;
    UserDetailsView = Backbone.View.extend({
		el : '#page_container',
	    initialize : function () {
			this.render();
            
	    },
	    render : function () {
            this.$el.html(template).trigger('create');
            $('#user_details').css("height",$.mobile.getScreenHeight());
            return this;
	    },
		events : {
            "click #save_details_btn" : "save_details"
		},
        save_details :  function(){
             $.ajax({
                type:'POST',
                url : localStorage.getItem('WsUrl')+"saveUserDetails.php",
                dataType:'json',
                data:{userId : localStorage.getItem('userId'), userName:$("#user_name").val(),userMobileNo:$("#user_mobileno").val(),userAddress:$("#user_address").val()},
                success: function(response, status){
                    console.log(response);
                   
                },
                failure: function(data,status){
                    console.log(status);
                    console.log(data);
                }
            });
                
        }
	});
	return UserDetailsView;
});


