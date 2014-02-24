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
            id: me.prefix + 'gridstore',
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
                    //GlobalStockValue.setStore(store);
                    //me.onAddClick();
                    Ext.MessageBox.show({
                        msg: 'Please wait generate items...', width: 300, closable: false
                    });
                    var quickConfWindow = new window.eoq.view.home.StockWindow({
                        listeners: {
                            close: function (panel, eOpts) {
                                if (panel.intend === 'save-success') {
                                    console.log('insave success');
                                    me.search(window.read_stockURL, "fuck");
                                    panel.window.destroy();
                                    
                                }
                            }
                        },
                        animateTarget: btn
                    });
                    quickConfWindow.create();
                    // quickConfWindow.saveService = window.SaveQuickDeploymentAct;
                    Ext.MessageBox.hide();
                    quickConfWindow.show();
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
            }, '->',
             {
                 iconCls: 'icon-refresh-blue',
                text: 'โหลดคลังสินค้า',
                itemId: 'refresh',
                scope: me,
                handler: function (btn, evt) {
                    me.search(window.read_stockURL, "fuck");
                } //end handler
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

        console.log(record);

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
            //model: 'EOQ.Model.ProductsList',
            fields: ['ProductID', 'ProductName'],
            autoLoad: true,
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
            fields: ['UnitID', 'UnitName'],
            autoLoad: true,
            proxy: unitProxy
        });

        //Colors List data
        var colorProxy = proxyOptions;
        colorProxy.api = {
            read: window.read_colors_list
        };

        me.colorStore = Ext.create('Ext.data.Store', {
            model: 'EOQ.Model.Colors',
            autoLoad: true,
            proxy: colorProxy
        });

        //Brands List data
        var brandProxy = proxyOptions;
        brandProxy.api = {
            read: window.read_brand_list
        };

        me.brandStore = Ext.create('Ext.data.Store', {
            model: 'EOQ.Model.Brands',
            autoLoad: true,
            proxy: brandProxy
        });

        //Size List data
        var sizeProxy = proxyOptions;
        sizeProxy.api = {
            read: window.read_size_list
        };

        me.sizeStore = Ext.create('Ext.data.Store', {
            model: 'EOQ.Model.Size',
            autoLoad: true,
            proxy: sizeProxy
        });

        console.log(me.productStore);

        var productsField = {
            id: prefix + 'ProductID',
            name: 'ProductID',
            xtype: 'combo',
            typeAhead: true,
            triggerAction: 'all',
            scope: me,
            displayField: 'ProductName',
            valueField: 'ProductID',
            store: me.unitStore,
            editable: false,
            fieldLabel: 'yy',
            labelStyle: 'text-align: right',
            afterLabelTextTpl: required,
            fieldStyle: 'text-align: right',
            allowBlank: false
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
            fieldStyle: 'text-align: right'
        },
        unitsField = {
            id: prefix + 'UnitID',
            name: 'UnitID',
            xtype: 'combo',
            typeAhead: true,
            triggerAction: 'all',
            scope: me,
            displayField: 'UnitName',
            valueField: 'UnitID',
            store: me.unitStore,
            editable: false,
            fieldLabel: 'หน่วยสินค้า',
            labelStyle: 'text-align: right',
            afterLabelTextTpl: required,
            fieldStyle: 'text-align: right',
            allowBlank: false
        },
        colorsField = {
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
            items: [
                    { id: prefix + 'ProductID', name: 'ProductID', fieldLabel: 'รหัสสินค้า', labelStyle: 'text-align: right'
                    , afterLabelTextTpl: required, fieldStyle: 'text-align: right', allowBlank: true, readOnly: true
                    },
                    categoriesField,
                    { id: prefix + 'ProductName', name: 'ProductName', fieldLabel: 'ชื่อสินค้า', labelStyle: 'text-align: right'
                    , afterLabelTextTpl: required, fieldStyle: 'text-align: right', allowBlank: true, readOnly: true
                    },
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
                        params.ProductID = Ext.getCmp(prefix + 'ProductID').getValue();
                        params.CategoryID = Ext.getCmp(prefix + 'CategoryID').getValue();
                        params.ColorID = Ext.getCmp(prefix + 'ColorID').getValue();
                        params.UnitID = Ext.getCmp(prefix + 'UnitID').getValue();
                        params.BrandID = Ext.getCmp(prefix + 'BrandID').getValue();
                        params.SizeID = Ext.getCmp(prefix + 'SizeID').getValue();
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

                                //GlobalStockValue.reloadStore();
                                me.search(window.read_stockURL, "fuck");
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

        Ext.getCmp(prefix + 'CategoryID').setValue(record.get("CategoryID"));
        Ext.getCmp(prefix + 'ProductID').setValue(record.get("ProductID"));
        Ext.getCmp(prefix + 'ProductName').setValue(record.get("ProductName"));
        Ext.getCmp(prefix + 'UnitID').setValue(record.get("UnitID"));
        Ext.getCmp(prefix + 'ColorID').setValue(record.get("ColorID"));
        Ext.getCmp(prefix + 'BrandID').setValue(record.get("BrandID"));
        Ext.getCmp(prefix + 'SizeID').setValue(record.get("SizeID"));

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

//fn search
StockForm.prototype.search = function (url, name) {
    var prefix = 'StockForm-';
    var store = Ext.getStore(prefix + 'gridstore');
    //console.log(store);
    //var quickStore = Ext.getStore(prefix + 'gridStore');
    store.proxy.url = url;
    //quickStore.getProxy().extraParams.name = name;
    var pagingToolbar = Ext.getCmp(prefix + 'PagingToolbar');
    pagingToolbar.moveFirst();

};