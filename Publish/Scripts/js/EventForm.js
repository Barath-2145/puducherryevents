var token = localStorage.getItem('token');
var login = localStorage.getItem('username');
class PBEventFormComponent extends PBCompnent {
    constructor(compID) {
        super(compID);
        this.onSaveCompleted = null;
        this.onCancelled = null;        
        this.init();
    }

    init() {
        
        var that = this;
        if (this.saveEventButton) {           
             that = this;
            this.saveEventButton.addEventListener("click", function () {
                that.postData();
            });
            //console.log("save User create and added click listener");
        }
        if (this.cancelEventButton) {
            that = this;
            this.cancelEventButton.addEventListener("click", function () {
                if (that.onCancelled) {
                    that.hide();
                    that.onCancelled();
                }
            });
            //console.log("cancel User create and added click listener");
        }
        if (this.updateEventButton) {
            that = this;
            this.updateEventButton.addEventListener("click", function () {
                that.updateData();

            });
            //console.log("edit Vehicle and added click listener");
        }

        this._saveURL = "";       
        this._idValue = "";
        this._placeURL = "";
        this._eventNameValue = "";
        this._descriptionValue = "";        
        this._flagValue = "";
        this._placeValue = "";
        this._previewProfilePhotoValue = "";
        this._fileName = "";


        //if (this.place) {
        //    this.place.addEventListener("blur", function () {
               
        //        that.validatePlace();
        //    });
        //}

        if (this.eventName) {
            this.eventName.addEventListener("blur", function () {
                that.validateName();
            });
        }
        if (this.description) {
            this.description.addEventListener("blur", function () {
                that._descriptionValue = that.description.value;
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


        if (this.container) {
            that = this;
            var placevalue = "";
            $(this.container).on('click', function () {

                //console.log(that._pumpNozzleValue);
                var values = "";
                $("input[class=place]:checked").each(function (i) {
                    //alert($(this).val());


                    var checked = $(this).val();
                    if (checked !== "" && values !== "")
                        values += "," + $(this).val();
                    else if (checked !== "" && values === "")
                        values += $(this).val();
                    else
                        values += $(this).val();
                    placevalue = values;
                    //this._placeValue = values;
                   
                });
                //alert(placevalue);
                that._placeValue = placevalue;
            });
            
        }

       
                
    }


    hide() {

        if (this.eventForm)
            this.eventForm.style.display = "none";
    }
    show() {
        this.eventForm.style.display = "unset";
    }

   
    validateName() {
        //console.log("validateFullName");
        var errorString = "";

        var s = this.eventName.value;
        s = s.trim().removeInvalidCharacters("`~!#$%^&*()_+={}[]\\|\"':;<>,?/");

        this._eventNameValue = s;
        this.eventName.value = s;

    }

    set saveURL(url) {
        this._saveURL = url;
    }

    get saveURL() {
        return this._saveURL;
    }

    set placeURL(url) {

        this._placeURL = url;
        this.getPlaceData();
        //this.onStateCompleted();
    }

    get placeURL() {

        return this._placeURL;
    }

    selectProfilePhoto() {
        //alert("selected photo");
        console.log("Selected photo");
        $("#profile_photo").trigger("click");
        return false;
    }

    fileSelectionChanged() {
        $("#prv").show();
        var that = this;
        //alert("File change");
        console.log("file change");
        var fi = document.getElementById('profile_photo');
        // Check if any file is selected.
        if (fi.files.length > 0) {
            var fsize = fi.files.item(0).size;
            var file = Math.round((fsize / 1024));
            // The size of the file.
            if (file > 1024) {
                Common.showErrorMessageFocus("Profile photo file is too big. Please select a file less than or equal to 1 MB in disk size and 128x128 pixels size!", "Profile photo", null);
                return;
            }
        }

        $("#preview-photo").attr("oldfile", $("#preview-photo").attr("uploadedfile"));

        $("#preview-photo").attr("uploadedfile", "");
        //alert("console");
        console.log($("#preview-photo").attr("uploadedfile", ""));
        var fileUpload = $("#profile_photo").get(0);
        var files = fileUpload.files;

        // Create FormData object  
        var fileData = new FormData();

        fileData.append(files[0].name, files[0]);

        // Adding one more key to FormData object  
        fileData.append('filetype', '1');
        fileData.append("oldfile", $("#preview-photo").attr("oldfile"));

        $("#profile_photo").prop("disabled", true);

        $.ajax({
            url: web.webapiUrl + 'Home/UploadFile',
            type: "POST",
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data  
            data: fileData,
            success: function (d, st) {

                that._fileName = d.data;



                if (d.data === "")
                    Common.showErrorMessageFocus("No file uploaded!", "Basic profile", null);
                else if (d.data.toLowerCase().indexOf("error") >= 0)
                    Common.showErrorMessageFocus("Error", "Basic profile", null);
                else {

                    $("#preview-photo").attr("src", web.webapiUrl + "UploadedFiles/" + d.data);

                }


                $("#profile_photo").prop("disabled", false);


            },
            error: function (err) {
                Common.showErrorMessageFocus(err.statusText, "Basic profile", null);
                $("#profile_photo").prop("disabled", false);
            }
        });
    }



    validateRegisterData() {
      
        var that = this;
        var s, errorString = "";

        s = that.eventName.value;


        if (s.length < 3) {
            errorString = "Event Name should be atleast minimum 3 characters.";
            Common.showErrorMessageFocus(errorString, "Event List", $(this.place));
            return false;
        } else if (s.length > 100) {
            errorString = "Place should not exceed 100 characters.";
            Common.showErrorMessageFocus(errorString, "Event List", $(this.place));
            return false;
        }

        //s = that.place.value;


        //if (s.length == "") {
        //    errorString = "Place should not be empty.";
        //    Common.showErrorMessageFocus(errorString, "Event List", $(this.eventName));
        //    return false;
        //}

        s = this.description.value;


        if (s.length < 50) {
            errorString = "Description should be atleast minimum 50 characters.";
            Common.showErrorMessageFocus(errorString, "Event Place", $(this.description));
            return false;
        }      
      
        return true;
    }


    postData() {

        var that = this;
        //alert(this._placeValue);
        //return;

        if (this.validateRegisterData() === false) {
            return false;
        }
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
        var loginName = $("#login-name").val();


        //var places = [];

        ////console.log(that._pumpNozzleValue);
        //var plc = that._placeValue.split(',');


        //for (var i = 0; i < plc.length; i++) {
        //    var rec = plc[i];
        //    var eventplace = rec;
        //    var evnt = eventplace;

        //    places.push({ Place: evnt, EventName: that._eventNameValue });

        //}

        //console.log(places);
        //return;
        var datatosend = {
            "EventName": this._eventNameValue,
            "EventDescription": this._descriptionValue,
            "EventImage": this._fileName,
            //"Details": places,
            "Place": this._placeValue,
            "CreatedBy": login,
            
        };
        
        //console.log(datatosend, "-----------------------------");
        //console.log(that.saveURL, "-----------------------------");
        Common.showLoader();
        $.ajax({
            url: web.webapiUrl + that.saveURL,
            data: datatosend,
            headers: headers,
            dataType: "JSON",
            type: "POST",
            success: function (d, st) {
                ////console.log(d);               
                Common.hideLoader();
                if (d.status === 0) {
                    Common.showSuccessMessage("Event List Details saved successfully.", "Event List", null);
                    if (that.onSaveCompleted) {
                        that.onSaveCompleted();
                    }
                }
                else {
                    Common.showErrorMessageFocus(d.statusText, "Event List", null);

                }
            },
            error: function (xhr, st, eth) {
                //console.log(xhr);
                Common.hideLoader();
            }
        });
    }

    getPlaceData() {

        var that = this;
        console.log(that.nameURL, "---------------------getnamedata");
        // Common.showLoader();
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
        $.ajax({
            url: web.webapiUrl + that.placeURL,
            headers: headers,
            dataType: "JSON",
            type: "POST",
            success: function (d, st) {
                //console.log(d);
                //  Common.hideLoader();
                if (d.status === 0) {
                    //console.log(d.data);



                    var ctl = $(that.place);                  //ctl.html("");
                    console.log(ctl);
                    $(d.data).each(function () {
                        ctl.append("<option value='" + this.Id + "'>" + this.Place + "</option>");
                    });


                    var list = d.data;
                    $(d.data).each(function () {

                        $('#container')
                            .append(`<input type="checkbox" class="place"  name="interest" value="${this.Place}">`)
                            .append(` <label class="check" for="${this.Place}"> &nbsp; ${this.Place} </label></div> `)

                        //var a = ("#checkboxPump_$" + this.NozzleNo);

                        //var b = $("#checkboxPump_" + this.NozzleNo).val();




                    });



                }
                else {
                    Common.showErrorMessageFocus(d.statusText, "Event List", null);

                }
            },
            error: function (xhr, st, eth) {
                //console.log(xhr);
                Common.hideLoader();
            }
        });
    }

    updateData() {

        var that = this;
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
        if (this.validateRegisterData() === false) {
            return false;
        }

        var loginName = $("#login-name").val();

        //var places = [];

        ////console.log(that._pumpNozzleValue);
        //var plc = that._placeValue.split(',');


        //for (var i = 0; i < plc.length; i++) {
        //    var rec = plc[i];
        //    var eventplace = rec;
        //    var evnt = eventplace;

        //    places.push({ Place: evnt, EventName: that._eventNameValue });

        //}

        var datatosend = {
            "Id": this._idValue,
            "EventName": this._eventNameValue,
            "EventDescription": this._descriptionValue,
            "EventImage": this._fileName,
            "Place": this._placeValue,
            "UpdatedBy": login,

        };

        Common.showLoader();
        $.ajax({
            url: web.webapiUrl + that.updateURL,
            data: datatosend,
            headers: headers,
            dataType: "JSON",
            type: "POST",
            success: function (d, st) {


                Common.hideLoader();
                if (d.status === 0) {
                    Common.showSuccessMessage("Event List details are updated successfully.", "Event List", null);
                    if (that.onUpdateCompleted) {
                        that.onUpdateCompleted();
                    }
                }
                else {
                    Common.showErrorMessageFocus(d.statusText, "Event List", null);

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
            //console.log(jsondata);
         
            this._idValue = jsondata.Id;
            this._eventNameValue = jsondata.EventName;
            this._placeValue = jsondata.Place;
            this._descriptionValue = jsondata.EventDescription;
            this._fileName = jsondata.EventImage;
            this._flagValue = jsondata.Status;
            $("#preview-photo").attr("src", web.webapiUrl + "UploadedFiles/" + this._fileName);


            this.detailsRecords = jsondata.Details;
            this.description.value = this._descriptionValue;
            this.eventName.value = this._eventNameValue;
            
           
        } else {

            //this.place.value = "";
            this.description.value = "";
            this.eventName.value = "";
            //this.image.value = "";
        }


    }


}
