class PBSettingFormComponent extends PBCompnent {
    constructor(compID) {
        super(compID);
        this.onSaveCompleted = null;
        this.onCancelled = null;        
        this.init();
    }

    init() {
        
        var that = this;
        if (this.saveSettingButton) {           
             that = this;
            this.saveSettingButton.addEventListener("click", function () {
                that.postData();
            });
            //console.log("save User create and added click listener");
        }
        if (this.cancelSettingButton) {
            that = this;
            this.cancelSettingButton.addEventListener("click", function () {
                if (that.onCancelled) {
                    that.hide();
                    that.onCancelled();
                }
            });
            //console.log("cancel User create and added click listener");
        }
        if (this.updateSettingButton) {
            that = this;
            this.updateSettingButton.addEventListener("click", function () {
                that.updateData();

            });
            //console.log("edit Vehicle and added click listener");
        }

        this._saveURL = "";       
        this._idValue = "";
        this._nameURL = "";
        this._departmentURL = "";
        this._eventNameValue = "";   
        this._departmentValue = "";   
        this._flagValue = "";
       


        if (this.eventName) {
           
            this.eventName.addEventListener("blur", function () {
              
                that._eventNameValue = that.eventName.value;
              
                //that.validateName();
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
            var deptvalue = "";
            $(this.container).on('click', function () {

                //console.log(that._pumpNozzleValue);
                var values = "";
                $("input[class=dept]:checked").each(function (i) {
                    //alert($(this).val());


                    var checked = $(this).val();
                    if (checked !== "" && values !== "")
                        values += "," + $(this).val();
                    else if (checked !== "" && values === "")
                        values += $(this).val();
                    else
                        values += $(this).val();
                    deptvalue = values;
                    //this._placeValue = values;
                   
                });
                //alert(placevalue);
                that._departmentValue = deptvalue;
            });
            
        }
  
    }


    hide() {

        if (this.settingForm)
            this.settingForm.style.display = "none";
    }
    show() {
        this.settingForm.style.display = "unset";
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

    set departmentURL(url) {

        this._departmentURL = url;
        this.getDepartmentData();
        //this.onStateCompleted();
    }

    get departmentURL() {

        return this._departmentURL;
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

        s = that.eventName.value;


        if (s.length == "") {
            errorString = "Event Name should not be Empty.";
            Common.showErrorMessageFocus(errorString, "Settings", $(this.eventName));
            return false;
        } 

        this._eventNameValue = s;
      
        return true;
    }


   


    postData() {

        var that = this;
      

        if (this.validateRegisterData() === false) {
            return false;
        }
        
        //var departments = [];

        ////console.log(that._pumpNozzleValue);
        //var dpt = that._departmentValue.split(',');


        //for (var i = 0; i < dpt.length; i++) {
        //    var rec = dpt[i];
        //    var department = rec;
        //    var dept = department;

        //    departments.push({ Department: dept});

        //}

        var loginName = $("#login-name").val();

        var datatosend = {
            "EventId": this._eventNameValue,
            "CreatedBy": loginName,
            "Department": this._departmentValue,
            //"DeptDetails": departments,
           
            
        };

       
        Common.showLoader();
        $.ajax({
            url: web.webapiUrl + that.saveURL,
            data: datatosend,
            dataType: "JSON",
            type: "POST",
            success: function (d, st) {
                ////console.log(d);               
                Common.hideLoader();
                if (d.status === 0) {
                    Common.showSuccessMessage("Settings Details saved successfully.", "Settings", null);
                    if (that.onSaveCompleted) {
                        that.onSaveCompleted();
                    }
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

    getNameData() {

        var that = this;
        console.log(that.nameURL, "---------------------getnamedata");
        // Common.showLoader();
        $.ajax({
            url: web.webapiUrl + that.nameURL,
            dataType: "JSON",
            type: "POST",
            success: function (d, st) {
                //console.log(d);
                //  Common.hideLoader();
                if (d.status === 0) {
                    //console.log(d.data);



                    var ctl = $(that.eventName);                  //ctl.html("");
                    console.log(ctl);
                    $(d.data).each(function () {
                        ctl.append("<option value='" + this.Id + "'>" + this.EventName + "</option>");
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


    getDepartmentData() {

        var that = this;
      
        $.ajax({
            url: web.webapiUrl + that.departmentURL,
            dataType: "JSON",
            type: "POST",
            success: function (d, st) {
                //console.log(d);
                //  Common.hideLoader();
                if (d.status === 0) {

                  

                    var list = d.data;
                    $(d.data).each(function () {

                        $('#container')
                            .append(`<input type="checkbox" class="dept"  name="interest" value="${this.DepartmentName}">`)
                            .append(` <label class="check" for="${this.DepartmentName}"> &nbsp; ${this.DepartmentName} </label></div> `)

                    });



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

    updateData() {

        var that = this;

        if (this.validateRegisterData() === false) {
            return false;
        }

        var loginName = $("#login-name").val();

        var departments = [];

        //console.log(that._pumpNozzleValue);
        var dpt = that._departmentValue.split(',');


        for (var i = 0; i < dpt.length; i++) {
            var rec = dpt[i];
            var department = rec;
            var dept = department;

            departments.push({ Department: dept, EventName: that._eventNameValue });

        }


        var datatosend = {
            "Id": this._idValue,
            "EventName": this._eventNameValue,
            "Details": departments,
            "UpdatedBy": loginName,

        };

        Common.showLoader();
        $.ajax({
            url: web.webapiUrl + that.updateURL,
            data: datatosend,
            dataType: "JSON",
            type: "POST",
            success: function (d, st) {


                Common.hideLoader();
                if (d.status === 0) {
                    Common.showSuccessMessage("Settings details are updated successfully.", "Event List", null);
                    if (that.onUpdateCompleted) {
                        that.onUpdateCompleted();
                    }
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


    populateData(jsondata) {
        var that = this;

        if (jsondata !== null) {
            //console.log(jsondata);

            this._idValue = jsondata.Id;
            this._eventNameValue = jsondata.EventName;
            this._departmentValue = jsondata.Department;
            //this.detailsRecords = jsondata.Details;

            this.eventName.value = this._eventNameValue;
            //this.department.value = this._departmentValue;


        } else {

            this.eventName.value = "";
            //this.department.value = "";

        }

    }
}
