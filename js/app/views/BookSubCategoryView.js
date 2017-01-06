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
        sweetalert	= 	require('sweetalertmin'),
        tpl 		= 	require('text-2.0.14!tpl/SubCategoryTempl.html'),
        template	= 	_.template(tpl),
        _this,
        SubCategoryView,hash;
	SubCategoryView = Backbone.View.extend({
		// Instead of generating a new element, bind to the existing skeleton of
	    // the App already present in the HTML.
        el : '#page_container',
        initialize : function () {
            this.render();
        },
        render : function () {
            this.$el.html(template).trigger('create');
            $(".ui-mobile [data-role=page],.ui-mobile [data-role=dialog],.ui-page").css("height", "100%");
            //console.log($.mobile.getScreenHeight()-$("#page_header").height());
			$('.ui-content').css("height",$.mobile.getScreenHeight()-$("#page_header").height());
            
            //JSON.parse(localStorage.getItem('LoginCreds')).user.email;
         /*  $.mobile.loading('show',{
                        text : 'fetching data...',
                        textVisible: true,
                        html:''
                    });*/
            $.ajax({
                type:'GET',
                crossOrigin: true,
                url : localStorage.getItem('WsUrl')+"getCategory.php",
                dataType:'json',
                
                success: function(data, status){
                  console.log(data);
                  $("#categories_list").empty();
                    for(var i=0; i< data.records.length; i++){
                        $("#categories_list").append('<li><div class="darken">'
                            +'<h2>'+data.records[i].category_Name+'</h2></div></li></ul>');
                    }
                },
                failure: function(status){
                    console.log(status)
                }
            });

            return this;
        },
        events : {
            "click #categories_list li"       : "subcategory"
        	
        },
        subcategory : function() {
            console.log("nbook");
        }
        
    });
	return SubCategoryView;
});
