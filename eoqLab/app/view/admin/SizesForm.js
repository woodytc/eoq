Ext.define('SizesForm', {
     extend: 'Ext.Panel',

    constructor: function (config) {
        var me = this;
        var prefix = "SizesForm-";
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
            model: 'CommonViewModel',
            proxy: proxyOptions
        });

        Ext.apply(this, {
            iconCls: 'icon-tabs',
            title: 'ขนาดสินค้า',
            layout: 'border',
            autoScroll: true,
            border: true,
            items: [
                    {
                        //Header                
                        xtype: 'panel',
                        title: 'จัดการขนาดสินค้า',
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
                                            { id: me.prefix + 'Name', name: 'Name', fieldLabel: 'ขนาดสินค้า',labelStyle: 'text-align: right', emptyText: '[ขนาดสินค้า]', anchor: '-600'}
                                    ]
                                }
                        ]//end main item in header
                        , buttons: [ //buttons
                                    {
                                    iconCls: 'icon-find',
                                    id: me.prefix + 'user-search-btn-Search',
                                    text: 'ค้นหา',
                                    //Handler event btn search click
                                    handler: function (btn, evt) {
                                        //get value from textbox and combobox
                                        
                                        me.name = Ext.getCmp(me.prefix + 'Name').getValue();
                                        
                                        me.search(window.gridSizesData, me.name);
                                    } // end handler
                                }, {
                                    iconCls: 'icon-reload',
                                    id: me.prefix + 'user-btn-Reset',
                                    text: 'ล้าง',
                                    handler: function (btn, evt) {
                                        Ext.getCmp(me.prefix + 'Name').setValue('');
                                    } // end handler
                                }
                          ] // end buttons Header
                    }//end Header
            
            , {
            xtype: 'grid',
            id: me.prefix + 'grid',
            title: 'รายการ ขนาดสินค้า',
            columnLines: true,
            //  autoScore: true,
            region: 'center',
            store: me.gridStore,
            selModel: Ext.create('Ext.selection.CheckboxModel'),
            columns: [
            { text: 'รหัส', dataIndex: 'Id', width: 250, sortable: false, align: 'center' },
            { text: 'ขนาด', dataIndex: 'Name', width: 250, sortable: false, align: 'center' }//,
            //{ text: 'จำนวนนับ', dataIndex: 'unit', width: 250, sortable: false, align: 'center' },
            ],

            bbar: Ext.create('Ext.PagingToolbar', {
            id: me.prefix + 'PagingToolbar',
            store: me.gridStore
            , displayInfo: true
            , displayMsg: 'แสดงรายการขนาดสินค้า {0} - {1} of {2}'
            , emptyMsg: "ไม่มีรายการขนาดสินค้า",
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
            tooltip: 'Update Sizes',
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
                    tooltip: 'Delete Sizes',
                    disabled: false,
                    handler: function (btn, evt) {
                        var gridpanel = btn.up().up();
                        var recordsSelected = gridpanel.getSelectionModel().getSelection();

                        if (recordsSelected.length) {
                            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete that?', function (cbtn, bool) {
                                if (cbtn == 'yes')    //                            
                                    me.deleteSizes(gridpanel, recordsSelected, 'Delete');   //    
                            });
                        }
                    }
                },
            '->'
            , {
            iconCls: 'icon-add',
            text: 'Add Sizes',
            handler: function (btn, evt) {
            Ext.MessageBox.show({
            msg: 'Please wait generate items...', width: 300, closable: false
            });
            //create new poppu
            var quickConfWindow = new EditSizesWindow(
            {
                listeners: {
                                close: function (panel, eOpts) {
                                if (panel.intend === 'save-success') {
                                    console.log('insave success');
                                    me.search(window.gridSizesData,me.username);
                                }
                            }
            },
            animateTarget: btn
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
        SizesForm.superclass.constructor.apply(this, arguments);
    } // end constructor
});

//fn update
SizesForm.prototype.popUpEditItem = function (dataview, record, parent, mode) {
    var id = record.get('Id');
    var name = record.get("Name");
    SizesForm.prototype.popUpEditSizes(id, name);
};

//fn search
SizesForm.prototype.search = function (url, name) {
    var prefix = 'SizesForm-';

    var quickStore = Ext.getStore(prefix + 'gridStore');
    quickStore.proxy.url = url;
    quickStore.getProxy().extraParams.name = name;    
    var pagingToolbar = Ext.getCmp(prefix + 'PagingToolbar');
    pagingToolbar.moveFirst();
 
};

//popup window updatefrom
SizesForm.prototype.popUpEditSizes = function (id, name) {
    var prefix = 'updateSizes-';
    var url = window.updateSize;
    var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
    
    var win = new Ext.Window({
        id: prefix + 'update',
        iconCls: 'icon-details',
        title: 'Update Sizes',
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
                { id: prefix + 'ID', name: 'Id', fieldLabel: 'รหัส', labelStyle: 'text-align: right'
                    , afterLabelTextTpl: required, xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false,readOnly:true},
                { id: prefix + 'name', name: 'Name', fieldLabel: 'สี่', labelStyle: 'text-align: right'
                    , afterLabelTextTpl: required, xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false }
                ],
        buttons: [{
            text: 'Update',
            onClick: function (button) {
                
                Ext.Ajax.request({
                    method: 'post',
                    url: url,
                    params: {
                                Id: Ext.getCmp(prefix + 'ID').getValue(),
                                Name: Ext.getCmp(prefix + 'name').getValue(),
                            },
                    success: function (response) {
                        var text = response.responseText;
                        Ext.MessageBox.alert('Change role successfull !!');
                        SizesForm.prototype.search(window.gridSizesData, "");
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
    Ext.getCmp(prefix + 'name').setValue(name);
    Ext.getCmp(prefix + 'ID').setValue(id);
}


//delete Sizes
SizesForm.prototype.deleteSizes = function (dataview, reconds, type) {
    var SizesIds = [];
    for (var i = 0; i < reconds.length; i++) {
        var id = reconds[i].get('Id');
        SizesIds.push(id);
    }
    var method = window.deleteSize;
    
    Ext.MessageBox.show({
        msg: 'Please wait update status items...',
        width: 300,
        closable: false
    });

    $.ajax({
        type: "POST",
        cache: false,
        data: Ext.encode(SizesIds),
        //async: false,
        url: method,
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (result) {
            Ext.MessageBox.hide();
            var me = this
            me.url = window.gridSizesData
            if (result.success) {
                Ext.MessageBox.alert('Status', result.message);
                SizesForm.prototype.search(me.url,"");
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



