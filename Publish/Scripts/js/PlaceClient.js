$(function () {
    placeData();
    eventId = $("#rec-id").val();
});
function placeAdd(rec, id) {
    var _recId = rec;
    eventId = _recId;
    window.location.href = "ChoosePlace?_recId=" + _recId;
}

function placeView(id) {

    
    var _placeId = id;
  
    window.location.href = "Availability?_recId=" + eventId + "&_placeId=" + _placeId;
}

function placeList() {
    //window.location.href = "ServiceBy?_recId=" + _recId;
    window.location.href = "Place";
}

function templateView(id) {
    //var _recId = @_recId;
    var _recId = id;
    window.location.href = "TemplateView?_recId=" + _recId;
}

function newPlace() {
    var x = document.getElementById("add-place");
    x.style.display = "none";
    var y = document.getElementById("addNew-Place");
    y.style.display = "block";
}

function closePlace() {
    var x = document.getElementById("add-place");
    x.style.display = "block";
    var y = document.getElementById("addNew-Place");
    y.style.display = "none";
}

function validateRegisterData() {

    var that = this;
    var s, errorString = "";

    var place = document.getElementById("place").value;
    var desc = document.getElementById("description").value;
    var capacity = document.getElementById("capacity").value;
    

    s = place;


    if (s.length < 3) {
        errorString = "Place should be atleast minimum 3 characters.";
        Common.showErrorMessageFocus(errorString, "Event Place", $(this.place));
        return false;
    } else if (s.length > 100) {
        errorString = "Place should not exceed 100 characters.";
        Common.showErrorMessageFocus(errorString, "Event Place", $(this.place));
        return false;
    }


    s = desc;


    if (s.length < 50) {
        errorString = "Description should be atleast minimum 50 characters.";
        Common.showErrorMessageFocus(errorString, "Event Place", $(this.description));
        return false;
    }

    s = capacity;

    if (s.length < 2) {
        errorString = "Capacity should be atleast minimum 2 characters.";
        Common.showErrorMessageFocus(errorString, "Event Place", $(this.capacity));
        return false;
    }
    return true;
}

function AddPlaceData(id) {
    var recs = $("#rec-id").val();
    var places = $("#place-id").val();
    console.log(recs);


    if (this.validateRegisterData() == false) {
        return false;
    }
    var place = document.getElementById("place").value;
    var desc = document.getElementById("description").value;
    var capacity = document.getElementById("capacity").value;
    var me = this;

    var datatosend = {
        "Place": place,
        "Description": desc,
        "Image": me._fileName,
        "Capacity": capacity,
        "EventId": recs,
    };

    console.log(datatosend);
 
    $.ajax({
        url: web.webapiUrl + '/ApiCustomer/SaveEventPlace',
        dataType: "JSON",
        data: datatosend,
        crossOrigin: true,
        type: "POST",
        success: function (d, st) {

            Common.progress(false);
            if (d.status === 0) {


                Common.showSuccessMessage("New Place Added successfully.", "Place", function () {
                    //alert(iframeFlag);

                    placeData();

                });
            }
            else {
                //Common.showErrorMessageFocus(d.statusText, "PUFS - Template", null);
                Common.showErrorMessage(d.statusText, "PTDC - Template", null);

            }
        },
        error: function (xhr, st, eth) {
            console.log(xhr);
            Common.progress(false);
        }
    });
}

function fileSelectionChanged() {
    var that = this;
    //alert("File change");
    console.log("file change");
    var fi = document.getElementById('newPlace_photo');
    // Check if any file is selected.
    console.log("file", fi);
    if (fi.files.length > 0) {
        var fsize = fi.files.item(0).size;
        var file = Math.round((fsize / 1024));
        // The size of the file.
        if (file > 1024) {
            Common.showErrorMessage(" Image file is too big. Please select a file less than or equal to 1 MB in disk size and 128x128 pixels size!", "Profile photo", null);
            return;
        }
    }

    $("#preview-photo").attr("oldfile", $("#preview-photo").attr("uploadedfile"));

    $("#preview-photo").attr("uploadedfile", "");
    //alert("console");
    console.log($("#preview-photo").attr("uploadedfile", ""));
    var fileUpload = $("#newPlace_photo").get(0);
    var files = fileUpload.files;

    // Create FormData object  
    var fileData = new FormData();

    fileData.append(files[0].name, files[0]);

    // Adding one more key to FormData object  
    fileData.append('filetype', '1');
    fileData.append("oldfile", $("#preview-photo").attr("oldfile"));

    $("#newPlace_photo").prop("disabled", true);

    $.ajax({
        url: web.webapiUrl + 'Home/UploadFile',
        type: "POST",
        contentType: false, // Not to set any content header  
        processData: false, // Not to process data  
        data: fileData,
        success: function (d, st) {

            that._fileName = d.data;



            if (d.data === "")
                Common.showErrorMessage("No file uploaded!", "Basic profile", null);
            else if (d.data.toLowerCase().indexOf("error") >= 0)
                Common.showErrorMessage("Error", "Basic profile", null);
            else {

                $("#preview-photo").attr("src", web.webapiUrl + "UploadedFiles/" + d.data);

            }


            $("#newPlace_photo").prop("disabled", false);


        },
        error: function (err) {
            Common.showErrorMessage(err.statusText, "Basic profile", null);
            $("#newPlace_photo").prop("disabled", false);
        }
    });
}

