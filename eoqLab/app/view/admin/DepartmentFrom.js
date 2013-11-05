Ext.define('DepartmentFrom', {
     extend: 'Ext.Panel',

    constructor: function (config) {
        var me = this;
        var prefix = "DepartmentFrom-";
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
            model: 'DepartmentViewModel',
            proxy: proxyOptions
        });

        Ext.apply(this, {
            iconCls: 'icon-tabs',
            title: 'Deparment',
            layout: 'border',
            autoScroll: true,
            border: true,
            items: [
                    {
                        //Header                
                        xtype: 'panel',
                        title: 'Deparment Managemnet',
                        bodyStyle: 'padding:5px 5px 0',
                        region: 'north',
                        border: true,
                        defaults: { xtype: 'container', flex: 1, layout: 'anchor' },
                        buttonAlign: 'center',
                        layout: 'hbox',
                        items: [
                                {   // column 1
                                    defaults: { labelWidth: 500 },
                                    defaultType: 'textfield',
                                    margins: '10 5 0 20',
                                    fieldDefaults: { labelAlign: 'right' },
                                    labelStyle: 'text-align: right',
                                    items: [
                                            { id: me.prefix + 'departName', name: 'departName', fieldLabel: 'ชื่อแผนก',labelStyle: 'text-align: right', emptyText: '[ชื่อแผนก]', anchor: '-600'}
                                    ]
                                }
                        ]//end main item in header
                        , buttons: [ //buttons
                                    {
                                    iconCls: 'icon-find',
                                    id: me.prefix + 'user-search-btn-Search',
                                    text: 'Search',
                                    //Handler event btn search click
                                    handler: function (btn, evt) {
                                        //get value from textbox and combobox
                                        
                                        me.departName = Ext.getCmp(me.prefix + 'departName').getValue();
                                        
                                        me.search(window.gridDepartmentData, me.departName);
                                    } // end handler
                                }, {
                                    iconCls: 'icon-reload',
                                    id: me.prefix + 'user-btn-Reset',
                                    text: 'Reset',
                                    handler: function (btn, evt) {
                                        Ext.getCmp(me.prefix + 'departName').setValue('');
                                    } // end handler
                                }
                          ] // end buttons Header
                    }//end Header
            
            , {
            xtype: 'grid',
            id: me.prefix + 'grid',
            title: 'Department Management List',
            columnLines: true,
            region: 'center',
            store: me.gridStore,
            selModel: Ext.create('Ext.selection.CheckboxModel'),
            columns: [
            { text: 'รหัส', dataIndex: 'DepartID', width: 250, sortable: false, align: 'center' },
            { text: 'ชื่อแผนก', dataIndex: 'DepartName', width: 250, sortable: false, align: 'center' }
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
            itemdblclick: me.popUpEditItem,
            //    itemclick: me.manageRedeployBtn
            }
            }, //end view config

            dockedItems: [{
            xtype: 'toolbar',
            items: [{
            iconCls: 'icon-edit',
            text: 'Edit',
            tooltip: 'Update Department',
            disabled: false,
            handler: function (btn, evt) {
            var gridpanel = btn.up().up();
            var recordSelected = gridpanel.getSelectionModel().getSelection();
            if (recordSelected.length == 1) {
                me.popUpEditItem(gridpanel, recordSelected[0], btn);
            }
            } //end handler
            },
            {
                    iconCls: 'icon-delete',
                    text: 'Delete',
                    tooltip: 'Delete Department',
                    disabled: false,
                    handler: function (btn, evt) {
                        var gridpanel = btn.up().up();
                        var recordsSelected = gridpanel.getSelectionModel().getSelection();

                        if (recordsSelected.length) {
                            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete that?', function (cbtn, bool) {
                                if (cbtn == 'yes')    //                            
                                    me.deleteDepartment(gridpanel, recordsSelected, 'Delete');   //    
                            });
                        }
                    }
                },
            '->'
            , {
            iconCls: 'icon-add',
            text: 'Add Department',
            handler: function (btn, evt) {
            Ext.MessageBox.show({
            msg: 'Please wait generate items...', width: 300, closable: false
            });
            //create new poppu
            var quickConfWindow = new EditDepartmentWindow(
            {
                listeners: {
                                close: function (panel, eOpts) {
                                if (panel.intend === 'save-success') {
                                    console.log('insave success');
                                    me.search(window.gridDepartmentData,"");
                                }
                            }
            },
            animateTarget: btn
            }
            );

            quickConfWindow.create();
            Ext.MessageBox.hide();
            quickConfWindow.show();

            } // end handler
            }] // end items
            }]//end dockedItems
            }//end grid
            
            ]//end item
        }); //end apply
        //me.gridStore.setpro
        DepartmentFrom.superclass.constructor.apply(this, arguments);
    } // end constructor
});

