var token = localStorage.getItem('token');
var login = localStorage.getItem('username');
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
       
        this._saveURL = "";       
        this._idValue = "";
        this._nameURL = "";
        this._departmentURL = "";
        this._eventNameValue = "";   
        this._departmentValue = "";   
        this._flagValue = "";
        this._deptDataURL = "";
        this._departmentIdNameValue = "";


        //if (this.eventName) {
           
        //    this.eventName.addEventListener("blur", function () {
              
        //        that._eventNameValue = that.eventName.value;
              
        //        //that.validateName();
        //    });
        //}

        if (this.eventName) {
            that = this;

            $(this.eventName).on('change', function () {
                $("#evd").show();
                that._eventNameValue = $('select#event-name option:selected').val();
                $("#event-dept").load(window.location.href + " #event-dept");

                that.getEventDepartmentData();
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


        //if (this.allDept) {
        //    that = this;
        //    var deptvalue = "";
        //    $(this.allDept).on('click', function () {

        //        //console.log(that._pumpNozzleValue);
        //        var values = "";
        //        $("input[class=dept]:checked").each(function (i) {
        //            //alert($(this).val());


        //            var checked = $(this).val();
        //            if (checked !== "" && values !== "")
        //                values += "," + $(this).val();
        //            else if (checked !== "" && values === "")
        //                values += $(this).val();
        //            else
        //                values += $(this).val();
        //            deptvalue = values;
        //            //this._placeValue = values;
                   
        //        });
        //        //alert(placevalue);
        //        that._departmentValue = deptvalue;
        //    });
            
        //}

        if (this.allDept) {
            that = this;

            $(this.allDept).on('click', function () {

                var values = "";
                $("input[class=dept]:checked").each(function (i) {

                    var checked = $(this).val();
                    if (checked !== "" && values !== "")
                        values += "," + $(this).val();
                    else if (checked !== "" && values === "")
                        values += $(this).val();
                    else
                        values += $(this).val();

                });

                if (that._departmentValue === "") {
                    that._departmentValue = values;
                    
                    console.log(that._departmentValue);
                } else {
                    //that._pumpNozzleValue = values;
                    var splitted = values.split(',');
                    for (var i = 0; i < splitted.length; i++) {
                        var rec = splitted[i];
                        if (!that._departmentValue.includes(rec)) {
                            that._departmentValue += "," + rec;
                        }
                    }


                }
            });

        }

        

        if (this.eventDept) {
            that = this;

            $(this.eventDept).on('click', function () {
                var values = "";
                $("input[class=evt]:checked").each(function (i) {
                    //alert($(this).val());


                    var unchecked = $(this).val();
                    if (unchecked !== "" && values !== "")
                        values += "," + $(this).val();
                    else if (unchecked !== "" && values === "")
                        values += $(this).val();
                    else
                        values += $(this).val();

                });

                that._departmentValue = values;

                function checkvalues(value) {
                    return value = that._departmentValue;
                }
               


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

    set deptDataURL(url) {
        this._deptDataURL = url;
    }

    get deptDataURL() {
        return this._deptDataURL;
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



    getEventDepartmentData() {

        var that = this;
        //console.log(that.dataURL, "---------------------getdata");
        Common.showLoader();
        
        var me = this;
        var eventIds = me._eventNameValue;
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
        var datatosend = {

            "EventId": me._eventNameValue,
            "EventIds": eventIds,
        };

        $.ajax({
            url: web.webapiUrl + that.deptDataURL,
            data: datatosend,
            headers: headers,
            dataType: "JSON",
            type: "POST",
            success: function (d, st) {
                //console.log(d);               
                Common.hideLoader();
                if (d.status === 0) {
                    

                    that._departmentValue = d.data;
                    var dpt_string = '';
                    var list = that._departmentValue;
                    $(that._departmentValue).each(function () {

                        $('#event-dept')
                            .append(`<input type="checkbox" class="evt" value="${this.Department}-${this.Id}" Checked >`)
                            .append(` <label for="${this.Department}-${this.Id}"> &nbsp; ${this.Department} &nbsp; </label></div> `)


                        if (dpt_string === '') {
                            dpt_string += "" + this.Department + " - " + this.Id;
                        } else {
                            dpt_string += "," + this.Department + " - " + this.Id;
                        }
                    });
                    that._departmentValue = dpt_string;

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


    postData() {

        var that = this;
      

        if (this.validateRegisterData() === false) {
            return false;
        }
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
        var departments = [];

        //console.log(that._pumpNozzleValue);
        var dpt = that._departmentValue.split(',');

        //for (var i = 0; i < pnz.length; i++) {
        //    var rec = pnz[i];
        //    var splitted = rec.split('-');
        //    var nozzle_no = splitted[0];
        //    var pump_no = splitted[1];
        //    nozzles_pumps.push({ NozzleNo: nozzle_no, PumpNo: pump_no, UserId: that._userIdValue });

        //    //alert(nozzle_no);
        //    //alert(pump_no);
        //}

        for (var i = 0; i < dpt.length; i++) {
            var rec = dpt[i];
            var splitted = rec.split('-');
            var departmentName = splitted[0];
            var departmentId = splitted[1];

            departments.push({ Department: departmentName, DepartmentId: departmentId });

        }

        //for (var i = 0; i < dpt.length; i++) {
        //    var rec = dpt[i];
        //    var department = rec;
        //    var dept = department;

        //    departments.push({ Department: dept});

        //}

        var loginName = $("#login-name").val();

        var datatosend = {
            "EventId": this._eventNameValue,
            "CreatedBy": login,
            //"Department": this._departmentValue,
            "DeptDetails": departments,
           
            
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

        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        // Common.showLoader();
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



                    var ctl = $(that.eventName);                  //ctl.html("");
                    console.log(ctl);
                    ctl.append("<option value=''>&nbsp;</option>");
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
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
        $.ajax({
            url: web.webapiUrl + that.departmentURL,
            headers: headers,
            dataType: "JSON",
            type: "POST",
            success: function (d, st) {
                //console.log(d);
                //  Common.hideLoader();
                if (d.status === 0) {

                  

                    var list = d.data;
                    $(d.data).each(function () {

                        $('#all-dept')
                            .append(`<input type="checkbox" class="dept"  name="interest" value="${this.DepartmentName}-${this.Id}">`)
                            .append(` <label class="check" for="${this.DepartmentName}"> &nbsp; ${this.DepartmentName} &nbsp; </label></div> `)
                           
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
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
        var loginName = $("#login-name").val();

        var departments = [];

        //console.log(that._pumpNozzleValue);
        var dpt = that._departmentValue.split(',');


        //for (var i = 0; i < dpt.length; i++) {
        //    var rec = dpt[i];
        //    var department = rec;
        //    var dept = department;

        //    departments.push({ Department: dept, EventName: that._eventNameValue });

        //}

        for (var i = 0; i < dpt.length; i++) {
            var rec = dpt[i];
            var splitted = rec.split('-');
            var departmentName = splitted[0];
            var departmentId = splitted[1];

            departments.push({ Department: departmentName, DepartmentId: departmentId });

        }
       

        var datatosend = {
            "Id": this._idValue,
            "EventName": this._eventNameValue,
            "Details": departments,
            "UpdatedBy": loginName,

        };
        console.log(datatosend);
        return;
        Common.showLoader();
        $.ajax({
            url: web.webapiUrl + that.updateURL,
            data: datatosend,
            headers:headers,
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
