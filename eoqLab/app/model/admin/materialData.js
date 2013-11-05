Ext.define('MaterialViewModel', {
    extend: 'Ext.data.Model',
    fields: ['MatId', 'MatName', 'MatDetail', 'MatPrice','MatReorderPoint','UnitID'],
    idProperty: 'threadid'
});