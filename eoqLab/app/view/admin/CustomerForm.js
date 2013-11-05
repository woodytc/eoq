Ext.define('CustomerForm', {
     extend: 'Ext.Panel',

    constructor: function (config) {
        var me = this;
        var prefix = "CustomerForm-";
        me.prefix = prefix;
        
        //Define proxy datastore
        var proxyOptions = {
            type: 'ajax',
            reader: {
                type: 'json',
                root: 'items',
                totalProperty: 'total'
            },
            simpleSortMode: true
        };

        //Create datastore
        me.gridStore = Ext.create('Ext.data.JsonStore', {
            id: me.prefix + 'gridStore',
            pageSize: 25,
            model: 'MaterialViewModel',
            proxy: proxyOptions
        });

        Ext.apply(this, {
            iconCls: 'icon-tabs',
            title: 'Customer',
            layout: 'border',
            autoScroll: true,
            border: true,
            items: [
                    {
                        //Header                
                        xtype: 'panel',
                        title: 'Customer',
                        bodyStyle: 'padding:5px 5px 0',
                        region: 'north',
                        border: true,
                        defaults: { xtype: 'container', flex: 1, layout: 'anchor' },
                        buttonAlign: 'center',
                        layout: 'hbox',
                        items: [
                                {   // column 1
                                    defaults: { labelWidth: 200 },
                                    defaultType: 'textfield',
                                    margins: '10 5 0 20',
                                    fieldDefaults: { labelAlign: 'right' },
                                    labelStyle: 'text-align: right',
                                    items: [
                                            { id: me.prefix + 'cusName', name: 'cusName', fieldLabel: 'Material Name',labelStyle: 'text-align: right', emptyText: '[Material Name]', anchor: '-10'}
                                    ]
                                }, //end colum 1
                                { // column 2
                                defaults: { labelWidth: 200, anchor: '100%' },
                                defaultType: 'textfield',
                                margins: '10 20 0 60',
                                fieldDefaults: { labelAlign: 'left' },
                                items: [
                                            { id: me.prefix + 'role',
                                                name: 'Role',
                                                xtype: 'combo',
                                                mode: 'local',
                                                editable: false,
                                                fieldLabel: 'Role',
                                                labelStyle: 'text-align: right',
                                                displayField: 'name',
                                                valueField: 'value',
                                                anchor: '10',
                                                value: 'ALL Role',
                                                store: me.roleStore
                                            }

                                       ]
                            }//end colum 2

                        ]//end main item in header
                        , buttons: [ //buttons
                                    {
                                    iconCls: 'icon-find',
                                    id: me.prefix + 'user-search-btn-Search',
                                    text: 'Search',
                                    //Handler event btn search click
                                    handler: function (btn, evt) {
                                        //get value from textbox and combobox
                                        //me.username = Ext.getCmp(me.prefix + 'username').getValue();
                                        me.cusName = Ext.getCmp(me.prefix + 'cusName').getValue();
                                        //Call function search load data display grid
                                        me.search(window.gridCustomer, me.cusName, me.role);
                                    } // end handler
                                }, {
                                    iconCls: 'icon-reload',
                                    id: me.prefix + 'user-btn-Reset',
                                    text: 'Reset',
                                    handler: function (btn, evt) {
                                        Ext.getCmp(me.prefix + 'username').setValue('');
                                        Ext.getCmp(me.prefix + 'role').setValue('All Role');
                                    } // end handler
                                }
                          ] // end buttons Header
                    }//end Header
            
            , {
            xtype: 'grid',
            id: me.prefix + 'grid',
            title: 'User Management List',
            columnLines: true,
            //  autoScore: true,
            region: 'center',
            store: me.gridStore,
            selModel: Ext.create('Ext.selection.CheckboxModel'),
            columns: [
            { text: 'MatId', dataIndex: 'MatId', width: 250, sortable: false, align: 'center',hidden: true },
            { text: 'Material Name', dataIndex: 'MatName', width: 250, sortable: false, align: 'center' },
            { text: 'Material Detail', dataIndex: 'MatDetail', width: 250, sortable: false, align: 'center' },
            { text: 'Price', dataIndex: 'MatPrice', width: 250, sortable: false, align: 'center'},
            { text: 'Reorder Point', dataIndex: 'MatReorderPoint', width: 250, sortable: false, align: 'center' },
            { text: 'UnitID', dataIndex: 'UnitID', width: 250, sortable: false, align: 'center',hidden: true }
            ],

            bbar: Ext.create('Ext.PagingToolbar', {
            id: me.prefix + 'PagingToolbar',
            store: me.gridStore
            , displayInfo: true
            , displayMsg: 'Displaying User and Roles Order {0} - {1} of {2}'
            , emptyMsg: "No User and Roles Order to display",
            }),
            viewConfig: {
            listeners: {
            itemdblclick: me.popUpEditItem
            //    itemclick: me.manageRedeployBtn
            }
            }, //end view config

            dockedItems: [{
                xtype: 'toolbar',
                items: [{
                iconCls: 'icon-edit',
                text: 'Edit',
                tooltip: 'Update Material',
                disabled: false,
                handler: function (btn, evt) {
                var gridpanel = btn.up().up();
                var recordSelected = gridpanel.getSelectionModel().getSelection();
                if (recordSelected.length == 1) {
                //me.popUpEditItem(gridpanel, recordSelected[0], btn);
                //console.log("grid:"+gridpanel+"rec:"+recordSelected[0]+"btn:"+btn);
                me.popUpEditItem(gridpanel, recordSelected[0], btn);
                }
                } //end handler
                },
                {
                        iconCls: 'icon-delete',
                        text: 'Delete',
                        tooltip: 'Delete Material',
                        disabled: false,
                        handler: function (btn, evt) {
                            var gridpanel = btn.up().up();
                            var recordsSelected = gridpanel.getSelectionModel().getSelection();

                            if (recordsSelected.length) {
                                Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete that?', function (cbtn, bool) {
                                    if (cbtn == 'yes')    //                            
                                        me.deleteMaterial(gridpanel, recordsSelected, 'Delete');   //    
                                });
                            }
                        }
                    },
                '->'
                , {
                iconCls: 'icon-add',
                text: 'Material',
                handler: function (btn, evt) {
                Ext.MessageBox.show({
                msg: 'Please wait generate items...', width: 300, closable: false
                });
                //create new poppu
                var quickConfWindow = new EditEmployeeWindow(
                {
                    listeners: {
                                    close: function (panel, eOpts) {
                                    if (panel.intend === 'save-success') {
                                        console.log('insave success');
                                        me.search(window.gridCustomer,me.username,me.role);
                                    }
                                }
                },
                anicuseTarget: btn
                }
                );

                quickConfWindow.create();
                // quickConfWindow.saveService = window.SaveQuickDeploymentAct;
                Ext.MessageBox.hide();
                quickConfWindow.show();

                } // end handler
                }] // end items
            }]//end dockedItems
            }//end grid
            
            ]//end item
        }); //end apply
        //me.gridStore.setpro
        CustomerForm.superclass.constructor.apply(this, arguments);
    } // end constructor
});

