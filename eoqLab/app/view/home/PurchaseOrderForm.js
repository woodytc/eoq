window.GlobalVal = {
    StockID : 0
};
Ext.define('PurchaseOrderForm', {
    extend: 'Ext.Panel',
    LastSaleID: 0,
    constructor: function (config) {
        var me = this;
        var prefix = "PurchaseOrder-";
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

        var purchaseOrderProxy = proxyOptions;
        purchaseOrderProxy.api = {
            read: window.read_purchaseOrderURL,
            create: window.create_purchaseOrderURL,
            update: window.update_purchaseOrderURL
        };

        //cell edit
        me.cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        });

        //grid store
        me.Store = Ext.create('Ext.data.Store', {
            model: 'EOQ.model.PurchaseOrder',
            //autoLoad: true,
            //autoSync: true,
            //data: window.purchaseOrderData,
            sorters: { property: 'Total', direction: 'ASC' },
            groupField: 'CategoryName',
            proxy: purchaseOrderProxy
        });

        //me.isShowSummary = true;


        var headerButtons = {
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                iconCls: 'icon-add',
                text: 'เพิ่ม',
                scope: me,
                handler: me.onAddClick
            }, {
                iconCls: 'icon-delete',
                text: 'ลบ',
                disabled: true,
                itemId: 'delete',
                scope: me,
                handler: me.onDeleteClick
            }, {
                xtype: 'label',
                id: 'totalSummary',
                text: '',
                margins: '0 0 0 10'
            }, '->',
            //                {
            //                iconCls: 'icon-print',
            //                text: 'Print',
            //                id: 'Print',
            //                scope: me,
            //                iconAlign: 'right',
            //                disabled: true,
            //                
            //                handler: function (btn, evt) {
            //
            //                    Ext.Ajax.request({
            //                        method: 'post',
            //                        url: '../SalesReport/SetId/',
            //                        params: { "saleId": me.LastSaleID },
            //                        contentType: "application/json; charset=utf-8",
            //                        dataType: "json",
            //                        success: function (response) {
            //                            me.onPrint();
            //                            //open print page
            //                            window.open('../SalesReport/ShowSimple/', '_blank');
            //                        }
            //                    });
            //
            //                }
            //            },
            {
            iconCls: 'icon-save',
            text: 'บันทึก',
            id: 'save',
            scope: me,
            disabled: true,
            iconAlign: 'right',
            handler: me.onSync
        }, {
            iconCls: 'icon-cancel',
            text: 'ยกเลิกทั้งหมด',
            name: 'button-cancel',
            id: 'cancel',
            disabled: true,
            handler: function (btn, evt) {
                me.grid.store.clearData();
                me.grid.view.refresh();
                //disable print button
                Ext.getCmp('Print').setDisabled(true);
                Ext.getCmp('save').setDisabled(true);
                Ext.getCmp('cancel').setDisabled(true);
            }
        }]

    };

    //Products List data
    var productProxy = proxyOptions;
    productProxy.api = {
        read: window.purchease_materialURL
    };

    me.productStore = Ext.create('Ext.data.Store', {
        model: 'EOQ.Model.ProductsList',
        //sorters: { property: 'MatName', direction: 'ASC' },
        proxy: productProxy
    });

    //Categories List data
    var categoryProxy = proxyOptions;
    categoryProxy.api = {
        read: window.purchease_catelogyURL
    };

    me.categoryStore = Ext.create('Ext.data.Store', {
        model: 'EOQ.Model.CategoriesList',
        proxy: categoryProxy
    });

    //Units List data
    var unitProxy = proxyOptions;
    unitProxy.api = {
        read: window.purchease_unitURL
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
        xtype: 'combobox',
        typeAhead: true,
        triggerAction: 'query',
        scope: me,
        id: 'productsField',
        displayField: 'ProductName',
        valueField: 'ProductID',
        store: me.productStore,
        allowBlank: false,
        editable: false,
        listeners: {
            'change': function (field, selectedValue) {
                //Ext.getCmp('wild_but_very_good_animal').setValue(selectedValue);
                console.log(Ext.getCmp('categoriesField').getValue())
                console.log(selectedValue);
                console.log(field);
            }
        }

    }, categoriesField = {
        xtype: 'combobox',
        typeAhead: true,
        triggerAction: 'all',
        scope: me,
        id: 'categoriesField',
        displayField: 'CategoryName',
        valueField: 'CategoryID',
        store: me.categoryStore,
        allowBlank: false,
        editable: false
    }, unitsField = {
        xtype: 'combobox',
        typeAhead: true,
        triggerAction: 'all',
        scope: me,
        id: 'unitField',
        displayField: 'UnitName',
        valueField: 'UnitID',
        store: me.unitStore,
        allowBlank: false,
        editable: false
    }, colorsField = {
        id: prefix + 'ColorID',
        xtype: 'combobox',
        typeAhead: true,
        triggerAction: 'all',
        scope: me,
        displayField: 'ColorName',
        valueField: 'ColorID',
        store: me.colorStore,
        allowBlank: false,
        editable: false
    }, brandsField = {
        id: 'BrandField',
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
        id: 'SizeField',
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

    me.grid = Ext.create('Ext.grid.Panel', {
        xtype: 'grid',
        id: prefix + 'purchaseorders',
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
                'Ext.grid.plugin.CellEditing',
                'Ext.grid.plugin.RowEditing',
                'Ext.form.field.Text',
                'Ext.toolbar.TextItem',
                'Ext.grid.*',
                'Ext.data.*',
                'Ext.util.*',
            ],
        listeners: {
            beforeedit: function (editor, context, e) {
                var record = context.record;
                if (context.value == null) return false;
                switch (context.field) {
                    case "ProductName":
                        {
                            //refresh pruduct data
                            me.productStore.load();
                            break;
                        }
                }
            },
            edit: function (editor, context, e) {
                var record = context.record;
                if (context.value == null) return false;
                switch (context.field) {

                    case "CategoryName":
                        {
                            if (typeof context.value == "number") {
                                //set category id on store
                                record.set("CategoryID", context.value);
                            }
                            //set category name on store 
                            me.categoryStore.each(function (rec) {
                                if (rec.get("CategoryID") == context.value) {
                                    var categoryName = rec.get("CategoryName");
                                    record.set("CategoryName", categoryName);
                                }
                            });

                            //get product data
                            me.productStore.getProxy().extraParams.CategoryId = context.value;
                            record.set("ProductName", "กรุณาเลือกสินค้า");
                            record.set("Price", 0);

                            me.productStore.lastQuery = null;

                            //get product price
                            me.getProductPrice(record, function (stock) {
                                record.set("Price", stock.Price);
                                record.set("id", stock.Id);
                            });
                            break;
                        }
                    case "ProductName":
                        {
                            if (typeof context.value == "number") {
                                //set product id on store
                                record.set("ProductID", context.value);
                            }

                            //set product name on store
                            me.productStore.each(function (rec) {
                                if (rec.get("ProductID") == context.value) {
                                    var productName = rec.get("ProductName");
                                    record.set("ProductName", productName);
                                }
                            });

                            //get product price
                            me.getProductPrice(record, function (stock) {
                                record.set("Price", stock.Price);
                                record.set("id", stock.Id);
                            });
                            break;
                        }
                    case "UnitName":
                        {
                            console.log("in unitname");
                            //                            if (typeof context.value == "number") {
                            //                                //set category id on store
                            //                                record.set("UnitID", context.value);
                            //                            }
                            //                            //set category name on store 
                            //                            me.unitStore.each(function (rec) {
                            //                                if (rec.get("UnitID") == context.value) {
                            //                                    var unitName = rec.get("UnitName");
                            //                                    record.set("UnitName", unitName);
                            //                                }
                            //                            });

                            //get product price
                            me.getProductPrice(record, function (stock) {
                                record.set("Price", stock.Price);
                                record.set("id", stock.Id);
                            });
                            break;
                        }
                    case "ColorName":
                        {
                            if (typeof context.value == "number") {
                                //set product id on store
                                record.set("ColorID", context.value);
                            }

                            //set product name on store
                            me.colorStore.each(function (rec) {
                                if (rec.get("ColorID") == context.value) {
                                    var colorName = rec.get("ColorName");
                                    record.set("ColorName", colorName);
                                }
                            });

                            //get product price
                            me.getProductPrice(record, function (stock) {
                                record.set("Price", stock.Price);
                                record.set("id", stock.Id);
                            });
                            break;
                        }
                    case "BrandName":
                        {
                            if (typeof context.value == "number") {
                                //set product id on store
                                record.set("BrandID", context.value);
                            }

                            //set product name on store
                            me.brandStore.each(function (rec) {
                                if (rec.get("BrandID") == context.value) {
                                    var brandName = rec.get("BrandName");
                                    record.set("BrandName", brandName);
                                }
                            });

                            //get product price
                            me.getProductPrice(record, function (stock) {
                                record.set("Price", stock.Price);
                                record.set("id", stock.Id);
                            });
                            break;
                        }
                    case "SizeName":
                        {
                            if (typeof context.value == "number") {
                                //set product id on store
                                record.set("SizeID", context.value);
                            }

                            //set product name on store
                            me.sizeStore.each(function (rec) {
                                if (rec.get("SizeID") == context.value) {
                                    var sizeName = rec.get("SizeName");
                                    record.set("SizeName", sizeName);
                                }
                            });

                            //get product price
                            me.getProductPrice(record, function (stock) {
                                record.set("Price", stock.Price);
                                record.set("id", stock.Id);
                            });
                            break;
                        }
                }

            }
        },
        //renderTo: document.body,
        store: me.Store,
        plugins: [me.cellEditing],
        selModel: Ext.create('Ext.selection.CheckboxModel'),
        region: 'center',
        dockedItems: [headerButtons],
        features: [{
            id: 'group',
            ftype: 'groupingsummary',
            groupHeaderTpl: 'รายการสินค้า : {name}',
            hideGroupedHeader: false,
            enableGroupingMenu: false
        }],
        columns: [{
            text: 'รหัสสินค้า',
            width: 300,
            //locked: true,
            tdCls: 'ProductName',
            sortable: true,
            dataIndex: 'ProductID',
            hidden: true,
            //hideable: false,
            flex: 1,
            summaryType: 'count',
            summaryRenderer: function (value, summaryData, dataIndex) {
                return ((value === 0 || value > 1) ? '(' + value + ' รายการ)' : '(1 รายการ)');
            }
        }, {
            header: 'หมวดสินค้า',
            width: 130,
            sortable: true,
            dataIndex: 'CategoryName',
            renderer: Ext.ux.renderer.Combo(categoriesField),
            editor: categoriesField,
            flex: 1
        }, {
            header: 'ชื่อสินค้า',
            width: 180,
            sortable: true,
            dataIndex: 'ProductName',
            renderer: Ext.ux.renderer.Combo(productsField),
            editor: productsField,
            flex: 1
        },
            {
                header: 'หน่วย',
                sortable: true,
                dataIndex: 'UnitName',
                renderer: Ext.ux.renderer.Combo(unitsField),
                editor: unitsField,
                flex: 1
            },
            {
                header: 'สี',
                sortable: true,
                dataIndex: 'ColorName',
                renderer: Ext.ux.renderer.Combo(colorsField),
                editor: colorsField,
                flex: 1
            },
            {
                header: 'ยี่ห้อ',
                sortable: true,
                dataIndex: 'BrandName',
                renderer: Ext.ux.renderer.Combo(brandsField),
                editor: brandsField,
                flex: 1
            },
            {
                header: 'ขนาด',
                sortable: true,
                dataIndex: 'SizeName',
                renderer: Ext.ux.renderer.Combo(sizeField),
                editor: sizeField,
                flex: 1
            },
            {
                header: 'จำนวน',
                width: 130,
                sortable: true,
                dataIndex: 'Amount',
                summaryType: 'sum',
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return value;
                },
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return value;
                },
                field: {
                    xtype: 'numberfield'
                }
            },
            {
                header: 'ราคา',
                width: 130,
                sortable: true,
                renderer: Ext.util.Format.usMoney,
                summaryRenderer: Ext.util.Format.usMoney,
                summaryType: 'sum',
                dataIndex: 'Price'
            }, {
                header: 'ราคารวม',
                width: 130,
                sortable: false,
                groupable: false,
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {

                    var total = 0;
                    store.each(function (rec) {
                        total += rec.get('Amount') * rec.get('Price');
                    });

                    Ext.getCmp('totalSummary').setText('ราคารวม :' + total);

                    return Ext.util.Format.usMoney(record.get('Amount') * record.get('Price'));
                },
                summaryType: function (records) {

                    var length = records.length,
                    total = 0,
                    record;

                    for (var i = 0; i < length; ++i) {
                        record = records[i];
                        total += record.get('Amount') * record.get('Price');
                    }

                    return total;
                },
                summaryRenderer: Ext.util.Format.usMoney
            }]

    });

    me.grid.getSelectionModel().on('selectionchange', this.onSelectChange, this);

    //Display
    Ext.apply(this, {
        iconCls: 'icon-tabs',
        title: 'ขาย',
        layout: 'border',
        //autoScroll: true,
        border: true,
        items: [me.grid]

    }); // end Ext.apply

    window.PurchaseOrderForm.superclass.constructor.apply(this, arguments);

}, //End constructor functional
onSelectChange: function (selModel, selections) {
    this.down('#delete').setDisabled(selections.length === 0);
},
onAddClick: function () {
    //enable- buttons
    Ext.getCmp('save').setDisabled(false);
    Ext.getCmp('cancel').setDisabled(false);

    var rec = new window.EOQ.model.PurchaseOrder({
        ProductID: 0,
        ProductName: '',
        CategoryID: 112,
        CategoryName: '',
        Amount: 0,
        UnitID: 0,
        UnitName: '',
        ColorID: 0,
        ColorName: '',
        BrandID: 0,
        BrandName: '',
        SizeID: 0,
        SizeName: '',
        Price: 0.00
    }),


            me = this,
            edit = me.cellEditing;

    edit.cancelEdit();
    me.currentRecord = rec;
    me.Store.insert(0, rec);
    edit.startEditByPosition({
        row: 0,
        column: 1
    });

},
onSync: function () {
    var me = this;

    //send data to save 
    me.Store.sync({
        success: function (conn, response, options) {
            Ext.MessageBox.show({
                title: 'Status',
                msg: 'ขายเรียบร้อยแล้ว',
                buttons: Ext.Msg.OK
            });

            Ext.Ajax.request({
                method: 'post',
                url: '../SalesReport/SetId/',
                params: { "saleId": me.LastSaleID },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    me.onPrint();
                    //open print page
                    window.open('../SalesReport/ShowSimple/', '_blank');
                }
            });

        },
        failure: function (response, options) {
            Ext.MessageBox.show({
                title: 'Status',
                msg: 'การซื้อขายผิดพลาด กรุณาตรวจสอบข้อมูล',
                buttons: Ext.Msg.OK
            });
        }
    });

    //enable print button
    Ext.getCmp('Print').setDisabled(false);

},
onPrint: function () {
    var me = this;

    Ext.getCmp('totalSummary').setText('ราคารวม :' + 0);
    me.grid.store.clearData();
    me.grid.view.refresh();

},
onDeleteClick: function () {
    var me = this;
    Ext.MessageBox.confirm('ยืนยัน', 'คุณต้องการลบแถวข้อมูลหรือไม่?', function (cbtn, bool) {
        if (cbtn == 'yes') {

            var selection = me.grid.getSelectionModel().getSelection();
            if (selection) {
                me.Store.remove(selection);
            }
        }
    });
}, onStoreWrite: function (aStore, aOperation) {

    var iRecord = aOperation.response.result.data;
    console.log(iRecord);
    this.LastSaleID = iRecord.Id;

}, getProductPrice: function (record, cb) {
    var params = {};
    params.ProductId = record.get("ProductID");
    params.UnitId = record.get("UnitID");
    params.BrandId = record.get("BrandID");
    params.ColorId = record.get("ColorID");
    params.SizeId = record.get("SizeID");

    if (params.BrandId != 0 && params.ColorId != 0 && params.ProductId != 0 && params.UnitId != 0 && params.SizeId != 0) {
        $.ajax({
            type: "GET",
            cache: false,
            data: params,
            url: window.get_product_price,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var stock = {};
                if (typeof result.data[0] != "undefined") {
                    stock = result.data[0];
                } else {
                    stock.Price = 0;
                    stock.Id = 0;
                }
                console.log(stock);
                if (typeof cb == "function") {
                    cb(stock);
                }

                return stock;
            },
            error: function (xhr, ajaxOptions, thrownError) {
                return null;
            }
        });
    }
}
});