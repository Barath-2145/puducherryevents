var token = localStorage.getItem('token');
var username = localStorage.getItem('username');
class PBUserLetterComponent extends PBCompnent {
    constructor(compID) {
        super(compID);
        this.onVerifyCompleted = null;
        this.onCancelled = null;        
        this.init();
    }

    init() {
        
        var that = this;
        this.getData();
    }


    hide() {

        if (this.letterCustomerForm)
            this.letterCustomerForm.style.display = "none";
    }
    show() {
        this.letterCustomerForm.style.display = "unset";
    }

   

    set dataURL(url) {
        this._dataURL = url;
    }

    get dataURL() {
        return this._dataURL;
    }
  

    getData() {

        var that = this;

        //if (this.validateRegisterData() === false) {
        //    return false;
        //}

        var login = $("#login-name").val();
        var datatosend = {
            "Username": username,            
        };
        console.log(datatosend);

        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
        Common.showLoader();
        $.ajax({
            url: web.webapiUrl + 'ApiCustomer/GetLetterDetails',
            data: datatosend,
            headers: headers,
            dataType: "JSON",
            type: "POST",
            success: function (d, st) {
                //console.log(d);               
                Common.hideLoader();
                if (d.status === 0) {
                   
                    that._userValue = d.data;
                    $(that._userValue).each(function () {
                        that._start = moment(this.FromDate).format("DD-MM-YYYY");
                        that._place = this.Place;
                     
                        that._eventName = this.EventName;
                        that._customerId = this.Id;
                        that._eventId = this.EventId;
                        that.customerName.innerHTML = this.Name;
                        that.organization.innerHTML = this.Organization;
                        that.organizationName.innerHTML = this.Organization;
                        this.CreatedAt = moment(this.CreatedAt).format("DD-MM-YYYY");
                        this.UpdatedAt = moment(this.UpdatedAt).format("DD-MM-YYYY");
                        that.createdDate.innerHTML = this.CreatedAt;
                        that.approvedDate.innerHTML = this.UpdatedAt;
                        that.todayDate.innerHTML = moment(this.LetterGeneratedDate).format("DD-MM-YYYY");
                        that.today2Date.innerHTML = moment(this.LetterGeneratedDate).format("DD-MM-YYYY");
                        that.today3Date.innerHTML = moment(this.LetterGeneratedDate).format("DD-MM-YYYY");
                        that.today4Date.innerHTML = moment(this.LetterGeneratedDate).format("DD-MM-YYYY");
                        that.today5Date.innerHTML = moment(this.LetterGeneratedDate).format("DD-MM-YYYY");
                        that.address.innerHTML = this.Address;
                        that.eventPlace.innerHTML = this.Place;
                        that.startDate.innerHTML = moment(this.FromDate).format("DD-MM-YYYY");
                        that.endDate.innerHTML = moment(this.ToDate).format("DD-MM-YYYY");
                        that.eventName.innerHTML = this.EventName;
                        that.eventsName.innerHTML = this.EventName;
                        that.placeName.innerHTML = this.Place;
                        that.organized.innerHTML = this.Organization;
                        that.start.innerHTML = moment(this.FromDate).format("DD-MM-YYYY");
                        that.end.innerHTML = moment(this.ToDate).format("DD-MM-YYYY");

                    });
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
            this.address.innerHTML = jsondata.Address;
            this.eventPlace.innerHTML = this._place;
            this.startDate.innerHTML = this._start;
            this.endDate.innerHTML = moment(jsondata.ToDate).format("DD-MM-YYYY");
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
