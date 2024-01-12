var token = localStorage.getItem('token');

class PBMeetingListComponent extends PBCompnent {
    constructor(compID, dataFetchUrl) {
        super(compID);
        this._dataURL = dataFetchUrl;        
        this.onEditClicked = null;      
       
        this.init();
    }

    init() { 
        
        this._meetingId = "";
        this._records = [];
        this.initGrid();      
        this.getData();
        
    }
    show() {
        this.meetingList.style.display = "unset";
    }
    hide() {
        this.meetingList.style.display = "none";
    }
    
    initGrid() {
        var that = this;
        var tableCustomer = $(this.meetingGrid).DataTable({
            'fnCreatedRow': function (nRow, aData) {
                //console.log('dataObj', aData.Id);
                $(nRow).attr('customerId', aData.Id)
            },
            pageLength: 10,
            filter: true,
            deferRender: true,
            scrollX: 300,
            scrollCollapse: true,
            scroller: true,
            "searching": true,
            "paging": false,

            "columnDefs": [{
                "className": "dt-head-center",
                "searchable": false,
                "orderable": false,
                "targets": [0, 1, 2, 3, 6],
                "type": 'natural'
            }],

            "columns": [

                { "data": "CustomerName", "width": "200px" },
                { "data": "Place", "width": "200px" },
                { "data": "MeetingDate", "width": "200px" },
                { "data": "StartTime", "width": "200px" },
                { "data": "EndTime", "width": "200px" },
                { "data": "Flag", "width": "80px", },
                {
                    "data": "Id",
                    "width": "120px",

                    "render": function (data, type, row, meta) {
                       
                        $(row).attr('Id', data);
                        if (type === 'display') {
                            var actionButtons = "<div class='action-buttons text-center bt' id='edit-customer-button'><button href='#'  class='edit' meetingId='" + data + "'>&nbsp;<b>Veiw</b></button> &nbsp;&nbsp;";

                          
                        }

                        return actionButtons;
                    }
                },
            ],

            data: [],
            "lengthChange": false,
        });

        $(this.meetingGrid).on("click", ".action-buttons button", function () {
           
            if ($(this).attr("class") === "edit") {
                that._meetingId = $(this).attr("meetingId");
               
                that.editCustomer();
            } 
            
        });
        $("#customer-grid tbody").on('dblclick', 'tr', function () {
            //console.log('doubleClick', this.getAttribute('customerId'));

            that._meetingId = this.getAttribute('meetingId');

            that.editCustomer();

        });
    }
    editCustomer() {
      
        var customerId = parseInt(this._meetingId);
      
        var customers = this._records;
        console.log(customers);
        var recToEdit = null;
       
        $(customers).each(function () {
           
         
            if (this.Id  === customerId) {
                
                recToEdit = this;
            }
        });

        if (this.onEditClicked) {
           
            this.onEditClicked(recToEdit);
        }
    }
   
    set customerRecords(rec) {
        this._records = rec;
        this.loadcustomers();
        this.reinitComponent();
    }

    get customerRecords() {
        return this._records;
    } 

    set dataURL(url) {
        //alert("url");
        //alert(url);
        this._dataURL = url;
    }

    get dataURL() {
        return this._dataURL;
    }  

    loadcustomers() {
      
        var customers = this._records;
        $(customers).each(function () {
            //this.RoleName = this.Role;
            this.Status = this.Flag;
            
            this.Role = "<div class='text-center'>" + this.Role +   "</div>";
            this.CreatedAt = "<div class='text-center'>" + moment(this.CreatedAt).format("DD-MM-YY ") + "</div>";
            this.MeetingDate =  moment(this.MeetingDate).format("DD-MM-YY ");
            
            this.StartTime = moment(this.StartTime).format("hh:mm A");
            this.EndTime = moment(this.EndTime).format("hh:mm:A");

            

            if (this.Flag === 1) {
                this.Flag = "<div class='text-center'><i class='fa fa-thumbs-up' style='color: green;'></i> <b style='color: green;'> Accept</b>" + "</div>";
                
            } else if (this.Flag === 0) {
                this.Flag = "<div class='text-center'><i class='fa fa-close' style='color: red;'></i> <b style='color: red;'> Uncheck</b>" + "</div>";
            }
        });

       
        if (this.meetingGrid) {
            //alert("ok")
            var datatable = $(this.meetingGrid).dataTable().api();
        datatable.clear();
        datatable.rows.add(customers);
            datatable.draw();
        }
        
    }

    
    getData() {
        
        var that = this;
       
        Common.showLoader();
        Common.hideLoader();
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
        $.ajax({
            url: web.webapiUrl + that.dataURL, 
            dataType: "JSON",
            type: "POST",
            headers: headers,
            success: function (d, st) {               
                Common.hideLoader();
                if (d.status === 0) {
                   
                    that.customerRecords = d.data;
                    
                }
                else {
                    Common.showErrorMessageFocus(d.statusText, "Customer", null);

                }
            },
            error: function (xhr, st, eth) {
                
                Common.hideLoader();
            }
        });
    } 
    
}