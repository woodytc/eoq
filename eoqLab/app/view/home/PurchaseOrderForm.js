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
                writeAllFields: true
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
            model: 'Model.Task',
            autoLoad: true,
            //autoSync: true,
            data: window.testPurchaseOrderData,
            sorters: { property: 'due', direction: 'ASC' },
            //groupField: 'project',
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
            //typeAhead: true,
            //triggerAction: 'all',
            scope: me,
            id: 'productsField',
            handler: me.onSelectedProduct,
            displayField: 'MaterialName',
            valueField: 'MaterialId',
            store: productStore,
            allowBlank: false
        }, categoriesField = {
            xtype: 'combobox',
            typeAhead: true,
            triggerAction: 'all',
            scope: me,
            id: 'categoriesField',
            handler: me.onSelectedCategories,
            //displayField : '',
            //valueField : '',
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
            title: 'Sponsored Projects',
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
                hideGroupedHeader: true,
                enableGroupingMenu: false
            }],
            columns: [{
                text: 'Task',
                width: 300,
                //locked: true,
                tdCls: 'task',
                sortable: true,
                dataIndex: 'description',
                //hideable: false,
                flex: 1,
                field: {
                    xtype: 'textfield',
                    allowBlank: false
                },
                summaryType: 'count',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return ((value === 0 || value > 1) ? '(' + value + ' Tasks)' : '(1 Task)');
                }
            }, {
                header: 'ชื่อสินค้า',
                width: 180,
                sortable: true,
                //tdCls: 'MaterialId',
                dataIndex: 'MaterialName',
                renderer: Ext.ux.renderer.Combo(productsField),
                editor: productsField
            },
            {
                header: 'Due Date',
                width: 130,
                sortable: true,
                dataIndex: 'due',
                summaryType: 'max',
                renderer: Ext.util.Format.dateRenderer('m/d/Y'),
                summaryRenderer: Ext.util.Format.dateRenderer('m/d/Y'),
                field: {
                    xtype: 'datefield',
                    allowBlank: false
                }
            }, {
                header: 'Estimate',
                width: 130,
                sortable: true,
                dataIndex: 'estimate',
                summaryType: 'sum',
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return value + ' hours';
                },
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return value + ' hours';
                },
                field: {
                    xtype: 'numberfield'
                }
            }, {
                header: 'Rate',
                width: 130,
                sortable: true,
                renderer: Ext.util.Format.usMoney,
                summaryRenderer: Ext.util.Format.usMoney,
                dataIndex: 'rate',
                summaryType: 'average',
                field: {
                    xtype: 'numberfield'
                }
            }, {
                header: 'Cost',
                width: 130,
                sortable: false,
                groupable: false,
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    return Ext.util.Format.usMoney(record.get('estimate') * record.get('rate'));
                },
                summaryType: function (records) {
                    var i = 0,
                    length = records.length,
                    total = 0,
                    record;

                    for (; i < length; ++i) {
                        record = records[i];
                        total += record.get('estimate') * record.get('rate');
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
        var rec = new window.Model.Task({
            projectId: 100,
            project: '',
            taskId: 112,
            description: '',
            estimate: 0,
            rate: 0,
            due: new Date()
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
    }
});
