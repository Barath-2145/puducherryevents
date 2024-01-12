var token = localStorage.getItem('token');
class PBLetterCustomerFormComponent extends PBCompnent {
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

        if (this.letterCustomerForm)
            this.letterCustomerForm.style.display = "none";
    }
    show() {
        this.letterCustomerForm.style.display = "unset";
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
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
        var datatosend = {
            "CustomerId": this._customerId,            
        };
        console.log(datatosend);


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
                    Common.showSuccessMessage("Customer details are verified successfully.", "Permission Letter", null);
                    if (that.onVerifyCompleted) {
                        that.onVerifyCompleted();
                    }
                }
                else {
                    Common.showErrorMessageFocus(d.statusText, "Permission Letter", null);

                }
            },
            error: function (xhr, st, eth) {
                //console.log(xhr);
                Common.hideLoader();
            }
        });
    }

   
    
    populateData(jsondata) {

        var that = this;
       
        if (jsondata !== null) {
            console.log(jsondata);
            this._start = moment(jsondata.FromDate).format("DD-MM-YYYY");
            this._place = jsondata.Place;
            this._eventName = jsondata.EventName;
            this._customerId = jsondata.Id;
            this._eventId = jsondata.EventId;
            this.customerName.innerHTML = jsondata.Name;
            this.organization.innerHTML = jsondata.Organization;
            this.organizationName.innerHTML = jsondata.Organization;
            this.CreatedAt = moment(this.CreatedAt).format("DD-MM-YYYY");
            this.UpdatedAt = moment(this.UpdatedAt).format("DD-MM-YYYY");
            this.createdDate.innerHTML = this.CreatedAt;
            this.approvedDate.innerHTML = this.UpdatedAt;
            this.todayDate.innerHTML = moment().format("DD-MM-YYYY");
            this.today1Date.innerHTML = moment().format("DD-MM-YYYY");
            this.today2Date.innerHTML = moment().format("DD-MM-YYYY");
            this.today3Date.innerHTML = moment().format("DD-MM-YYYY");
            this.today4Date.innerHTML = moment().format("DD-MM-YYYY");
            this.address.innerHTML = jsondata.Address;
            this.eventPlace.innerHTML = this._place;
            this.startDate.innerHTML = jsondata.StartDate;
            this.endDate.innerHTML = jsondata.EndDate;
            this.eventName.innerHTML = this._eventName;
            this.eventsName.innerHTML = this._eventName;
            this.placeName.innerHTML = this._place;
            this.organized.innerHTML = jsondata.Organization;
            this.start.innerHTML = this._start;
            this.end.innerHTML = moment(jsondata.ToDate).format("DD-MM-YYYY");
          
        } else {
            
            
        }


    }


}

function onExportClick() {

    var element = document.getElementById('divToExport');

    var opt = {

        //filename: 'myfile.pdf',
        margin: 10,
        filename: "Permission Letter" + moment().format("DD-MM-YYYY") + ".pdf",
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', precision: '2' }
    };
    html2pdf().set(opt).from(element).save().then(rec => {
        //console.log(rec);

    });

}
