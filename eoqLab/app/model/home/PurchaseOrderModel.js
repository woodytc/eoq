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



//model 
Ext.define('Model.Task', {
    extend: 'Ext.data.Model',
    idProperty: 'taskId',
    fields: [
                    { name: 'MaterialId', type: 'int' },
                    { name: 'ProductName', type: 'string' },
                    { name: 'project', type: 'string' },
                    { name: 'taskId', type: 'int' },
                    { name: 'description', type: 'string' },
                    { name: 'estimate', type: 'float' },
                    { name: 'rate', type: 'float' },
                    { name: 'due', type: 'date', dateFormat: 'm/d/Y' }
            ]
});
window.purchaseOrderData = [
                    { ProductID: 3, ProductName: 'วัสดุ2', CategoryID: 2, CategoryName: 'หมวด2', Amount: 10, UnitID: 1, UnitName: "ขวด", Price: 100.00 },
                    { ProductID: 4, ProductName: 'วัสดุ2', CategoryID: 2, CategoryName: 'หมวด2', Amount: 1, UnitID: 1, UnitName: "ขวด", Price: 100.00},
];
window.testPurchaseOrderData = [
                    { ProductID: 4, ProductName: 'วัสดุ2', project: 'Ext Forms: Field Anchoring', taskId: 112, description: 'Integrate 2.0 Forms with 2.0 Layouts', estimate: 6, rate: 150, due: '06/24/2007' },
                    { ProductID: 3, ProductName: 'วัสดุ1', project: 'Ext Forms: Field Anchoring', taskId: 113, description: 'Implement AnchorLayout', estimate: 4, rate: 150, due: '06/25/2007' },
                    { ProductID: 4, ProductName: 'วัสดุ2', project: 'Ext Forms: Field Anchoring', taskId: 114, description: 'Add support for multiple types of anchors', estimate: 4, rate: 150, due: '06/27/2007' },
                    { ProductID: 3, ProductName: 'วัสดุ1', project: 'Ext Forms: Field Anchoring', taskId: 115, description: 'Testing and debugging', estimate: 8, rate: 0, due: '06/29/2007' },
                    { ProductID: 4, ProductName: 'วัสดุ2', project: 'Ext Grid: Single-level Grouping', taskId: 101, description: 'Add required rendering "hooks" to GridView', estimate: 6, rate: 100, due: '07/01/2007' },
                    { ProductID: 4, ProductName: 'วัสดุ2', project: 'Ext Grid: Single-level Grouping', taskId: 102, description: 'Extend GridView and override rendering functions', estimate: 6, rate: 100, due: '07/03/2007' },
                    { ProductID: 4, ProductName: 'วัสดุ2', project: 'Ext Grid: Single-level Grouping', taskId: 103, description: 'Extend Store with grouping functionality', estimate: 4, rate: 100, due: '07/04/2007' },
                    { ProductID: 4, ProductName: 'วัสดุ2', project: 'Ext Grid: Single-level Grouping', taskId: 121, description: 'Default CSS Styling', estimate: 2, rate: 100, due: '07/05/2007' },
                    { ProductID: 3, ProductName: 'วัสดุ1', project: 'Ext Grid: Single-level Grouping', taskId: 104, description: 'Testing and debugging', estimate: 6, rate: 100, due: '07/06/2007' },
                    { ProductID: 3, ProductName: 'วัสดุ1', project: 'Ext Grid: Summary Rows', taskId: 105, description: 'Ext Grid plugin integration', estimate: 4, rate: 125, due: '07/01/2007' },
                    { ProductID: 3, ProductName: 'วัสดุ1', project: 'Ext Grid: Summary Rows', taskId: 106, description: 'Summary creation during rendering phase', estimate: 4, rate: 125, due: '07/02/2007' },
                    { ProductID: 4, ProductName: 'วัสดุ2', project: 'Ext Grid: Summary Rows', taskId: 107, description: 'Dynamic summary updates in editor grids', estimate: 6, rate: 125, due: '07/05/2007' },
                    { ProductID: 3, ProductName: 'วัสดุ1', project: 'Ext Grid: Summary Rows', taskId: 108, description: 'Remote summary integration', estimate: 4, rate: 125, due: '07/05/2007' },
                    { ProductID: 3, ProductName: 'วัสดุ1', project: 'Ext Grid: Summary Rows', taskId: 109, description: 'Summary renderers and calculators', estimate: 4, rate: 125, due: '07/06/2007' },
                    { ProductID: 4, ProductName: 'วัสดุ2', project: 'Ext Grid: Summary Rows', taskId: 110, description: 'Integrate summaries with GroupingView', estimate: 10, rate: 125, due: '07/11/2007' },
                    { ProductID: 4, ProductName: 'วัสดุ2', project: 'Ext Grid: Summary Rows', taskId: 111, description: 'Testing and debugging', estimate: 8, rate: 125, due: '07/15/2007' }
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