//fn update
DepartmentFrom.prototype.popUpEditItem = function (dataview, record, parent, mode) {
    var DepartID = record.get('DepartID');
    var DepartName = record.get("DepartName");
    DepartmentFrom.prototype.popUpEditDepartment(DepartID, DepartName);
};

//fn search
DepartmentFrom.prototype.search = function (url, DepartName) {
    var prefix = 'DepartmentFrom-';

    var quickStore = Ext.getStore(prefix + 'gridStore');
    quickStore.proxy.url = url;
    quickStore.getProxy().extraParams.departName = DepartName;    
    var pagingToolbar = Ext.getCmp(prefix + 'PagingToolbar');
    pagingToolbar.moveFirst();
 
};

//popup window updatefrom
DepartmentFrom.prototype.popUpEditDepartment = function (id, departName) {
    var prefix = 'updateDepartment-';
    var url = window.updateDepartment;
    var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
    
    var win = new Ext.Window({
        id: prefix + 'update',
        iconCls: 'icon-details',
        title: 'Update Department',
        y: 20,
        width    :500,
        resizable: false,
        modal: true,
        buttonAlign: 'center',
        layout: 'vbox',
        xtype: 'fieldset',
        defaultType: 'textfield',
        //layout: { type: 'table', columns: 1 },
        defaults: { style: 'margin:2px 5px;', labelWidth: 170 },
        items: [
                { id: prefix + 'departID', name: 'departID', fieldLabel: 'รหัสแผนก', labelStyle: 'text-align: right'
                    , afterLabelTextTpl: required, xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false,readOnly:true},
                { id: prefix + 'departName', name: 'departName', fieldLabel: 'หน่วย', labelStyle: 'text-align: right'
                    , afterLabelTextTpl: required, xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false }
                ],
        buttons: [{
            text: 'Update',
            onClick: function (button) {
                
                Ext.Ajax.request({
                    method: 'post',
                    url: url,
                    params: {
                                departID: Ext.getCmp(prefix + 'departID').getValue(),
                                departName: Ext.getCmp(prefix + 'departName').getValue(),
                            },
                    success: function (response) {
                        var text = response.responseText;
                        Ext.MessageBox.alert('Change role successfull !!');
                        DepartmentFrom.prototype.search(window.gridDepartmentData, "");
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
    Ext.getCmp(prefix + 'departName').setValue(departName);
    Ext.getCmp(prefix + 'departID').setValue(id);
}


//delete Department
DepartmentFrom.prototype.deleteDepartment = function (dataview, reconds, type) {
    var Ids = [];
    for (var i = 0; i < reconds.length; i++) {
        var id = reconds[i].get('DepartID');
        Ids.push(id);
    }
    var method = window.DepartmentDelete;
    
    Ext.MessageBox.show({
        msg: 'Please wait update status items...',
        width: 300,
        closable: false
    });

    $.ajax({
        type: "POST",
        cache: false,
        data: Ext.encode(Ids),
        //async: false,
        url: method,
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (result) {
            Ext.MessageBox.hide();
            var me = this
            me.url = window.gridDepartmentData
            if (result.success) {
                Ext.MessageBox.alert('Status', result.message);
                DepartmentFrom.prototype.search(me.url,"");
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



