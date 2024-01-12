$(function () {
    //placeData();
    var bookRecords = "";
    var bookDateRec = "";
    var eventPlace = "";
});
function placeAdd(rec, id) {
    var _recId = rec;
    window.location.href = "Availability?_recId=" + _recId;
}

function placeView(id) {
    var _recId = id;
    window.location.href = "Availability?_recId=" + _recId;
}

function placeList() {
    //window.location.href = "ServiceBy?_recId=" + _recId;
    window.location.href = "Availability";
}

function templateView(id) {
    //var _recId = @_recId;
    var _recId = id;
    window.location.href = "TemplateView?_recId=" + _recId;
}

function getEndDate() {
    var x = document.getElementById("start-booking-date").value;
    console.log(x);
    var dtToday = new Date();
    console.log(dtToday);

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();

    var minDate = year + '-' + month + '-' + day;
    //var maxdate = '2022' + '-' + '10' + '-' + '31';

    
    $('#end-booking-date').attr('min', minDate)
}

function placeData(id) {
    var recs = $("#rec-id").val();
    var places = $("#place-id").val();
    //console.log(recs);
    var x = document.getElementById("start-booking-date").value;
    var y = document.getElementById("end-booking-date").value;
    var checkDate = x;
    //console.log(checkDate);
    var me = this;
    var datatosend = {
        "Id": recs,
        "EventPlaceId": places
    };
   
    $.ajax({
        url: web.webapiUrl + '/ApiEvent/GetEVentById',
        dataType: "JSON",
        data: datatosend,
        crossOrigin: true,
        type: "POST",
        success: function (d, st) {

            Common.progress(false);
            if (d.status === 0) {   
                
                bookDateRec = d.data;
                var tmpl = $("#list-item-template").html();
                var listTemplateContainer = $("#list-template-container");


                listTemplateContainer.html("");

                $(me.bookDateRec).each(function () {
                    eventPlace = this.Place;
                    
                    
                });
                
            }
            else {
                
                Common.showErrorMessage(d.statusText, "PTDC - Template", null);

            }
        },
        error: function (xhr, st, eth) {
            //console.log(xhr);
            Common.progress(false);
        }
    });
}

function showError (msg) {
    var errorLabel = $("#error-label");
    errorLabel.hide();
    var errorTextLabel = $("#error-text");

    errorTextLabel.html(msg);
    errorLabel.show();

    //setTimeout(() => errorLabel.removeClass("blink").hide(), 10000);
};

