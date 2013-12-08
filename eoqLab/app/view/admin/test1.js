Ext.define('Test1', {
     extend: 'Ext.Panel',

    constructor: function (config) {
        var me = this;
        var prefix = "Test1-";
        me.prefix = prefix;
        
        Ext.apply(this, {
            iconCls: 'icon-tabs',
            xtype: 'fiom',
            title: 'Import',
            layout: 'border',
            autoScroll: true,
            border: true,
            items: [
                      {
            activeRecord: null,
            iconCls: 'icon-user',
            frame: true,
            title: 'User -- All fields are required',
            defaultType: 'textfield',
            bodyPadding: 5,
            fieldDefaults: {
                anchor: '100%',
                labelAlign: 'right'
            },
            items: [{
                fieldLabel: 'Email',
                name: 'email',
                allowBlank: false,
                vtype: 'email'
            }, {
                fieldLabel: 'First',
                name: 'first',
                allowBlank: false
            }, {
                fieldLabel: 'Last',
                name: 'last',
                allowBlank: false
            }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                items: ['->', {
                    iconCls: 'icon-save',
                    itemId: 'save',
                    text: 'Save',
                    disabled: true,
                    scope: this,
                    handler: this.onSave
                }, {
                    iconCls: 'icon-user-add',
                    text: 'Create',
                    scope: this,
                    handler: this.onCreate
                }, {
                    iconCls: 'icon-reset',
                    text: 'Reset',
                    scope: this,
                    handler: this.onReset
                }]
            }]
        }
//                    {
//                        //Header                
//                        xtype: 'panel',
//                        title: 'Test',
//                        bodyStyle: 'padding:5px 5px 0',
//                        region: 'north',
//                        border: true,
//                        defaults: { xtype: 'container', flex: 1, layout: 'anchor' },
//                        buttonAlign: 'center',
//                        layout: 'hbox',
//                        items: [
//                                {   // column 1
//                                    defaults: { labelWidth: 500 },
//                                    defaultType: 'textfield',
//                                    margins: '10 5 0 20',
//                                    fieldDefaults: { labelAlign: 'right' },
//                                    labelStyle: 'text-align: right',
//                                    items: [
//                                            { id: me.prefix + 'unitName', name: 'unitName', fieldLabel: 'หน่วย',labelStyle: 'text-align: right', emptyText: '[ซิ้น,อัน,กล่อง]', anchor: '-600'}
//                                    ]
//                                }
//                        ]//end main item in header
//                        , buttons: [ //buttons
//                                    {
//                                    iconCls: 'icon-find',
//                                    id: me.prefix + 'user-search-btn-Search',
//                                    text: 'Search',
//                                    //Handler event btn search click
//                                    handler: function (btn, evt) {
//                                        //get value from textbox and combobox
//                                        
//                                        me.unitName = Ext.getCmp(me.prefix + 'unitName').getValue();
//                                        
//                                        me.search(window.gridUnitData, me.unitName);
//                                    } // end handler
//                                },
//                                {
//                                    iconCls: 'icon-reload',
//                                    id: me.prefix + 'user-btn-Reset',
//                                    text: 'Reset',
//                                    handler: function (btn, evt) {
//                                        Ext.getCmp(me.prefix + 'unitName').setValue('');
//                                    } // end handler
//                                }
//                          ] // end buttons Header
//                    }//end Header
            
                , {
                    xtype: 'grid',
                    id: me.prefix + 'grid',
                    title: 'Unit Management List',
                    columnLines: true,
                    //  autoScore: true,
                    region: 'center',
                    store: me.gridStore,
                    selModel: Ext.create('Ext.selection.CheckboxModel'),
                    columns: [
                            { text: 'รหัสสินค้า', dataIndex: 'ID', width: 250, sortable: false, align: 'center' },
                            { text: 'ชื่อสินค้า', dataIndex: 'UnitName', width: 250, sortable: false, align: 'center' },
                            { text: 'จำนวน', dataIndex: 'unit', width: 250, sortable: false, align: 'center' },
                            { text: 'หน่วย', dataIndex: 'unit', width: 250, sortable: false, align: 'center' },
                            { text: 'หน่วย', dataIndex: 'unit', width: 250, sortable: false, align: 'center' },
                            {
                                text: 'Stock Price',
                                columns: [{
                                    text     : 'Price',
                                    width    : 75,
                                    sortable : true,
                                    renderer : 'usMoney',
                                    dataIndex: 'price'
                                }, {
                                    text     : 'Change',
                                    width    : 80,
                                    sortable : true,
                                    renderer :  function(val) {
                                        if (val > 0) {
                                            return '<span style="color:green;">' + val + '</span>';
                                        } else if (val < 0) {
                                            return '<span style="color:red;">' + val + '</span>';
                                        }
                                        return val;
                                    },
                                    dataIndex: 'change'
                                }, {
                                    text     : '% Change',
                                    width    : 100,
                                    sortable : true,
                                    renderer : function(val) {
                                        if (val > 0) {
                                            return '<span style="color:green;">' + val + '</span>';
                                        } else if (val < 0) {
                                            return '<span style="color:red;">' + val + '</span>';
                                        }
                                        return val;
                                    },
                                    dataIndex: 'pctChange'
                                }]
                            }
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
                                tooltip: 'Update Unit',
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
                                    tooltip: 'Delete Unit',
                                    disabled: false,
                                    Shandler: function (btn, evt) {
                                        var gridpanel = btn.up().up();
                                        var recordsSelected = gridpanel.getSelectionModel().getSelection();

                                        if (recordsSelected.length) {
                                            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete that?', function (cbtn, bool) {
                                                if (cbtn == 'yes')    //                            
                                                    me.deleteUnit(gridpanel, recordsSelected, 'Delete');   //    
                                            });
                                        }
                                    }
                            },
                            '->'
                            , {
                                iconCls: 'icon-add',
                                text: 'Add Unit',
                                handler: function (btn, evt) {
                                    Ext.MessageBox.show({
                                    msg: 'Please wait generate items...', width: 300, closable: false
                                    });
                                    //create new poppu
                                    var quickConfWindow = new ImportWindow(
                                    {
                                        listeners: {
                                                        close: function (panel, eOpts) {
                                                        if (panel.intend === 'save-success') {
                                                            console.log('insave success');
                                                        //    me.search(window.gridUnitData,me.username);
                                                        }
                                                    }
                                        },
                                        animateTarget: btn
                                    });

                                    quickConfWindow.create();
                                    // quickConfWindow.saveService = window.SaveQuickDeploymentAct;
                                    Ext.MessageBox.hide();
                                    quickConfWindow.show();

                                } // end handler
                              }
                       ] // end items
                    }]//end dockedItems
                }//end grid
            
            ]//end item
        }); //end apply
        //me.gridStore.setpro
        Test1.superclass.constructor.apply(this, arguments);
    } // end constructor
});

