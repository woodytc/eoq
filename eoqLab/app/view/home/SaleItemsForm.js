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

        //grid store
        me.Store = Ext.create('Ext.data.Store', {
            id: me.prefix + 'salesStore',
            model: 'EOQ.Model.SalesItem',
            autoLoad: true,
            pageSize: 25,
            encode: true,
            proxy: saleItemProxy
        });

        me.todate = new Date();

        //grid buttons
        var headerButtons = {
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                xtype: 'datefield',
                fieldLabel: 'วันที่ทำรายการ ',
                cls: 'x-border-box, x-border-box',
                id: 'datepicker',
                maxValue: new Date(),
                value: me.todate,
                renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                padding: 5,
                layout: 'form',
                width: 230,
                labelWidth: 130,
                margins: '0 0 0 10',
                listeners: {
                    select: function (combo, value) {
                        me.todate = value;
                    }
                }
            }, {
                iconCls: 'icon-find',
                text: 'ค้นหา',
                id: me.prefix + 'search',
                itemId: 'search',
                scope: me,
                handler: me.onSearchClick
            }, {
                iconCls: 'icon-reload',
                id: me.prefix + 'clear',
                text: 'ล้าง',
                handler: function (btn, evt) {
                    Ext.getCmp('datepicker').setValue('');
                    me.grid.store.clearData();
                    me.grid.view.refresh();
                } // end handler
            }]

        };

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
            //renderTo: document.body,
            store: me.Store,
            //selModel: Ext.create('Ext.selection.CheckboxModel'),
            region: 'center',
            dockedItems: [headerButtons],
            columns: [{
                header: 'รหัสสินค้า',
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
                renderer: Ext.util.Format.dateRenderer('d/m/Y')//' H:i')
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
        Ext.apply(me, {
            buttonAlign: 'center',
            layout: 'vbox',
            items: [
                    {
                        xtype: 'form',
                        id: me.prefix + 'form',
                        defaultType: 'textfield',
                        buttonAlign: 'center',
                        autoScroll: true,
                        defaults: { style: 'margin:5px 5px 2px 10px;', labelWidth: 180, anchor: '100%' },
                        items: [me.grid]
                    }]

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

        //set params
        me.SaleStore.getProxy().extraParams.SaleItemID = saleItemId;

        //create stock form
        var saleItemWindow = new Ext.form.FormPanel({
            id: me.prefix + 'viewSaleDetail',
            store: me.SaleStore,
            iconCls: 'icon-details',
            y: 20,
            width: 500,
            resizable: false,
            modal: true,
            buttonAlign: 'center',
            xtype: 'fieldset',
            defaultType: 'textfield',
            layout: { type: 'table', columns: 1 },
            defaults: { style: 'margin:2px 5px;', labelWidth: 170 },
            items: [
                    { id: prefix + 'Amount', name: 'Amount', fieldLabel: 'จำนวนรวม', labelStyle: 'text-align: right'
                    , xtype: 'numberfield', fieldStyle: 'text-align: right', editable: false, dataIndex: 'Amount'
                    },
                    { id: prefix + 'TotalPrice', name: 'TotalPrice', fieldLabel: 'ราคารวม', labelStyle: 'text-align: right'
                    , xtype: 'numberfield', fieldStyle: 'text-align: right', editable: false, dataIndex: 'TotalPrice'
                    },
                    { id: prefix + 'Tax', name: 'Tax', fieldLabel: 'ภาษีรวม', labelStyle: 'text-align: right'
                    , xtype: 'numberfield', fieldStyle: 'text-align: right', editable: false, dataIndex: 'Tax'
                    }
                ]
        });

        window.salewin = Ext.widget('window', {
            title: 'รายละเอียดรายการขายสินค้า :' + createDate,
            closeAction: 'hide',
            id: me.prefix + 'saleItemWindow',
            height: Ext.getBody().getViewSize().height * 0.6, // Change to support labtop screen
            width: Ext.getBody().getViewSize().width * 0.6,  // Change to support labtop screen
            layout: 'fit',
            resizable: true,
            closeable : true,
            modal: true,
            items: saleItemWindow,
            buttons: [
                    {
                        iconCls: 'icon-cancel',
                        text: 'ปิดหน้าต่าง',
                        name: 'button-cancel',
                        handler: function (btn, evt) {
                            window.salewin.destroy();
                        }
                    }]
        });

        Ext.MessageBox.hide();
        window.salewin.show();

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