function placeData(id) {
    var recs = $("#rec-id").val();
    console.log(recs);
   
    var me = this;
    var datatosend = {
        "Id": recs,
       
    };

    
 
    $.ajax({
        url: web.webapiUrl + '/ApiEvent/GetEVentPlaceById',
        dataType: "JSON",
        data: datatosend,
        crossOrigin: true,
        type: "POST",
        success: function (d, st) {

            Common.progress(false);
            if (d.status === 0) {


                me.tableRecords = d.data;
                console.log(d.data);
                console.log("data");

               

                var tmpl = $("#list-item-template").html();
                var listTemplateContainer = $("#list-template-container");


                listTemplateContainer.html("");
                var count = "0";
                var widthSetting = "";
                var checkWidth = "";
                var checkWidthSize = "";
                $(me.tableRecords).each(function () {

                    var s = tmpl;

                    var sPhoto = "";

                    console.log(this.PlaceImage);
                    if (this.PlaceImage.trim() !== "") {

                        sPhoto = web.webapiUrl + "UploadedFiles/" + this.PlaceImage;

                    } else {
                        sPhoto = web.webapiUrl + "UploadedFiles/logo.jpg";

                    }


                    s = s.replace(/{{rid}}/g, this.Id);
                    s = s.replace(/{{place}}/g, this.Place);
                    s = s.replace(/{{placedescription}}/g, this.Description);
                    s = s.replace(/{{capacity}}/g, this.Capacity);
                    s = s.replace(/{{placeimage}}/g, sPhoto);
                    console.log(this);
                   
                    /*s = s.replace(/{{data}}/g, d.data);*/
                    listTemplateContainer.append(s);
                    count = parseInt(count) + parseInt(1);
                    /*listTemplateContainer.append("<hr />");*/
                });
                //listTemplateContainer.owlCarousel('destroy');
                //console.log(count);
                //if (count > 3) {
                //    widthSetting = window.innerWidth > 768 ? 3 : 1;
                //    checkWidth = true;
                //    checkWidthSize = false;
                //}
                //else if (count > 1) {
                //    widthSetting = window.innerWidth > 768 ? 2 : 1;
                //    checkWidth = false;
                //    checkWidthSize = false;
                //} 
                //else {
                //    widthSetting = window.innerWidth > 768 ? count : 1;
                //    checkWidth = false;
                //    checkWidthSize = true;
                //}
                //listTemplateContainer.owlCarousel({
                //    //margin: 10,
                //    //loop: checkWidth,
                //    //nav: true,
                //    //autoWidth: checkWidthSize,
                //    //autoplay: true,
                //    //autoplayTimeout: 4000,
                //    //autoplayHoverPause: true,
                //    //center: true,

                //    margin: 10,
                //    loop: true,
                //    nav: true,
                //    autoWidth: false,
                //    autoplay: true,
                //    autoplayTimeout: 4000,
                //    autoplayHoverPause: true,

                //    /*items: 5,*/
                //    items: widthSetting,
                //    //navText: [
                //    //    "<i class='fa fa-arrow-circle-left'></i>",
                //    //    "<i class='fa fa-arrow-circle-right'></i>"
                //    //],
                //    navText: [
                //        "<i class='fa fa-arrow-left' style='color:brown;'></i>",
                //        "<i class='fa fa-arrow-right' style='color:brown;'></i>"
                //    ],
                //})
              
            }
            else {
                //Common.showErrorMessageFocus(d.statusText, "PUFS - Template", null);
                Common.showErrorMessage(d.statusText, "PTDC - Template", null);

            }
        },
        error: function (xhr, st, eth) {
            console.log(xhr);
            Common.progress(false);
        }
    });
}