var token = localStorage.getItem('token');
var login = localStorage.getItem('username');
class PBEventSettingFormComponent extends PBCompnent {
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
        this._placeURL = "";
        this._eventNameValue = "";   
        this._placeValue = "";   
        this._flagValue = "";
        this._placeDataURL = "";


       

        if (this.eventName) {
            that = this;

            $(this.eventName).on('change', function () {
                $("#evp").show();
                that._eventNameValue = $('select#event-name option:selected').val();
                $("#event-place").load(window.location.href + " #event-place");

                that.getEventPlaceData();
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


        if (this.allPlaces) {
            that = this;
            var placevalue = "";
            $(this.allPlaces).on('click', function () {

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
                    placevalue = values;
                    //this._placeValue = values;
                   
                });
                //alert(placevalue);
                that._placeValue = placevalue;
            });
            
        }

        if (this.eventPlace) {
            that = this;

            $(this.eventPlace).on('click', function () {
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

                that._placeValue = values;

                function checkvalues(value) {
                    return value = that._placeValue;
                }
               
            });
        }


    }


    hide() {

        if (this.eventSettingForm)
            this.eventSettingForm.style.display = "none";
    }
    show() {
        this.eventSettingForm.style.display = "unset";
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

    set nameURL(url) {

        this._nameURL = url;
        this.getNameData();
        //this.onStateCompleted();
    }

    get nameURL() {

        return this._nameURL;
    }

    set placeDataURL(url) {
        this._placeDataURL = url;
    }

    get placeDataURL() {
        return this._placeDataURL;
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



    getEventPlaceData() {

        var that = this;
        //console.log(that.dataURL, "---------------------getdata");
        Common.showLoader();
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
        var me = this;
        var datatosend = {

            "EventId": me._eventNameValue,
        };

        $.ajax({
            url: web.webapiUrl + that.placeDataURL,
            data: datatosend,
            headers: headers,
            dataType: "JSON",
            type: "POST",
            success: function (d, st) {
                //console.log(d);               
                Common.hideLoader();
                if (d.status === 0) {
                    

                    that._placeValue = d.data;
                    var plc_string = '';
                    var list = that._placeValue;
                    $(that._placeValue).each(function () {

                        $('#event-place')
                            .append(`<input type="checkbox" class="evt" value="${this.Place}" Checked >`)
                            .append(` <label for="${this.Place}"> &nbsp; ${this.Place} &nbsp; </label></div> `)
                        if (plc_string === '') {
                            plc_string += "" + this.Place;
                        } else {
                            plc_string += "," + this.Place;
                        }
                    });
                    that._placeValue = plc_string;

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
     
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
        if (this.validateRegisterData() === false) {
            return false;
        }
        
        var places = [];

        //console.log(that._pumpNozzleValue);
        var dpt = that._placeValue.split(',');


        for (var i = 0; i < dpt.length; i++) {
            var rec = dpt[i];
            var evtPlace = rec;
            var plce = evtPlace;

            places.push({ Place: plce });

        }

        var loginName = $("#login-name").val();

        var datatosend = {
            "EventId": this._eventNameValue,
            "CreatedBy": login,
            //"Department": this._departmentValue,
            "PlaceDetails": places,
           
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


    getPlaceData() {
      
        var that = this;
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

                  

                    var list = d.data;
                    $(d.data).each(function () {

                        $('#all-places')
                            .append(`<input type="checkbox" class="dept"  name="interest" value="${this.Place}">`)
                            .append(` <label class="check" for="${this.Place}"> &nbsp; ${this.Place} </label></div> `)
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
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
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
            this._placeValue = jsondata.Place;
            //this.detailsRecords = jsondata.Details;

            this.eventName.value = this._eventNameValue;
            //this.department.value = this._departmentValue;


        } else {

            this.eventName.value = "";
            //this.department.value = "";

        }

    }
}
