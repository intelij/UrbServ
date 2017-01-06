/*global define*/
/*global Swiper*/
/*global swal*/
/*global Chart*/
/*jslint nomen: true*/
define(function (require) {
    "use strict";
    var $           =   require('jquery'),
        jqm         =   require('jquery.mobile'),
        _           =   require('underscore-min-1.8.3'),
        Backbone    =   require('backbone-min-1.2.1'),
        xdate       =   require('xdate'),
        xdatei18n   =   require('xdate.i18n'),
        mobipick    =   require('mobipick'),
        sweetalert  =   require('sweetalertmin'),
        tpl         =   require('text-2.0.14!tpl/BookServiceTempl.html'),
        template    =   _.template(tpl),
        _this,
        BookServiceView,subcategoryId,service_Name;
    BookServiceView = Backbone.View.extend({
        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el : '#page_container',
        initialize : function () {
            subcategoryId = (window.location.hash).split(":")[1];
            this.render(subcategoryId);
        },
        render : function (subcategoryId) {
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
                  /*  */
            var picker_val = $("#date_pick").mobipick({
               // intlStdDate: false,
                minDate: new XDate(),
                date : new XDate()
            });
            // $('.timepicker').wickedpicker();
            // $('.clockpicker').clockpicker();
            $("#time_pick").clockpicker({
                autoclose: true,
                placement: 'top',
                align: 'right'
            });
            $.ajax({
                type:'POST',
                url : localStorage.getItem('WsUrl')+"getServiceCharge.php",
                dataType:'json',
                data:{service_id:subcategoryId},
                success: function(data, status){
                  console.log(data);
                  $("#starting_price").text("Rs. " + data.records[0].service_Charge);
                   $("#service_Name").text(data.records[0].service_Name);
                   service_Name = data.records[0].service_Name;
                  $("#subcategories_list").empty();
                    for(var i=1; i< data.records.length; i++){
                       $("#bookservice_list").append('<li><span style="float:left">'
        +data.records[i].sub_service_Name
        +'</span><span style="float:right;margin-right:30px">Rs. '
        +data.records[i].sub_service_Charge
        +'</span></li>').trigger("create");
                    }
                },
                failure: function(status){
                    console.log(status);
                }
            });
                    // console.log("subcategoryId :   "+subcategoryId);
            

            return this;
        },
        events : {
            "click #book_service_btn"       : "bookhandyman"
            
        },
        bookhandyman : function() {
            var BookedService = service_Name,
            BookedDate  = $("#date_pick").val(),
            BookedTime  = $("#time_pick").val();
            var data = {
                        user:"Urbservt",
                        pass:123456,
                        sender:"BHASH",
                        phone:localStorage.getItem('userId'),
                        text:"Dear Customer, thanks for booking. Booking details: Service : "+BookedService +", Date: "+BookedDate+", Time "+BookedTime +" ." ,
                        priority:"dnd",
                        stype:"normal",
                    };
            swal({  
                title: "Booking Details",
                html: true,
                text: "<div><span style='float:left' class='book_span1'>Booked Service</span><span style='float:right' class='book_span2'>"+BookedService+"</span> </div><div style='clear:both'></div><div><span class='book_span1' style='float:left'>Booked Date</span><span style='float:right' class='book_span2'>"+BookedDate+"</span></div><div style='clear:both'></div><div><span style='float:left' class='book_span1'>Booked Time</span><span style='float:right' class='book_span2'>"+BookedTime+"</span></div><div style='clear:both'></div>",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "Green",
                confirmButtonText: "Confirm",
                closeOnConfirm: false },
                function(){   
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
                    swal("Booked Successfully!", "", "success");
                });
        }
    });
    return BookServiceView;
});
