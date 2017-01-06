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
        tpl 		= 	require('text-2.0.14!tpl/HomeTempl.html'),
        template	= 	_.template(tpl),
        _this,
        HomeView,hash;
	HomeView = Backbone.View.extend({
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
            $(document).on('focus', 'input', function () {
                if ($(this).hasClass('nohalo')) {
                    $(this).closest('div').addClass('noshadow');
                }
            });
            //JSON.parse(localStorage.getItem('LoginCreds')).user.email;
           $.mobile.loading('show',{
                        text : 'fetching data...',
                        textVisible: true,
                        html:''
                    });
         /*  $( "#autocomplete" ).on( "filterablebeforefilter", function ( e, data ) {
        var $ul = $( this ),
            $input = $( data.input ),
            value = $input.val(),
            html = "";
        $ul.html( "" );
        if ( value && value.length > 2 ) {
            $ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
            $ul.listview( "refresh" );
            $.ajax({
                url: "http://gd.geobytes.com/AutoCompleteCity",
                dataType: "jsonp",
                crossDomain: true,
                data: {
                    q: $input.val()
                }
            })
            .then( function ( response ) {
                $.each( response, function ( i, val ) {
                    html += "<li>" + val + "</li>";
                });
                $ul.html( html );
                $ul.listview( "refresh" );
                $ul.trigger( "updatelayout");
            });
        }
    });*/
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
                    console.log(status)
                }
            });
            $.ajax({
                type:'GET',
                crossOrigin: true,
                url : localStorage.getItem('WsUrl')+"getCategory.php",
                dataType:'json',
                
                success: function(data, status){
                  console.log(data);
                  $("#categories_list").empty();
                    for(var i=0; i< data.records.length; i++){
                        $("#categories_list").append('<li data-categoryId='+data.records[i].category_Id+'>'
                             +'<div class="darken" style="background-image:linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)),url(img/Category/'
                             +data.records[i].category_Name
                             +'.jpg")">'
                             +'<h2>'+data.records[i].category_Name+'</h2></div></li></ul>').trigger('create');
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
            "click #categories_list li"       : "subcategory",
            "click .search_list li"         : "bookservice",
            "click #account_settings_menu"  : "accountsettings"
        	
        },
        bookservice : function(ev){
            var subcategoryid = $(ev.currentTarget).data('subcategoryid');
            $("#categories_list li").blur();
            var loadingfunc = function(){
                
                window.location.href = "#subcategory:"+subcategoryid;
            }
            setTimeout(loadingfunc, 1000);
            
            
            $(this.el).unbind();

        },
        subcategory : function(ev) {
            var categoryId = $(ev.currentTarget).data('categoryid');
            window.location.href = "#category:"+categoryId;
            $(this.el).unbind();
        },
        accountsettings : function(){
            window.location.href = "#accountsettings";
            $(this.el).unbind();
        }
    });
	return HomeView;
});
