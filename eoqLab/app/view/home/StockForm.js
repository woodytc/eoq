var GlobalStockValue = {
    Store: null,
    setStore: function (store) {
        var me = this;
        me.Store = Ext.getStore(store);
        me.Store.proxy.url = window.read_stockURL;
    },
    reloadStore: function () {
        var me = this;
        
        if (me.Store != null) {
            me.Store.load();
        }
    }
};

Ext.define('StockForm', {
    extend: 'Ext.Panel',
    constructor: function (config) {
        var me = this;
        var prefix = "StockForm-";
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

        var stockProxy = proxyOptions;
        stockProxy.api = {
            read: window.read_stockURL,
            create: window.create_stockURL,
            update: window.update_stockURL,
            destroy: window.delete_stockURL
        };

        //grid store
        me.Store = Ext.create('Ext.data.Store', {
            model: 'EOQ.model.Stock',
            autoLoad: true,
            //autoSync : true,
            pageSize: 25,
            //data: window.TestStockData,
            totalCount: window.TestStockData.length,
            encode: true,
            proxy: stockProxy
        });

        var headerButtons = {
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                iconCls: 'icon-add',
                text: 'เพิ่ม',
                scope: me,
                handler: function (btn, evt) {
                    var store = me.Store;
                    GlobalStockValue.setStore(store);
                    me.onAddClick();
                }
            }, {
                iconCls: 'icon-edit',
                text: 'แก้ไข',
                tooltip: 'Update Material',
                disabled: false,
                handler: function (btn, evt) {
                    var gridpanel = btn.up().up();
                    var recordSelected = gridpanel.getSelectionModel().getSelection();
                    if (recordSelected.length == 1) {
                        var store = me.Store;
                        GlobalStockValue.setStore(store);
                        me.popupEditItem(recordSelected[0]);
                    }
                } //end handler
            }, {
                iconCls: 'icon-delete',
                text: 'ลบ',
                disabled: true,
                itemId: 'delete',
                scope: me,
                handler: me.onDeleteClick
            }]

        };

        me.grid = Ext.create('Ext.grid.Panel', {
            xtype: 'grid',
            id: prefix + 'stock',
            height: Ext.getBody().getViewSize().height * 0.8, // Change to support labtop screen
            width: Ext.getBody().getViewSize().width * 0.98,  // Change to support labtop screen
            minWidth: 800,
            minHeight: 550,
            frame: true,
            autoscroll: true,
            afteredit: true,
            title: '',
            iconCls: 'icon-grid',
            requires: [
                'Ext.grid.plugin.RowEditing',
                'Ext.form.field.Text',
                'Ext.toolbar.TextItem',
                'Ext.grid.*',
                'Ext.data.*',
                'Ext.util.*',
            ],
            //renderTo: document.body,
            store: me.Store,
            selModel: Ext.create('Ext.selection.CheckboxModel'),
            region: 'center',
            dockedItems: [headerButtons],
            columns: [{
                header: 'รหัสสินค้า',
                width: 130,
                sortable: true,
                dataIndex: 'ProductID',
                flex: 1
            }, {
                header: 'หมวดสินค้า',
                width: 130,
                sortable: true,
                dataIndex: 'CategoryName'
            }, {
                header: 'ชื่อสินค้า',
                width: 180,
                sortable: true,
                dataIndex: 'ProductName'
            }, {
                header: 'หน่วย',
                width: 130,
                sortable: true,
                dataIndex: 'UnitName'
            }, {
                header: 'สี',
                width: 130,
                sortable: false,
                dataIndex: 'ColorName'
            }, {
                header: 'ไอดีสี',
                width: 130,
                sortable: false,
                hidden: true,
                dataIndex: 'ColorID'
            }, {
                header: 'ไอดียี่ห้อ',
                width: 180,
                sortable: false,
                hidden: true,
                dataIndex: 'BrandID'
            }, {
                header: 'ยี่ห้อ',
                width: 180,
                sortable: false,
                dataIndex: 'BrandName'
            }, {
                header: 'ขนาด',
                width: 180,
                sortable: false,
                dataIndex: 'SizeName'
            }, {
                header: 'จำนวน',
                width: 130,
                sortable: true,
                dataIndex: 'Amount'
            }, {
                header: 'ReorderPoint',
                width: 200,
                sortable: true,
                flex: 1,
                dataIndex: 'ReorderPoint'
            }, {
                header: 'ราคา',
                width: 130,
                sortable: true,
                dataIndex: 'Price'
            }],
            bbar: Ext.create('Ext.PagingToolbar', {
                id: me.prefix + 'PagingToolbar',
                store: me.Store
                , displayInfo: true
                , displayMsg: 'แสดงผลข้อมูลรายการ {0} - {1} of {2}'
                , emptyMsg: "ขออภัยยังไม่มีรายการแสดงขณะนี้"
            }),
            listener: {
                //itemdbclick: me.popupEditItem
            }

        }); //end grid setting

        me.grid.getSelectionModel().on('selectionchange', this.onSelectChange, this);

        //Display
        Ext.apply(me, {
            buttonAlign: 'center',
            layout: 'vbox',
            items: [
                    {
                        xtype: 'form',
                        id: me.prefix + 'form',
                        defaultType: 'textfield',
                        buttonAlign: 'center',
                        autoScroll: true,
                        defaults: { style: 'margin:5px 5px 2px 10px;', labelWidth: 180, anchor: '100%' },
                        items: [me.grid]
                    }]

        }); // end Ext.apply

        window.StockForm.superclass.constructor.apply(this, arguments);

    }, onSelectChange: function (selModel, selections) {
        this.down('#delete').setDisabled(selections.length === 0);
    }, onAddClick: function () {

        Ext.MessageBox.show({
            msg: 'กรุณารอสักครู่กำลังโหลดข้อมูล...', width: 300, closable: false
        });

        //create new popup
        var stockWindow = new window.eoq.view.home.StockWindow();

        Ext.MessageBox.hide();

    }, onDeleteClick: function () {
        var me = this;
        Ext.MessageBox.confirm('ยืนยัน', 'คุณต้องการลบแถวข้อมูลหรือไม่?', function (cbtn, bool) {
            if (cbtn == 'yes') {

                var selection = me.grid.getSelectionModel().getSelection(),
                    idParams = [];
                if (selection) {
                    jQuery.each(selection, function (i, e) {
                        idParams.push(e.data.ID);
                    });
                    Ext.MessageBox.show({
                        msg: 'Please wait update status items...',
                        width: 300,
                        closable: false
                    });

                    $.ajax({
                        type: "POST",
                        cache: false,
                        data: Ext.encode(idParams),
                        //async: false,
                        url: window.delete_stockURL,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",

                        success: function (result) {
                            Ext.MessageBox.hide();
                            Ext.MessageBox.alert('Status', 'ลบแถวข้อมูลเรียบร้อยแล้ว');
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            alert(xhr.status + " " + thrownError);
                            Ext.MessageBox.hide();
                        }
                    });

                    me.Store.remove(selection);
                }
            }
        });
    }, popupEditItem: function (record) {
        var data = {};
        data.productID = record.get('ProductID');
        data.productName = record.get("ProductName");
        data.categoryID = record.get("CategoryID");
        data.categoryName = record.get("CategoryName");
        data.colorID = record.get("ColorID");
        data.colorName = record.get("ColorName");
        data.unitID = record.get("UnitID");
        data.unitName = record.get("UnitName");
        data.brandID = record.get("BrandID");
        data.brandName = record.get("BrandName");
        data.sizeID = record.get("SizeID");
        data.sizeName = record.get("SizeName");
        data.amount = record.get("Amount");
        data.price = record.get("Price");
        data.reorderPoint = record.get("ReorderPoint");

        var prefix = 'updateStock-',
            url = window.update_stockURL,
            me = this,
            required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

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
            autoLoad: true,
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
            disabled: true,
            name: 'ProductID',
            fieldLabel: 'ชื่อสินค้า',
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
            labelStyle: 'text-align: right',
            afterLabelTextTpl: required,
            fieldStyle: 'text-align: right',
            listeners: {
                // public event change - when selection1 dropdown is changed
                select: function (combo, rec, index) {
                    var productCombobox = Ext.getCmp(prefix + 'ProductID');
                    productCombobox.setDisabled(false);
                    me.productStore.getProxy().extraParams.CategoryId = combo.value;
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
            value: 'Plese Select',
            queryMode: 'remote',
            xtype: 'combobox',
            typeAhead: true,
            triggerAction: 'all',
            scope: me,
            displayField: 'UnitName',
            valueField: 'UnitID',
            store: me.unitStore,
            allowBlank: false,
            editable: false,
            listeners: {
                change: function (field, newValue, oldValue) {

                    var combop = Ext.getCmp(prefix + 'ProductID'),
                        params = {};
                    params.ProductID = combop.getValue();
                    params.UnitID = newValue;
                    if (!me.isNullOrUndefined(params.ProductID) && !me.isNullOrUndefined(params.UnitID)) {
                        //get product price
                        me.getProductPrice(params, function (price) {
                            if (price == null) price = 0;
                            var priceField = Ext.getCmp(prefix + 'Price');
                            priceField.setValue(price);
                        });
                    }

                }
            }
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

        me.win = new Ext.Window({
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
                    sizeField,
                    { id: prefix + 'Amount', name: 'Amount', fieldLabel: 'จำนวน', labelStyle: 'text-align: right'
                    , afterLabelTextTpl: required, xtype: 'numberfield', fieldStyle: 'text-align: right', allowBlank: false
                    },
                    { id: prefix + 'ReorderPoint', name: 'ReorderPoint', fieldLabel: 'ReorderPoint', labelStyle: 'text-align: right'
                    , afterLabelTextTpl: required, xtype: 'numberfield', fieldStyle: 'text-align: right', allowBlank: false
                    },
                    { id: prefix + 'Price', name: 'Price', fieldLabel: 'ราคา', labelStyle: 'text-align: right'
                    , afterLabelTextTpl: required, xtype: 'numberfield', fieldStyle: 'text-align: right', allowBlank: false
                    }
                ], buttons: [{
                    text: 'ปรับปรุงรายการ',
                    iconCls: 'icon-save',
                    onClick: function (button) {

                        //console.log(Ext.getCmp(prefix + 'ProductID'));
                        var params = {};
                        params.ID = record.get('ID');
                        params.ProductName = Ext.getCmp(prefix + 'ProductID').getValue();
                        params.CategoryName = Ext.getCmp(prefix + 'CategoryID').getValue();
                        params.ColorName = Ext.getCmp(prefix + 'ColorID').getValue();
                        params.UnitName = Ext.getCmp(prefix + 'UnitID').getValue();
                        params.BrandName = Ext.getCmp(prefix + 'BrandID').getValue();
                        params.SizeName = Ext.getCmp(prefix + 'SizeID').getValue();
                        params.Amount = Ext.getCmp(prefix + 'Amount').getValue();
                        params.Price = Ext.getCmp(prefix + 'Price').getValue();
                        params.ReorderPoint = Ext.getCmp(prefix + 'ReorderPoint').getValue();

                        Ext.Ajax.request({
                            method: 'post',
                            url: url,
                            params: params,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (response) {
                                
                                GlobalStockValue.reloadStore();
                                Ext.MessageBox.alert('บันทึกข้อมูลเรียบร้อย !!', "Save complete");

                            }
                        });

                        me.win.destroy();

                    }
                },
                {
                    iconCls: 'icon-cancel',
                    text: 'ยกเลิก',
                    name: 'button-cancel',
                    handler: function (btn, evt) {
                        me.win.destroy();
                    }
                }]
        }).show();

        me.setSelectedCombo(prefix + 'CategoryID', 'CategoryName', data.categoryName);
        me.setSelectedCombo(prefix + 'UnitID', 'UnitName', data.unitName);
        me.setSelectedCombo(prefix + 'ProductID', 'ProductName', data.productName);
        me.setSelectedCombo(prefix + 'ColorID', 'ColorName', data.colorName);
        me.setSelectedCombo(prefix + 'BrandID', 'BrandName', data.brandName);
        me.setSelectedCombo(prefix + 'SizeID', 'SizeName', data.sizeName);
        Ext.getCmp(prefix + 'Amount').setValue(data.amount);
        Ext.getCmp(prefix + 'Price').setValue(data.price);
        Ext.getCmp(prefix + 'ReorderPoint').setValue(data.reorderPoint);

    }, reloadSaleList: function () {
        var me = this;
        me.grid.view.refresh();
    }, setSelectedCombo: function (id, name, data) {
        var combo = Ext.getCmp(id);
        combo.select(data);
        if (id != 'updateStock-CategoryID') {
            //combo.getStore().load();
            var rec = combo.getStore().findExact(name, data, 0);
            combo.fireEvent('select', combo, [rec]);
        }
    }, getProductPrice: function (params, cb) {
        var data = {};
        data.ProductId = params.ProductID;
        data.UnitId = params.UnitID;

        $.ajax({
            type: "GET",
            cache: false,
            data: data,
            url: window.get_product_price,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var price;
                if (typeof result.data[0] == "undefined") {
                    price = 0;
                } else {
                    price = result.data[0].Price;
                }
                if (typeof cb == "function") {
                    cb(price);
                }

                return price;
            },
            error: function (xhr, ajaxOptions, thrownError) {
                return null;
            }
        });
    }, isNullOrUndefined: function (val) {
        return (val == null || typeof val == 'undefined');
    }

});