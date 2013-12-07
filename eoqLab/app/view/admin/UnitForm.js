Ext.define('UnitForm', {
     extend: 'Ext.Panel',

    constructor: function (config) {
        var me = this;
        var prefix = "UnitForm-";
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
            model: 'UnitViewModel',
            proxy: proxyOptions
        });

        Ext.apply(this, {
            iconCls: 'icon-tabs',
            title: 'หน่วย',
            layout: 'border',
            autoScroll: true,
            border: true,
            items: [
                    {
                        //Header                
                        xtype: 'panel',
                        title: 'บริหารจัดการหน่วย',
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
                                            { id: me.prefix + 'unitName', name: 'unitName', fieldLabel: 'หน่วย',labelStyle: 'text-align: right', emptyText: '[ซิ้น,อัน,กล่อง]', anchor: '-600'}
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
                                        
                                        me.unitName = Ext.getCmp(me.prefix + 'unitName').getValue();
                                        
                                        me.search(window.gridUnitData, me.unitName);
                                    } // end handler
                                }, {
                                    iconCls: 'icon-reload',
                                    id: me.prefix + 'user-btn-Reset',
                                    text: 'ล้าง',
                                    handler: function (btn, evt) {
                                        Ext.getCmp(me.prefix + 'unitName').setValue('');
                                    } // end handler
                                }
                          ] // end buttons Header
                    }//end Header
            
            , {
                xtype: 'grid',
                id: me.prefix + 'grid',
                title: 'รายการหน่วย',
                columnLines: true,
                //  autoScore: true,
                region: 'center',
                store: me.gridStore,
                selModel: Ext.create('Ext.selection.CheckboxModel'),
                columns: [
                { text: 'รหัส', dataIndex: 'ID', width: 250, sortable: false, align: 'center' },
                { text: 'ชื่อหน่วย', dataIndex: 'UnitName', width: 250, sortable: false, align: 'center' }//,
                //{ text: 'จำนวนนับ', dataIndex: 'unit', width: 250, sortable: false, align: 'center' },
                ],

                bbar: Ext.create('Ext.PagingToolbar', {
                id: me.prefix + 'PagingToolbar',
                store: me.gridStore
                , displayInfo: true
                , displayMsg: 'รายการหน่วย {0} - {1} of {2}'
                , emptyMsg: "ไม่มีรายการหน่วย",
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
                                    text: 'แก้ไข',
                                    tooltip: 'แกไขหน่วย',
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
                                    text: 'ลบ',
                                    tooltip: 'Delete Unit',
                                    disabled: false,
                                    handler: function (btn, evt) {
                                        var gridpanel = btn.up().up();
                                        var recordsSelected = gridpanel.getSelectionModel().getSelection();

                                        if (recordsSelected.length) {
                                            Ext.MessageBox.confirm('Confirm', 'คุณต้องการที่จะลบหน่วย?', function (cbtn, bool) {
                                                if (cbtn == 'yes')    //                            
                                                    me.deleteUnit(gridpanel, recordsSelected, 'Delete');   //    
                                            });
                                        }
                                    }
                                },
                             '->',
                            {
                                iconCls: 'icon-add',
                                text: 'เพิ่มหน่วย',
                                handler: function (btn, evt) {
                                    Ext.MessageBox.show({
                                    msg: 'Please wait generate items...', width: 300, closable: false
                                    });
                                    //create new poppu
                                    var quickConfWindow = new EditUnitWindow(
                                    {
                                        listeners: {
                                                        close: function (panel, eOpts) {
                                                        if (panel.intend === 'save-success') {
                                                            me.search(window.gridUnitData,me.username);
                                                        }
                                                    }
                                    },
                                        animateTarget: btn
                                    });
                                    quickConfWindow.create();
                                    Ext.MessageBox.hide();
                                    quickConfWindow.show();
                                } // end handler
                                    }
                        ] // end items
                }
                ]//end dockedItems
            }//end grid
            
            ]//end item
        }); //end apply
        //me.gridStore.setpro
        UnitForm.superclass.constructor.apply(this, arguments);
    } // end constructor
});

//fn update
UnitForm.prototype.popUpEditItem = function (dataview, record, parent, mode) {
    var id = record.get('ID');
    var unitName = record.get("UnitName");
    UnitForm.prototype.popUpEditUnit(id, unitName);
};

//fn search
UnitForm.prototype.search = function (url, unitName) {
    var prefix = 'UnitForm-';

    var quickStore = Ext.getStore(prefix + 'gridStore');
    quickStore.proxy.url = url;
    quickStore.getProxy().extraParams.unitName = unitName;    
    var pagingToolbar = Ext.getCmp(prefix + 'PagingToolbar');
    pagingToolbar.moveFirst();
 
};

//popup window updatefrom
UnitForm.prototype.popUpEditUnit = function (id, unitName) {
    var prefix = 'updateUnit-';
    var url = window.updateUnit;
    var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
    
    var win = new Ext.Window({
        id: prefix + 'update',
        iconCls: 'icon-details',
        title: 'แกไขหน่วย',
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
                    text: 'แก้ไข',
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
                                Ext.MessageBox.alert('Status',"ปรับปรุงเรียบร้อย");
                                UnitForm.prototype.search(window.gridUnitData, "");
                            }
                        });

                        win.destroy();

                    }
                   },
                    {
                        iconCls: 'icon-cancel',
                        text: 'ยกเลิก',
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
UnitForm.prototype.deleteUnit = function (dataview, reconds, type) {
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
                UnitForm.prototype.search(me.url,"");
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



