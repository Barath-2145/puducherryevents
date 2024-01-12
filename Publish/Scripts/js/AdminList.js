var token = localStorage.getItem('token');
class PBAdminListComponent extends PBCompnent {
    
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
        this._adminId = "";
        this._records = [];
        this.initGrid();
        this.getData();

    }
    show() {
        this.adminList.style.display = "unset";
    }
    hide() {
        this.adminList.style.display = "none";
    }

    initGrid() {
        var that = this;
        var tableAdmin = $(this.adminGrid).DataTable({
            'fnCreatedRow': function (nRow, aData) {
                //console.log('dataObj', aData.Id);
                $(nRow).attr('adminId', aData.Id)
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
                { "data": "UserName", "width": "140px"},
                { "data": "Password", "width": "80px" },                
                {
                    "data": "Id",
                    "width": "120px",
                    searchable:false,
                    "render": function (data, type, row, meta) {
                        $(row).attr('AdminId', data);
                        //console.log(row.Id, "rowwwwww");
                        if (type === 'display') {
                            var actionButtons = "<div class='action-buttons text-center' id='edit-admin-button'><button href='#'  class='edit' adminId='" + data + "'>&nbsp;Edit</button> &nbsp;&nbsp;";

                            actionButtons += "<button href='#' style=' ";
                            //console.log(typeof row.Flag, row.Flag);

                            if (row.Status === 0)
                                actionButtons += " visibility:hidden;'";
                            else
                                actionButtons += "'";

                            actionButtons += " class='delete' adminId = '" + data + "' >&nbsp;Delete</button ></div > ";
                        }

                        return actionButtons;
                    }
                },
            ],

            data: [],
            "lengthChange": false,
        });

        $(this.adminGrid).on("click", ".action-buttons button", function () {
            //console.log($(this).attr("class"));
            if ($(this).attr("class") === "edit") {
                that._adminId = $(this).attr("adminId");
                //console.log($(this).attr("userId"));
                that.editAdmin();
            }

        });
        $(this.adminGrid).on("click", ".action-buttons button", function () {
            //console.log($(this).attr("class"));
            if ($(this).attr("class") === "delete") {
                that._adminId = $(this).attr("adminId");
                //console.log($(this).attr("userId"));
                that.deleteAdmin();
            }

        });
        $("#admin-grid tbody").on('dblclick', 'tr', function () {

            that._adminId = this.getAttribute('adminId');
            that.editAdmin();
        });
    }
    editAdmin() {

        var adminId = parseInt(this._adminId);
        var admins = this._records;
        console.log(admins);
        var recToEdit = null;

        $(admins).each(function () {

            if (this.Id === adminId) {
                
                recToEdit = this;
            }
        });

        if (this.onEditClicked) {
            this.onEditClicked(recToEdit);
        }
    }
    deleteAdmin() {

        this.deleteData(this._adminId);
    }
    set adminRecords(rec) {
        this._records = rec;
        this.loadAdmins();
        this.reinitComponent();
    }

    get adminRecords() {
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

    loadAdmins() {
        var admins = this._records;
        var me = this;

        $(admins).each(function () {
            this.RoleName = this.Role;
            this.Status = this.Flag;
           // this.Role =  this.Role;
            this.CreatedAt = "<div class='text-center'>" + moment(this.CreatedAt).format("DD-MM-YYYY ") + "</div>";
            if (this.Flag === 1) {
                this.Flag = "<div class='text-center'><i class='fa fa-thumbs-up' style='color: green;'></i> <b style='color: green;'> Accept</b>" + "</div>";
            } else {
                this.Flag = "<div class='text-center'><i class='fa fa-close' style='color: red;'></i> <b style='color: red;'> Decline</b>" + "</div>";
            }
        });

        if (this.adminGrid) {
            //alert("ok")
            var datatable = $(this.adminGrid).dataTable().api();
            datatable.clear();
            datatable.rows.add(admins);
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
            success: function (d, st) {
                //console.log(d);               
                Common.hideLoader();
                if (d.status === 0) {
                    // that._records = d.data;
                    that.adminRecords = d.data;
                    
                }
                else {
                    Common.showErrorMessageFocus(d.statusText, "Admin", null);

                }
            },
            error: function (xhr, st, eth) {
                //console.log(xhr);
                Common.hideLoader();
            }
        });
    }

    deleteData(adminId) {

        var that = this;

        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        var datatosend = {
            "Id": adminId,
        };

        
        var msg = "<b>Please confirm!</b><br/><br/> Do you want to <b>delete</b> the Admin details?  ";

        Common.showConfirm(msg, "Admin", function (r) {
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
                            Common.showSuccessMessage("Admin details are deleted successfully.", "Admin", null);
                            if (that.onDeleteCompleted) {
                                that.onDeleteCompleted();
                            }
                        }
                        else {
                            Common.showErrorMessageFocus(d.statusText, "Admin", null);

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
