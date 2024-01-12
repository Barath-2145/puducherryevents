var Login = {

};

$(function () {
    Login.init();
   
});

Login.init = function () {    
    var loginComponent = new PBLoginComponent("login-panel");
    // alert(pbc.toString());
    loginComponent.saveURL = "ApiUser/Login";
    console.log(loginComponent.saveURL);

    //loginComponent.populateData({ "userNameField": "", "passwordField": "" });
};

 class PBLoginComponent extends PBCompnent {
        constructor(compID) {
            super(compID);
            this.init();
        }

        init() {
            if (this.loginEnterButton) {
                var that = this;
                this.loginEnterButton.addEventListener("click", function () {
                    that.postData();
                });
                console.log("Login found and added click listener");
            }

            this._userName = "";
            this._password = "";
            if (this.userNameField) {
                this.userNameField.addEventListener("blur", function () {
                    that._userName = that.userNameField.value;
                });
            }
            if (this.passwordField) {
                this.passwordField.addEventListener("blur", function () {
                    that._password = that.passwordField.value;
                });
            }
        }

        set saveURL(url) {
            this._saveURL = url;
        }

        get saveURL() {
            return this._saveURL;
        }

        populateData(jsonData) {
            this.userNameField.value = jsonData.userNameField;
            this.passwordField.value = jsonData.passwordField;
        }

     validateRegisterData() {
         var that = this;
         var errorString = "";
         // alert("cv");
         // let u = this._userName;
         // let p = this.'

         if (this._userName == "") {
             errorString = "Username should not be empty.";
             Common.showErrorMessageFocus(
                 errorString,
                 "Login",
                 document.getElementById("user-name-field").focus()
             );
             return false;
         }

         if (this._password == "") {
             errorString = "Password should not be empty.";
             Common.showErrorMessageFocus(
                 errorString,
                 "Login",
                 document.getElementById("password-field").focus()
             );
             return false;
         }
     }

        postData() {
           
            var that = this;
            //console.log(this["userNameField"]);
            if (this.validateRegisterData() === false) {
                return false;
            }
            Common.showLoader();  
            var datatosend = {
                "username": that.userNameField.value,
                "password": that.passwordField.value,
            }
            console.log(datatosend,"-----------------------------");

            //alert(window.userNames.value);
           
            $.ajax({
                //url: web.webapiUrl + that.saveURL,
                url: web.webapiUrl + "ApiUser/Login",
               // url: "/Home/Logon",
                //data: { username: "raj", "password": "123456" },
                //contentType: false,
                //processData: false,
                //ContentType: "application/json",
                data: datatosend,
                dataType: "JSON",
                type: "POST",
                success: function (d, st) {

                    Common.hideLoader();
                    if (d.status === 0) {
                        var a = JSON.stringify(d.data);

                        var obj = JSON.parse(d.data.Result);
                        console.log(obj);
                        localStorage.setItem("token", obj.access_token);
                        localStorage.setItem("role", obj.Role);
                        localStorage.setItem("firstname", obj.FirstName);
                        localStorage.setItem("username", obj.Username);
                        localStorage.setItem("departmentId", obj.DepartmentId);
                        console.log(obj.access_token);


                        if (obj.Role === "ADMIN") {
                            window.location = "/Customer/Verify";
                        }
                        else if (obj.Role === "USER") {
                            window.location = "/User/PermissionLetter";
                        }
                        else if (obj.Role === "DEPARTMENT") {
                            window.location = "/Department/Verify";
                        }
                        else if (obj.Role === "SUPERADMIN") {

                            window.location = "/Permission/Index";
                        }
                        //alert("success");
                    }
                    else {
                        Common.showErrorMessageFocus(d.statusText, "Login", null);
                    }
                 
                    
                },
                error: function (xhr, st, eth) {
                    console.log(xhr);
                    Common.hideLoader();
                }
            });
        }
}
