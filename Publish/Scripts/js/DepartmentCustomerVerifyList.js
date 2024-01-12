var token = localStorage.getItem('token');
var dept = localStorage.getItem('departmentId');
class PBVerifyCustomerListComponent extends PBCompnent {
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
        this.initGrid2();  
        this.getData();
        this._verifiedRecords = [];
        this._status = "";
    }
    show() {
        this.verifyCustomerList.style.display = "unset";
    }
    hide() {
        this.verifyCustomerList.style.display = "none";
    }
    
    initGrid() {
        var that = this;
        var tableCustomer = $(this.customerGrid).DataTable({
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
                { "data": "EventName", "width": "200px", },     
                { "data": "StartDate", "width": "200px", },
                { "data": "EndDate", "width": "200px", },
                { "data": "Place", "width": "200px", },
                { "data": "Flag", "width": "200px", },    
                {
                    "data": "CustomerId",
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

        $(this.customerGrid).on("click", ".action-buttons button", function () {
           
            if ($(this).attr("class") === "edit") {
                that._customerId = $(this).attr("customerId");
               
                that.editCustomer();
            } 
            
        });
        $("#customer-grid tbody").on('dblclick', 'tr', function () {
            //console.log('doubleClick', this.getAttribute('customerId'));

            that._customerId = this.getAttribute('customerId');

            that.editCustomer();

        });
    }

    initGrid2() {
        var that = this;
        var tableCustomer2 = $(this.approvedCustomerGrid).DataTable({
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
            "searching": false,
            "paging": false,
           
            

            "columnDefs": [{
                "className": "dt-head-center",
                "searchable": false,
                "orderable": false,
                "targets": [0, 3, 6],
                
                "type": 'natural'
            }],

            "columns": [

                { "data": "CustomerName", "width": "80px", },
                { "data": "EventName", "width": "200px", },
                { "data": "StartDate", "width": "200px", },                
                { "data": "EndDate", "width": "200px", },                
                { "data": "Place", "width": "200px", },
                { "data": "Flag", "width": "80px", },
                {
                    "data": "CustomerId",
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

        $(this.approvedCustomerGrid).on("click", ".action-buttons button", function () {

            if ($(this).attr("class") === "edit") {
                that._customerId = $(this).attr("customerId");

                that.editCustomer();
            }

        });
       
    }

    editCustomer() {
      
        var customerId = parseInt(this._customerId);
        var customers = this._allrecords;
        
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

    set allRecords(rec) {
        this._allrecords = rec;
        
        this.reinitComponent();
    }

    get allRecords() {
        return this._allrecords;
    } 

    set verifiedcustomerRecords(rec) {
        this._verifiedRecords = rec;
        this.loadVerifyCustomers();
        this.reinitComponent();
    }

    get verifiedcustomerRecords() {
        return this._verifiedRecords;
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
        console.log("customers");
        console.log(customers);
        $(customers).each(function () {
            //this.RoleName = this.Role;
            
            this.Status = this.Flag;           
            this.Role = "<div class='text-center'>" + this.Role +   "</div>";
            this.CreatedAt = "<div class='text-center'>" + moment(this.CreatedAt).format("DD-MM-YY ") + "</div>";
            //this.StartDate = "<div class='text-center'>" + moment(this.StartDate).format("DD-MM-YY ") + "</div>";
            //this.EndDate = "<div class='text-center'>" + moment(this.EndDate).format("DD-MM-YY ") + "</div>";
            //this.EndDate =   moment(this.EndDate).format("DD-MM-YY ");
            if (this.Flag === 1) {
                this.Flag = "<div class='text-center'><i class='fa fa-close' style='color: red;'></i> <b style='color: red;'> Uncheck</b>" + "</div>";
            } else if (this.Flag === 0) {
                this.Flag = "<div class='text-center'><i class='fa fa-exclamation' style='color: orange;'></i> <b style='color: orange;'> Waiting</b>" + "</div>";
            }
           
        });

      
       
       
        if (this.customerGrid) {
            //alert("ok")
        var datatable = $(this.customerGrid).dataTable().api();
        datatable.clear();
        datatable.rows.add(customers);
            datatable.draw();
        }
        
    }

    loadVerifyCustomers() {

        var verifyCustomers = this._verifiedRecords;
       
        $(verifyCustomers).each(function () {
            //this.RoleName = this.Role;

            this.Status = this.Flag;
            //this.VerifiedAt = "<div class='text-center'>" + moment(this.VerifiedAt).format("DD-MM-YY ") + "</div>";
            
            if (this.Flag === 1) {
                this.Flag = "<div class='text-center'><i class='fa fa-thumbs-up' style='color: green;'></i> <b style='color: green;'>Forwarded</b>" + "</div>";
            } else if (this.Flag === 2) {
                this.Flag = "<div class='text-center'><i class='fa fa-thumbs-down' style='color: red;'></i> <b style='color: red;'> Rejected</b>" + "</div>";
            }
        });

        if (this.approvedCustomerGrid) {
            
            var datatable = $(this.approvedCustomerGrid).dataTable().api();
            datatable.clear();
            datatable.rows.add(verifyCustomers);
            datatable.draw();
        }
    };


    getData() {
        
        var that = this;
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
        Common.showLoader();
        Common.hideLoader();
        var departmentId = $("#dept-id").val();
       
        var datatosend = {
            "departmentId": dept,
        }
        $.ajax({
            url: web.webapiUrl + that.dataURL,
            headers: headers,
            dataType: "JSON",
            data: datatosend,
            type: "POST",
            success: function (d, st) {               
                Common.hideLoader();
                if (d.status === 0) {
                    if (d.data != "") {
                    //$(d.data).each(function () {
                        
                    //    if (dept == this.DepartmentId) {
                    //        that.customerRecords = d.unverifyCustomers;
                    //        that.allRecords = d.data;
                    //        that.verifiedcustomerRecords = d.verifyCustomers;
                    //        console.log(that.verifiedcustomerRecords);
                    //    } 
                       
                    //});
                      

                          

                     
                    }
                    $(d.unverifyCustomers).each(function () { 
                    if (dept == this.DepartmentId) {
                        that.customerRecords = d.unverifyCustomers;
                        that.allRecords = d.data;    
                        }
                    });

                    $(d.verifyCustomers).each(function () {
                        if (dept == this.DepartmentId) {                            
                            that.allRecords = d.data;
                            that.verifiedcustomerRecords = d.verifyCustomers;
                            console.log(that.verifiedcustomerRecords);
                        }
                    });

                    that._deptValue = d.deptName;
                    $(that._deptValue).each(function () {                   
                        that.deptName.innerHTML = this.DepartmentName;
                    });
                    
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