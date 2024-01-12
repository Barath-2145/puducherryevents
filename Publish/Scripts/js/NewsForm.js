var token = localStorage.getItem('token');
var login = localStorage.getItem('username');
class PBNewsFormComponent extends PBCompnent {
    constructor(compID) {
        super(compID);
        this.onSaveCompleted = null;
        this.onCancelled = null;        
        this.init();
    }

    init() {
        
        var that = this;
        if (this.saveNewsButton) {           
             that = this;
            this.saveNewsButton.addEventListener("click", function () {
                that.postData();
            });
            //console.log("save User create and added click listener");
        }
       
        this._saveURL = "";       
        this._idValue = "";
       
        this._newsValue = "";   
       
        this._flagValue = "";
       
        if (this.news) {
            that = this;

            $(this.news).on('change', function () {

                that._newsValue = that.news.value;
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

        if (this.newsForm)
            this.newsForm.style.display = "none";
    }
    show() {
        this.newsForm.style.display = "unset";
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

        s = that.news.value;


        if (s.length == "") {
            errorString = "News should not be Empty.";
            Common.showErrorMessageFocus(errorString, "News", $(this.news));
            return false;
        } 

        this._newsValue = s;
      
        return true;
    }

    postData() {

        var that = this;
      

        if (this.validateRegisterData() === false) {
            return false;
        }
        
     
        var loginName = $("#login-name").val();

        var datatosend = {
            
            "News": this._newsValue,
            "CreatedBy": login,
            
        };

        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
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
                    Common.showSuccessMessage("Latest News saved successfully.", "News", null);
                    if (that.onSaveCompleted) {
                        that.onSaveCompleted();
                    }
                }
                else {
                    Common.showErrorMessageFocus(d.statusText, "News", null);

                }
            },
            error: function (xhr, st, eth) {
                //console.log(xhr);
                Common.hideLoader();
            }
        });
    }

}
