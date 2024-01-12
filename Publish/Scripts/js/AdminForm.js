var token = localStorage.getItem('token');
class PBAdminFormComponent extends PBCompnent {
    constructor(compID) {
        super(compID);
        this.onSaveCompleted = null;
        this.onCancelled = null;
        this.onUpdateCompleted = null;
        this.init();

    }

    init() {
        //alert("NUUUUUUUUUU");

        if (this.saveAdminButton) {
            var that = this;
            this.saveAdminButton.addEventListener("click", function () {
                that.postData();

            });
            
        }
        if (this.cancelAdminButton) {
            that = this;

            this.cancelAdminButton.addEventListener("click", function () {
                that.onCancelled();
            });
            //console.log("cancel Vehicle create and added click listener");
        }
        if (this.updateAdminButton) {
            that = this;
            this.updateAdminButton.addEventListener("click", function () {
                that.updateData();

            });
            //console.log("edit Vehicle and added click listener");
        }
     
        
        this._saveURL = "";
        this._updateURL = "";
        this._nameURL = "";
        this._idValue = "";
        this._nameValue = "";
        this._mobileNoValue = "";
        this._emailIdValue = "";
        this._addressValue = "";
        this._usernameValue = "";
        this._passwordValue = "";
        this._roleValue = "";
        this._flagValue = "";
        this._roleValue = "";
        this._roleValue = this.role.value;
        this._departmentName = this.departmentName.value;
        this.getNameData();
       
        if (this.name) {
            that = this;
            this.name.addEventListener("blur", function () {
                that._nameValue = that.name.value;
                
                that.validateName();
                
            });
        }
        if (this.mobileNo) {
            this.mobileNo.addEventListener("blur", function () {
                that.validateMobileNo();
            });
        }
        if (this.emailId) {
            this.emailId.addEventListener("blur", function () {
                that.validateEmailId();
            });
        }
        if (this.password) {
            that = this;
            this.password.addEventListener("blur", function () {
                that._passwordValue = that.password.value;
                
            });
        }
      
        if (this.userName) {
            that = this;
            this.userName.addEventListener("blur", function () {
                that._usernameValue = that.userName.value;

            });
        }
        if (this.address) {
            that = this;
            this.address.addEventListener("blur", function () {
                that._addressValue = that.address.value;

            });
        }
        if (this.role) {
            that = this;
            this.role.addEventListener("blur", function () {               
                that._roleValue = that.role.value;
                console.log(that._roleValue);
            });
        }

        if (this.departmentName) {

            this.departmentName.addEventListener("blur", function () {
                that._departmentName = that.departmentName.value;
                //console.log(that._customerNameValue);
                that.validateDepartmentName();
                
            });
        }

        if (this.flag) {
            that = this;
            this.flag.addEventListener("click", function () {
                if ($(that.flag).is(':checked'))
                    that._flagValue = 1;
                else
                    that._flagValue = 0;

                //console.log(that._flagValue);
            });
        }    

    }


    hide() {
        this.adminForm.style.display = "none";
    }
    show() {
        this.adminForm.style.display = "unset";
    }
    //hidesaveAdminButton() {
    //    this.saveAdminButton.style.display = "none";
    //}
    //showsaveAdminButton() {
    //    this.saveAdminButton.style.display = "unset";
    //}
    //hideupdateAdminButton() {
    //    this.updateAdminButton.style.display = "none";
    //}
    //showupdateAdminButton() {
    //    this.updateAdminButton.style.display = "unset";
    //}
    
    validateName() {
        //console.log("validateCustomerName");
        var errorString = "";

        var s = this.name.value;
        s = s.trim().removeInvalidCharacters("`~!#$%^&*()_+={}[]\\|\"':;<>,?/");

        this._nameValue = s;
        this.name.value = s;
    }

