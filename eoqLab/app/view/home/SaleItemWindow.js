Ext.define('eoq.view.home.SaleItemWindow', {
    extend: 'Ext.window.Window',
    initComponent: function (test) {
        var me = this,
            prefix = "SaleItem-",
            saleItemId = 1,
            createDate = "";

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
                exception: function (proxy, response, operation) {
                    Ext.MessageBox.show({
                        title: 'REMOTE EXCEPTION',
                        msg: operation.getError(),
                        icon: Ext.MessageBox.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            }
        };

        //Products List data
        var saleItemProxy = proxyOptions;
        saleItemProxy.api = {
            read: window.read_saleItemURL
        };

        me.Store = Ext.create('Ext.data.Store', {
            model: 'EOQ.Model.SalesItem',
            proxy: saleItemProxy,
            pageSize: 25,
            encode: true,
            autoLoad: true,
            baseParams: {
                SaleItemID: saleItemId, CreateDate: createDate
            }
        });

        //create stock form
        var win = new Ext.Window({
            id: prefix + 'view',
            iconCls: 'icon-details',
            title: 'รายละเอียดรายการขายสินค้า :' + createDate,
            y: 20,
            width: 500,
            resizable: false,
            modal: true,
            buttonAlign: 'center',
            xtype: 'fieldset',
            defaultType: 'textfield',
            layout: { type: 'table', columns: 1 },
            defaults: { style: 'margin:2px 5px;', labelWidth: 170 },
            items: [{ id: prefix + 'Amount', name: 'Amount', fieldLabel: 'จำนวน', labelStyle: 'text-align: right'
                    , xtype: 'numberfield', fieldStyle: 'text-align: right', editable: false
            },
                    { id: prefix + 'Amount', name: 'Amount', fieldLabel: 'จำนวน', labelStyle: 'text-align: right'
                    , xtype: 'numberfield', fieldStyle: 'text-align: right', editable: false
                    },
                    { id: prefix + 'TotalPrice', name: 'TotalPrice', fieldLabel: 'ราคารวม', labelStyle: 'text-align: right'
                    , xtype: 'numberfield', fieldStyle: 'text-align: right', editable: false
                    },
                    { id: prefix + 'Tax', name: 'Tax', fieldLabel: 'ภาษี', labelStyle: 'text-align: right'
                    , xtype: 'numberfield', fieldStyle: 'text-align: right', editable: false
                    }
                ], buttons: [
                    {
                        iconCls: 'icon-cancel',
                        text: 'ปิดหน้าต่าง',
                        name: 'button-cancel',
                        handler: function (btn, evt) {
                            win.destroy();
                        }
                    }]
        });

    } //End constructor functional
});