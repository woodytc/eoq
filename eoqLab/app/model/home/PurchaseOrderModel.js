Ext.define('EOQ.model.PurchaseOrder', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'ProductID', type: 'int' },
        { name: 'ProductName' },
        { name: 'CategoryID', type: 'int' },
        { name: 'CategoryName' },
        { name: 'Amount', type: 'int' },
        { name: 'UnitID', type: 'int' },
        { name: 'UnitName' },
        { name: 'Price', type: 'float' }
    ]
});

//Products
Ext.define('EOQ.Model.ProductsList', {
    extend: 'Ext.data.Model',
    idProperty: 'ProductID',
    fields: [
                    { name: 'ProductID', type: 'int' },
                    { name: 'ProductName', type: 'string' },
            ]
});

//Categories
Ext.define('EOQ.Model.CategoriesList', {
    extend: 'Ext.data.Model',
    idProperty: 'CategoryID',
    fields: [
                    { name: 'CategoryID', type: 'int' },
                    { name: 'CategoryName', type: 'string' },
            ]
});

//Units
Ext.define('EOQ.Model.UnitsList', {
    extend: 'Ext.data.Model',
    idProperty: 'UnitID',
    fields: [
                    { name: 'UnitID', type: 'int' },
                    { name: 'UnitName', type: 'string' },
            ]
});

window.purchaseOrderData = [
                    { ProductID: 3, ProductName: 'วัสดุ2', CategoryID: 2, CategoryName: 'หมวด2', Amount: 10, UnitID: 1, UnitName: "ขวด", Price: 100.00 },
                    { ProductID: 4, ProductName: 'วัสดุ2', CategoryID: 2, CategoryName: 'หมวด2', Amount: 1, UnitID: 1, UnitName: "ขวด", Price: 100.00},
];



/*
            {
                header: 'Estimate',
                width: 130,
                sortable: true,
                dataIndex: 'estimate',
                summaryType: 'sum',
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return value + ' hours';
                },
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return value + ' hours';
                },
                field: {
                    xtype: 'numberfield'
                }
            }, {
                header: 'Rate',
                width: 130,
                sortable: true,
                renderer: Ext.util.Format.usMoney,
                summaryRenderer: Ext.util.Format.usMoney,
                dataIndex: 'rate',
                summaryType: 'average',
                field: {
                    xtype: 'numberfield'
                }
            }, {
                header: 'Cost',
                width: 130,
                sortable: false,
                groupable: false,
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return Ext.util.Format.usMoney(record.get('estimate') * record.get('rate'));
                },
                summaryType: function (records) {
                    var i = 0,
                    length = records.length,
                    total = 0,
                    record;

                    for (; i < length; ++i) {
                        record = records[i];
                        total += record.get('estimate') * record.get('rate');
                    }
                    return total;
                },
                summaryRenderer: Ext.util.Format.usMoney
            }


*/