    validateDepartmentName() {
        //console.log("validateCustomerName");
        var errorString = "";

        var s = this.departmentName.value;
        s = s.trim().removeInvalidCharacters("`~!#$%^&*()_+={}[]\\|\"':;<>,?/");

        this._departmentName = s;
        this.departmentName.value = s;
        //alert(s);
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
    set nameURL(url) {

        this._nameURL = url;
        this.getNameData();
        //this.onStateCompleted();
    }

    get nameURL() {

        return this._nameURL;
    }
  

    validateRegisterData() {

        var that = this;
        var s, errorString = "";
        s = that.name.value;

        if (s.length == 0) {
            errorString = "Name should not be empty.";
            Common.showErrorMessageFocus(errorString, "Login Details", $(this.name));
            return false;
        }

        this._nameValue = s;

        s = that.mobileNo.value;
     
        if (s.length < 10) {
            errorString = "Mobile Number should be in 10 characters.";
            Common.showErrorMessageFocus(errorString, "Login Details", $(this.mobileNo));
            return false;        
        }

        s = this.emailId.value;


        if (s.length < 8) {
            errorString = "Email id should be atleast minimum 8 characters.";
            Common.showErrorMessageFocus(errorString, "Login Details", $(this.emailId));
            return false;
        } else if (s.length > 100) {
            errorString = "Email id  should not exceed 100 characters.";
            Common.showErrorMessageFocus(errorString, "Login Details", $(this.emailId));
            return false;
        } else {
            var pattern = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;
            if (!pattern.test(s)) {
                errorString = "Email id should be invalid format.";
                Common.showErrorMessageFocus(errorString, "Login Details", $(this.emailId));
                return false;
            }
        }


        s = that.address.value;


        if (s.length == 0) {
            errorString = "Address should not be empty.";
            Common.showErrorMessageFocus(errorString, "Login Details", $(this.address));
            return false;
        }

        s = that.userName.value;


        if (s.length == 0) {
            errorString = "Username should not be empty.";
            Common.showErrorMessageFocus(errorString, "Login Details", $(this.userName));
            return false;
        }

        s = that.password.value;


        if (s.length == 0) {
            errorString = "Password should not be empty.";
            Common.showErrorMessageFocus(errorString, "Login Details", $(this.password));
            return false;
        }

        s = that.role.value;


        if (s.length == 0) {
            errorString = "Role should not be empty.";
            Common.showErrorMessageFocus(errorString, "Login Details", $(this.role));
            return false;
        }

        if (this._roleValue == "DEPARTMENT") {
            s = that.departmentName.value;

            if (s.length == 0) {
                errorString = "Department Name should not be empty.";
                Common.showErrorMessageFocus(errorString, "Login Details", $(this.departmentName));
                return false;
            }
        } else {
            this._departmentName = "";
        }
        return true;
        
    }

    getNameData() {

        var that = this;
        console.log(that.nameURL, "---------------------getnamedata");
        // Common.showLoader();
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
        $.ajax({
            url: web.webapiUrl + that.nameURL,
            headers: headers,
            dataType: "JSON",
            type: "POST",
            success: function (d, st) {
                //console.log(d);
                //  Common.hideLoader();
                if (d.status === 0) {
                    //console.log(d.data);



                    var ctl = $(that.departmentName);                  //ctl.html("");
                    console.log(ctl);
                    ctl.append("<option value=''>&nbsp;</option>");
                    $(d.data).each(function () {
                        ctl.append("<option value='" + this.Id + "'>" + this.DepartmentName + "</option>");
                    });



                }
                else {
                    Common.showErrorMessageFocus(d.statusText, "User", null);

                }
            },
            error: function (xhr, st, eth) {
                //console.log(xhr);
                Common.hideLoader();
            }
        });
    }

    postData() {

        var that = this;

        if (this.validateRegisterData() === false) {
            return false;
        }
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        var datatosend = {
            "FirstName": this._nameValue,
            "MobileNumber": this._mobileNoValue,
            "Address": this._addressValue,
            "EmailID": this._emailIdValue,
            "UserName": this._usernameValue,
            "Password": this._passwordValue,
            "DepartmentId": this._departmentName,
            "Role": this._roleValue,
        };
        console.log(datatosend);
        
        Common.showLoader();
        $.ajax({
            url: web.webapiUrl + that.saveURL,
            data: datatosend,
            headers: headers,
            dataType: "JSON",
            type: "POST",
            success: function (d, st) {
                //console.log(d);               
                Common.hideLoader();
                if (d.status === 0) {
                    Common.showSuccessMessage("New Login saved successfully.", "Login", function () {
                        //alert(iframeFlag);
                      
                            if (that.onSaveCompleted) {
                                that.onSaveCompleted();

                            }
                      
                    });
                }
                else {
                    Common.showErrorMessageFocus(d.statusText, "Login", null);

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

        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        var datatosend = {
            "Id": this._idValue,
            "FirstName": this._nameValue,
            "MobileNumber": this._mobileNoValue,
            "Address": this._addressValue,
            "EmailID": this._emailIdValue,
            "UserName": this._usernameValue,
            "Password": this._passwordValue,
            "Role": this._roleValue,
            "DepartmentId": this._departmentName,
            
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
                    Common.showSuccessMessage("Login details are updated successfully.", "Login", null);
                    if (that.onUpdateCompleted) {
                        that.onUpdateCompleted();
                    }
                }
                else {
                    Common.showErrorMessageFocus(d.statusText, "Login", null);

                }
            },
            error: function (xhr, st, eth) {
                //console.log(xhr);
                Common.hideLoader();
            }
        });
    }


    populateData(jsondata) {
    
        if (jsondata !== null) {
            
            this._idValue = jsondata.Id;
            this._departmentName = jsondata.DepartmentId;
            this._nameValue = jsondata.FirstName;
            this._mobileNoValue = jsondata.MobileNumber;
            this._addressValue = jsondata.Address;
            this._emailIdValue = jsondata.EmailID;
            this._usernameValue = jsondata.UserName;
            this._passwordValue = jsondata.Password;
            this._roleValue = jsondata.Role;
            this._flagValue = jsondata.Status;

            this.departmentName.value = this._departmentName;
            this.name.value = this._nameValue;
            this.mobileNo.value = this._mobileNoValue;
            this.emailId.value = this._emailIdValue;
            this.address.value = this._addressValue;
            this.userName.value = this._usernameValue;
            this.password.value = this._passwordValue;
            this.role.value = this._roleValue;
            //alert(jsondata.Role);
            //$("#role").val(this._roleValue);
            
        } else {
            this._idValue = "";
            this._nameValue = "";
            this._mobileNoValue = "";
            this._emailIdValue = "";
            this._addressValue = "";
            this._usernameValue = "";
            this._passwordValue = "";
            this._roleValue = "";
            this._flagValue = "";
            this._departmentName = "";
            


            this.name.value = "";
            this.mobileNo.value = "";
            this.emailId.value = "";
            this.address.value = "";
            this.userName.value = "";
            this.password.value = "";
            this.role.value = "";
            //this.hideupdateAdminButton();
            //this.showsaveAdminButton();

        }


    }

}