Ext.define('eoq.view.home.StockWindow', {
    extend: 'Ext.Window',
    initComponent: function () {
        //=============================== new ==============================================
        var me = this,
            prefix = "Stock-",
            url = window.create_stockURL,
            required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

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
        var productProxy = proxyOptions;
        productProxy.api = {
            read: window.product_list_stock
        };

        me.productStore = Ext.create('Ext.data.Store', {
            model: 'EOQ.Model.ProductsList',
            proxy: productProxy
        });

        //Categories List data
        var categoryProxy = proxyOptions;
        categoryProxy.api = {
            read: window.read_categories_list
        };

        me.categoryStore = Ext.create('Ext.data.Store', {
            model: 'EOQ.Model.CategoriesList',
            proxy: categoryProxy
        });

        //Units List data
        var unitProxy = proxyOptions;
        unitProxy.api = {
            read: window.read_units_list
        };

        me.unitStore = Ext.create('Ext.data.Store', {
            model: 'EOQ.Model.UnitsList',
            proxy: unitProxy
        });

        //Colors List data
        var colorProxy = proxyOptions;
        colorProxy.api = {
            read: window.read_colors_list
        };

        me.colorStore = Ext.create('Ext.data.Store', {
            model: 'EOQ.Model.Colors',
            proxy: colorProxy
        });

        //Brands List data
        var brandProxy = proxyOptions;
        brandProxy.api = {
            read: window.read_brand_list
        };

        me.brandStore = Ext.create('Ext.data.Store', {
            model: 'EOQ.Model.Brands',
            proxy: brandProxy
        });

        //Size List data
        var sizeProxy = proxyOptions;
        sizeProxy.api = {
            read: window.read_size_list
        };

        me.sizeStore = Ext.create('Ext.data.Store', {
            model: 'EOQ.Model.Size',
            proxy: sizeProxy
        });

        var productsField = {
            id: me.prefix + 'ProductID',
            xtype: 'combobox',
            typeAhead: true,
            triggerAction: 'query',
            scope: me,
            displayField: 'ProductName',
            valueField: 'ProductID',
            store: me.productStore,
            queryMode: 'remote',
            allowBlank: false,
            editable: false,
            name: 'ProductID',
            fieldLabel: 'ชื่อสินค้า',
            value: 'กรุณาเลือก',
            labelStyle: 'text-align: right',
            afterLabelTextTpl: required,
            fieldStyle: 'text-align: right'
        }, categoriesField = {
            id: me.prefix + 'CategoryID',
            name: 'CategoryID',
            xtype: 'combobox',
            typeAhead: true,
            triggerAction: 'all',
            scope: me,
            displayField: 'CategoryName',
            valueField: 'CategoryID',
            store: me.categoryStore,
            allowBlank: false,
            editable: false,
            fieldLabel: 'หมวดหมู่',
            value: 'กรุณาเลือก',
            labelStyle: 'text-align: right',
            afterLabelTextTpl: required,
            fieldStyle: 'text-align: right',
            listeners: {
                // public event change - when selection1 dropdown is changed
                change: function (field, newValue, oldValue) {

                    me.productStore.getProxy().extraParams.CatID = newValue;
                    me.productStore.load();
                }
            }
        }, unitsField = {
            id: me.prefix + 'UnitID',
            name: 'UnitID',
            anchor: '-10',
            fieldLabel: 'หน่วย',
            afterLabelTextTpl: required,
            labelStyle: 'text-align: right',
            fieldStyle: 'text-align: right',
            queryMode: 'remote',
            xtype: 'combobox',
            typeAhead: true,
            triggerAction: 'all',
            scope: me,
            value: 'กรุณาเลือก',
            displayField: 'UnitName',
            valueField: 'UnitID',
            store: me.unitStore,
            allowBlank: false,
            editable: false
        }, colorsField = {
            id: me.prefix + 'ColorID',
            name: 'ColorID',
            xtype: 'combobox',
            typeAhead: true,
            triggerAction: 'all',
            scope: me,
            displayField: 'ColorName',
            valueField: 'ColorID',
            store: me.colorStore,
            editable: false,
            fieldLabel: 'สี',
            value: 'กรุณาเลือก',
            labelStyle: 'text-align: right',
            afterLabelTextTpl: required,
            fieldStyle: 'text-align: right',
            allowBlank: false
        }, brandsField = {
            id: me.prefix + 'BrandID',
            name: 'BrandID',
            anchor: '-10',
            fieldLabel: 'ยี่ห้อ',
            afterLabelTextTpl: required,
            labelStyle: 'text-align: right',
            fieldStyle: 'text-align: right',
            value: 'กรุณาเลือก',
            queryMode: 'remote',
            xtype: 'combobox',
            typeAhead: true,
            triggerAction: 'all',
            scope: me,
            displayField: 'BrandName',
            valueField: 'BrandID',
            store: me.brandStore,
            allowBlank: false,
            editable: false
        }, sizeField = {
            id: prefix + 'SizeID',
            name: 'SizeID',
            anchor: '-10',
            fieldLabel: 'ขนาด',
            afterLabelTextTpl: required,
            labelStyle: 'text-align: right',
            fieldStyle: 'text-align: right',
            value: 'กรุณาเลือก',
            queryMode: 'remote',
            xtype: 'combobox',
            typeAhead: true,
            triggerAction: 'all',
            scope: me,
            displayField: 'SizeName',
            valueField: 'SizeID',
            store: me.sizeStore,
            allowBlank: false,
            editable: false
        };

        //Display
        Ext.apply(this, {
            iconCls: 'icon-details',
            title: 'New Department',
            y: 20,
            resizable: false,
            modal: true,
            buttonAlign: 'center',
            //            autoScroll: true,
            layout: 'vbox',
            items: [
            {
                xtype: 'form',
                id: me.prefix + 'form-info',
                //frame: true,
                //maxHeight: 800,
                //width: 750,
                defaultType: 'textfield',
                buttonAlign: 'center',
                autoScroll: true,
                //                layout: 'vbox',
                //                layout: { type: 'table' }
                defaults: { style: 'margin:5px 5px 2px 10px;', labelWidth: 180, anchor: '100%' },
                items: [categoriesField,
                    productsField,
                    unitsField,
                    colorsField,
                    brandsField,
                    sizeField,
                    { id: me.prefix + 'Amount', name: 'Amount', fieldLabel: 'จำนวน', labelStyle: 'text-align: right'
                    , afterLabelTextTpl: required, xtype: 'numberfield', fieldStyle: 'text-align: right', allowBlank: false
                    },
                    { id: me.prefix + 'Price', name: 'Price', fieldLabel: 'ราคา', labelStyle: 'text-align: right'
                    , afterLabelTextTpl: required, xtype: 'numberfield', fieldStyle: 'text-align: right', allowBlank: false
                    },
                    { id: prefix + 'ReorderPoint', name: 'ReorderPoint', fieldLabel: 'ReorderPoint', labelStyle: 'text-align: right'
                    , afterLabelTextTpl: required, xtype: 'numberfield', fieldStyle: 'text-align: right', allowBlank: false
                    }
                ]
            }],
            buttons: [
            {
                iconCls: 'icon-save',
                text: 'Save',
                id: prefix + 'conf-button-save',
                handler: function (btn, evt) {
                    var form = me.down('form').getForm();
                    if (true) {
                        Ext.MessageBox.show({ msg: 'Please wait save items...', width: 300, closable: false });

                        form.submit({
                            //url from
                            url: window.create_stockURL,
                            timeout: 999999,
                            params: {
                                ProductID: Ext.getCmp(me.prefix + 'ProductID').getValue(),
                                CategoryID: Ext.getCmp(prefix + 'CategoryID').getValue(),
                                ColorID: Ext.getCmp(prefix + 'ColorID').getValue(),
                                BrandID: Ext.getCmp(prefix + 'BrandID').getValue(),
                                SizeID: Ext.getCmp(prefix + 'SizeID').getValue(),
                                UnitID: Ext.getCmp(prefix + 'UnitID').getValue(),
                                Amount: Ext.getCmp(prefix + 'Amount').getValue(),
                                Price: Ext.getCmp(prefix + 'Price').getValue(),
                                ReorderPoint: Ext.getCmp(prefix + 'ReorderPoint').getValue()
                            },
                            success: function (formPanel, action) {
                                var data = Ext.decode(action.response.responseText);

                                Ext.MessageBox.alert('Status', 'Save Sucesssful');
                                me.intend = "save-success";
                                me.close();

                            }, //success
                            failure: function (formPanel, action) {
                                var data = Ext.decode(action.response.responseText);

                                Ext.MessageBox.alert('Status', data.error);
                            }
                        }); // end form.submit
                    } // end isvalid
                    else {
                        Ext.MessageBox.alert('Status', "Error: Please check valid data!!");
                    }
                } // end handler
            }, {
                iconCls: 'icon-cancel',
                text: 'Cancel',
                name: 'button-cancel',
                handler: function (btn, evt) {
                    me.intend = "cancel";
                    me.close();
                }
            }]
        }); // end Ext.apply
        eoq.view.home.StockWindow.superclass.initComponent.apply(me, arguments);
    } // end initComponent
});                                                                          // end Ext.define('StockWindow


eoq.view.home.StockWindow.prototype.create = function () {
    var prefix = this.prefix;

    console.log('create');
    // Ext.getCmp(prefix + 'principle-code').setValue("");
    // Ext.getCmp(prefix + 'status').setValue("Creating");
    // Ext.getCmp(prefix + 'effective-date').setValue(currentDateServerSt);
}




