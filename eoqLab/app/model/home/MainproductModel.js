Ext.define('EOQ.model.Mainproduct', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'ProductID', type: 'int' },
        { name: 'ProductName' },
        { name: 'QTY', type: 'int' },
        { name: 'UnitType' }
    ]
});

Ext.define('MaterialViewModel', {
    extend: 'Ext.data.Model',
    fields: ['MatId', 'MatName', 'MatDetail', 'MatPrice', 'MatReorderPoint', 'UnitID'],
    idProperty: 'MatId'
});