//fn update
CustomerForm.prototype.popUpEditItem = function (dataview, record, parent, mode) {
    var id = record.get('MatId');
    var unitId = record.get("UnitID");
    var cusName = record.get("MatName");
    var cusDetail = record.get("MatDetail");
    var cusPrice = record.get("MatPrice");
    var cusReorderPoint = record.get("MatReorderPoint");

    CustomerForm.prototype.popUpEditMaterial(id, unitId, cusName, cusDetail,cusPrice, cusReorderPoint);
};

//fn search
CustomerForm.prototype.search = function (url, MatName, role) {
    var prefix = 'CustomerForm-';

    var quickStore = Ext.getStore(prefix + 'gridStore');
    quickStore.proxy.url = url;
    quickStore.getProxy().extraParams.MatName = MatName;    
    var pagingToolbar = Ext.getCmp(prefix + 'PagingToolbar');
    pagingToolbar.moveFirst();
 
};

//CustomerForm.prototype.popUpEditMaterial = function (id, username, email, role, parent, mode) {
//    
//}


//handle change role
CustomerForm.prototype.popUpEditMaterial = function (id, unitId, cusName, cusDetail,matPrice, matReorderPoint) {
    var prefix = 'updateMaterial-';
    var url = window.updateMaterial;
    var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
    var unitCombobox = Ext.create('Ext.data.Store', {
            autoLoad: true,
            fields: ['ID', 'UnitName'],
            proxy: {
                type: 'ajax',
                url: window.unitData,
                reader: {
                    type: 'json',
                    root: 'items'
                }
            },
            storeId: prefix+'storecommb',
            root: 'items'
         });

    var win = new Ext.Window({
        id: prefix + 'update',
        iconCls: 'icon-details',
        title: 'Update Material',
        y: 20,
        width    :500,
        //height   :args.height * 1.0 ||200,
        resizable: false,
        modal: true,
        buttonAlign: 'center',
        //            autoScroll: true,
        layout: 'vbox',
        xtype: 'fieldset',
        defaultType: 'textfield',
        layout: { type: 'table', columns: 1 },
        defaults: { style: 'margin:2px 5px;', labelWidth: 170 },
        items: [
                 { id: prefix + 'UNITAID',
                    name: 'UNITAID',
                    xtype: 'combo',
                    editable: false,
                    anchor: '-10',
                    fieldLabel: 'Unit',
                    afterLabelTextTpl: required,
                    labelStyle: 'text-align: right',
                    value: 'Plese Select',
                    store: unitCombobox,
                    queryMode: 'remote',
                    displayField: 'UnitName',
                    valueField: 'ID'
                },
                 { id: prefix + 'MATNAME', name: 'MATNAME', fieldLabel: 'Materaial Name', labelStyle: 'text-align: right'
                    , afterLabelTextTpl: required, xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false },
                { id: prefix + 'MATDETAIL', name: 'MATDETAIL', fieldLabel: 'Detail', labelStyle: 'text-align: right'
                    , afterLabelTextTpl: required, xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false
                },
                { id: prefix + 'MATPrice', name: 'MATPrice', fieldLabel: 'Price', labelStyle: 'text-align: right'
                    , afterLabelTextTpl: required, xtype: 'numberfield', fieldStyle: 'text-align: right', allowBlank: false
                },
                { id: prefix + 'MATREORDERPOINT', name: 'MATREORDERPOINT', fieldLabel: 'Reorder Point', labelStyle: 'text-align: right'
                    , afterLabelTextTpl: required, xtype: 'numberfield', fieldStyle: 'text-align: right', allowBlank: false
                }
                ],
        buttons: [{
            text: 'Update',
            onClick: function (button) {
                
                var unitId = Ext.getCmp(prefix + 'UNITAID').getValue();

                Ext.Ajax.request({
                    method: 'post',
                    url: url,
                    params: {
                                unitID: Ext.getCmp(prefix + 'UNITAID').getValue(),
                                matName: Ext.getCmp(prefix + 'MATNAME').getValue(),
                                matDetail: Ext.getCmp(prefix + 'MATDETAIL').getValue(),
                                matPrice: Ext.getCmp(prefix + 'MATPrice').getValue(),
                                matReorderPront: Ext.getCmp(prefix + 'MATREORDERPOINT').getValue(),
                                matID: id
                            },
                    success: function (response) {
                        var text = response.responseText;
                        Ext.MessageBox.alert('Change role successfull !!');
                        CustomerForm.prototype.search(window.gridCustomer, "", "All Role");
                        // process server response here
                    }
                });

                win.destroy();

            }
        },
                {
                    iconCls: 'icon-cancel',
                    text: 'Cancel',
                    name: 'button-cancel',
                    handler: function (btn, evt) {
                        intend = "cancel";
                        win.destroy();
                    }
                }]
    }).show();
//set data
    //Ext.getCmp(prefix + 'UNNIID').setValue(unitId);
    Ext.getCmp(prefix + 'MATNAME').setValue(matName);
    Ext.getCmp(prefix + 'MATDETAIL').setValue(matDetail);
    Ext.getCmp(prefix + 'MATPrice').setValue(matPrice);
    Ext.getCmp(prefix + 'MATREORDERPOINT').setValue(matReorderPoint);
    Ext.getCmp(prefix + 'UNITAID').setValue(unitId);
}


//delete customer
CustomerForm.prototype.deleteMaterial = function (dataview, reconds, type) {
    var customerIds = [];
    for (var i = 0; i < reconds.length; i++) {
        var id = reconds[i].get('MatId');
        console.log(id);
        customerIds.push(id);
    }
    var method = window.MaterailDelete;
    
    Ext.MessageBox.show({
        msg: 'Please wait update status items...',
        width: 300,
        closable: false
    });

    $.ajax({
        type: "POST",
        cache: false,
        data: Ext.encode(customerIds),
        //async: false,
        url: method,
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (result) {
            Ext.MessageBox.hide();
            var me = this
            me.url = window.gridCustomer
            if (result.success) {
                Ext.MessageBox.alert('Status', result.message);
                CustomerForm.prototype.search(me.url,"","");
            }
            else {
                Ext.MessageBox.alert('Status', "Error: " + result.message);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + " " + thrownError);
            Ext.MessageBox.hide();
        }
    });
};



