Ext.define('PurchaseOrderForm', {
    extend: 'Ext.Panel',
    constructor: function (config) {
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
                //root: 'data'
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
            update: window.update_purchaseOrderURL,
            destroy: window.destroy_purchaseOrderURL
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
                text: 'Add',
                scope: me,
                handler: me.onAddClick
            }, {
                iconCls: 'icon-delete',
                text: 'Delete',
                disabled: true,
                itemId: 'delete',
                scope: me,
                handler: me.onDeleteClick
            }, '->', {
                iconCls: 'icon-save',
                text: 'Save',
                scope: me,
                iconAlign: 'right',
                handler: me.onSync
            }, {
                iconCls: 'icon-cancel',
                text: 'Cancel',
                name: 'button-cancel',
                handler: function (btn, evt) {
                    me.intend = "cancel";
                    //cancel editing current cell
                    me.cellEditing.cancelEdit();
                    //remove data model from curent store
                    if (me.currentRecord != null) {
                        me.Store.remove(me.currentRecord);
                    }
                }
            }]

        };

        var productProxy = proxyOptions;
        productProxy.api = {
            read: window.read_products_list
        };

        //product store
        var productStore = Ext.create('Ext.data.Store', {
            model: 'EOQ.Model.ProductsList',
            //sorters: { property: 'MatName', direction: 'ASC' },
            proxy: productProxy
        });

        var categoryProxy = proxyOptions;
        categoryProxy.api = {
            read: window.read_categories_list
        };

        var categoryStore = Ext.create('Ext.data.Store', {
            model: 'EOQ.Model.CategoriesList',
            proxy: categoryProxy
        });

        var productsField = {
            xtype: 'combobox',
            typeAhead: true,
            triggerAction: 'all',
            scope: me,
            id: 'productsField',
            handler: me.onSelectedProduct,
            displayField: 'ProductName',
            valueField: 'ProductID',
            store: productStore,
            allowBlank: false
        }, categoriesField = {
            xtype: 'combobox',
            typeAhead: true,
            triggerAction: 'all',
            scope: me,
            id: 'categoriesField',
            handler: me.onSelectedCategories,
            displayField: 'CategoryName',
            valueField: 'CategoryID',
            store: categoryStore,
            allowBlank: false
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
            title: '',
            iconCls: 'icon-grid',
            requires: [
                'Ext.grid.plugin.CellEditing',
                'Ext.form.field.Text',
                'Ext.toolbar.TextItem',
                'Ext.grid.*',
                'Ext.data.*',
                'Ext.util.*',
            ],
            //renderTo: document.body,
            store: me.Store,
            plugins: [me.cellEditing],
            selModel: {
                selType: 'cellmodel'
            },
            region: 'center',
            dockedItems: [headerButtons],
            features: [{
                id: 'group',
                ftype: 'groupingsummary',
                groupHeaderTpl: '{name}',
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
                field: {
                    xtype: 'textfield',
                    allowBlank: false
                },
                summaryType: 'count',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return ((value === 0 || value > 1) ? '(' + value + ' รายการ)' : '(1 รายการ)');
                }
            }, {
                header: 'ชื่อสินค้า',
                width: 180,
                sortable: true,
                //tdCls: 'ProductID',
                dataIndex: 'ProductName',
                renderer: this.Combo(productsField),
                editor: productsField
            },
            {
                header: 'หมวดสินค้า',
                width: 130,
                sortable: true,
                dataIndex: 'CategoryName',
                renderer: Ext.ux.renderer.Combo(categoriesField),
                editor: categoriesField
            }, {
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
            }, {
                header: 'ราคา',
                width: 130,
                sortable: true,
                renderer: Ext.util.Format.usMoney,
                summaryRenderer: Ext.util.Format.usMoney,
                summaryType : 'sum',
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
                    return Ext.util.Format.usMoney(record.get('Amount') * record.get('Price'));
                },
                summaryType: function (records) {
                    var i = 0,
                    length = records.length,
                    total = 0,
                    record;

                    for (; i < length; ++i) {
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
    onSelectedCategories: function () {
        //        var products = Ext.getElementById('productsField');
        //        var id = this.val();
        //
        //        products.store.reload({
        //            params: { id: id }
        //        });
    },
    onSelctedProduct: function () {

    },
    onAddClick: function () {
        var rec = new EOQ.model.PurchaseOrder({
            ProductID: 0,
            ProductName: '',
            CategoryID: 112,
            CategoryName: '',
            Amount: 0,
            UnitID: 0,
            UnitName : '',
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
        this.Store.sync();
    },
    onDeleteClick: function () {
        var me = this;

        Ext.MessageBox.show({
            msg: 'Please wait update status items...',
            width: 300,
            closable: false
        });

        var selection = me.grid.getSelectionModel().getSelection();
        if (selection) {
            me.Store.remove(selection);
            //console.log(me.selection);
        }
    },
    onSelectedCombo: function (options) {
        var value = options.value;
        var combo = options.combo;

        var returnValue = value;
        var valueField = combo.valueField;


        var idx = combo.store.findBy(function (record) {

            if (record.get(valueField) == value) {
                returnValue = record.get(combo.displayField);
                record.set(combo.valueField, value);
                record.dirty = true;
                record.editing = true;
                return true;
            }
            return false;
        });

        // This is our application specific and might need to be removed for your apps
        if (idx < 0 && value == 0) {
            returnValue = '';
        }

        return returnValue;
    },
    Combo: function (combo) {
        var me = this;
        return function (value, meta, record) {
            return me.onSelectedCombo({ value: value, meta: meta, record: record, combo: combo });
        };
    }

});