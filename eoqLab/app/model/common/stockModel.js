Ext.define('Stock', {
    extend: 'Ext.data.Model',
    fields: ['MatId', 'MatName', 'Amount', 'Total'],
    idProperty: 'threadid'
});