//fn update
Test1.prototype.popUpEditItem = function (dataview, record, parent, mode) {
    var id = record.get('ID');
    var unitName = record.get("UnitName");
    Test1.prototype.popUpEditUnit(id, unitName);
};

//fn search
Test1.prototype.search = function (url, unitName) {
    var prefix = 'Test1-';

    var quickStore = Ext.getStore(prefix + 'gridStore');
    quickStore.proxy.url = url;
    quickStore.getProxy().extraParams.unitName = unitName;    
    var pagingToolbar = Ext.getCmp(prefix + 'PagingToolbar');
    pagingToolbar.moveFirst();
 
};

//popup window updatefrom
Test1.prototype.popUpEditUnit = function (id, unitName) {
    var prefix = 'updateUnit-';
    var url = window.updateUnit;
    var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
    
    var win = new Ext.Window({
        id: prefix + 'update',
        iconCls: 'icon-details',
        title: 'Update Unit',
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
        //layout: { type: 'table', columns: 1 },
        defaults: { style: 'margin:2px 5px;', labelWidth: 170 },
        items: [
                { id: prefix + 'unitID', name: 'unitID', fieldLabel: 'รหัสหน่วย', labelStyle: 'text-align: right'
                    , afterLabelTextTpl: required, xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false,readOnly:true},
                { id: prefix + 'unitName', name: 'unitName', fieldLabel: 'หน่วย', labelStyle: 'text-align: right'
                    , afterLabelTextTpl: required, xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false }
                ],
        buttons: [{
            text: 'Update',
            onClick: function (button) {
                
                Ext.Ajax.request({
                    method: 'post',
                    url: url,
                    params: {
                                unitID: Ext.getCmp(prefix + 'unitID').getValue(),
                                unitName: Ext.getCmp(prefix + 'unitName').getValue(),
                            },
                    success: function (response) {
                        var text = response.responseText;
                        Ext.MessageBox.alert('Change role successfull !!');
                        Test1.prototype.search(window.gridUnitData, "");
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
    Ext.getCmp(prefix + 'unitName').setValue(unitName);
    Ext.getCmp(prefix + 'unitID').setValue(id);
}


//delete Unit
Test1.prototype.deleteUnit = function (dataview, reconds, type) {
    var UnitIds = [];
    for (var i = 0; i < reconds.length; i++) {
        var id = reconds[i].get('ID');
        console.log(id);
        UnitIds.push(id);
    }
    var method = window.UnitDelete;
    
    Ext.MessageBox.show({
        msg: 'Please wait update status items...',
        width: 300,
        closable: false
    });

    $.ajax({
        type: "POST",
        cache: false,
        data: Ext.encode(UnitIds),
        //async: false,
        url: method,
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (result) {
            Ext.MessageBox.hide();
            var me = this
            me.url = window.gridUnitData
            if (result.success) {
                Ext.MessageBox.alert('Status', result.message);
                Test1.prototype.search(me.url,"");
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

 //listeners: {
            // edit: function (editor, e) {
            //     var record = e.record;
            //     //console.log(e);
            //     //console.log(editor);
            //     //console.log(Ext.String.format(
            //     //'The field "{0}" or record #{1} has been changed from {2} to {3}',
            //     //e.field, record.get('low'), e.originalValue, e.newValue
            //     //));

            //     //console.log('The following fields of the records are dirty: ' + Ext.Object.getKeys(record.modified).join(', '));
            //     e.record.commit();
            //    }
            //}