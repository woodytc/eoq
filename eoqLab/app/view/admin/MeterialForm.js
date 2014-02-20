Ext.define('MeterialForm', {
     extend: 'Ext.Panel',

    constructor: function (config) {
        var me = this;
        var prefix = "MeterialForm-";
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
            //autoLoad:true,
            proxy: proxyOptions
        });

        Ext.apply(this, {
            iconCls: 'icon-tabs',
            title: 'สินค้า',
            layout: 'border',
            autoScroll: true,
            border: true,
            items: [
                    {
                        //Header                
                        xtype: 'panel',
                        title: 'สินค้า',
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
                                            { id: me.prefix + 'matName', name: 'matName', fieldLabel: 'ชื่อสินค้า',labelStyle: 'text-align: right', emptyText: '[สินค้า]', anchor: '-600'}
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
                                        me.matName = Ext.getCmp(me.prefix + 'matName').getValue();
                                        //Call function search load data display grid
                                        me.search(window.gridMeterial, me.matName, me.role);
                                    } // end handler
                                }, {
                                    iconCls: 'icon-reload',
                                    id: me.prefix + 'user-btn-Reset',
                                    text: 'ล้าง',
                                    handler: function (btn, evt) {
                                        Ext.getCmp(me.prefix + 'matName').setValue('');
                                        //Ext.getCmp(me.prefix + 'role').setValue('All Role');
                                    } // end handler
                                }
                          ] // end buttons Header
                    }//end Header
            
            , {
                xtype: 'grid',
                id: me.prefix + 'grid',
                title: 'บริหารรายการสินค้า',
                columnLines: true,
                //  autoScore: true,
                region: 'center',
                store: me.gridStore,
                selModel: Ext.create('Ext.selection.CheckboxModel'),
                columns: [
                            { text: 'รหัสสินค้า', dataIndex: 'MatId', width: 250, sortable: false, align: 'center',hidden: true },
                            { text: 'รหัสหมวดสินค้า', dataIndex: 'CatelogyId', width: 250, sortable: false, align: 'center',hidden: true },
                            { text: 'ชื่อสินค้า', dataIndex: 'MetName', width: 250, sortable: false, align: 'center' },
                            { text: 'หมวดสินค้า', dataIndex: 'CatelogyName', width: 250, sortable: false, align: 'center'},
                            { text: 'รายละเอียดสินค้า', dataIndex: 'MatDetail', width: 250, sortable: false, align: 'center' }
                        ],
                            bbar: Ext.create('Ext.PagingToolbar', {
                            id: me.prefix + 'PagingToolbar',
                            store: me.gridStore
                            , displayInfo: true
                            , displayMsg: 'รายการสินค้า {0} - {1} of {2}'
                            , emptyMsg: "ไม่มีรายการสินค้า"
                        }),
                        viewConfig: {
                        listeners: {
                        itemdblclick: me.popUpEditItem//,
                    //    itemclick: me.manageRedeployBtn
                     }
            }, //end view config

                dockedItems: [{
                    xtype: 'toolbar',
                    items: [{
                        iconCls: 'icon-edit',
                        text: 'แก้ไข',
                        tooltip: 'แก้ไขรายการสินค้า',
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
                                text: 'ลบ',
                                tooltip: 'ลบสินค้า',
                                disabled: false,
                                handler: function (btn, evt) {
                                    var gridpanel = btn.up().up();
                                    var recordsSelected = gridpanel.getSelectionModel().getSelection();

                                    if (recordsSelected.length) {
                                        Ext.MessageBox.confirm('Confirm', 'คุณต้องการที่จะลบข้อมูล?', function (cbtn, bool) {
                                            if (cbtn == 'yes')    //                            
                                                me.deleteMaterial(gridpanel, recordsSelected, 'Delete');   //    
                                        });
                                    }
                                }
                            },
                        '->'
                        , {
                        iconCls: 'icon-add',
                        text: 'เพิ่มสินค้า',
                        handler: function (btn, evt) {
                                Ext.MessageBox.show({
                                msg: 'Please wait generate items...', width: 300, closable: false
                                });
                                //create new poppu
                                var quickConfWindow = new window.EditMaterialWindow(
                                //var quickConfWindow = new ImportWindow(
                                {
                                    listeners: {
                                        close: function (panel, eOpts) {
                                        if (panel.intend === 'save-success') {
                                            console.log('insave success');
                                            me.search(window.gridMeterial,me.username,me.role);
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
        window.MeterialForm.superclass.constructor.apply(this, arguments);
    } // end constructor
});

//fn update
MeterialForm.prototype.popUpEditItem = function (dataview, record, parent, mode) {
    var id = record.get('MatId');
    var unitId = record.get("CatelogyId");
    var matName = record.get("MetName");
    var matDetail = record.get("MatDetail");
    //var matPrice = record.get("MatPrice");
    //var matReorderPoint = record.get("MatReorderPoint");

    MeterialForm.prototype.popUpEditMaterial(id, unitId, matName, matDetail);
};

//fn search
MeterialForm.prototype.search = function (url, MatName, role) {
    var prefix = 'MeterialForm-';

    var quickStore = Ext.getStore(prefix + 'gridStore');
    quickStore.proxy.url = url;
    quickStore.getProxy().extraParams.MatName = MatName;    
    var pagingToolbar = Ext.getCmp(prefix + 'PagingToolbar');
    pagingToolbar.moveFirst();
 
};

//MeterialForm.prototype.popUpEditMaterial = function (id, username, email, role, parent, mode) {
//    
//}


//handle change role
MeterialForm.prototype.popUpEditMaterial = function (id, unitId, matName, matDetail) {
    var prefix = 'updateMaterial-';
    var url = window.updateMaterial;
    var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
    var unitCombobox = Ext.create('Ext.data.Store', {
            autoLoad: true,
            fields: ['ID', 'UnitName'],
            proxy: {
                type: 'ajax',
                url: window.catelogComboBox,
                reader: {
                    type: 'json',
                    root: 'items'
                }
            },
            storeId: prefix+'storecommb',
            root: 'items'
         });

     var catelogyCombobox = Ext.create('Ext.data.JsonStore', {
                        //model: 'ComboboxDefault',
                        autoLoad: true,
                        fields: ['Id', 'Name'],
                        proxy: {
                            type: 'ajax',
                            api: { read: window.catelogComboBox},
                            reader: {
                                type: 'json',
                                root: 'items'//,
                                //totalProperty: 'total'
                            }
                        }
                    });

    var win = new Ext.Window({
        id: prefix + 'update',
        iconCls: 'icon-details',
        title: 'Update Material',
        y: 20,
        width    :650,
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
                {id: prefix + 'catelogy', name: 'catelogyid', xtype: 'combo', mode: 'local', editable: false, displayField: 'Name', valueField: 'Id'
                        , queryMode: 'local', allowBlank: false, emptyText: 'selected'
                    , store:catelogyCombobox ,
                    fieldLabel: 'หมวดสินค้า', labelStyle: 'text-align: right',width: 500
                },
                 { id: prefix + 'MATNAME', name: 'MATNAME', fieldLabel: 'ชื่อสินค้า', labelStyle: 'text-align: right'
                    , afterLabelTextTpl: required, xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false,width: 500 },
                { id: prefix + 'MATDETAIL', name: 'MATDETAIL', fieldLabel: 'รายละเอียดสินค้า', labelStyle: 'text-align: right'
                    , afterLabelTextTpl: required,  xtype: 'textareafield', width: 500, fieldStyle: 'text-align: right', allowBlank: false
                }
                ],
                buttons: [{
                    text: 'ปรับปรุง',
                    onClick: function (button) {
                
                
                        Ext.Ajax.request({
                            method: 'post',
                            url: url,
                            params: {
                                        catelogyID: Ext.getCmp(prefix + 'catelogy').getValue(),
                                        matName: Ext.getCmp(prefix + 'MATNAME').getValue(),
                                        matDetail: Ext.getCmp(prefix + 'MATDETAIL').getValue(),
                                        matID: id
                                    },
                            success: function (response) {
                                var text = response.responseText;
                                Ext.MessageBox.alert('Status','ปรับปรุงข้อมูลเรียบร้อยแล้ว');
                                MeterialForm.prototype.search(window.gridMeterial, "", "All Role");
                                // process server response here
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
               }
               ]
    }).show();
//set data
    Ext.getCmp(prefix + 'MATNAME').setValue(matName);
    Ext.getCmp(prefix + 'MATDETAIL').setValue(matDetail);
    Ext.getCmp(prefix + 'catelogy').setValue(unitId);
}


//delete material
MeterialForm.prototype.deleteMaterial = function (dataview, reconds, type) {
    var materialIds = [];
    for (var i = 0; i < reconds.length; i++) {
        var id = reconds[i].get('MatId');
        materialIds.push(id);
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
        data: Ext.encode(materialIds),
        //async: false,
        url: method,
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (result) {
            Ext.MessageBox.hide();
            var me = this
            me.url = window.gridMeterial
            if (result.success) {
                Ext.MessageBox.alert('Status', result.message);
                MeterialForm.prototype.search(me.url,"","");
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



