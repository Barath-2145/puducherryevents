var token = localStorage.getItem('token');

class PBPermissionCustomerListComponent extends PBCompnent {
    constructor(compID, dataFetchUrl) {
        super(compID);
        this._dataURL = dataFetchUrl;        
        this.onEditClicked = null;      
       
        this.init();
    }

    init() {  
        

      
        this._customerId = "";
        this._records = [];
        this.initGrid();
      
        this.getData();
        
        
    }
    show() {
        this.permissionCustomerList.style.display = "unset";
    }
    hide() {
        this.permissionCustomerList.style.display = "none";
    }
    
    initGrid() {
        var that = this;
        var tableCustomer = $(this.permissionCustomerGrid).DataTable({
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

                { "data": "Name", "width": "200px" },
                { "data": "EventName", "width": "200px", },
                { "data": "FromDate", "width": "200px", },
                { "data": "ToDate", "width": "200px", },
                { "data": "Place", "width": "200px", },
                { "data": "Flag", "width": "80px", },
                {
                    "data": "Id",
                    "width": "120px",

                    "render": function (data, type, row, meta) {
                       
                        $(row).attr('CustomerId', data);
                        if (type === 'display') {
                            var actionButtons = "<div class='action-buttons text-center bt' id='edit-customer-button'><button href='#'  class='edit' customerId='" + data + "'>&nbsp;<b>Veiw</b></button> &nbsp;&nbsp;";

                          
                        }

                        return actionButtons;
                    }
                },
            ],

            data: [],
            "lengthChange": false,
        });

        $(this.permissionCustomerGrid).on("click", ".action-buttons button", function () {
           
            if ($(this).attr("class") === "edit") {
                that._customerId = $(this).attr("customerId");
               
                that.editCustomer();
            } 
            
        });
        $("#permission-customer-grid tbody").on('dblclick', 'tr', function () {
            //console.log('doubleClick', this.getAttribute('customerId'));

            that._customerId = this.getAttribute('customerId');

            that.editCustomer();

        });
    }
    editCustomer() {
      
        var customerId = parseInt(this._customerId);
        var customers = this._records;
        
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
            this.FromDate = "<div class='text-center'>" + moment(this.FromDate).format("DD-MM-YY ") + "</div>";
            this.ToDate = "<div class='text-center'>" + moment(this.ToDate).format("DD-MM-YY ") + "</div>";
            if (this.Flag === 1) {
                this.Flag = "<div class='text-center'><i class='fa fa-exclamation' style='color: orange;'></i> <b style='color: orange;'> Waiting </b>" + "</div>";
                
            } else if (this.Flag === 0) {
                this.Flag = "<div class='text-center'><i class='fa fa-close' style='color: red;'></i> <b style='color: red;'> Rejected </b>" + "</div>";
            }
            else if (this.Flag === 2) {
                this.Flag = "<div class='text-center'><i class='fa fa-thumbs-up' style='color: green;'></i> <b style='color: green;'> Approved</b>" + "</div>";
            }
        });

       
        if (this.permissionCustomerGrid) {
            //alert("ok")
            var datatable = $(this.permissionCustomerGrid).dataTable().api();
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
            headers: headers,
            dataType: "JSON",
            type: "POST",
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