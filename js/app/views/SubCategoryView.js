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
        cbpFWTabs    =   require('cbpFWTabs'),
        tpl 		= 	require('text-2.0.14!tpl/SubCategoryTempl.html'),
        template	= 	_.template(tpl),
        _this,
        SubCategoryView,categoryId;
	SubCategoryView = Backbone.View.extend({
		// Instead of generating a new element, bind to the existing skeleton of
	    // the App already present in the HTML.
        el : '#page_container',
        initialize : function () {
            categoryId = (window.location.hash).split(":")[1];
            this.render(categoryId);
        },
        render : function (categoryId) {
            this.$el.html(template).trigger('create');
            $(".ui-mobile [data-role=page],.ui-mobile [data-role=dialog],.ui-page").css("height", "100%");
            //console.log($.mobile.getScreenHeight()-$("#page_header").height());
			$('.ui-content').css("height",$.mobile.getScreenHeight()-$("#page_header").height());
            
            //JSON.parse(localStorage.getItem('LoginCreds')).user.email;
           $.mobile.loading('show',{
                        text : 'fetching data...',
                        textVisible: true,
                        html:''
                    });
            $.ajax({
                type:'GET',
                crossOrigin: true,
                url : localStorage.getItem('WsUrl')+"getSubServices.php",
                dataType:'json',
                success: function(data, status){
                  console.log(data);
                  $(".search_list").empty();
                  var html = "";
                    for(var i=0; i< data.records.length; i++){
                        html += '<li data-subcategoryid = "'
                            +data.records[i].service_Id
                            +'"><a>'
                            +data.records[i].service_Name
                            +'</a></li>';
                        $(".search_list").html( html );
                $(".search_list").listview( "refresh" );
                $(".search_list").trigger( "updatelayout");
                    }
                    $.mobile.loading('hide');
                },
                failure: function(status){
                    $.mobile.loading('hide');
                    console.log(status);
                }
            });
            $.ajax({
                type:'POST',
                crossOrigin: true,
                url : localStorage.getItem('WsUrl')+"getCategoryService.php",
                dataType:'json',
                data:{category_id:categoryId},
                success: function(data, status){
                  console.log(data);
                  $("#subcategories_list").empty();
                    for(var i=0; i< data.records.length; i++){
                       $("#subcategories_list").append('<div class="item"'
                        +' data-subcategoryid ="'
                        +data.records[i].service_Id
                        +'"><img class="sub_image" src="img/subcategory/'
                            +data.records[i].service_Name
                            +'.png" alt="category"/><span class="caption">'
                            +data.records[i].service_Name
                            +'</span></div>').trigger("create");
                    }
                    $.mobile.loading('hide');
                },
                failure: function(status){
                    $.mobile.loading('hide');
                    console.log(status)
                }
            });

            return this;
        },
        events : {
            "click #subcategories_list div" : "bookservice",
            "click .search_list li"         : "bookservice",
            "click #account_settings_menu"  : "accountsettings"
        	
        },
        bookservice : function(ev) {
            var subcategoryid = $(ev.currentTarget).data('subcategoryid');
            window.location.href = "#subcategory:"+subcategoryid;
            $(this.el).unbind();
        },
        accountsettings : function(){
            window.location.href = "#accountsettings";
            $(this.el).unbind();
        }
    });
	return SubCategoryView;
});
