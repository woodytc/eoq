Ext.define('MainProductForm', {
    extend: 'Ext.Panel',

    constructor: function (config) {
        var me = this;
        var prefix = "MainProductForm-";
        me.prefix = prefix;

        //Define proxy datastore
        var proxyOptions = {
            type: 'ajax',
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'total'
            },
            simpleSortMode: true
        };

        proxyOptions.api = { read: window.read_mainProductURL };

        me.gridStore = Ext.create('Ext.data.JsonStore', {
            id: me.prefix + 'gridStore',
            pageSize: 25,
            autoLoad: true,
            model: 'EOQ.model.Mainproduct',
            proxy: proxyOptions
        });

        var headerButtons = {
            dock: 'top',
            xtype: 'toolbar',
            items: [
             '->',
             {
                 iconCls: 'icon-refresh-blue',
                 text: 'โหลดคลังสินค้าใหม่',
                 itemId: 'refresh',
                 scope: me,
                 handler: function (btn, evt) {
                     //me.search();
                     proxyOptions.api = { read: window.read_mainProductURL };
                     me.gridStore.proxy.url = window.read_mainProductURL;
                     me.gridStore.load();
                     var pagingToolbar = Ext.getCmp(prefix + 'PagingToolbar');
                     pagingToolbar.moveFirst();
                 } //end handler
             }]

        };

         Ext.apply(this, {
             iconCls: 'icon-tabs',
             title: 'หน้าหลัก',
             layout: 'border',
             //autoScroll: true,
             border: true,
             items: [
                    {
                        xtype: 'grid',
                        region: 'center',
                        id: 'main-product-list',
                        store: me.gridStore,
                        columnLines: true,
                        dockedItems: [headerButtons],
                        columns: [
                        { text: 'รหัสสินค้า', dataIndex: 'ProductID', width: 250, sortable: false, align: 'center' },
                        { text: 'ชื่อสินค้า', dataIndex: 'ProductName', width: 500, sortable: false, align: 'center' },
                        { text: 'จำนวน', dataIndex: 'Amount', width: 250, sortable: false, align: 'center' },
                        { text: 'หน่วย', dataIndex: 'Unit', width: 250, sortable: false, align: 'center' },
                        ],
                        bbar: Ext.create('Ext.PagingToolbar', {
                            id: me.prefix + 'PagingToolbar',
                            store: me.gridStore,
                            displayInfo: true,
                            displayMsg: 'แสดงรายการ {0} - {1} of {2}',
                            emptyMsg: "ไม่มีรายการที่ต้องการ"
                        })
                    }//end Header
            ]
            //end items
        }); //end apply

        window.MainProductForm.superclass.constructor.apply(this, arguments);
    } // end constructor
});

window.MainProductForm.prototype.search = function () {
    var url = window.read_mainProductURL;
    var prefix = 'MainProductForm-';
    var store = Ext.getStore(prefix + 'gridstore');
    console.log(store);

    store.proxy.url = url;

    var pagingToolbar = Ext.getCmp(prefix + 'PagingToolbar');
    pagingToolbar.moveFirst();

};