function getData(id) {
    var recs = $("#rec-id").val();
    var places = $("#place-id").val();
   
    if (this.validateRegisterData() == false) {
        return false;
    }
    //console.log(recs);
    var x = document.getElementById("start-booking-date").value;
    var y = document.getElementById("end-booking-date").value;
    var x1 = document.getElementById("start-booking-time").value;
    var y1 = document.getElementById("end-booking-time").value;
    var checkDate = x;
    //console.log(checkDate);
    var me = this;
    var datatosend = {
        "EventId": recs,
        "StartBookingDate": x,
        "StartBookingTime": x1,
        "EndBookingDate": y,
        "EndBookingTime": y1,
        "EventPlaceDetails": eventPlace
    };
    console.log(datatosend);
  
    $.ajax({
        url: web.webapiUrl + '/ApiEvent/GetAvailabilityById',
        dataType: "JSON",
        data: datatosend,
        crossOrigin: true,
        type: "POST",
        success: function (d, st) {

            Common.progress(false);
            if (d.status === 0) {         
                //showError("Select your country code.");
                Common.showErrorMessage("Date and Place is already Booked try some other dates", "PTDC", null);
            }
            else if (d.status === 2) {
                Common.showSuccessMessage("Date and Place is available", "PTDC");
                //Common.showSuccessMessage("Date and Place is available", "PTDC", $("#books"));
                //showError("Date and Place is available.");
                //Common.showSuccessMessage("Date and Place is available", "PTDC", document.getElementById('books').focus());
                //Common.showErrorMessage(d.statusText, "PTDC", null);
                $("#checks").show();
                $("#books").show();
            }
            else {

                Common.showErrorMessage(d.statusText, "PTDC", null);

            }
        },
        error: function (xhr, st, eth) {
            //console.log(xhr);
            Common.progress(false);
        }
    });
}
function validateRegisterData(id) {
    //debugger;
    var me = this;
    console.log(me.bookDateRec);
    var bookRecords = "";
    $(me.bookDateRec).each(function () {
      
        bookRecords = this.BookingDate;
      //  console.log(bookRecords);
    });
    
    var startBookingDate = document.getElementById("start-booking-date").value;
    var startBookingTime = document.getElementById("start-booking-time").value;
    var endBookingDate = document.getElementById("end-booking-date").value;
    var endBookingTime = document.getElementById("end-booking-time").value;
    var eventCategory = document.getElementById("category").value;
    var place = document.getElementById("place").value;
    //var checkDate = x;  
    //var book = bookRecords;
    //console.log(book);
    if (startBookingDate == "") {
        errorString = "Start Date should not be empty.";
        Common.showErrorMessage(errorString, "Event Booking", document.getElementById('start-booking-date').focus());
        return false;
    }
    if (startBookingTime == "") {
        errorString = "Start Time should not be empty.";
        Common.showErrorMessage(errorString, "Event Booking", document.getElementById('start-booking-time').focus());
        return false;
    }
    if (endBookingDate == "") {
        errorString = "End Date should not be empty.";
        Common.showErrorMessage(errorString, "Event Booking", document.getElementById('end-booking-date').focus());
        return false;
    }
    if (endBookingTime == "") {
        errorString = "End Time should not be empty.";
        Common.showErrorMessage(errorString, "Event Booking", document.getElementById('end-booking-time').focus());
        return false;
    }
    if (place == "") {
        errorString = "Event Place should not be empty.";
        Common.showErrorMessage(
            errorString,
            "Event Booking",
            document.getElementById("place").focus()
        );
        return false;
    }
    if (eventCategory == "") {
        errorString = "Event Category should not be empty.";
        Common.showErrorMessage(
            errorString,
            "Event Booking",
            document.getElementById("category").focus()
        );
        return false;
    }
    return true;
    //if (checkDate == book) {
    //    errorString = "Already the event is booking on that date Try Some other dates.";
    //    Common.showErrorMessageFocus(errorString, "Event Booking", $(checkDate));
    //    return false;
    //} else {
    //    return true;        
    //} 
}

function checkAvailability() {
   
    var x = document.getElementById("start-booking-date").value;
    var y = document.getElementById("end-booking-date").value;
    console.log(x);
    var checkDate = x;
    getData();

}

function BookData(id) {
    var recs = $("#rec-id").val();
    var places = $("#place-id").val();
    console.log(recs);
   
  
    if (this.validateRegisterData() == false) {
        return false;
    }
    //alert("cvxbc");
    //var recs = $("#rec-id").val();
    //console.log(recs);
    var x = document.getElementById("start-booking-date").value;
    var y = document.getElementById("end-booking-date").value;
    var startBookingTime = document.getElementById("start-booking-time").value;
    var endBookingTime = document.getElementById("end-booking-time").value;
    var eventCategory = document.getElementById("category").value;
    var place = document.getElementById("place").value;
    var optionaldata = document.getElementById("additional-details").value;
    var checkDate = x;
    var me = this;
    var datatosend = {
        "EventCategory": eventCategory,
        "StartBookingDate": x,       
        "EndBookingDate": y,
        "StartBookingTime": startBookingTime,
        "EndBookingTime": endBookingTime,
        "EventPlaceDetails": place, 
        "AdditionalDetails": optionaldata,
    };
    
    console.log(datatosend);   
  
    $.ajax({
        url: web.webapiUrl + '/ApiEvent/SaveEventBooking',
        dataType: "JSON",
        data: datatosend,
        crossOrigin: true,
        type: "POST",
        success: function (d, st) {

            Common.progress(false);
            if (d.status === 0) {


                me.tableRecords = d.data;
                console.log(d.data);
                console.log("data");


                Common.showLoader();
                    window.location.href = "Index";
               

            }
            else {
                //Common.showErrorMessageFocus(d.statusText, "PUFS - Template", null);
                Common.showErrorMessage(d.statusText, "PTDC - Template", null);

            }
        },
        error: function (xhr, st, eth) {
            console.log(xhr);
            Common.progress(false);
        }
    });
}