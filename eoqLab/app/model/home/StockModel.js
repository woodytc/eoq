Ext.define('EOQ.model.PurchaseOrder', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'ProductID', type: 'int' },
        { name: 'ProductName' },
        { name: 'CategoryID', type: 'int' },
        { name: 'CategoryName' },
        { name: 'ColorID', type: 'int' },
        { name: 'ColorName', type: 'int' },
        { name: 'UnitID', type: 'int' },
        { name: 'UnitName' },
        { name: 'BrandID', type: 'int' },
        { name: 'BrandName' },
        { name: 'Price', type: 'float' }
    ]
});