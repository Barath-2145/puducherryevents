
class PBSettingListComponent extends PBCompnent {

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
        this._settingId = "";
        this._records = [];
        this.initGrid();
        this.getData();

    }
    show() {
        this.settingList.style.display = "unset";
    }
    hide() {
        this.settingList.style.display = "none";
    }

    initGrid() {
        var that = this;
        var tableSetting = $(this.settingGrid).DataTable({
            'fnCreatedRow': function (nRow, aData) {
                //console.log('dataObj', aData.Id);
                $(nRow).attr('settingId', aData.Id)
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

                { "data": "EventId",},
                { "data": "Department",/* "className": "desc",*/ },
                //{ "data": "FleetCardNo", "width": "150px",},
                { "data": "CreatedBy", },
                {
                    "data": "Id",
                    "width": "120px",
                    searchable: false,
                    "render": function (data, type, row, meta) {
                        $(row).attr('SettingId', data);
                        //console.log(row.Id, "rowwwwww");
                        if (type === 'display') {
                            var actionButtons = "<div class='action-buttons text-center' id='edit-setting-button'><button href='#'  class='edit' settingId='" + data + "'><i class='fa fa-edit'></i> &nbsp;Edit</button> &nbsp;&nbsp;";

                            //actionButtons += "<button href='#' style=' ";
                            ////console.log(typeof row.Flag, row.Flag);

                            //if (row.Status === 0)
                            //    actionButtons += " visibility:hidden;'";
                            //else
                            //    actionButtons += "'";

                            //actionButtons += " class='delete' vehicleId = '" + data + "' > <i class='fa fa-trash-o'></i> &nbsp;Delete</button ></div > ";
                        }

                        return actionButtons;
                    }
                },
            ],

            data: [],
            "lengthChange": false,
        });

        $(this.settingGrid).on("click", ".action-buttons button", function () {
            //console.log($(this).attr("class"));
            if ($(this).attr("class") === "edit") {
                that._settingId = $(this).attr("settingId");
                //console.log($(this).attr("userId"));
                that.editSetting();
            }

        });
        $("#setting-grid tbody").on('dblclick', 'tr', function () {

            that._settingId = this.getAttribute('settingId');
            that.editSetting();
        });
    }
    editSetting() {

        var settingId = parseInt(this._settingId);
        var settings = this._records;
        console.log(settings);
        var recToEdit = null;

        $(settings).each(function () {

            if (this.Id === settingId) {

                recToEdit = this;
            }
        });

        if (this.onEditClicked) {
            this.onEditClicked(recToEdit);
        }
    }
    deleteSetting() {

        this.deleteData(this._settingId);
    }
    set settingRecords(rec) {
        this._records = rec;
        this.loadSettings();
        this.reinitComponent();
    }

    get settingRecords() {
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
    

    loadSettings() {
        var settings = this._records;
        var me = this;

        $(settings).each(function () {
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

        if (this.settingGrid) {
            //alert("ok")
            var datatable = $(this.settingGrid).dataTable().api();
            datatable.clear();
            datatable.rows.add(settings);
            datatable.draw();
        }

    }

    getData() {
        var that = this;

        Common.showLoader();
        $.ajax({
            url: web.webapiUrl + that.dataURL,
            dataType: "JSON",
            type: "POST",
            success: function (d, st) {
                //console.log(d);               
                Common.hideLoader();
                if (d.status === 0) {
                    // that._records = d.data;
                    that.settingRecords = d.data;

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

    deleteData(settingId) {

        var that = this;



        var datatosend = {
            "Id": settingId,
        };


        var msg = "<b>Please confirm!</b><br/><br/> Do you want to <b>delete</b> the Setting details?  ";

        Common.showConfirm(msg, "Settings", function (r) {
            if (!r) return;

            Common.showLoader();
            $.ajax({
                url: web.webapiUrl + that.deleteURL,
                data: datatosend,
                dataType: "JSON",
                type: "POST",
                success: function (d, st) {
                    //console.log(d);               
                    Common.hideLoader();
                    setTimeout(function () {
                        if (d.status === 0) {
                            Common.showSuccessMessage("Settings are deleted successfully.", "Settings", null);
                            if (that.onDeleteCompleted) {
                                that.onDeleteCompleted();
                            }
                        }
                        else {
                            Common.showErrorMessageFocus(d.statusText, "Settings", null);

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
