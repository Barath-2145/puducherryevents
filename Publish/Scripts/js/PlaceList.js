var token = localStorage.getItem('token');
class PBPlaceListComponent extends PBCompnent {
    
    constructor(compID, dataFetchUrl) {
        super(compID);
        this._dataURL = dataFetchUrl;
        this.onEditClicked = null;
        this.onDeleteCompleted = null;
        
        this.init();
    }

    init() {
       

        this._deleteURL = "";
      
        this._placeId = "";
        this._records = [];
        this.initGrid();
        this.getData();

    }
    show() {
        this.placeList.style.display = "unset";
    }
    hide() {
        this.placeList.style.display = "none";
    }

    initGrid() {
        var that = this;
        var tablePlace = $(this.placeGrid).DataTable({
            'fnCreatedRow': function (nRow, aData) {
                //console.log('dataObj', aData.Id);
                $(nRow).attr('placeId', aData.Id)
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

                { "data": "Place", "width": "140px"},
                { "data": "Description", "width": "140px" },
                //{ "data": "FleetCardNo", "width": "150px",},
                { "data": "CreatedBy", "width": "80px"},                
                {
                    "data": "Id",
                    "width": "120px",
                    searchable:false,
                    "render": function (data, type, row, meta) {
                        $(row).attr('PlaceId', data);
                        //console.log(row.Id, "rowwwwww");
                        if (type === 'display') {
                            var actionButtons = "<div class='action-buttons text-center' id='edit-place-button'><button href='#'  class='edit' placeId='" + data + "'>&nbsp;Edit</button> &nbsp;&nbsp;";

                            actionButtons += "<button href='#' style=' ";
                            //console.log(typeof row.Flag, row.Flag);

                            if (row.Status === 0)
                                actionButtons += " visibility:hidden;'";
                            else
                                actionButtons += "'";

                            actionButtons += " class='delete' placeId = '" + data + "' > <i class='fa fa-trash-o'></i> &nbsp;Delete</button ></div > ";
                        }

                        return actionButtons;
                    }
                },
            ],

            data: [],
            "lengthChange": false,
        });

        $(this.placeGrid).on("click", ".action-buttons button", function () {
            //console.log($(this).attr("class"));
            if ($(this).attr("class") === "edit") {
                that._placeId = $(this).attr("placeId");
                //console.log($(this).attr("userId"));
                that.editPlace();
            }

        });
        $(this.placeGrid).on("click", ".action-buttons button", function () {
            //console.log($(this).attr("class"));
            if ($(this).attr("class") === "delete") {
                that._placeId = $(this).attr("placeId");
                //console.log($(this).attr("userId"));
                that.deletePlace();
            }

        });
        $("#place-grid tbody").on('dblclick', 'tr', function () {

            that._placeId = this.getAttribute('placeId');
            that.editPlace();
        });
    }
    editPlace() {

        var placeId = parseInt(this._placeId);
        var places = this._records;
        console.log(places);
        var recToEdit = null;

        $(places).each(function () {

            if (this.Id === placeId) {
                
                recToEdit = this;
            }
        });

        if (this.onEditClicked) {
            this.onEditClicked(recToEdit);
        }
    }
    deletePlace() {

        this.deleteData(this._placeId);
    }
    set placeRecords(rec) {
        this._records = rec;
        this.loadPlaces();
        this.reinitComponent();
    }

    get placeRecords() {
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
   

    loadPlaces() {
        var places = this._records;
        var me = this;

        $(places).each(function () {
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

        if (this.placeGrid) {
            //alert("ok")
            var datatable = $(this.placeGrid).dataTable().api();
            datatable.clear();
            datatable.rows.add(places);
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
                    that.placeRecords = d.data;
                    
                }
                else {
                    Common.showErrorMessageFocus(d.statusText, "Place", null);

                }
            },
            error: function (xhr, st, eth) {
                //console.log(xhr);
                Common.hideLoader();
            }
        });
    }

    deleteData(placeId) {

        var that = this;



        var datatosend = {
            "Id": placeId,
        };

        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
        var msg = "<b>Please confirm!</b><br/><br/> Do you want to <b>delete</b> the Event Place details?  ";

        Common.showConfirm(msg, "Place", function (r) {
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
                            Common.showSuccessMessage("Event Plce details are deleted successfully.", "Place", null);
                            if (that.onDeleteCompleted) {
                                that.onDeleteCompleted();
                            }
                        }
                        else {
                            Common.showErrorMessageFocus(d.statusText, "Place", null);

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
