var token = localStorage.getItem('token');
var custId = "";
var deptId = "";
class PBPermissionCustomerFormComponent extends PBCompnent {
    constructor(compID) {
        super(compID);
        this.onVerifyCompleted = null;
        this.onCancelled = null;        
        this.init();
    }

    init() {
        
        var that = this;
        if (this.verifyCustomer) {           
             that = this;
            this.verifyCustomer.addEventListener("click", function () {
                that.updateData();
            });
            //console.log("save User create and added click listener");
        }

       

        if (this.rejectCustomer) {
            that = this;
            this.rejectCustomer.addEventListener("click", function () {
                that.rejectData();
            });
            //console.log("save User create and added click listener");
        }

        if (this.checkStatus) {
            that = this;
            this.checkStatus.addEventListener("click", function () {
                that.checkStatusData();
            });
            //console.log("save User create and added click listener");
        }

        if (this.previewNoc) {
            that = this;
            this.previewNoc.addEventListener("click", function () {
                that.nocData();
            });
            //console.log("save User create and added click listener");
        }

        if (this.cancelCustomer) {
            that = this;
            this.cancelCustomer.addEventListener("click", function () {
                if (that.onCancelled) {
                    that.hide();
                    that.onCancelled();
                }
            });
            //console.log("cancel User create and added click listener");
        }
      
        this._customerId = "";
        this._eventId = "";
        this._departmentValue = "";
        this._appDepatmentValue = "";
        this._rejDepatmentValue = "";
    }


    hide() {

        if (this.permissionCustomerForm)
            this.permissionCustomerForm.style.display = "none";
    }
    show() {
        this.permissionCustomerForm.style.display = "unset";
    }

   

    set saveURL(url) {
        this._saveURL = url;
    }

    get saveURL() {
        return this._saveURL;
    }
    set updateURL(url) {
        this._updateURL = url;
    }

    get updateURL() {
        return this._updateURL;
    }

    set rejectURL(url) {
        this._rejectURL = url;
    }

    get rejectURL() {
        return this._rejectURL;
    }

    set checkStatuseURL(url) {
        this._checkStatusURL = url;
    }

    get checkStatuseURL() {
        return this._checkStatusURL;
    }


    updateData() {

        var that = this;

        //if (this.validateRegisterData() === false) {
        //    return false;
        //}
       
        var datatosend = {
            "Id": this._customerId,
            "EventId": this._eventId
        };
        console.log(datatosend);
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        Common.showLoader();
        $.ajax({
            url: web.webapiUrl + that.updateURL,
            data: datatosend,
            headers: headers,
            dataType: "JSON",
            type: "POST",
            success: function (d, st) {
                //console.log(d);               
                Common.hideLoader();
                if (d.status === 0) {
                    Common.showSuccessMessage("Customer details are approved successfully.", "Customer", null);
                    if (that.onVerifyCompleted) {
                        that.onVerifyCompleted();
                    }
                }
                else {
                    Common.showErrorMessageFocus(d.statusText, "Customer", null);

                }
            },
            error: function (xhr, st, eth) {
                //console.log(xhr);
                Common.hideLoader();
            }
        });
    }

    rejectData() {

        var that = this;

        //if (this.validateRegisterData() === false) {
        //    return false;
        //}

        var datatosend = {
            "Id": this._customerId,
            "EventId": this._eventId
        };
        console.log(datatosend);
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        Common.showLoader();
        $.ajax({
            url: web.webapiUrl + that.rejectURL,
            data: datatosend,
            headers: headers,
            dataType: "JSON",
            type: "POST",
            success: function (d, st) {
                //console.log(d);               
                Common.hideLoader();
                if (d.status === 0) {
                    Common.showSuccessMessage("Customer details are rejected successfully.", "Customer", null);
                    if (that.onVerifyCompleted) {
                        that.onVerifyCompleted();
                    }
                }
                else {
                    Common.showErrorMessageFocus(d.statusText, "Customer", null);

                }
            },
            error: function (xhr, st, eth) {
                //console.log(xhr);
                Common.hideLoader();
            }
        });
    }
    checkStatusData() {

        var that = this;

        //if (this.validateRegisterData() === false) {
        //    return false;
        //}
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
        var datatosend = {
            "CustomerId": this._customerId,
            "EventId": this._eventId,
        };
        console.log(datatosend);

        Common.showLoader();
        $.ajax({
            url: web.webapiUrl + that.checkStatusURL,
            data: datatosend,
            headers: headers,
            dataType: "JSON",
            type: "POST",
            success: function (d, st) {
                //console.log(d);               
                Common.hideLoader();
                if (d.status === 0) {
                    $("#app").show();
                    $("#evd").show();
                    $("#res").show();

                    $("#evd-approved").show();
                    $("#evd-pre").show();
                    $("#evd-rejected").show();
                    $("#verify-application").show();
                    $("#reject-application").show();
                    $("#check-status").hide();
                    that._departmentValue = d.data;
                    that._appDepatmentValue = d.appcustomerStatus;
                    that._rejDepatmentValue = d.rejcustomerStatus;
                    $(that._departmentValue).each(function () {

                        $('#event-dept')

                            .append(` <label for="${this.Department}"> &nbsp; ${this.DepartmentName} &nbsp; </label></div><br /><br /><br />`)

                    });

                    $(that._appDepatmentValue).each(function () {

                       

                        //.append(` <label for="${this.Department}"> &nbsp; ${this.DepartmentName} &nbsp; </label></div> `)
                        if (this.Flag == 1) {
                            $('#event-appr')
                                .append(` <label for="${this.Department}"> &nbsp; <i class='fa fa-check' style='color:green'></i> &nbsp; </label></div> <br /><br /><br /> `)
                            $('#event-pre')
                                .append(` <label for="${this.Department}"> </label></div> <button id='preview-noc' class="btn bg-success" style="color:white;margin-bottom:9px;" onclick='nocData(${this.DepartmentId});'>Preview Noc Copy</button><br /><br /> `)
                        } else {
                            $('#event-appr')
                                .append(` <label for="${this.Department}"> &nbsp; <i class='fa fa-close' style='color:red'></i> &nbsp; </label></div><br /><br /><br /> `)
                            $('#event-pre')
                                .append(` <label for="${this.Department}"> </label></div> <button id='preview-noc' class="btn bg-info" style="color:white;margin-bottom:9px;" >Waiting for Image</button><br /><br /> `)
                        }
                
                    });

                    $(that._rejDepatmentValue).each(function () {

                        $('#event-reje')

                            .append(` <label for="${this.Department}"> &nbsp; ${this.DepartmentName} &nbsp; </label></div> `)

                    });

                    //Common.showSuccessMessage("Customer details are verified successfully.", "Customer", null);
                    //if (that.onVerifyCompleted) {
                    //    that.onVerifyCompleted();
                    //}
                }
                else {
                    Common.showErrorMessageFocus(d.statusText, "Customer", null);

                }
            },
            error: function (xhr, st, eth) {
                //console.log(xhr);
                Common.hideLoader();
            }
        });
    }


