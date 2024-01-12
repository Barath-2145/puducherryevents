$(function () {
    eventData();
});
function eventAdd(rec, id) {
   
    var _recId = rec;
    console.log(rec);
    window.location.href = "EventList?_recId=" + _recId;
}

function eventView(id) {
   
    var _recId = id;   
    console.log(_recId);   
    window.location.href = "ChoosePlace?_recId=" + _recId;
}

function eventList() {
    //window.location.href = "ServiceBy?_recId=" + _recId;
    window.location.href = "EventList";
}

function eventData() {

    var me = this;
    var datatosend = {
        "Id": "",

    };


    $.ajax({
        url: web.webapiUrl + '/ApiEvent/GetEventLists',
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

                var tmpl = $("#list-item-template").html();
                var listTemplateContainer = $("#list-template-container");


                listTemplateContainer.html("");

                $(me.tableRecords).each(function () {
                   
                    var s = tmpl;

                    var sPhoto = "";

                    console.log(this.EventImage);
                    if (this.EventImage.trim() !== "") {
                       
                        sPhoto = web.webapiUrl + "UploadedFiles/" + this.EventImage;
                      
                    } else {
                        sPhoto = web.webapiUrl + "UploadedFiles/logo.jpg";

                    }


                    s = s.replace(/{{rid}}/g, this.Id);
                    s = s.replace(/{{eventname}}/g, this.EventName);
                    s = s.replace(/{{eventdescription}}/g, this.EventDescription);
                    s = s.replace(/{{eventimage}}/g, sPhoto);

                    /*s = s.replace(/{{data}}/g, d.data);*/
                    listTemplateContainer.append(s);
                    /*listTemplateContainer.append("<hr />");*/
                });
                listTemplateContainer.owlCarousel('destroy');
                listTemplateContainer.owlCarousel({
                    margin: 10,
                    loop: true,
                    nav: true,
                    autoWidth: false,
                    autoplay: true,
                    autoplayTimeout: 4000,
                    autoplayHoverPause: true,
                    //center: true,
                    /*items: 5,*/
                    items: window.innerWidth > 768 ? 4 : 1,
                    //navText: [
                    //    "<i class='fa fa-arrow-circle-left'></i>",
                    //    "<i class='fa fa-arrow-circle-right'></i>"
                    //],
                    navText: [
                        "<i class='fa fa-arrow-left' style='color:brown;'></i>",
                        "<i class='fa fa-arrow-right' style='color:brown;'></i>"
                    ],
                })
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