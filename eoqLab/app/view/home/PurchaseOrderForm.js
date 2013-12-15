Ext.define('PurchaseOrderForm', {
    extend: 'Ext.Panel',
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
            autoLoad: true,
            //autoSync: true,
            data: window.purchaseOrderData,
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
            }, '->', {
                iconCls: 'icon-save',
                text: 'บันทึก',
                scope: me,
                iconAlign: 'right',
                handler: me.onSync
            }, {
                iconCls: 'icon-cancel',
                text: 'ยกเลิกทั้งหมด',
                name: 'button-cancel',
                handler: function (btn, evt) {
                    me.grid.store.clearData();
                    me.grid.view.refresh();
                }
            }]

        };

        //Products List data
        var productProxy = proxyOptions;
        productProxy.api = {
            read: window.read_products_list
        };

        me.productStore = Ext.create('Ext.data.Store', {
            model: 'EOQ.Model.ProductsList',
            //sorters: { property: 'MatName', direction: 'ASC' },
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
            editable: false
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
                                me.getProductPrice(record, function (price) {
                                    if (price == null) price = 0;
                                    record.set("Price", price);
                                });
                                break;
                            }
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
                                me.getProductPrice(record, function (price) {
                                    if (price == null) price = 0;
                                    record.set("Price", price);
                                });
                                break;
                            }
                        case "UnitName":
                            {
                                if (typeof context.value == "number") {
                                    //set category id on store
                                    record.set("UnitID", context.value);
                                }
                                //set category name on store 
                                me.unitStore.each(function (rec) {
                                    if (rec.get("UnitID") == context.value) {
                                        var unitName = rec.get("UnitName");
                                        record.set("UnitName", unitName);
                                    }
                                });

                                //get product price
                                me.getProductPrice(record, function (price) {
                                    if (price == null) price = 0;
                                    record.set("Price", price);
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
                editor: categoriesField
            }, {
                header: 'ชื่อสินค้า',
                width: 180,
                sortable: true,
                dataIndex: 'ProductName',
                renderer: Ext.ux.renderer.Combo(productsField),
                editor: productsField
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
                header: 'หน่วย',
                width: 130,
                sortable: true,
                dataIndex: 'UnitName',
                renderer: Ext.ux.renderer.Combo(unitsField),
                editor: unitsField
            },
            {
                header: 'ราคา',
                width: 130,
                sortable: true,
                renderer: Ext.util.Format.usMoney,
                summaryRenderer: Ext.util.Format.usMoney,
                summaryType: 'sum',
                dataIndex: 'Price',
                field: {
                    xtype: 'numberfield'
                }
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
        Ext.apply(me, {
            buttonAlign: 'center',
            //            autoScroll: true,
            layout: 'vbox',
            items: [
                    {
                        xtype: 'form',
                        id: me.prefix + 'form-info',
                        defaultType: 'textfield',
                        buttonAlign: 'center',
                        autoScroll: true,
                        defaults: { style: 'margin:5px 5px 2px 10px;', labelWidth: 180, anchor: '100%' },
                        items: [me.grid]
                    }]

        }); // end Ext.apply

        window.PurchaseOrderForm.superclass.constructor.apply(this, arguments);

    }, //End constructor functional
    onSelectChange: function (selModel, selections) {
        this.down('#delete').setDisabled(selections.length === 0);
    },
    onToggleClick: function () {

    },
    onAddClick: function () {
        var rec = new window.EOQ.model.PurchaseOrder({
            ProductID: 0,
            ProductName: '',
            CategoryID: 112,
            CategoryName: '',
            Amount: 0,
            UnitID: 0,
            UnitName: '',
            name: 0.00
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
        me.Store.sync();
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
    }, getProductPrice: function (record, cb) {
        var params = {};
        params.ProductId = record.get("ProductID");
        params.UnitId = record.get("UnitID");

        $.ajax({
            type: "GET",
            cache: false,
            data: params,
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
    }
});