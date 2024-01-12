var token = localStorage.getItem('token');
class PBUserListComponent extends PBCompnent {
    
    constructor(compID, dataFetchUrl) {
        super(compID);
        this._dataURL = dataFetchUrl;
        this.onEditClicked = null;
        this.onDeleteCompleted = null;
        
        this.init();
    }

    init() {
       

        this._deleteURL = "";
        this._nameURL = "";
        this._userId = "";
        this._records = [];
        this.initGrid();
        this.getData();

    }
    show() {
        this.userList.style.display = "unset";
    }
    hide() {
        this.userList.style.display = "none";
    }

    initGrid() {
        var that = this;
        var tableUser = $(this.userGrid).DataTable({
            'fnCreatedRow': function (nRow, aData) {
                //console.log('dataObj', aData.Id);
                $(nRow).attr('userId', aData.Id)
            },
            pageLength: 10,
            filter: true,
            deferRender: true,
            scrollX: "auto",
            scrollCollapse: true,
            scroller: true,
            "searching": true,
            "paging": false,

            "columnDefs": [{
                "className": "dt-head-center",
                "searchable": true,
                "orderable": false,
                "targets": [1, 2, 3],
                "type": 'natural'
            }],

            "columns": [

                { "data": "FirstName", "width": "140px"},
                { "data": "UserName", "width": "140px"  },
                //{ "data": "FleetCardNo", "width": "150px",},
                { "data": "Password", "width": "80px" },                
                {
                    "data": "Id",
                    "width": "120px",
                    searchable:false,
                    "render": function (data, type, row, meta) {
                        $(row).attr('UserId', data);
                        //console.log(row.Id, "rowwwwww");
                        if (type === 'display') {
                            var actionButtons = "<div class='action-buttons text-center' id='edit-user-button'><button href='#'  class='edit' userId='" + data + "'>Edit</button> &nbsp;&nbsp;";

                            actionButtons += "<button href='#' style=' ";
                            //console.log(typeof row.Flag, row.Flag);

                            if (row.Status === 0)
                                actionButtons += " visibility:hidden;'";
                            else
                                actionButtons += "'";

                            actionButtons += " class='delete' userId = '" + data + "' >&nbsp;Delete</button ></div > ";
                        }

                        return actionButtons;
                    }
                },
            ],

            data: [],
            "lengthChange": false,
        });

        $(this.userGrid).on("click", ".action-buttons button", function () {
            //console.log($(this).attr("class"));
            if ($(this).attr("class") === "edit") {
                that._userId = $(this).attr("userId");
                //console.log($(this).attr("userId"));
                that.editUser();
            }

        });
        $(this.userGrid).on("click", ".action-buttons button", function () {
            //console.log($(this).attr("class"));
            if ($(this).attr("class") === "delete") {
                that._userId = $(this).attr("userId");
                //console.log($(this).attr("userId"));
                that.deleteUser();
            }

        });
        $("#user-grid tbody").on('dblclick', 'tr', function () {

            that._userId = this.getAttribute('userId');
            that.editUser();
        });
    }
    editUser() {
       
        var userId = parseInt(this._userId);
        var users = this._records;
        console.log(users);
        var recToEdit = null;

        $(users).each(function () {

            if (this.Id === userId) {
                
                recToEdit = this;
            }
        });

        if (this.onEditClicked) {
            this.onEditClicked(recToEdit);
        }
    }
    deleteUser() {

        this.deleteData(this._userId);
    }
    set userRecords(rec) {
        this._records = rec;
        this.loadUsers();
        this.reinitComponent();
    }

    get userRecords() {
        return this._records;
    }

    set dataURL(url) {
        this._dataURL = url;
    }

    get dataURL() {
        return this._dataURL;
    }
    set deleteURL(url) {
        this._deleteURL = url;
    }

    get deleteURL() {
        return this._deleteURL;
    }
    set nameURL(url) {
        
        this._nameURL = url;
    }

    get nameURL() {
        return this._nameURL;
        
    }

    loadUsers() {
        var users = this._records;
        var me = this;

        $(users).each(function () {
            this.RoleName = this.Role;
            this.Status = this.Flag;
            this.Role = "<div class='text-center'>" + this.Role + "</div>";
            this.CreatedAt = "<div class='text-center'>" + moment(this.CreatedAt).format("DD-MM-YYYY ") + "</div>";
            if (this.Flag === 1) {
                this.Flag = "<div class='text-center'><i class='fa fa-thumbs-up' style='color: green;'></i> <b style='color: green;'> Accept</b>" + "</div>";
            } else {
                this.Flag = "<div class='text-center'><i class='fa fa-close' style='color: red;'></i> <b style='color: red;'> Decline</b>" + "</div>";
            }
        });

        if (this.userGrid) {
            //alert("ok")
            var datatable = $(this.userGrid).dataTable().api();
            datatable.clear();
            datatable.rows.add(users);
            datatable.draw();
        }
        
    }

    getData() {
        var that = this;
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
        Common.showLoader();
        $.ajax({
            url: web.webapiUrl + that.dataURL,
            dataType: "JSON",
            type: "POST",
            headers: headers,
            //headers: "1",
            success: function (d, st) {
                //console.log(d);               
                Common.hideLoader();
                if (d.status === 0) {
                    // that._records = d.data;
                    that.userRecords = d.data;
                    
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

    deleteData(userId) {

        var that = this;

        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        var datatosend = {
            "Id": userId,
        };

        
        var msg = "<b>Please confirm!</b><br/><br/> Do you want to <b>delete</b> the User details?  ";

        Common.showConfirm(msg, "User", function (r) {
            if (!r) return;

            Common.showLoader();
            $.ajax({
                url: web.webapiUrl + that.deleteURL,
                data: datatosend,
                headers: headers,
                dataType: "JSON",
                type: "POST",
                success: function (d, st) {
                    //console.log(d);               
                    Common.hideLoader();
                    setTimeout(function () {
                        if (d.status === 0) {
                            Common.showSuccessMessage("User details are deleted successfully.", "User", null);
                            if (that.onDeleteCompleted) {
                                that.onDeleteCompleted();
                            }
                        }
                        else {
                            Common.showErrorMessageFocus(d.statusText, "User", null);

                        }
                    }, 0);

                },
                error: function (xhr, st, eth) {
                   
                    Common.hideLoader();
                }
            });
        });
    }
    
}
