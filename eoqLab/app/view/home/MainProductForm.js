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
                root: 'items',
                totalProperty: 'total'
            },
            simpleSortMode: true
        };

        proxyOptions.api = { read: window.read_mainProductURL };
        
        me.gridStore = Ext.create('Ext.data.JsonStore', {
            id: me.prefix + 'gridStore',
            pageSize: 25,
            autoLoad: true,
            model: 'MaterialViewModel',
            proxy: proxyOptions
        });

        Ext.apply(this, {
            height: Ext.getBody().getViewSize().height * 0.95, // Change to support labtop screen
            width: Ext.getBody().getViewSize().width * 1,  // Change to support labtop screen
            minWidth: 500,
            minHeight: 650,
            modal: false,
            border: true,
            items: [
                    {
                        xtype: 'grid',
                        region: 'center',
                        id: 'main-product-list',
                        store: me.gridStore,
                        columnLines: true,
                        columns: [
                        { text: 'MatId', dataIndex: 'MatId', width: 250, sortable: false, align: 'center', hidden: true },
                        { text: 'Material Name', dataIndex: 'MatName', width: 250, sortable: false, align: 'center' },
                        { text: 'Material Detail', dataIndex: 'MatDetail', width: 250, sortable: false, align: 'center' },
                        { text: 'Price', dataIndex: 'MatPrice', width: 250, sortable: false, align: 'center' },
                        { text: 'Reorder Point', dataIndex: 'MatReorderPoint', width: 250, sortable: false, align: 'center' },
                        { text: 'UnitID', dataIndex: 'UnitID', width: 250, sortable: false, align: 'center', hidden: true }
                        ]
                    }//end Header
                   ]//end items
        }); //end apply

        MainProductForm.superclass.constructor.apply(this, arguments);
    } // end constructor
});