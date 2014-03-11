Ext.define('SaleItemForm', {
    extend: 'Ext.Panel',
    constructor: function (config) {
        var me = this;
        var prefix = "SalesItem-";
        me.prefix = prefix;

        //Define proxy datastore
        var proxyOptions = {
            type: 'ajax',
            reader: {
                type: 'json',
                successProperty: 'success',
                root: 'data',
                messageProperty: 'message'
            },
            writer: {
                type: 'json',
                writeAllFields: false
            },
            listeners: {
                exception: function (proxy, response, operation) {
                    Ext.MessageBox.show({
                        title: 'REMOTE EXCEPTION',
                        msg: operation.getError(),
                        icon: Ext.MessageBox.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            }
        };

        var saleItemProxy = proxyOptions;
        saleItemProxy.api = {
            read: window.read_saleItemsURL
        };

        //form store
        me.Store = Ext.create('Ext.data.Store', {
            id: me.prefix + 'salesStore',
            model: 'EOQ.Model.SalesItem',
            //autoLoad: true,
            pageSize: 25,
            encode: true,
            proxy: saleItemProxy
        });

        me.todate = new Date();

        //grid components
        me.grid = Ext.create('Ext.grid.Panel', {
            xtype: 'grid',
            id: prefix + 'grid',
            height: Ext.getBody().getViewSize().height * 0.8, // Change to support labtop screen
            width: Ext.getBody().getViewSize().width * 0.98,  // Change to support labtop screen
            minWidth: 800,
            minHeight: 550,
            frame: true,
            autoscroll: true,
            afteredit: true,
            title: '',
            iconCls: 'icon-grid',
            requires: [
                'Ext.grid.*',
                'Ext.data.*',
                'Ext.util.*',
            ],
            store: me.Store,
            region: 'center',
            columns: [{
                header: 'รหัสการขาย',
                sortable: true,
                dataIndex: 'SaleID',
                flex: 1,
                editable: false
            }, {
                header: 'วันที่ทำรายการ',
                dataIndex: 'CreateDate',
                xtype: 'datecolumn',
                editable: false,
                flex: 1,
                renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s')//' H:i')
            }],
            bbar: Ext.create('Ext.PagingToolbar', {
                id: me.prefix + 'PagingToolbar',
                store: me.Store
                , displayInfo: true
                , displayMsg: 'แสดงผลข้อมูลรายการ {0} - {1} of {2}'
                , emptyMsg: "ขออภัยยังไม่มีรายการแสดงขณะนี้"
            }),
            viewConfig: {
                listeners: {
                    itemdblclick: me.onViewItemClick
                }
            }

        }); //end grid setting

        //Display
       Ext.apply(this, {
             iconCls: 'icon-tabs',
             title: 'รายการขาย',
             layout: 'border',
             //autoScroll: true,
             border: true,
             items: [
                         {
                            //Header                
                            xtype: 'panel',
                            title: 'ประวัติรายการขาย',
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
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'วันที่ทำรายการ ',
                                            labelStyle: 'text-align: right',
                                            id: 'datepicker',
                                            maxValue: new Date(),
                                            value: me.todate,
                                            renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                                            layout: 'form',
                                            listeners: {
                                                select: function (combo, value) {
                                                    me.todate = value;
                                                }
                                            }
                                        }
                                    ]
                                    }
                            ]//end main item in header
                            , buttons: [ //buttons
                                    {
                                            iconCls: 'icon-find',
                                            text: 'ค้นหา',
                                            id: me.prefix + 'search',
                                            itemId: 'search',
                                            scope: me,
                                            handler: me.onSearchClick
                                    }, {
                                        iconCls: 'icon-reload',
                                        id: me.prefix + 'user-btn-Reset',
                                        text: 'ล้าง',
                                        handler: function (btn, evt) {
                                            Ext.getCmp(me.prefix + 'Name').setValue('');
                                        } // end handler
                                    }
                              ] // end buttons Header
                        },//end Header
                    me.grid
             ]
       }); // end Ext.apply

        //call to constuctor
        window.SaleItemForm.superclass.constructor.apply(this, arguments);
    }, onViewItemClick: function (dataview, record, parent, mode) {
        var saleItemId = record.get('SaleID'),
            createDate = record.get("CreateDate"),
            me = this,
            prefix = "SaleItem-";

        me.prefix = prefix;

        Ext.MessageBox.show({
            msg: 'กรุณารอสักครู่กำลังโหลดข้อมูล...', width: 300, closable: false
        });

        //Define proxy datastore
        var proxyOptions = {
            type: 'ajax',
            reader: {
                type: 'json',
                successProperty: 'success',
                root: 'data',
                messageProperty: 'message'
            },
            writer: {
                type: 'json',
                writeAllFields: false
            },
            listeners: {
                exception: function (proxy, response, operation) {
                    Ext.MessageBox.show({
                        title: 'REMOTE EXCEPTION',
                        msg: operation.getError(),
                        icon: Ext.MessageBox.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            }
        };

        //Products List data
        var saleItemProxy = proxyOptions;
        saleItemProxy.api = {
            read: window.read_saleItemURL
        };

        me.SaleStore = Ext.create('Ext.data.Store', {
            model: 'EOQ.Model.SalesItem',
            proxy: saleItemProxy,
            pageSize: 25,
            encode: true,
            autoLoad: true, //disable auto loading func.
            baseParams: {
                SaleItemID: saleItemId //, CreateDate: createDate
            }, listeners: {
                load: function (store, records) {
                    
                    Ext.getCmp(me.prefix + 'viewSaleDetail').loadRecord(store.getAt(0));
                    
                }
            }
        });

        //**    Sale Item - Materials Grid  **//
        var saleItemMaterialProxy = proxyOptions;
        saleItemMaterialProxy.api = {
            read: window.read_saleItemMaterialURL
        };

        me.gridStore = Ext.create('Ext.data.Store', {
            id: me.prefix + 'salesStore',
            model: 'EOQ.Model.SalesItem',
            autoLoad: true,
            pageSize: 25,
            encode: true,
            proxy: saleItemMaterialProxy
        });
        
        me.gridStore.getProxy().extraParams.SaleItemID = saleItemId;
        
        var saleitemMaterialGrid = Ext.create('Ext.grid.Panel', {
            xtype: 'grid',
            title : 'รายการสินค้าที่ขาย',
            id: prefix + 'stock',
            store : me.gridStore,
            height: 300,
            width: Ext.getBody().getViewSize().width * 0.59,  // Change to support labtop screen
            flex : 1,
            columnLines: true,
            columns: [
                        { text: 'ชื่อสินค้า', dataIndex: 'MaterialName', flex: 1, sortable: false, align: 'center', editable: false },
                        { text: 'หน่วย', dataIndex: 'UnitName', flex: 1, sortable: false, align: 'center', editable: false },
                        { text: 'สี', dataIndex: 'ColorName', flex: 1, sortable: false, align: 'center', editable: false },
                        { text: 'ยี่ห้อ', dataIndex: 'BrandName', flex: 1, sortable: false, align: 'center', editable: false },
                        { text: 'ขนาด', dataIndex: 'SizeName', flex: 1, sortable: false, align: 'center', editable: false },
                        { text: 'จำนวน', dataIndex: 'Amount', flex: 1, sortable: false, align: 'center', editable: false },
                        { text: 'ราคา', dataIndex: 'TotalPrice', flex: 1, sortable: false, align: 'center', editable: false }
                        ]
        });
        //**   End of Sale Item - Materials Grid  **//


        //set params
        me.SaleStore.getProxy().extraParams.SaleItemID = saleItemId;

        //create stock form
        var saleItemWindow = new Ext.form.FormPanel({
            id: me.prefix + 'viewSaleDetail',
            store: me.SaleStore,
            iconCls: 'icon-details',
            flex : 1,
            resizable: false,
            modal: true,
            buttonAlign: 'center',
            minwidth : 500,
            minHeight : 300,
            xtype: 'fieldset',
            defaultType: 'textfield',
            layout: { type: 'table', columns: 1 },
            defaults: { style: 'margin:2px 5px;', labelWidth: 170 },
            items: [
                    { id: prefix + 'Amount', name: 'Amount', fieldLabel: 'จำนวนรวม', labelStyle: 'text-align: right'
                    , xtype: 'textfield', fieldStyle: 'text-align: right', disabled: true, editable: false, dataIndex: 'Amount'
                    },
                    { id: prefix + 'TotalPrice', name: 'TotalPrice', fieldLabel: 'ราคารวม', labelStyle: 'text-align: right'
                    , xtype: 'textfield', fieldStyle: 'text-align: right', disabled: true, editable: false, dataIndex: 'TotalPrice'
                    },
                    { id: prefix + 'Tax', name: 'Tax', fieldLabel: 'ภาษีรวม', labelStyle: 'text-align: right'
                    , xtype: 'textfield', fieldStyle: 'text-align: right', disabled: true, editable: false, dataIndex: 'Tax', hidden: true
                    }, saleitemMaterialGrid
                ]
        });
        
        //popup window
        window.salewin = new Ext.Window({
            title: 'รายละเอียดรายการขายสินค้า :' + createDate,
            closeAction: 'hide',
            id: me.prefix + 'saleItemWindow',
            height: Ext.getBody().getViewSize().height * 0.8, // Change to support labtop screen
            width: Ext.getBody().getViewSize().width * 0.6,  // Change to support labtop screen
            layout: 'fit',
            resizable: true,
            closeable: true,
            overflowY: 'scroll',
            modal: true,
            items: [saleItemWindow],
            buttons: [
                    {
                        iconCls: 'icon-cancel',
                        text: 'ปิดหน้าต่าง',
                        name: 'button-cancel',
                        handler: function (btn, evt) {
                            window.salewin.destroy();
                        }
                    }]
        }).show();

        Ext.MessageBox.hide();
      //  window.salewin.show();

    }, onSearchClick: function () {
        var me = this;
        me.toDate = Ext.getCmp('datepicker').getValue();

        //Call function search load data display grid
        var prefix = 'SalesItem-';
        var quickStore = Ext.getStore(prefix + 'salesStore');
        quickStore.getProxy().api.read = (me.toDate == null || me.toDate == "") ? window.read_saleItemsURL : window.search_saleItemURL;
        quickStore.getProxy().extraParams.SaleDate = me.toDate;
        var pagingToolbar = Ext.getCmp(prefix + 'PagingToolbar');
        pagingToolbar.moveFirst();

    }
});