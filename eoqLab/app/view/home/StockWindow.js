﻿Ext.define('eoq.view.home.StockWindow', {
    extend: 'Ext.window.Window',

    initComponent: function() {
        var me = this,
            prefix = "Stock-",
            url = window.save_stockURL,
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
            read: window.read_products_list
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

        var productsField = {
            id: prefix + 'ProductID',
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
            id: prefix + 'CategoryID',
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
                    me.productStore.getProxy().extraParams.CategoryId = newValue;
                }
            }
        }, unitsField = {
            id: prefix + 'UnitID',
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
            id: prefix + 'ColorID',
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
            id: prefix + 'BrandID',
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
        };


        //create stock form
        var win = new Ext.Window({
            id: prefix + 'update',
            iconCls: 'icon-details',
            title: 'ปรับปรุงรายการคลังสินค้า',
            y: 20,
            width: 500,
            resizable: false,
            modal: true,
            buttonAlign: 'center',
            xtype: 'fieldset',
            defaultType: 'textfield',
            layout: { type: 'table', columns: 1 },
            defaults: { style: 'margin:2px 5px;', labelWidth: 170 },
            items: [categoriesField,
                    productsField,
                    unitsField,
                    colorsField,
                    brandsField,
                    { id: prefix + 'Amount', name: 'Amount', fieldLabel: 'จำนวน', labelStyle: 'text-align: right'
                    , afterLabelTextTpl: required, xtype: 'numberfield', fieldStyle: 'text-align: right', allowBlank: false
                    },
                    { id: prefix + 'Price', name: 'Price', fieldLabel: 'ราคา', labelStyle: 'text-align: right'
                    , afterLabelTextTpl: required, xtype: 'numberfield', fieldStyle: 'text-align: right', allowBlank: false
                    }
                ], buttons: [{
                    text: 'บันทึก',
                    iconCls: 'icon-save',
                    onClick: function (button) {

                        Ext.Ajax.request({
                            method: 'post',
                            url: url,
                            params: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (response) {
                                var text = response.responseText;
                                me.Store.load();
                                Ext.MessageBox.alert('บันทึกข้อมูลเรียบร้อย !!');
                                // process server response here
                            }
                        });

                        win.destroy();

                    }
                },
                {
                    iconCls: 'icon-cancel',
                    text: 'ยกเลิก',
                    name: 'button-cancel',
                    handler: function (btn, evt) {
                        win.destroy();
                    }
                }]
        }).show();
        
    } //End constructor functional
});