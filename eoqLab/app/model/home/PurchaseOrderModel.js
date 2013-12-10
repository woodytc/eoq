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