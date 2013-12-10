Ext.define('StockForm', {
    extend: 'Ext.Panel',
    constructor: function(config) {
        var me = this;
        var prefix = "PurchaseOrderForm-";
        me.prefix = prefix;

        //Define proxy datastore
        var proxyOptions = {
            type: 'ajax',
            reader: {
                type: 'json',
                successProperty: 'success',
                root: 'data',
                messageProperty: 'message'
            },
            writer: {
                type: 'json',
                writeAllFields: false
            },
            listeners: {
                exception: function(proxy, response, operation) {
                    Ext.MessageBox.show({
                            title: 'REMOTE EXCEPTION',
                            msg: operation.getError(),
                            icon: Ext.MessageBox.ERROR,
                            buttons: Ext.Msg.OK
                        });
                }
            }
       };

        var stockProxy = proxyOptions;
        stockProxy.api = {
            read: window.read_stockURL,
            create: window.create_stockURL,
            update: window.update_stockURL,
            destroy: window.delete_stockURL
        };
    }
});