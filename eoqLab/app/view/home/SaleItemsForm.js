Ext.define('SaleItemForm', {
    extend: 'Ext.Panel',
    constructor: function(config) {
        var me = this;
        var prefix = "PurchaseOrder-";
        me.prefix = prefix;

        window.SaleItemForm.superclass.constructor.apply(this, arguments);
    },onViewItemClick : function() {
        
    },onSearch : function() {
        
    }

});