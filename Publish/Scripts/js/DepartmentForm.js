var token = localStorage.getItem('token');
var login = localStorage.getItem('username');
class PBDepartmentFormComponent extends PBCompnent {
    constructor(compID) {
        super(compID);
        this.onSaveCompleted = null;
        this.onCancelled = null;        
        this.init();
    }

    init() {
        
        var that = this;
        if (this.saveDepartmentButton) {           
             that = this;
            this.saveDepartmentButton.addEventListener("click", function () {
                that.postData();
            });
            //console.log("save User create and added click listener");
        }
        if (this.cancelDepartmentButton) {
            that = this;
            this.cancelDepartmentButton.addEventListener("click", function () {
                if (that.onCancelled) {
                    that.hide();
                    that.onCancelled();
                }
            });
            //console.log("cancel User create and added click listener");
        }
        if (this.updateDepartmentButton) {
            that = this;
            this.updateDepartmentButton.addEventListener("click", function () {
                that.updateData();

            });
            //console.log("edit Vehicle and added click listener");
        }

        this._saveURL = "";       
        this._idValue = "";
        this._departmentNameValue = "";
        this._authorityNameValue = "";   
        this._emailIdValue = "";   
        this._flagValue = "";
        this._mobileNoValue = "";


        if (this.departmentName) {
            this.departmentName.addEventListener("blur", function () {
                that.validateDepartmentName();
            });
        }

        if (this.authorityName) {
            this.authorityName.addEventListener("blur", function () {
                that.validateAuthorityName();
            });
        }

        if (this.emailId) {
            this.emailId.addEventListener("blur", function () {
                that.validateEmailId();
            });
        }
        if (this.mobileNo) {
            this.mobileNo.addEventListener("blur", function () {
                that.validateMobileNo();
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

        if (this.departmentForm)
            this.departmentForm.style.display = "none";
    }
    show() {
        this.departmentForm.style.display = "unset";
    }

   
    validateDepartmentName() {
        //console.log("validateFullName");
        var errorString = "";

        var s = this.departmentName.value;
        s = s.trim().removeInvalidCharacters("`~!#$%^&*()_+={}[]\\|\"':;<>,?/");

        this._departmentNameValue = s;
        this.departmentName.value = s;

    }

    validateAuthorityName() {
        //console.log("validateFullName");
        var errorString = "";

        var s = this.authorityName.value;
        s = s.trim().removeInvalidCharacters("`~!#$%^&*()_+={}[]\\|\"':;<>,?/");

        this._authorityNameValue = s;
        this.authorityName.value = s;

    }

    validateEmailId() {
        var errorString = "";

        var s = this.emailId.value;
        s = s.trim().removeInvalidCharacters("`~!#$%^&*()_+={}[]\\|\"':;<>,?/");

        this._emailIdValue = s;
        this.emailId.value = s;
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

    set saveURL(url) {
        this._saveURL = url;
    }

    get saveURL() {
        return this._saveURL;
    }

   

    validateRegisterData() {
      
        var that = this;
        var s, errorString = "";

        s = that.departmentName.value;


        if (s.length < 3) {
            errorString = "Department Name should be atleast minimum 3 characters.";
            Common.showErrorMessageFocus(errorString, "Department", $(this.departmentName));
            return false;
        } else if (s.length > 100) {
            errorString = "Name should not exceed 100 characters.";
            Common.showErrorMessageFocus(errorString, "Department", $(this.departmentName));
            return false;
        }


        s = this.mobileNo.value;


        if (s.length < 10) {
            errorString = "Mobile should be in 10 characters.";
            Common.showErrorMessageFocus(errorString, "Department", $(this.mobileNo));
            return false;
        }

        s = this.emailId.value;


        if (s.length < 8) {
            errorString = "Email id should be atleast minimum 8 characters.";
            Common.showErrorMessageFocus(errorString, "Department", $(this.emailId));
            return false;
        } else if (s.length > 100) {
            errorString = "Email id  should not exceed 100 characters.";
            Common.showErrorMessageFocus(errorString, "Department", $(this.emailId));
            return false;
        } else {
            var pattern = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;
            if (!pattern.test(s)) {
                errorString = "Email id should be invalid format.";
                Common.showErrorMessageFocus(errorString, "Department", $(this.emailId));
                return false;
            }
        }


      
        return true;
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

        var loginName = $("#login-name").val();
    
        var datatosend = {
            "DepartmentName": this._departmentNameValue,
            "AuthorityName": this._authorityNameValue,
            "EmailId": this._emailIdValue,
            "MobileNo": this._mobileNoValue,
            "CreatedBy": login,
            
        };

       
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
                    Common.showSuccessMessage("Departments Details saved successfully.", "Department", null);
                    if (that.onSaveCompleted) {
                        that.onSaveCompleted();
                    }
                }
                else {
                    Common.showErrorMessageFocus(d.statusText, "Department", null);

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
        var loginName = $("#login-name").val();

        var datatosend = {
            "Id": this._idValue,
            "DepartmentName": this._departmentNameValue,
            "AuthorityName": this._authorityNameValue,
            "EmailId": this._emailIdValue,
            "MobileNo": this._mobileNoValue,           
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
                    Common.showSuccessMessage("Department details are updated successfully.", "Department", null);
                    if (that.onUpdateCompleted) {
                        that.onUpdateCompleted();
                    }
                }
                else {
                    Common.showErrorMessageFocus(d.statusText, "Department", null);

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
            this._departmentNameValue = jsondata.DepartmentName;
            this._authorityNameValue = jsondata.AuthorityName;
            this._mobileNoValue = jsondata.MobileNo;
            this._emailIdValue = jsondata.EmailId;

            this.departmentName.value = this._departmentNameValue;
            this.authorityName.value = this._authorityNameValue;
            this.mobileNo.value = this._mobileNoValue;
            this.emailId.value = this._emailIdValue;


        } else {

            this.departmentName.value = "";
            this.authorityName.value = "";
            this.mobileNo.value = "";
            this.emailId.value = "";

        }

    }
}
