var token = localStorage.getItem('token');
class PBMeetingFormComponent extends PBCompnent {
    constructor(compID) {
        super(compID);
        this.onSaveCompleted = null;
        this.onCancelled = null;        
        this.init();
    }

    init() {
        
        var that = this;
   
        if (this.saveMeeting) {           
             that = this;
            this.saveMeeting.addEventListener("click", function () {
                that.postData();
            });
            //console.log("save User create and added click listener");
        }
        if (this.cancelMeeting) {
            that = this;
            this.cancelMeeting.addEventListener("click", function () {
                if (that.onCancelled) {
                    that.hide();
                    that.onCancelled();
                }
            });
            //console.log("cancel User create and added click listener");
        }
       
        this._departmentValue = "";
        this._customerName = "";
        this._meetingDate = "";
        this._startTime = "";
        this._endTime = "";
        this._place = "";
        this._purposeMeeting = "";
        this._saveURL = "";

        if (this.customerName) {
            this.customerName.addEventListener("blur", function () {
                that._customerName = that.customerName.value;
            });
        }
        if (this.meetingDate) {
            this.meetingDate.addEventListener("blur", function () {
                that._meetingDate = that.meetingDate.value;
            });
        }
        if (this.startTime) {
            this.startTime.addEventListener("blur", function () {
                that._startTime = that.startTime.value;
            });
        }
        if (this.endTime) {
            this.endTime.addEventListener("blur", function () {
                that._endTime = that.endTime.value;
            });
        }
        if (this.place) {
            this.place.addEventListener("blur", function () {
                that.validatePlace();
            });
        }
        if (this.purposeMeeting) {
            this.purposeMeeting.addEventListener("blur", function () {
                that._purposeMeeting = that.purposeMeeting.value;
            });
        }

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

    }


    hide() {

        if (this.meetingForm)
            this.meetingForm.style.display = "none";
    }
    show() {
        this.meetingForm.style.display = "unset";
    }

    validatePlace() {
        //console.log("validateFullName");
        var errorString = "";

        var s = this.place.value;
        s = s.trim().removeInvalidCharacters("`~!#$%^&*()_+={}[]\\|\"':;<>,?/");

        this._placeValue = s;
        this.place.value = s;
    }
    validateRegisterData() {

        var that = this;
        var s, errorString = "";

        if (this._customerName == "") {
            errorString = "Customer Name should not be empty.";
            Common.showErrorMessageFocus(
                errorString,
                "Schedule Meeting",
                document.getElementById("customer-name").focus()
            );
            return false;
        }

        if (this._meetingDate == "") {
            errorString = "Meeting Date should not be empty.";
            Common.showErrorMessageFocus(
                errorString,
                "Schedule Meeting",
                document.getElementById("meeting-date").focus()
            );
            return false;
        }
        if (this._startTime == "") {
            errorString = " Meeting Start Time should not be empty.";
            Common.showErrorMessageFocus(
                errorString,
                "Schedule Meeting",
                document.getElementById("start-time").focus()
            );
            return false;
        }
        if (this._endTime == "") {
            errorString = "Meeting End Time should not be empty.";
            Common.showErrorMessageFocus(
                errorString,
                "Schedule Meeting",
                document.getElementById("end-time").focus()
            );
            return false;
        }

        s = this.place.value;
        if (s.length < 3) {
            errorString = "Place should be atleast minimum 3 characters.";
            Common.showErrorMessageFocus(
                errorString,
                "Schedule Meeting",
                document.getElementById("place").focus()
            );
            return false;
        }

     
        s = this.purposeMeeting.value;
        if (s.length < 5) {
            errorString =
                "Purpose of the Meeting should be atleast minimum 5 characters.";
            Common.showErrorMessageFocus(
                errorString,
                "Schedule Meeting",
                document.getElementById("purpose-meeting").focus()
            );
            return false;
        }
      
        return true;
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
            headers: headers,
            success: function (d, st) {
                //console.log(d);
                //  Common.hideLoader();
                if (d.status === 0) {
                    //console.log(d.data);



                    var ctl = $(that.customerName);                  //ctl.html("");
                    console.log(ctl);
                    ctl.html("");
                    ctl.append("<option value=''>&nbsp;</option>");
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
                    Common.showErrorMessageFocus(d.statusText, "Customer", null);

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

        var dpt = that._departmentValue.split(',');

        for (var i = 0; i < dpt.length; i++) {
            var rec = dpt[i];
            var splitted = rec.split('-');
            var departmentName = splitted[0];
            var departmentId = splitted[1];

            departments.push({ Department: departmentName, DepartmentId: departmentId });

        }

        var datatosend = {
            "CustomerId": this._customerName,
            "MeetingDate": this._meetingDate,
            "StartTime": this._startTime,
            "EndTime": this._endTime,
            "Place": this._placeValue,
            "PurposeOfMeeting": this._purposeMeeting,
            "DeptDetails": departments,
        };
        console.log(datatosend);
       
        //console.log(datatosend, "-----------------------------");
        //console.log(that.saveURL, "-----------------------------");
        Common.showLoader();
        $.ajax({
            url: web.webapiUrl + that.saveURL,
            data: datatosend,
            dataType: "JSON",
            headers: headers,
            type: "POST",
            success: function (d, st) {
                ////console.log(d);               
                Common.hideLoader();
                if (d.status === 0) {
                    Common.showSuccessMessage("Meeting Details saved successfully.", "Meeting", null);
                    if (that.onSaveCompleted) {
                        that.onSaveCompleted();
                    }
                }
                else {
                    Common.showErrorMessage(d.statusText, "Meeting", null);

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
       
        console.log(jsondata);
        if (jsondata !== null) {
            
            $("#reschedule").show();
            $("#meeting-detail").show();
            this._idValue = jsondata.Id;
            this._customerName = jsondata.CustomerId;
        //    this._meetingDate = jsondata.MeetingDate;
            this._startTime = jsondata.StartTime;
            this._endTime = jsondata.EndTime;            
            this._placeValue = jsondata.Place;
            this._purposeMeeting = jsondata.PurposeOfMeeting;

            this.customerName.value = this._customerName;
            this.startTime.value = this._startTime;
            this.endTime.value = this._endTime;
            this.place.value = this._placeValue;
            this.purposeMeeting.value = this._purposeMeeting;
            this._meetingDate = jsondata.MeetingDate;
            this.meetingDate.value = this._meetingDate;
           
            this.organizer.innerHTML = jsondata.CustomerName;
            this.dateMeeting.innerHTML = this._meetingDate;
            this.fromTime.innerHTML = moment(jsondata.StartTime, "HH:mm:ss").format("hh:mm A");
            this.toTime.innerHTML = moment(jsondata.EndTime, "HH:mm:ss").format("hh:mm A");
            this.placeMeeting.innerHTML = this._placeValue;
            this.meetingPurpose.innerHTML = this._purposeMeeting;

            $("#new-form").hide();
        } else {
            
           

            
        }


    }


}
