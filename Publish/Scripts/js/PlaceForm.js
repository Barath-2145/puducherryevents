var token = localStorage.getItem('token');
var login = localStorage.getItem('username');
class PBPlaceFormComponent extends PBCompnent {
    constructor(compID) {
        super(compID);
        this.onSaveCompleted = null;
        this.onCancelled = null;        
        this.init();
    }

    init() {
        
        var that = this;
        if (this.savePlaceButton) {           
             that = this;
            this.savePlaceButton.addEventListener("click", function () {
                that.postData();
            });
            //console.log("save User create and added click listener");
        }
        if (this.cancelPlaceButton) {
            that = this;
            this.cancelPlaceButton.addEventListener("click", function () {
                if (that.onCancelled) {
                    that.hide();
                    that.onCancelled();
                }
            });
            //console.log("cancel User create and added click listener");
        }
        if (this.updatePlaceButton) {
            that = this;
            this.updatePlaceButton.addEventListener("click", function () {
                that.updateData();

            });
            //console.log("edit Vehicle and added click listener");
        }

        this._saveURL = "";       
        this._idValue = ""
        this._placeValue = "";
        this._descriptionValue = "";    
        this._capacityValue = "";
        this._flagValue = "";
        //this._imageValue = "";
        this._previewProfilePhotoValue = "";
        this._fileName = "";


        if (this.place) {
            this.place.addEventListener("blur", function () {
               
                that.validatePlace();
            });
        }
        if (this.description) {
            this.description.addEventListener("blur", function () {
                that._descriptionValue = that.description.value;
            });
        }
        if (this.capacity) {
            this.capacity.addEventListener("blur", function () {
                that.validateCapacity();
            });
        }
       
        //if (this.image) {
        //    this.image.addEventListener("blur", function () {
        //        that._imageValue = that.image.value;
        //    });
        //}
       
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

        if (this.placeForm)
            this.placeForm.style.display = "none";
    }
    show() {
        this.placeForm.style.display = "unset";
    }

    validatePlace() {
        //console.log("validateFullName");
        var errorString = "";

        var s = this.place.value;
        s = s.trim().removeInvalidCharacters("`~!#$%^&*()_+={}[]\\|\"':;<>,?/");

        this._placeValue = s;
        this.place.value = s;

    }

    validateCapacity() {
        //console.log("validateFullName");
        var errorString = "";

        var s = this.capacity.value;
        s = s.trim().removeInvalidCharacters("`~!#$%^&*()_+={}[]\\|\"':;<>,?/");
        s = s.trim().allowValidCharacters("1234567890");
        this._capacityValue = s;
        this.capacity.value = s;

    }

    set saveURL(url) {
        this._saveURL = url;
    }

    get saveURL() {
        return this._saveURL;
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

        s = that.place.value;


        if (s.length < 3) {
            errorString = "Place should be atleast minimum 3 characters.";
            Common.showErrorMessageFocus(errorString, "Event Place", $(this.place));
            return false;
        } else if (s.length > 100) {
            errorString = "Place should not exceed 100 characters.";
            Common.showErrorMessageFocus(errorString, "Event Place", $(this.place));
            return false;
        }


        s = this.description.value;


        if (s.length < 50) {
            errorString = "Description should be atleast minimum 50 characters.";
            Common.showErrorMessageFocus(errorString, "Event Place", $(this.description));
            return false;
        }      

        s = this.capacity.value;


        if (s.length < 2) {
            errorString = "Capactiy should be atleast minimum 2 characters.";
            Common.showErrorMessageFocus(errorString, "Event Place", $(this.capacity));
            return false;
        }      

        return true;
    }


    postData() {

        var that = this;

        if (this.validateRegisterData() === false) {
            return false;
        }
    

        var datatosend = {
            "Place": this._placeValue,
            "Description": this._descriptionValue,
            "Image": this._fileName,
            "CreatedBy": login,
            "Capacity": this._capacityValue,
            
        };
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

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
                    Common.showSuccessMessage("Event Place Details saved successfully.", "Place", null);
                    if (that.onSaveCompleted) {
                        that.onSaveCompleted();
                    }
                }
                else {
                    Common.showErrorMessageFocus(d.statusText, "Place", null);

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

        if (this.validateRegisterData() === false) {
            return false;
        }

        var loginName = $("#login-name").val();
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
        var datatosend = {
            "Id": this._idValue,
            "Place": this._placeValue,
            "Description": this._descriptionValue,
            "Image": this._fileName,
            "UpdatedBy": login,
            "Capacity": this._capacityValue,
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
                    Common.showSuccessMessage("Event Place details are updated successfully.", "Place", null);
                    if (that.onUpdateCompleted) {
                        that.onUpdateCompleted();
                    }
                }
                else {
                    Common.showErrorMessageFocus(d.statusText, "Place", null);

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
            this._placeValue = jsondata.Place;
            this._capacityValue = jsondata.Capacity;
            this._descriptionValue = jsondata.Description;
            this._fileName = jsondata.Image;
            this._flagValue = jsondata.Status;
            $("#preview-photo").attr("src", web.webapiUrl + "UploadedFiles/" + this._fileName);


            this.place.value = this._placeValue;
            this.description.value = this._descriptionValue;
             
           
        } else {

            this.place.value = "";
            this.description.value = "";
            //this.image.value = "";
        }


    }


}
