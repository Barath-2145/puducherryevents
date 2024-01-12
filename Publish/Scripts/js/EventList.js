var token = localStorage.getItem('token');
class PBEventListComponent extends PBCompnent {

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
        this._eventId = "";
        this._records = [];
        this.initGrid();
        this.getData();

    }
    show() {
        this.eventList.style.display = "unset";
    }
    hide() {
        this.eventList.style.display = "none";
    }

    initGrid() {
        var that = this;
        var tableEvent = $(this.eventGrid).DataTable({
            'fnCreatedRow': function (nRow, aData) {
                //console.log('dataObj', aData.Id);
                $(nRow).attr('eventId', aData.Id)
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
                "targets": [1, 2],
                "type": 'natural'
            }],

            "columns": [

                { "data": "EventName", "width": "140px"},
               
                //{ "data": "FleetCardNo", "width": "150px",},
                { "data": "CreatedBy", "width": "80px" },
                {
                    "data": "Id",
                    "width": "120px",
                    searchable: false,
                    "render": function (data, type, row, meta) {
                        $(row).attr('EventId', data);
                        //console.log(row.Id, "rowwwwww");
                        if (type === 'display') {
                            var actionButtons = "<div class='action-buttons text-center' id='edit-event-button'><button href='#'  class='edit' eventId='" + data + "'>&nbsp;Edit</button> &nbsp;&nbsp;";

                            actionButtons += "<button href='#' style=' ";
                            //console.log(typeof row.Flag, row.Flag);

                            if (row.Status === 0)
                                actionButtons += " visibility:hidden;'";
                            else
                                actionButtons += "'";

                            actionButtons += " class='delete' eventId = '" + data + "' > &nbsp;Delete</button ></div > ";
                        }

                        return actionButtons;
                    }
                },
            ],

            data: [],
            "lengthChange": false,
        });

        $(this.eventGrid).on("click", ".action-buttons button", function () {
            //console.log($(this).attr("class"));
            if ($(this).attr("class") === "edit") {
                that._eventId = $(this).attr("eventId");
                //console.log($(this).attr("userId"));
                that.editEvent();
            }

        });
        $(this.eventGrid).on("click", ".action-buttons button", function () {
            //console.log($(this).attr("class"));
            if ($(this).attr("class") === "delete") {
                that._eventId = $(this).attr("eventId");
                //console.log($(this).attr("userId"));
                that.deleteEvent();
            }

        });
        $("#event-grid tbody").on('dblclick', 'tr', function () {

            that._eventId = this.getAttribute('eventId');
            that.editEvent();
        });
    }
    editEvent() {
        
        var eventId = parseInt(this._eventId);
        var events = this._records;
        console.log(events);
        var recToEdit = null;

        $(events).each(function () {

            if (this.Id === eventId) {

                recToEdit = this;
            }
        });

        if (this.onEditClicked) {
            this.onEditClicked(recToEdit);
        }
    }
    deleteEvent() {

        this.deleteData(this._eventId);
    }
    set eventRecords(rec) {
        this._records = rec;
        this.loadEvents();
        this.reinitComponent();
    }

    get eventRecords() {
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
    

    loadEvents() {
        var events = this._records;
        var me = this;

        $(events).each(function () {
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

        if (this.eventGrid) {
            //alert("ok")
            var datatable = $(this.eventGrid).dataTable().api();
            datatable.clear();
            datatable.rows.add(events);
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
                    that.eventRecords = d.data;
                    console.log(d.data);
                }
                else {
                    Common.showErrorMessageFocus(d.statusText, "Events", null);

                }
            },
            error: function (xhr, st, eth) {
                //console.log(xhr);
                Common.hideLoader();
            }
        });
    }

    deleteData(eventId) {

        var that = this;

        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        var datatosend = {
            "Id": eventId,
        };


        var msg = "<b>Please confirm!</b><br/><br/> Do you want to <b>delete</b> the Event details?  ";

        Common.showConfirm(msg, "Events", function (r) {
            if (!r) return;

            Common.showLoader();
            $.ajax({
                url: web.webapiUrl + that.deleteURL,
                headers: headers,
                data: datatosend,
                dataType: "JSON",
                type: "POST",
                success: function (d, st) {
                    //console.log(d);               
                    Common.hideLoader();
                    setTimeout(function () {
                        if (d.status === 0) {
                            Common.showSuccessMessage("Event details are deleted successfully.", "Events", null);
                            if (that.onDeleteCompleted) {
                                that.onDeleteCompleted();
                            }
                        }
                        else {
                            Common.showErrorMessageFocus(d.statusText, "Events", null);

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
