var token = localStorage.getItem('token');
class PBUserFormComponent extends PBCompnent {
    constructor(compID) {
        super(compID);
        this.onSaveCompleted = null;
        this.onCancelled = null;
        this.onUpdateCompleted = null;
        this.init();

    }

    init() {
        //alert("NUUUUUUUUUU");

        if (this.saveUserButton) {
            var that = this;
            this.saveUserButton.addEventListener("click", function () {
                that.postData();

            });
            
        }
        if (this.cancelUserButton) {
            that = this;

            this.cancelUserButton.addEventListener("click", function () {
                that.onCancelled();
            });
            //console.log("cancel Vehicle create and added click listener");
        }
        if (this.updateUserButton) {
            that = this;
            this.updateUserButton.addEventListener("click", function () {
                that.updateData();

            });
            //console.log("edit Vehicle and added click listener");
        }
     
        
        this._saveURL = "";
        this._updateURL = "";
        this._nameURL = "";
        this._idValue = "";
        this._customerNameValue = "";
        this._mobileNoValue = "";
        this._emailIdValue = "";
        this._usernameValue = "";
        this._passwordValue = "";
        this._roleValue = "";
        this._flagValue = "";
        this._userDataURL = "";
        this._userValue = "";
        this._roleValue = this.role.value
       
        //if (this.customerName) {
        //    that = this;
        //    this.customerName.addEventListener("blur", function () {
        //        that._customerNameValue = that.customerName.value;
               
        //        that.validateCustomerName();
                
        //    });
        //}
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

        if (this.customerName) {
            that = this;

            $(this.customerName).on('change', function () {
                
                that._customerNameValue = $('select#customer-name option:selected').val();
                
                that.getUserDepartmentData();


             
            });
        }

        if (this.role) {
            that = this;
            this.role.addEventListener("blur", function () {
                that._roleValue = "USER";
                that._roleValue = that.role.value;
                //console.log(that._roleValue);
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


        //if (this.customerName) {
        //    that = this;

        //    $(this.customerName).on('change', function () {
                
        //        that._mobileNoValue = $(this).find('option:selected').attr("mobileno");
        //        that.mobileNo.value = that._mobileNoValue;
        //        that._emailIdValue = $(this).find('option:selected').attr("emailid");
        //        that.emailId.value = that._emailIdValue;
                
        //    });
        //}


    }


    hide() {
        this.userForm.style.display = "none";
    }
    show() {
        this.userForm.style.display = "unset";
    }
    //hideSaveUserButton() {
    //    this.saveUserButton.style.display = "none";
    //}
    //showSaveUserButton() {
    //    this.saveUserButton.style.display = "unset";
    //}
    //hideUpdateUserButton() {
    //    this.updateUserButton.style.display = "none";
    //}
    //showUpdateUserButton() {
    //    this.updateUserButton.style.display = "unset";
    //}
    
    validateCustomerName() {
        //console.log("validateCustomerName");
        var errorString = "";

        var s = this.customerName.value;
        s = s.trim().removeInvalidCharacters("`~!#$%^&*()_+={}[]\\|\"':;<>,?/");

        this._customerNameValue = s;
        this.customerName.value = s;
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

    set userDataURL(url) {
        this._userDataURL = url;
    }

    get userDataURL() {
        return this._userDataURL;
    }

    validateRegisterData() {

        var that = this;
        var s, errorString = "";
        s = that.customerName.value;

        if (s.length == 0) {
            errorString = "Customer Name should not be empty.";
            Common.showErrorMessageFocus(errorString, "User", $(this.customerName));
            return false;
        }

        this._customerNameValue = s;

        s = that.mobileNo.value;
     
        if (s.length < 10) {
            errorString = "Mobile Number should be in 10 characters.";
            Common.showErrorMessageFocus(errorString, "User", $(this.mobileNo));
            return false;        
        }

        s = this.emailId.value;


        if (s.length < 8) {
            errorString = "Email id should be atleast minimum 8 characters.";
            Common.showErrorMessageFocus(errorString, "Customer", $(this.emailId));
            return false;
        } else if (s.length > 100) {
            errorString = "Email id  should not exceed 100 characters.";
            Common.showErrorMessageFocus(errorString, "Customer", $(this.emailId));
            return false;
        } else {
            var pattern = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;
            if (!pattern.test(s)) {
                errorString = "Email id should be invalid format.";
                Common.showErrorMessageFocus(errorString, "Customer", $(this.emailId));
                return false;
            }
        }

       

        s = that.userName.value;


        if (s.length == 0) {
            errorString = "Username should not be empty.";
            Common.showErrorMessageFocus(errorString, "User", $(this.userName));
            return false;
        }

        s = that.password.value;


        if (s.length == 0) {
            errorString = "Password should not be empty.";
            Common.showErrorMessageFocus(errorString, "User", $(this.password));
            return false;
        }

        //s = that.role.value;


        //if (s.length == 0) {
        //    errorString = "Role should not be empty.";
        //    Common.showErrorMessageFocus(errorString, "User", $(this.role));
        //    return false;
        //}


    }


    getUserDepartmentData() {

        var that = this;
        //console.log(that.dataURL, "---------------------getdata");
        Common.showLoader();
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
        var me = this;
        var datatosend = {

            "CustomerId": me._customerNameValue,
        };

        $.ajax({
            url: web.webapiUrl + that.userDataURL,
            data: datatosend,
            dataType: "JSON",
            headers: headers,
            type: "POST",
            success: function (d, st) {
                //console.log(d);               
                Common.hideLoader();
                if (d.status === 0) {


                    that._userValue = d.data;

                    $(that._userValue).each(function () {

                        if (this.Id + "" === that._customerNameValue) {

                            that.mobileNo.value = this.MobileNo;
                            that.emailId.value = this.EmailId;
                            that.userName.value = this.MobileNo;

                            that._mobileNoValue = this.MobileNo;
                            that._emailIdValue = this.EmailId;
                            that._usernameValue = this.MobileNo;
                        }


                    });
                    that.generatePassword();


                }

                else {
                    Common.showErrorMessageFocus(d.statusText, "Settings", null);

                }
            },
            error: function (xhr, st, eth) {
                //console.log(xhr);
                Common.hideLoader();
            }
        });
    }

    generatePassword() {

        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        console.log(retVal);
        this.password.value = retVal;
        this._passwordValue = retVal;
        return retVal;

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
            "CustomerId": this._customerNameValue,
            "MobileNumber": this._mobileNoValue,
            "EmailID": this._emailIdValue,
            "UserName": this._usernameValue,
            "Password": this._passwordValue,
            "Role": "USER",
            "SendSMS": $("#send-sms").prop("checked") ? 1 : 0,
        };
      
        //console.log(datatosend, "-----------------------------");
        //console.log(that.saveURL, "-----------------------------");
        Common.showLoader();
        $.ajax({
            url: web.webapiUrl + that.saveURL,
            data: datatosend,
            headers:headers,
            dataType: "JSON",
            type: "POST",
            success: function (d, st) {
                //console.log(d);               
                Common.hideLoader();
                if (d.status === 0) {
                    Common.showSuccessMessage("New User saved successfully.", "User", function () {
                        //alert(iframeFlag);
                      
                            if (that.onSaveCompleted) {
                                that.onSaveCompleted();

                            }
                      
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
    getNameData() {
      
        var that = this;
        console.log(that.nameURL, "---------------------getnamedata");
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
        // Common.showLoader();
        $.ajax({
            url: web.webapiUrl + that.nameURL,
            dataType: "JSON",
            type: "POST",
            headers:headers,
            success: function (d, st) {
                //console.log(d);
                //  Common.hideLoader();
                if (d.status === 0) {
                    //console.log(d.data);

                 

                    var ctl = $(that.customerName);                  //ctl.html("");
                    console.log(ctl);
                    $(d.lettercustomers).each(function () {
                        ctl.append("<option value='" + this.Id + "'>" + this.Name + "</option>");
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
            "CustomerId": this._customerNameValue,
            "MobileNumber": this._mobileNoValue,
            "EmailID": this._emailIdValue,
            "UserName": this._usernameValue,
            "Password": this._passwordValue,
            "Role": this._roleValue,
            
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
                    Common.showSuccessMessage("User details are updated successfully.", "User", null);
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
       
        if (jsondata !== null) {
            
            this._idValue = jsondata.Id;
            this._customerNameValue = jsondata.CustomerId;
            this._mobileNoValue = jsondata.MobileNo;
            this._emailIdValue = jsondata.EmailId;
            this._usernameValue = jsondata.UserName;
            this._passwordValue = jsondata.Password;
            this._roleValue = jsondata.Role;
            this._flagValue = jsondata.Status;
            

            this.customerName.value = this._customerNameValue;
            this.mobileNo.value = this._mobileNoValue;
            this.emailId.value = this._emailIdValue;
            this.userName.value = this._usernameValue;
            this.password.value = this._passwordValue;
            this.role.value = this._roleValue;
            
            //this.showUpdateUserButton();
            //this.hideSaveUserButton();
        } else {
            this._idValue = "";
            this._customerNameValue = "";
            this._mobileNoValue = "";
            this._emailIdValue = "";
            this._usernameValue = "";
            this._passwordValue = "";
            this._roleValue = "";
            this._flagValue = "";
            

            
            this.customerName.value = "";
            this.mobileNo.value = "";
            this.emailId.value = "";
            this.userName.value = "";
            this.password.value = "";
            this.role.value = "";
            //this.hideUpdateUserButton();
            //this.showSaveUserButton();

        }


    }

}

 