var token = localStorage.getItem('token');
var login = localStorage.getItem('username');
var dept = localStorage.getItem('departmentId');
class PBVerifyCustomerFormComponent extends PBCompnent {
    constructor(compID) {
        super(compID);
        this.onVerifyCompleted = null;
        this.onCancelled = null;        
        this.init();
    }

    init() {
        
        var that = this;
      
       

        this._saveURL = "";       
        this._idValue = ""
        this._nameValue = "";
        this._mobileNoValue = "";
        this._emailIdValue = "";
        this._organizationValue = "";
        this._governmentIdValue = "";
        this._eventId = "";
        this._fromDateValue = "";
        this._toDateValue = "";
        this._fileName5 = "";
      //  this._locationValue = "";
        this._eventDetailsValue = "";
        this._eventNameValue = "";
        this._flagValue = "";

        this._idProofValue = "";
        this._previewProfilePhotoValue = "";
        this._fileName = "";
        this._departmentId = "";
        this._customerId = "";
        this._customerEmail = "";
        this._applicationStatus = "";
        this._comments = "";
        
        this._verifiedBy = "";

        if (this.verifyCustomer) {
            that = this;
            this.verifyCustomer.addEventListener("click", function () {
               
                that.updateData();

            });
            //console.log("save User create and added click listener");
        }

        if (this.rejectedCustomer) {
            that = this;
            this.rejectedCustomer.addEventListener("click", function () {
                
                
                that.rejectData();

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


        if (this.name) {
            this.name.addEventListener("blur", function () {
               
                that.validateName();
            });
        }
        if (this.mobileNo) {
            this.mobileNo.addEventListener("blur", function () {
                that.validateMobileNo();
            });
        }
        if (this.organization) {
            this.organization.addEventListener("blur", function () {
                that._organizationValue = that.organization.value;
                
            });
        }
        if (this.emailId) {
            this.emailId.addEventListener("blur", function () {
                that.validateEmailId();
            });
        }
        if (this.governmentId) {
            this.governmentId.addEventListener("blur", function () {
                that._governmentIdValue = that.governmentId.value;                
            });
        }
        if (this.idProof) {
            this.idProof.addEventListener("blur", function () {
                that._idProofValue = that.idProof.value;
            });
        }
        if (this.fromDate) {
            this.fromDate.addEventListener("blur", function () {
                that._fromDateValue = that.fromDate.value;
            });
        }
        if (this.toDate) {
            this.toDate.addEventListener("blur", function () {
                that._toDateValue = that.toDate.value;
            });
        }
        //if (this.location) {
        //    this.location.addEventListener("blur", function () {
        //        that._locationValue = that.location.value;
        //    });
        //}
        if (this.eventDetails) {
            this.eventDetails.addEventListener("blur", function () {
                that._eventDetailsValue = that.eventDetails.value;
            });
        }        
        if (this.flag) {
            that = this;
            this.flag.addEventListener("click", function () {
                if ($(that.flag).is(':checked'))
                    that._flagValue = 1;
                else
                    that._flagValue = 0;

                         
            });
        }


     
       
    }


    hide() {

        if (this.verifyCustomerForm)
            this.verifyCustomerForm.style.display = "none";
    }
    show() {
        this.verifyCustomerForm.style.display = "unset";
    }

    validateName() {
        //console.log("validateFullName");
        var errorString = "";

        var s = this.name.value;
        s = s.trim().removeInvalidCharacters("`~!#$%^&*()_+={}[]\\|\"':;<>,?/");

        this._nameValue = s;
        this.name.value = s;
        
    }

    validateMobileNo() {
        //console.log("validateFullName");
        var errorString = "";

        var s = this.mobileNo.value;
        s = s.trim().removeInvalidCharacters("`~!#$%^&*()_+={}[]\\|\"':;<>,?/");
        s = s.trim().allowValidCharacters("1234567890");
        this._mobileNoValue = s;
        this.mobileNo.value = s;
        
    }
    validateEmailId() {
        var errorString = "";

        var s = this.emailId.value;
        s = s.trim().removeInvalidCharacters("`~!#$%^&*()_+={}[]\\|\"':;<>,?/");

        this._emailIdValue = s;
        this.emailId.value = s;
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


    selectProfilePhoto() {
        //alert("selected photo");
        console.log("Selected photo");
        $("#profile_photo").trigger("click");
        return false;
    }

    fileSelectionChanged() {
        var that = this;
        //alert("File change");
        console.log("file change");
        var fi = document.getElementById('noc_photo');
        // Check if any file is selected.
        if (fi.files.length > 0) {
            var fsize = fi.files.item(0).size;
            var file = Math.round((fsize / 1024));
            // The size of the file.
            if (file > 1024) {
                Common.showErrorMessageFocus("Noc photo file is too big. Please select a file less than or equal to 1 MB in disk size and 128x128 pixels size!", "Profile photo", null);
                return;
            }
        }

        $("#preview-photo").attr("oldfile", $("#preview-photo").attr("uploadedfile"));

        $("#preview-photo").attr("uploadedfile", "");
        //alert("console");
        console.log($("#preview-photo").attr("uploadedfile", ""));
        var fileUpload = $("#noc_photo").get(0);
        var files = fileUpload.files;

        // Create FormData object  
        var fileData = new FormData();

        fileData.append(files[0].name, files[0]);

        // Adding one more key to FormData object  
        fileData.append('filetype', '1');
        fileData.append("oldfile", $("#preview-photo").attr("oldfile"));

        $("#noc_photo").prop("disabled", true);

        $.ajax({
            url: web.webapiUrl + 'Home/UploadFile',
            type: "POST",
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data  
            data: fileData,
            success: function (d, st) {

                that._fileName5 = d.data;



                if (d.data === "")
                    Common.showErrorMessageFocus("No file uploaded!", "Basic profile", null);
                else if (d.data.toLowerCase().indexOf("error") >= 0)
                    Common.showErrorMessageFocus("Error", "Basic profile", null);
                else {

                    $("#preview-photo").attr("src", web.webapiUrl + "UploadedFiles/" + d.data);

                }


                $("#noc_photo").prop("disabled", false);


            },
            error: function (err) {
                Common.showErrorMessageFocus(err.statusText, "Basic profile", null);
                $("#noc_photo").prop("disabled", false);
            }
        });
    }

  


    validateRegisterData() {
        
        var that = this;
        var s, errorString = "";

        s = that.reason.value;


        if (s.length < 3) {
            errorString = "Reason should be atleast minimum 3 characters.";
            Common.showErrorMessage(errorString, "Customer", document.getElementById('reason').focus());
            return false;
        } else if (s.length > 100) {
            errorString = "Reason should not exceed 100 characters.";
            Common.showErrorMessage(errorString, "Customer", document.getElementById('reason').focus());
            return false;
        }

       

        return true;
    }

    datechecker() {
        console.log(this._fromDateValue);
        console.log(this._toDateValue);
        var date1, date2;
        //define two date object variables with dates inside it  
        date1 = new Date(this._fromDateValue);
        date2 = new Date(this._toDateValue);

        //calculate time difference  
        var time_difference = date2.getTime() - date1.getTime();

        //calculate days difference by dividing total milliseconds in a day  
        var days_difference = time_difference / (1000 * 60 * 60 * 24);

        this.totalDays.innerHTML = days_difference;
        console.log("Number of days between dates <br>" +
            date1 + " and <br>" + date2 + " are: <br>"
            + days_difference + " days");  
          
    }

    validateVerifyData() {

        var that = this;
        var s, errorString = "";

        s = that.comments.value;


        if (s.length < 3) {
            errorString = "Comment should be atleast minimum 3 characters.";
            Common.showErrorMessage(errorString, "Customer", document.getElementById('comments').focus());
            return false;
        } else if (s.length > 100) {
            errorString = "Comment should not exceed 100 characters.";
            Common.showErrorMessage(errorString, "Customer", document.getElementById('comments').focus());
            return false;
        }
        if (this._fileName5 == "") {
            errorString = "Upload Noc Image.";
            Common.showErrorMessage(errorString, "Customer", document.getElementById('noc_photo').focus());
            return false;
        }


        return true;
    }

    updateData() {

        var that = this;

        if (this.validateVerifyData() === false) {
            return false;
        }
        //if (this.validateRegisterData() === false) {
        //    return false;
        //}
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        var comments = $("#comments").val();
        var datatosend = {
            "Id": this._idValue,
            "DepartmentId": dept,
            "CustomerId": this._customerId,
            "CustomerEmail": this._customerEmail,
            "EventId": this._eventId,
            "VerifiedBy": login,
            "Flag": "1",
            "Comments": comments,
            "NocCopy": this._fileName5,
        };
        console.log(datatosend);
        
        Common.showLoader();
        $.ajax({
            url: web.webapiUrl + that.updateURL,
            headers: headers,
            data: datatosend,
            dataType: "JSON",
            type: "POST",
            success: function (d, st) {
                //console.log(d);               
                Common.hideLoader();
                if (d.status === 0) {
                    Common.showSuccessMessage("Customer details are verified successfully.", "Customer", null);
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


        if (this.validateRegisterData() === false) {
            return false;
        }
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
        var reason = $("#reason").val();
        var datatosend = {
            "Id": this._idValue,
            "DepartmentId": dept,
            "CustomerId": this._customerId,
            "CustomerEmail": this._customerEmail,
            "EventId": this._eventId,
            "VerifiedBy": login,
            "Reason": reason,
            "Flag": "2"
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
                    Common.showSuccessMessage("Customer details are verified successfully.", "Customer", null);
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
    populateData(jsondata) {

        var that = this;
       
        if (jsondata !== null) {
            console.log(jsondata);

            this._departmentId = dept;
            this._customerId = jsondata.Id;
            this._customerEmail = jsondata.EmailId;            
            this._verifiedBy = login;
         
            this._idValue = jsondata.Id;
            this._nameValue = jsondata.Name;
            this._mobileNoValue = jsondata.MobileNo;
            this._emailIdValue = jsondata.EmailId;            
            this._governmentIdValue = jsondata.GovernmentId;
            this._locationValue = jsondata.Place;
            this._organizationValue = jsondata.Organization;
            this._fromDateValue = moment(jsondata.FromDate).format("YYYY-MM-DD");
            this._toDateValue = moment(jsondata.ToDate).format("YYYY-MM-DD");
            this._eventDetailsValue = jsondata.EventDetails;
            this._idProofValue = jsondata.IdProof;
            this._flagValue = jsondata.Status;
            this._eventNameValue = jsondata.EventName;

            this.name.innerHTML = jsondata.Name;
            this.organization.innerHTML = jsondata.Organization;
            this.mobileNo.innerHTML = jsondata.MobileNo;
            this.emailId.innerHTML = jsondata.EmailId;
            this.organizationUrl.innerHTML = jsondata.OrganizationUrl;
            this.governmentId.innerHTML = jsondata.GovernmentId;
            this.fromDate.innerHTML = moment(jsondata.FromDate).format("DD-MM-YYYY");
            this.toDate.innerHTML = moment(jsondata.ToDate).format("DD-MM-YYYY");
            this.location.innerHTML = jsondata.Place;
            this.eventDetails.innerHTML = jsondata.EventName;
            this.eventName.innerHTML = jsondata.EventName;
            this._fileName = jsondata.IdProof;
            this.CreatedAt = moment(this.CreatedAt).format("DD-MM-YYYY HH:mm:ss");
            this.created.innerHTML = this.CreatedAt;
            this.address.innerHTML = jsondata.Address;
            this.organization.innerHTML = jsondata.Organization;
            this.organizationPosition.innerHTML = jsondata.OrganizationPosition;
            this.noPeople.innerHTML = jsondata.NoPeople;
            this.eventTicket.innerHTML = jsondata.EventTicket;
            this.eventCharity.innerHTML = jsondata.EventCharity;
            this.eventCharityDetails.innerHTML = jsondata.TicketDetails;
            this.enteranceFee.innerHTML = jsondata.EnteranceFee;
            this.liquorLicence.innerHTML = jsondata.LiquorLicence;
            this.liquorDetails.innerHTML = jsondata.LiquorDetails;
            this.entertainment.innerHTML = jsondata.Entertainment;
            this.food.innerHTML = jsondata.Food;
            this.foodDetails.innerHTML = jsondata.FoodDetails;
            this.bins.innerHTML = jsondata.Bins;
            this.barriers.innerHTML = jsondata.Barriers;
            this.barrierDetails.innerHTML = jsondata.BarrierDetails;
            this.risk.innerHTML = jsondata.Risk;
            this.toilets.innerHTML = jsondata.Toilets;
            this.toiletDetails.innerHTML = jsondata.ToiletDetails;
            this.liveBands.innerHTML = jsondata.LiveBands;
            this.rides.innerHTML = jsondata.Rides;
            this.stalls.innerHTML = jsondata.Stalls;
            this.staging.innerHTML = jsondata.Staging;
            this.healthSafety.innerHTML = jsondata.HealthSafety;
            this.route.innerHTML = jsondata.Route;
            this.guidelines.innerHTML = jsondata.Guidelines;
            this.organizationPosition.innerHTML = jsondata.OrganizationPosition;
            this.additionalDetails.innerHTML = jsondata.AdditionalDetails;
            this.parking.innerHTML = jsondata.ParkingArea;
            this._fileName2 = jsondata.AuthorisedSignature;
            this._fileName3 = jsondata.EventPlan;
            this._fileName4 = jsondata.CoverLetter;
            this._eventId = jsondata.EventId;
            this.empty.innerHTML = "  -  ";
           
            $("#preview-photo").attr("src", web.webapiUrl + "UploadedFiles/" + this._fileName);
            $("#signature-photo").attr("src", web.webapiUrl + "UploadedFiles/" + this._fileName2);
            $("#event-photo").attr("src", web.webapiUrl + "UploadedFiles/" + this._fileName3);
            $("#cover-letter").attr("src", web.webapiUrl + "UploadedFiles/" + this._fileName4);
          
            this.datechecker();

         
           
        } else {
            
            this.name.value = "";
            this.organization.value = "";
            this.mobileNo.value = "";
            this.emailId.value = "";
            this.governmentId.value = "";
            this.fromDate.value = "";
            this.toDate.value = "";
            //this.location.value = "";
            this.eventDetails.value = "";
            this.previewPhoto.value = "";
            this.eventName.value = "";
            this.comments.value = "";
            
        }


    }


}

function onExportClick() {

    var element = document.getElementById('divToExport');

    var opt = {
       
        //filename: 'myfile.pdf',
        
        filename: "Application" + moment().format("DD-MM-YYYY") + ".pdf",
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', precision: '2' }
    };
    html2pdf().set(opt).from(element).save().then(rec => {
        //console.log(rec);

    });

}

function makePDF() {

    var quotes = document.getElementById('divToExport');

    html2canvas(quotes, {
        onrendered: function (canvas) {

            //! MAKE YOUR PDF
            var pdf = new jsPDF('p', 'pt', 'a4');

            for (var i = 0; i <= quotes.clientHeight / 980; i++) {
                //! This is all just html2canvas stuff
                var srcImg = canvas;
                var sX = 0;
                var sY = 980 * i; // start 980 pixels down for every new page
                var sWidth = 900;
                var sHeight = 980;
                var dX = 0;
                var dY = 0;
                var dWidth = 900;
                var dHeight = 980;

                window.onePageCanvas = document.createElement("canvas");
                onePageCanvas.setAttribute('width', 900);
                onePageCanvas.setAttribute('height', 980);
                var ctx = onePageCanvas.getContext('2d');
                // details on this usage of this function: 
                // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
                ctx.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

                // document.body.appendChild(canvas);
                var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

                var width = onePageCanvas.width;
                var height = onePageCanvas.clientHeight;

                //! If we're on anything other than the first page,
                // add another page
                if (i > 0) {
                    pdf.addPage(612, 791); //8.5" x 11" in pts (in*72)
                }
                //! now we declare that we're working on that page
                pdf.setPage(i + 1);
                //! now we add content to that page!
                //pdf.addImage(canvasDataURL, 'PNG', 20, 40, (width * .62), (height * .62));
                pdf.addImage(canvasDataURL, 'PDF', 20, 40, (width * .62), (height * .62));

            }
            //! after the for loop is finished running, we save the pdf.
            pdf.save('test.pdf');
        }
    });
}

function samplePdf() {
    var doc = new jsPDF();
    var specialElementHandlers = {
        '#ignorePDF': function (element, renderer) {
            return true;
        }
    };
    var source = document.getElementById('divToExport');
    //doc.fromHTML(
    //    source,
    //    15,
    //    15,
    //    {
    //        'width': 180, 'elementHandlers': elementHandler
    //    });

    //doc.output("dataurlnewwindow");
    doc.fromHTML(source, 0, 0, {
        'width': 100, // max width of content on PDF
        'elementHandlers': specialElementHandlers
    },
        function (bla) { doc.save('saveInCallback.pdf'); },
        margin);
}

