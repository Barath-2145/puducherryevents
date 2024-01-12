class PBCustomerFormComponent extends PBCompnent {
  constructor(compID) {
    super(compID);
    this.onSaveCompleted = null;
    this.onCancelled = null;
    this.init();
  }

  init() {
    var that = this;
    this.getData();
    Common.hideLoader();

    if (this.verifyRefer) {
      that = this;
      this.verifyRefer.addEventListener("click", function () {
        that.verifyReference();
      });
    }

    if (this.saveCustomer) {
      that = this;
      this.saveCustomer.addEventListener("click", function () {
        that.postData();
      });
      //console.log("save User create and added click listener");
    }
    if (this.cancelCustomer) {
      that = this;
      this.cancelCustomer.addEventListener("click", function () {
        if (that.onCancelled) {
          that.hide();
          that.onCancelled();
        }
      });
      //console.log("cancel User create and added click listener");
    }

    this._saveURL = "";
    this._idValue = "";
    this._nameValue = "";
    this._mobileNoValue = "";
    this._emailIdValue = "";
    this._transactionNo = "";
    this._organizationValue = "";
    this._organizationMobileValue = "";
    this._governmentIdValue = "";
    this._referValue = "";
    this._eventDetailsValue = "";
    this._flagValue = "";
    this._noOfPeople = "";
    this._eventTicket = "";
    this._eventCharity = "";
    this._eventDetails = "";
    this._enteranceFee = "";
    this._liquorLicence = "";
    this._liquorDetails = "";
    this._entertainment = "";
    this._food = "";
    this._foodDetails = "";
    this._bins = "";
    this._barriers = "";
    this._barrierDetails = "";
    this._riskAssesment = "";
    this._toilets = "";
    this._toiletDetails = "";
    this._liveBands = "";
    this._rides = "";
    this._stalls = "";
    this._staging = "";
    this._healthSafety = "";
    this._route = "";
    this._guidelines = "";
    this._parking = "";
    this._organisationPosition = "";
    this._signature = "";
    this._idProofValue = "";
    this._eventPlan = "";
    this._previewProfilePhotoValue = "";
    this._fileName = "";
    this._fileName2 = "";
    this._fileName3 = "";
    this._fileName4 = "";
    this._addressValue = "";
    this._ticketDetails = "";
    this._organizationUrl = "";
    this._gstNo = "";

    if (this.name) {
      this.name.addEventListener("blur", function () {
        that.validateName();
      });
    }
    if (this.address) {
      this.address.addEventListener("blur", function () {
        that._addressValue = that.address.value;
      });
    }
    if (this.mobileNo) {
      this.mobileNo.addEventListener("blur", function () {
        that.validateMobileNo();
      });
    }
    if (this.organization) {
      this.organization.addEventListener("blur", function () {
        that._organizationValue = that.organization.value;
      });
    }
    if (this.organizationMobileNo) {
      this.organizationMobileNo.addEventListener("blur", function () {
        that.validateOrganizationMobileNo();
      });
    }
    if (this.emailId) {
      this.emailId.addEventListener("blur", function () {
        that.validateEmailId();
      });
    }
    if (this.governmentId) {
      this.governmentId.addEventListener("blur", function () {
        that._governmentIdValue = that.governmentId.value;
      });
    }
    if (this.idProof) {
      this.idProof.addEventListener("blur", function () {
        that._idProofValue = that.idProof.value;
      });
    }
    if (this.gstNo) {
      this.gstNo.addEventListener("blur", function () {
        that.validateGstNo();
      });
    }

    if (this.eventDetails) {
      this.eventDetails.addEventListener("blur", function () {
        that._eventDetailsValue = that.eventDetails.value;
      });
    }

    if (this.transactionNo) {
      this.transactionNo.addEventListener("blur", function () {
        that._transactionNo = that.transactionNo.value;
      });
    }

    if (this.flag) {
      that = this;
      this.flag.addEventListener("click", function () {
        if ($(that.flag).is(":checked")) that._flagValue = 1;
        else that._flagValue = 0;
      });
    }
    if (this.noPeople) {
      this.noPeople.addEventListener("blur", function () {
        that.validateNoOfPeople();
      });
    }
    if (this.eventTicket) {
      this.eventTicket.addEventListener("blur", function () {
        that._eventTicket = that.eventTicket.value;
      });
    }
    if (this.eventCharity) {
      this.eventCharity.addEventListener("change", function () {
        that._eventCharity = that.eventCharity.value;
        if (that._eventCharity == "No") {
          $("#further-details").prop({ disabled: false, required: true });
        } else {
          $("#further-details").prop({ disabled: true, required: false });
        }
      });
    }

    if (this.furtherDetails) {
      this.furtherDetails.addEventListener("blur", function () {
        that._ticketDetails = that.furtherDetails.value;
      });
    }
    if (this.enteranceFee) {
      this.enteranceFee.addEventListener("blur", function () {
        that._enteranceFee = that.enteranceFee.value;
      });
    }
    if (this.liquorLicence) {
      this.liquorLicence.addEventListener("change", function () {
        that._liquorLicence = that.liquorLicence.value;
        if (that._liquorLicence == "Yes") {
          $("#liquor-details").prop({ disabled: false, required: true });
        } else {
          $("#liquor-details").prop({ disabled: true, required: false });
        }
      });
    }
    if (this.liquorDetails) {
      this.liquorDetails.addEventListener("blur", function () {
        that._liquorDetails = that.liquorDetails.value;
      });
    }
    if (this.entertainment) {
      this.entertainment.addEventListener("blur", function () {
        that._entertainment = that.entertainment.value;
      });
    }
    if (this.food) {
      this.food.addEventListener("change", function () {
        that._food = that.food.value;
        if (that._food == "Yes") {
          $("#food-details").prop({ disabled: false, required: true });
        } else {
          $("#food-details").prop({ disabled: true, required: false });
        }
      });
    }
    if (this.foodDetails) {
      this.foodDetails.addEventListener("blur", function () {
        that._foodDetails = that.foodDetails.value;
      });
    }
    if (this.bins) {
      this.bins.addEventListener("blur", function () {
        that._bins = that.bins.value;
      });
    }
    if (this.organizationUrl) {
      this.organizationUrl.addEventListener("blur", function () {
        that._organizationUrl = that.organizationUrl.value;
      });
    }
    if (this.barriers) {
      this.barriers.addEventListener("change", function () {
        that._barriers = that.barriers.value;
        if (that._barriers == "Yes") {
          $("#barrier-details").prop({ disabled: false, required: true });
        } else {
          $("#barrier-details").prop({ disabled: true, required: false });
        }
      });
    }
    if (this.barrierDetails) {
      this.barrierDetails.addEventListener("blur", function () {
        that._barrierDetails = that.barrierDetails.value;
      });
    }
    if (this.risk) {
      this.risk.addEventListener("blur", function () {
        that._riskAssesment = that.risk.value;
      });
    }
    if (this.toilets) {
      this.toilets.addEventListener("change", function () {
        that._toilets = that.toilets.value;
        if (that._toilets == "Yes") {
          $("#toilet-details").prop({ disabled: false, required: true });
        } else {
          $("#toilet-details").prop({ disabled: true, required: false });
        }
      });
    }
    if (this.toiletDetails) {
      this.toiletDetails.addEventListener("blur", function () {
        that._toiletDetails = that.toiletDetails.value;
      });
    }
    if (this.liveBands) {
      this.liveBands.addEventListener("blur", function () {
        that._liveBands = that.liveBands.value;
      });
    }
    if (this.rides) {
      this.rides.addEventListener("blur", function () {
        that._rides = that.rides.value;
      });
    }
    if (this.stalls) {
      this.stalls.addEventListener("blur", function () {
        that._stalls = that.stalls.value;
      });
    }
    if (this.staging) {
      this.staging.addEventListener("blur", function () {
        that._staging = that.staging.value;
      });
    }
    if (this.healthSafety) {
      this.healthSafety.addEventListener("blur", function () {
        that._healthSafety = that.healthSafety.value;
      });
    }
    if (this.route) {
      this.route.addEventListener("blur", function () {
        that._route = that.route.value;
      });
    }
    if (this.guidelines) {
      this.guidelines.addEventListener("blur", function () {
        that._guidelines = that.guidelines.value;
      });
    }
    if (this.toiletDetails) {
      this.toiletDetails.addEventListener("blur", function () {
        that._toiletDetails = that.toiletDetails.value;
      });
    }
    if (this.positionOrganization) {
      this.positionOrganization.addEventListener("blur", function () {
        that._organisationPosition = that.positionOrganization.value;
      });
    }
    if (this.parking) {
      this.parking.addEventListener("blur", function () {
        that._parking = that.parking.value;
      });
    }
    if (this.signaturePhoto) {
      this.signaturePhoto.addEventListener("blur", function () {
        that._signature = that.signaturePhoto.value;
      });
    }
    if (this.planPhoto) {
      this.planPhoto.addEventListener("blur", function () {
        that._eventPlan = that.planPhoto.value;
      });
    }
  }

  hide() {
    if (this.customerForm) this.customerForm.style.display = "none";
  }
  show() {
    this.customerForm.style.display = "unset";
  }

  validateName() {
    //console.log("validateFullName");
    var errorString = "";

    var s = this.name.value;
    s = s.trim().removeInvalidCharacters("`~!#$%^&*()_+={}[]\\|\"':;<>,?/");

    this._nameValue = s;
    this.name.value = s;
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
  validateNoOfPeople() {
    //console.log("validateFullName");
    var errorString = "";

    var s = this.noPeople.value;
    s = s.trim().removeInvalidCharacters("`~!#$%^&*()_+={}[]\\|\"':;<>,?/");
    s = s.trim().allowValidCharacters("1234567890");
    this._noOfPeople = s;
    this.noPeople.value = s;
  }
  validateOrganizationMobileNo() {
    //console.log("validateFullName");
    var errorString = "";

    var s = this.organizationMobileNo.value;
    s = s.trim().removeInvalidCharacters("`~!#$%^&*()_+={}[]\\|\"':;<>,?/");
    s = s.trim().allowValidCharacters("1234567890");
    this._organizationMobileValue = s;
    this.organizationMobileNo.value = s;
  }
  validateGstNo() {
    //console.log("validateFullName");

    var s = this.gstNo.value;
    s = s.trim().removeInvalidCharacters("`~!#$%^&*()_+={}[]\\|\"'@:;<>,?/");

    this._gstNo = s;
    this.gstNo.value = s;
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

  selectProfilePhoto() {
    //alert("selected photo");
    console.log("Selected photo");
    $("#profile_photo").trigger("click");
    return false;
  }

  fileSelectionChanged() {
    var that = this;
    //alert("File change");
    console.log("file change");
    var fi = document.getElementById("profile_photo");
    // Check if any file is selected.
    if (fi.files.length > 0) {
      var fsize = fi.files.item(0).size;
      var file = Math.round(fsize / 1024);
      // The size of the file.
      if (file > 1024) {
        Common.showErrorMessage(
          "Profile photo file is too big. Please select a file less than or equal to 1 MB in disk size and 128x128 pixels size!",
          "Profile photo",
          null
        );
        return;
      }
    }

    $("#preview-photo").attr(
      "oldfile",
      $("#preview-photo").attr("uploadedfile")
    );

    $("#preview-photo").attr("uploadedfile", "");
    //alert("console");
    console.log($("#preview-photo").attr("uploadedfile", ""));
    var fileUpload = $("#profile_photo").get(0);
    var files = fileUpload.files;

    // Create FormData object
    var fileData = new FormData();

    fileData.append(files[0].name, files[0]);

    // Adding one more key to FormData object
    fileData.append("filetype", "1");
    fileData.append("oldfile", $("#preview-photo").attr("oldfile"));

    $("#profile_photo").prop("disabled", true);

    $.ajax({
      url: web.webapiUrl + "Home/UploadFile",
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
          $("#preview-photo").attr(
            "src",
            web.webapiUrl + "UploadedFiles/" + d.data
          );
        }

        $("#profile_photo").prop("disabled", false);
      },
      error: function (err) {
        Common.showErrorMessage(err.statusText, "Basic profile", null);
        $("#profile_photo").prop("disabled", false);
      },
    });
  }

  fileSelectionChanged2() {
    var that = this;
    //alert("File change");
    console.log("file change");
    var fi = document.getElementById("signature_photo");
    // Check if any file is selected.
    if (fi.files.length > 0) {
      var fsize = fi.files.item(0).size;
      var file = Math.round(fsize / 1024);
      // The size of the file.
      if (file > 1024) {
        Common.showErrorMessage(
          "Signature photo file is too big. Please select a file less than or equal to 1 MB in disk size and 128x128 pixels size!",
          "Signature photo",
          null
        );
        return;
      }
    }

    $("#preview-photo").attr(
      "oldfile",
      $("#preview-photo").attr("uploadedfile")
    );

    $("#preview-photo").attr("uploadedfile", "");
    //alert("console");
    console.log($("#preview-photo").attr("uploadedfile", ""));
    var fileUpload = $("#signature_photo").get(0);
    var files = fileUpload.files;

    // Create FormData object
    var fileData = new FormData();

    fileData.append(files[0].name, files[0]);

    // Adding one more key to FormData object
    fileData.append("filetype", "1");
    fileData.append("oldfile", $("#preview-photo").attr("oldfile"));

    $("#signature_photo").prop("disabled", true);

    $.ajax({
      url: web.webapiUrl + "Home/UploadFile",
      type: "POST",
      contentType: false, // Not to set any content header
      processData: false, // Not to process data
      data: fileData,
      success: function (d, st) {
        that._fileName2 = d.data;

        if (d.data === "")
          Common.showErrorMessage("No file uploaded!", "Basic profile", null);
        else if (d.data.toLowerCase().indexOf("error") >= 0)
          Common.showErrorMessage("Error", "Basic profile", null);
        else {
          $("#preview-photo").attr(
            "src",
            web.webapiUrl + "UploadedFiles/" + d.data
          );
        }

        $("#signature_photo").prop("disabled", false);
      },
      error: function (err) {
        Common.showErrorMessage(err.statusText, "Basic profile", null);
        $("#signature_photo").prop("disabled", false);
      },
    });
  }
  fileSelectionChanged3() {
    var that = this;
    //alert("File change");
    console.log("file change");
    var fi = document.getElementById("plan_photo");
    // Check if any file is selected.
    if (fi.files.length > 0) {
      var fsize = fi.files.item(0).size;
      var file = Math.round(fsize / 1024);
      // The size of the file.
      if (file > 1024) {
        Common.showErrorMessage(
          "Signature photo file is too big. Please select a file less than or equal to 1 MB in disk size and 128x128 pixels size!",
          "Signature photo",
          null
        );
        return;
      }
    }

    $("#preview-photo").attr(
      "oldfile",
      $("#preview-photo").attr("uploadedfile")
    );

    $("#preview-photo").attr("uploadedfile", "");
    //alert("console");
    console.log($("#preview-photo").attr("uploadedfile", ""));
    var fileUpload = $("#plan_photo").get(0);
    var files = fileUpload.files;

    // Create FormData object
    var fileData = new FormData();

    fileData.append(files[0].name, files[0]);

    // Adding one more key to FormData object
    fileData.append("filetype", "1");
    fileData.append("oldfile", $("#preview-photo").attr("oldfile"));

    $("#plan_photo").prop("disabled", true);

    $.ajax({
      url: web.webapiUrl + "Home/UploadFile",
      type: "POST",
      contentType: false, // Not to set any content header
      processData: false, // Not to process data
      data: fileData,
      success: function (d, st) {
        that._fileName3 = d.data;

        if (d.data === "")
          Common.showErrorMessage("No file uploaded!", "Basic profile", null);
        else if (d.data.toLowerCase().indexOf("error") >= 0)
          Common.showErrorMessage("Error", "Basic profile", null);
        else {
          $("#preview-photo").attr(
            "src",
            web.webapiUrl + "UploadedFiles/" + d.data
          );
        }

        $("#plan_photo").prop("disabled", false);
      },
      error: function (err) {
        Common.showErrorMessage(err.statusText, "Basic profile", null);
        $("#plan_photo").prop("disabled", false);
      },
    });
  }

  fileSelectionChanged4() {
    var that = this;
    //alert("File change");
    console.log("file change");
    var fi = document.getElementById("cover_letter");
    // Check if any file is selected.
    if (fi.files.length > 0) {
      var fsize = fi.files.item(0).size;
      var file = Math.round(fsize / 1024);
      // The size of the file.
      if (file > 1024) {
        Common.showErrorMessage(
          "Cover Letter file is too big. Please select a file less than or equal to 1 MB in disk size and 128x128 pixels size!",
          "Signature photo",
          null
        );
        return;
      }
    }

    $("#preview-photo").attr(
      "oldfile",
      $("#preview-photo").attr("uploadedfile")
    );

    $("#preview-photo").attr("uploadedfile", "");
    //alert("console");
    console.log($("#preview-photo").attr("uploadedfile", ""));
    var fileUpload = $("#cover_letter").get(0);
    var files = fileUpload.files;

    // Create FormData object
    var fileData = new FormData();

    fileData.append(files[0].name, files[0]);

    // Adding one more key to FormData object
    fileData.append("filetype", "1");
    fileData.append("oldfile", $("#preview-photo").attr("oldfile"));

    $("#cover_letter").prop("disabled", true);

    $.ajax({
      url: web.webapiUrl + "Home/UploadFile",
      type: "POST",
      contentType: false, // Not to set any content header
      processData: false, // Not to process data
      data: fileData,
      success: function (d, st) {
        that._fileName4 = d.data;

        if (d.data === "")
          Common.showErrorMessage("No file uploaded!", "Basic profile", null);
        else if (d.data.toLowerCase().indexOf("error") >= 0)
          Common.showErrorMessage("Error", "Basic profile", null);
        else {
          $("#preview-photo").attr(
            "src",
            web.webapiUrl + "UploadedFiles/" + d.data
          );
        }

        $("#cover_letter").prop("disabled", false);
      },
      error: function (err) {
        Common.showErrorMessage(err.statusText, "Basic profile", null);
        $("#cover_letter").prop("disabled", false);
      },
    });
  }

  getData() {
    var that = this;
    console.log(that.nameURL, "---------------------getnamedata");
    // Common.showLoader();
    $.ajax({
      url: web.webapiUrl + "ApiCustomer/GetReferId",
      dataType: "JSON",
      type: "POST",
      success: function (d, st) {
        //console.log(d);
        //  Common.hideLoader();
        if (d.status === 0) {
          console.log(d.data);

          $(d.data).each(function () {
            document.getElementById("ref-id").innerHTML = this.Id;
            that._referValue = this.Id;
          });
        } else {
          Common.showErrorMessage(d.statusText, "Event List", null);
        }
      },
      error: function (xhr, st, eth) {
        //console.log(xhr);
        Common.hideLoader();
      },
    });
  }

  verifyReference() {
    var refId = this._referValue;
    var referenceId = $("#reference-id").val();

    if (referenceId == "") {
      Common.showErrorMessage(
        "Please Enter Referce Id!",
        "Event Booking",
        null
      );
    } else if (refId == referenceId) {
      //Common.showErrorMessage("Fill you Details!", "Event Booking", null);
      $("#ref-form").hide();
      $("#detail-form").show();
    } else {
      Common.showErrorMessage(
        "Enter Correct Reference Id",
        "Event Booking",
        null
      );
    }
  }

  validateRegisterData() {
    var that = this;
    var s,
      errorString,
      ctl = "";

    s = that.name.value;

    if (s.length < 3) {
      ctl = $("#name");
      errorString = "Name should be atleast minimum 3 characters.";
      //alert("Name should be atleast minimum 3 characters.");
      //setTimeout(function () {
      //    document.getElementById('name').focus();

      //}, 1);
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("name").focus()
      );
      return false;
    } else if (s.length > 100) {
      errorString = "Name should not exceed 100 characters.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("name").focus()
      );
      return false;
    }

    s = that.address.value;

    if (s.length < 3) {
      ctl = $("#address");
      errorString = "Address should be atleast minimum 3 characters.";
      //alert("Name should be atleast minimum 3 characters.");
      //setTimeout(function () {
      //    document.getElementById('name').focus();

      //}, 1);
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("address").focus()
      );
      return false;
    } else if (s.length > 100) {
      errorString = "Addess should not exceed 100 characters.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("address").focus()
      );
      return false;
    }

    s = this.mobileNo.value;

    if (s.length < 10) {
      errorString = "Mobile should be in 10 characters.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("mobile-no").focus()
      );
      return false;
    }

    s = this.emailId.value;

    if (s.length < 8) {
      errorString = "Email id should be atleast minimum 8 characters.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("email-id").focus()
      );
      return false;
    } else if (s.length > 100) {
      errorString = "Email id  should not exceed 100 characters.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("email-id").focus()
      );
      return false;
    } else {
      var pattern =
        /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;
      if (!pattern.test(s)) {
        errorString = "Email id should be invalid format.";
        Common.showErrorMessage(
          errorString,
          "Customer",
          document.getElementById("email-id").focus()
        );
        return false;
      }
    }

    s = that.organization.value;

    if (s.length < 3) {
      ctl = $("#organization");
      errorString = "Organization Name should be atleast minimum 3 characters.";
      //alert("Name should be atleast minimum 3 characters.");
      //setTimeout(function () {
      //    document.getElementById('name').focus();

      //}, 1);
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("organization").focus()
      );
      return false;
    } else if (s.length > 100) {
      errorString = "Organization Name should not exceed 100 characters.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("organization").focus()
      );
      return false;
    }

    s = this.organizationUrl.value;

    if (s != "") {
      if (s.length < 8) {
        errorString =
          "Organization url should be atleast minimum 8 characters.";
        Common.showErrorMessage(
          errorString,
          "Customer",
          document.getElementById("organization-url").focus()
        );
        return false;
      } else if (s.length > 100) {
        errorString = "Organization url  should not exceed 100 characters.";
        Common.showErrorMessage(
          errorString,
          "Customer",
          document.getElementById("organization-url").focus()
        );
        return false;
      } else {
        var pattern = new RegExp(
          "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
          "i"
        ); // fragment locator
        if (!pattern.test(s)) {
          errorString = "Organization Url should be invalid format.";
          Common.showErrorMessage(
            errorString,
            "Customer",
            document.getElementById("organization-url").focus()
          );
          return false;
        }
      }
    }

    if (this._organisationPosition == "") {
      errorString = "Choose Position in Organisation Option.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("position-organization").focus()
      );
      return false;
    }

    if (this._governmentIdValue == "") {
      errorString = "GovernmentId should not be empty.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("government-id").focus()
      );
      return false;
    }
    if (this._gstNo == "") {
      errorString = "GST Number should not be empty.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("gst-no").focus()
      );
      return false;
    }
    if (this._gstNo.length < 15) {
      errorString = "GST Number should be 15 Charaters.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("gst-no").focus()
      );
      return false;
    }

    if (this._eventDetailsValue == "") {
      errorString = "Event Name should not be empty.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("event-details").focus()
      );
      return false;
    }

    if (this._noOfPeople == "") {
      errorString = "Enter No of People Expected.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("no-people").focus()
      );
      return false;
    }
    if (this._noOfPeople.length < 2) {
      errorString = "Number of People Expected atleast 2 Digits.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("gst-no").focus()
      );
      return false;
    }
    if (this._eventTicket == "") {
      errorString = "Choose Event Ticket Option.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("event-ticket").focus()
      );
      return false;
    }

    if (this._enteranceFee == "") {
      errorString = "Choose Enterance Fee Option.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("enterance-fee").focus()
      );
      return false;
    }

    if (this._entertainment == "") {
      errorString = "Choose Entertainment Option.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("entertainment").focus()
      );
      return false;
    }
    if (this._liveBands == "") {
      errorString = "Choose Live Bands Option.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("live-bands").focus()
      );
      return false;
    }
    if (this._rides == "") {
      errorString = "Choose Live Bands Option.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("rides").focus()
      );
      return false;
    }
    if (this._stalls == "") {
      errorString = "Choose Stalls Option.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("stalls").focus()
      );
      return false;
    }
    if (this._staging == "") {
      errorString = "Choose Staging Option.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("staging").focus()
      );
      return false;
    }
    if (this._bins == "") {
      errorString = "Choose Bins Option.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("bins").focus()
      );
      return false;
    }
    if (this._riskAssesment == "") {
      errorString = "Choose Risk Assesment Option.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("risk").focus()
      );
      return false;
    }

    if (this._parking == "") {
      errorString = "Choose Parking Area Option.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("parking").focus()
      );
      return false;
    }

    if (this._eventCharity == "") {
      errorString = "Choose Event Charity Option.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("event-charity").focus()
      );
      return false;
    }

    if (this._eventCharity == "No") {
      if (this._ticketDetails == "") {
        errorString = "Enter Further Details.";
        Common.showErrorMessage(
          errorString,
          "Customer",
          document.getElementById("further-details").focus()
        );
        return false;
      }
    }

    if (this._liquorLicence == "") {
      errorString = "Choose Liquor Licence Option.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("liquor-licence").focus()
      );
      return false;
    }
    if (this._liquorLicence == "Yes") {
      if (this._liquorDetails == "") {
        errorString = "Enter Liquor Details.";
        Common.showErrorMessage(
          errorString,
          "Customer",
          document.getElementById("liquor-details").focus()
        );
        return false;
      }
    }

    if (this._food == "") {
      errorString = "Choose Food Option.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("food").focus()
      );
      return false;
    }
    if (this._food == "Yes") {
      if (this._foodDetails == "") {
        errorString = "Enter Food Details.";
        Common.showErrorMessage(
          errorString,
          "Customer",
          document.getElementById("food-details").focus()
        );
        return false;
      }
    }

    if (this._barriers == "") {
      errorString = "Choose Barriers Option.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("barriers").focus()
      );
      return false;
    }
    if (this._barriers == "Yes") {
      if (this._barrierDetails == "") {
        errorString = "Enter Barriers Details.";
        Common.showErrorMessage(
          errorString,
          "Customer",
          document.getElementById("barrier-details").focus()
        );
        return false;
      }
    }

    if (this._toilets == "") {
      errorString = "Choose Toilets Option.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("toilets").focus()
      );
      return false;
    }
    if (this._toilets == "Yes") {
      if (this._toiletDetails == "") {
        errorString = "Enter Toilet Details.";
        Common.showErrorMessage(
          errorString,
          "Customer",
          document.getElementById("toilet-details").focus()
        );
        return false;
      }
    }

    if (this._route == "") {
      errorString = "Choose Route Option.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("route").focus()
      );
      return false;
    }
    if (this._guidelines == "") {
      errorString = "Choose Guidelines Option.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("guidelines").focus()
      );
      return false;
    }
    if (this._healthSafety == "") {
      errorString = "Choose Health Safety Option.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("health-safety").focus()
      );
      return false;
    }
    if (this._fileName == "") {
      errorString = "Upload your Id Proof.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("profile_photo").focus()
      );
      return false;
    }
    if (this._fileName3 == "") {
      errorString = "Upload your Event Plan.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("plan_photo").focus()
      );
      return false;
    }
    if (this._fileName2 == "") {
      errorString = "Upload your signature.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("signature_photo").focus()
      );
      return false;
    }
    if (this._fileName4 == "") {
      errorString = "Upload your cover letter.";
      Common.showErrorMessage(
        errorString,
        "Customer",
        document.getElementById("cover_letter").focus()
      );
      return false;
    }

    //s = this.transactionNo.value;

    //if (s.length < 10) {
    //    errorString = "Transaction No should be atleast minimum 10 characters.";
    //    Common.showErrorMessage(errorString, "Customer", document.getElementById('transaction-no').focus());
    //    return false;
    //} else if (s.length > 16) {
    //    errorString = "Transaction No should not exceed 100 characters.";
    //    Common.showErrorMessage(errorString, "Customer", document.getElementById('transaction-no').focus());
    //    return false;
    //}

    return true;
  }

  postData() {
    var that = this;

    if (this.validateRegisterData() === false) {
      return false;
    }
    var recs = $("#rec-id").val();
    var recs2 = parseInt(recs);
    console.log(recs2);
    console.log(recs);

    var datatosend = {
      Name: this._nameValue,
      Address: this._addressValue,
      OrganizationUrl: this._organizationUrl,
      Organization: this._organizationValue,
      OrganizationMobileNo: this._organizationMobileValue,
      IdProof: this._fileName,
      GSTNo: this._gstNo,
      MobileNo: this._mobileNoValue,
      EmailId: this._emailIdValue,
      GovernmentId: this._governmentIdValue,
      EventDetails: this._eventDetailsValue,
      ReferenceId: this._referValue,
      NoPeople: this._noOfPeople,
      EventTicket: this._eventTicket,
      EventCharity: this._eventCharity,
      TicketDetails: this._ticketDetails,
      EnteranceFee: this._enteranceFee,
      LiquorLicence: this._liquorLicence,
      LiquorDetails: this._liquorDetails,
      Entertainment: this._entertainment,
      Food: this._food,
      FoodDetails: this._foodDetails,
      Bins: this._bins,
      Barriers: this._barriers,
      BarrierDetails: this._barrierDetails,
      Risk: this._riskAssesment,
      Toilets: this._toilets,
      ToiletDetails: this._toiletDetails,
      LiveBands: this._liveBands,
      Rides: this._rides,
      Stalls: this._stalls,
      Staging: this._staging,
      HealthSafety: this._healthSafety,
      Route: this._route,
      Guidelines: this._guidelines,
      OrganizationPosition: this._organisationPosition,
      ParkingArea: this._parking,
      AuthorisedSignature: this._fileName2,
      EventPlan: this._fileName3,
      CoverLetter: this._fileName4,
      //"TransactionNo": this._transactionNo,
    };
    console.log(datatosend);

    //console.log(datatosend, "-----------------------------");
    //console.log(that.saveURL, "-----------------------------");
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
          Common.showSuccessMessage(
            "Customer Details saved successfully.",
            "Customer",
            null
          );
          if (that.onSaveCompleted) {
            that.onSaveCompleted();
          }
        } else {
          Common.showErrorMessage(d.statusText, "Customer", null);
        }
      },
      error: function (xhr, st, eth) {
        //console.log(xhr);
        Common.hideLoader();
      },
    });
  }

  populateData(jsondata) {
    var that = this;
    if (jsondata !== null) {
      //console.log(jsondata);

      this._idValue = jsondata.Id;
      this._nameValue = jsondata.Name;
      this._mobileNoValue = jsondata.MobileNo;
      this._emailIdValue = jsondata.EmailId;
      this._governmentIdValue = jsondata.GovernmentId;
      //this._locationValue = jsondata.Location;
      this._organizationValue = jsondata.Organization;
      this._gstNo = jsondata.GstNo;
      this._eventDetailsValue = jsondata.EventDetails;
      this._idProofValue = jsondata.IdProof;
      this._flagValue = jsondata.Status;

      this.name.innerHTML = jsondata.Name;
      this.organization.innerHTML = jsondata.Organization;
      this.mobileNo.innerHTML = jsondata.MobileNo;
      this.emailId.innerHTML = jsondata.EmailId;
      this.governmentId.innerHTML = jsondata.GovernmentId;
      this.gstNo.innerHTML = jsondata.GstNo;
      //this.location.innerHTML = jsondata.Location;
      this.eventDetails.innerHTML = jsondata.EventDetails;
      this._fileName = jsondata.IdProof;
      $("#preview-photo").attr(
        "src",
        web.webapiUrl + "UploadedFiles/" + this._fileName
      );

      //this.name.value = this._nameValue;
      //this.organization.value = this._organizationValue;
      //this.mobileNo.value = this._mobileNoValue;
      //this.emailId.value = this._emailIdValue;
      //this.governmentId.value = this._governmentIdValue;
      //this.fromDate.value = this._fromDateValue;
      //this.toDate.value = this._toDateValue;
      //this.location.value = this._locationValue;
      //this.eventDetails.value = this._eventDetailsValue;
      //this.idProof.value = this._idProofValue;
    } else {
      this.name.value = "";
      this.organization.value = "";
      this.mobileNo.value = "";
      this.emailId.value = "";
      this.governmentId.value = "";
      this.gstNo.value = "";

      //this.location.value = "";
      this.eventDetails.value = "";
      this.idProof.value = "";
    }
  }
}
