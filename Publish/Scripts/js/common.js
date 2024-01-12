var Common = {
    jc: null,
};


Common.showSuccessMessage = function (msg, title, callback) {
    var msgString = "<table><tr><td width='50' align='center'><i class='fa fa-2x fa-check-circle' style='color: green'></i></td><td>" + msg + "</td></tr></table>";

    $.alert({
        title: title,
        content: msgString,
        onClose: function () { if (callback) callback(); }
    });
};
Common.showErrorMessage = function (msg, title, callback) {
    var msgString = "<table><tr><td width='50' align='center' valign='top'><i class='fa fa-2x fa-ban' style='color: red'></i></td><td>" + msg + "</td></tr></table>";
    $.alert({
        title: title,
        content: msgString,
        callback: function () { if (callback) callback(); }
    });
};
Common.showErrorMessageFocus = function (msg, title, ctlToFocus) {
    var msgString = "<table style='color: black;'><tr><td width='50' align='center' valign='top'><i class='fa fa-2x fa-ban' style='color: red'></i></td><td>" + msg + "</td></tr></table>";

    $.alert({
        title: "<span style='color: black;'><b>" + title + "</b></span>",
        content: msgString,
        //size: 'large',
        //closeButton: false,
        onDestroy: function () {
            //console.log(ctlToFocus);

            if (ctlToFocus) {
                
                setTimeout(function () {
                   
                    ctlToFocus.focus();
                }, 0);
            }
        }
        //}).css({ 'background-color': 'white', 'font-weight': 'regular', color: '#F00', 'font-size': '1em', });
    });

};
Common.showConfirm = function (msg, title, callback) {
    var msgString = "<table width='100%'><tr><td width='50' align='center' valign='top'><i class='fa fa-2x fa-exclamation-circle' style='color: orange'></i></td><td>" + msg + "</td></tr></table>";
    $.confirm({
        title: title,
        content: msgString,
        onAction: function (btnName) {
            // when a button is clicked, with the button name
            //alert('onAction: ' + btnName);
            if (callback) callback(btnName === "confirm");
        },
        buttons: {
            confirm: {
                text: 'Yes',
                btnClass: 'btn-success'
            },
            cancel: {
                text: 'No',
                btnClass: 'btn-danger'
            }
        },
        //onDestroy: function (r) {  }
    });
};

Common.showLoader = function () {
     Common.jc = $.dialog({
        size: "small",
        title:"",
         content: '<div class="text-center" style="height:80px;margin-top:24px;"><img src="/images/loader.gif" width="60" height="60"></div>',
         closeIcon: false,   
         onOpen: function () {
             // after the modal is displayed.
             //Common.jc = this;
         },
    });
};

Common.hideLoader = function () {
    //console.log(Common.jc);
   // setTimeout(function () {
        if (Common.jc)
            Common.jc.close();
        Common.jc = null;
   // }, 0);
};

Common.toPetroBillFloat = function (strValue) {
    var arr = strValue.split(".");
    var s1 = arr.length > 0 ? arr[0].trim() : "0";
    var s2 = arr.length > 1 ? arr[1].trim() : "00";

    s2 = s2.substring(0, 2);
    if (s2.length === 1) s2 = s2 + "0";
    if (s2.length === 0) s2 = "00";

    return s1 + "." + s2;
};


Common.progress = function (showHide) {
    if (showHide === true) {


        if (document.querySelector("#pleaseWaitDialog") == null) {
            var modalLoading = '<div class="modal" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false" role="dialog">\
                    <div class="modal-dialog progress-bg">\
                        <div class="modal-content progress-bg">\
                            <div class="modal-body progress-bg">\
                                <div class="text-center" style="padding: 32px; color: whitesmoke;">\
                                  <img src="/img/loader.gif" width="60" height="60"><br /><br />Please wait...\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>';
            $(document.body).append(modalLoading);
        }

        $("#pleaseWaitDialog").modal("show");
    } else {
        $("#pleaseWaitDialog").modal("hide");
    }
};