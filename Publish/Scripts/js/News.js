$(function () {
    newsData();
});
//function eventAdd(rec, id) {
//    var _recId = rec;
//    window.location.href = "EventList?_recId=" + _recId;
//}

//function eventView(id) {
//    var _recId = id;
//    window.location.href = "ChoosePlace?_recId=" + _recId;
//}

function newsList() {
    //window.location.href = "ServiceBy?_recId=" + _recId;
    window.location.href = "News";
}

function newsData() {

    var me = this;
    var datatosend = {
        "Id": "",

    };


    $.ajax({
        url: web.webapiUrl + '/ApiAdmin/GetNews',
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

                    
    

                    s = s.replace(/{{rid}}/g, this.Id);
                    s = s.replace(/{{news}}/g, this.News);
                    
                    /*s = s.replace(/{{data}}/g, d.data);*/
                    listTemplateContainer.append(s);
                    /*listTemplateContainer.append("<hr />");*/
                });
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