    //nocData() {
    //    $("noc").show();
    //    var that = this;

    //    //if (this.validateRegisterData() === false) {
    //    //    return false;
    //    //}
    //    var headers = {};
    //    if (token) {
    //        headers.Authorization = 'Bearer ' + token;
    //    }
    //    var datatosend = {
    //        "CustomerId": this._customerId,  
    //        "EventId": "0"
    //    };
    //    console.log(datatosend);

    //    Common.showLoader();
    //    $.ajax({
    //        url: web.webapiUrl + that.checkStatusURL,
    //        data: datatosend,
    //        headers: headers,
    //        dataType: "JSON",
    //        type: "POST",
    //        success: function (d, st) {
    //            //console.log(d);               
    //            Common.hideLoader();
    //            if (d.status === 0) {
                  
    //                that._appDepatmentValue = d.appcustomerStatus;
                   

    //                $(that._appDepatmentValue).each(function () {

    //                    this._fileName4 = this.NocCopy;

    //                    $("#noc-img").attr("src", web.webapiUrl + "UploadedFiles/" + this.NocCopy);

    //                });

                  
    //            }
    //            else {
    //                Common.showErrorMessageFocus(d.statusText, "Customer", null);

    //            }
    //        },
    //        error: function (xhr, st, eth) {
    //            //console.log(xhr);
    //            Common.hideLoader();
    //        }
    //    });
    //}

    populateData(jsondata) {

        var that = this;
       
        if (jsondata !== null) {
            console.log(jsondata);
            this._customerId = jsondata.Id;
            custId = jsondata.Id;
            this._eventId = jsondata.EventId;
            this.customerName.innerHTML = jsondata.Name;
            this.eventName.innerHTML = jsondata.EventName;
            this.eventDesc.innerHTML = jsondata.EventDetails;
          
        } else {
            
            
        }


    }


}

function nocData(id) {
    $("#noc").show();
    var that = this;
    deptId = id;
    //if (this.validateRegisterData() === false) {
    //    return false;
    //}
    var headers = {};
    if (token) {
        headers.Authorization = 'Bearer ' + token;
    }
    var datatosend = {
        "CustomerId": custId,
        "DepartmentId": deptId,
        "EventId": "0"
    };
    console.log(datatosend);

    Common.showLoader();
    $.ajax({
        url: web.webapiUrl + 'ApiCustomer/CheckImageStatus',
        data: datatosend,
        headers: headers,
        dataType: "JSON",
        type: "POST",
        success: function (d, st) {
            //console.log(d);               
            Common.hideLoader();
            if (d.status === 0) {

                that._appDepatmentValue = d.appcustomerStatus;


                $(that._appDepatmentValue).each(function () {

                    this._fileName4 = this.NocCopy;

                    $("#noc-img").attr("src", web.webapiUrl + "UploadedFiles/" + this.NocCopy);

                });


            }
            else {
                Common.showErrorMessageFocus(d.statusText, "Customer", null);

            }
        },
        error: function (xhr, st, eth) {
            //console.log(xhr);
            Common.hideLoader();
        }
    });
}

function onExportClick() {

    var element = document.getElementById('divToExport');

    var opt = {

        //filename: 'myfile.pdf',
        margin: 16,
        filename: "Noc" + ".pdf",
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', precision: '2' }
    };
    html2pdf().set(opt).from(element).save().then(rec => {
        //console.log(rec);

    });

}