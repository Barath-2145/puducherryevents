﻿var token = localStorage.getItem('token');
class PBDepartmentListComponent extends PBCompnent {

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
        this._departmentId = "";
        this._records = [];
        this.initGrid();
        this.getData();

    }
    show() {
        this.departmentList.style.display = "unset";
    }
    hide() {
        this.departmentList.style.display = "none";
    }

    initGrid() {
        var that = this;
        var tableDepartment = $(this.departmentGrid).DataTable({
            'fnCreatedRow': function (nRow, aData) {
                //console.log('dataObj', aData.Id);
                $(nRow).attr('departmentId', aData.Id)
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

                { "data": "DepartmentName", "width": "140px"},
                { "data": "AuthorityName", "width": "140px" },
                //{ "data": "FleetCardNo", "width": "150px",},
                { "data": "CreatedBy", "width": "80px" },
                {
                    "data": "Id",
                    "width": "120px",
                    searchable: false,
                    "render": function (data, type, row, meta) {
                        $(row).attr('DepartmentId', data);
                        //console.log(row.Id, "rowwwwww");
                        if (type === 'display') {
                            var actionButtons = "<div class='action-buttons text-center' id='edit-department-button'><button href='#'  class='edit' departmentId='" + data + "'> &nbsp;Edit</button> &nbsp;&nbsp;";

                            actionButtons += "<button href='#' style=' ";
                            //console.log(typeof row.Flag, row.Flag);

                            if (row.Status === 0)
                                actionButtons += " visibility:hidden;'";
                            else
                                actionButtons += "'";

                            actionButtons += " class='delete' departmentId = '" + data + "' > &nbsp;Delete</button ></div > ";
                        }

                        return actionButtons;
                    }
                },
            ],

            data: [],
            "lengthChange": false,
        });

        $(this.departmentGrid).on("click", ".action-buttons button", function () {
            //console.log($(this).attr("class"));
            if ($(this).attr("class") === "edit") {
                that._departmentId = $(this).attr("departmentId");
                //console.log($(this).attr("userId"));
                that.editDepartment();
            }

        });
        $(this.departmentGrid).on("click", ".action-buttons button", function () {
            //console.log($(this).attr("class"));
            if ($(this).attr("class") === "delete") {
                that._departmentId = $(this).attr("departmentId");
                //console.log($(this).attr("userId"));
                that.deleteDepartment();
            }

        });
        $("#department-grid tbody").on('dblclick', 'tr', function () {

            that._departmentId = this.getAttribute('departmentId');
            that.editDepartment();
        });
    }
    editDepartment() {

        var departmentId = parseInt(this._departmentId);
        var departments = this._records;
        console.log(departments);
        var recToEdit = null;

        $(departments).each(function () {

            if (this.Id === departmentId) {

                recToEdit = this;
            }
        });

        if (this.onEditClicked) {
            this.onEditClicked(recToEdit);
        }
    }
    deleteDepartment() {

        this.deleteData(this._departmentId);
    }
    set departmentRecords(rec) {
        this._records = rec;
        this.loadDepartments();
        this.reinitComponent();
    }

    get departmentRecords() {
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
    

    loadDepartments() {
        var departments = this._records;
        var me = this;

        $(departments).each(function () {
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

        if (this.departmentGrid) {
            //alert("ok")
            var datatable = $(this.departmentGrid).dataTable().api();
            datatable.clear();
            datatable.rows.add(departments);
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
            headers: headers,
            dataType: "JSON",
            type: "POST",
            success: function (d, st) {
                //console.log(d);               
                Common.hideLoader();
                if (d.status === 0) {
                    // that._records = d.data;
                    that.departmentRecords = d.data;

                }
                else {
                    Common.showErrorMessageFocus(d.statusText, "Departments", null);

                }
            },
            error: function (xhr, st, eth) {
                //console.log(xhr);
                Common.hideLoader();
            }
        });
    }

    deleteData(departmentId) {

        var that = this;


        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
        var datatosend = {
            "Id": departmentId,
        };


        var msg = "<b>Please confirm!</b><br/><br/> Do you want to <b>delete</b> the Department details?  ";

        Common.showConfirm(msg, "Departments", function (r) {
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
                            Common.showSuccessMessage("Department are deleted successfully.", "Department", null);
                            if (that.onDeleteCompleted) {
                                that.onDeleteCompleted();
                            }
                        }
                        else {
                            Common.showErrorMessageFocus(d.statusText, "Department", null);

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
