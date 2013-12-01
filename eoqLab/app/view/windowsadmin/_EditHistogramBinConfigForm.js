Ext.define('EditHistogramBinConfig', {
    extend: 'Ext.Window',
    initComponent: function () {
        var me = this;
        var prefix = "quickconfwindow-";
        me.prefix = prefix;
        me.items = [];
        var x = 0;
        var y = 0;
        var z = 0;
        var rpm = 0;
        var speed = 0;
        var data = { "low": "100", "high": "200" };
        //storetest.add(rec);
        //console.log(rec1);
        //        //Define proxy datastore
        var storeXbinvalue = Ext.create('Ext.data.Store', {
            storeId: 'storeXbinvalue',
            fields: ['low', 'high'],
            data: { 'items': [
                               data
                            ]
            },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });

        var storeYbinvalue = Ext.create('Ext.data.Store', {
            storeId: 'storeYbinvalue',
            fields: ['low', 'high'],
            data: { 'items': [
                               data
                            ]
            },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });

        var storeZbinvalue = Ext.create('Ext.data.Store', {
            storeId: 'storeZbinvalue',
            fields: ['low', 'high'],
            data: { 'items': [
                               data
                            ]
            },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });

        var storeRPMbinvalue = Ext.create('Ext.data.Store', {
            storeId: 'storeRPMbinvalue',
            fields: ['low', 'high'],
            data: { 'items': [
                               data
                            ]
            },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });

        var storeSpeedbinvalue = Ext.create('Ext.data.Store', {
            storeId: 'storeSpeedbinvalue',
            fields: ['low', 'high'],
            data: { 'items': [
                               data
                            ]
            },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });

        var xbinvalue = Ext.create('Ext.grid.Panel', {
            id: me.prefix + 'xbinvalue',
            title: 'X Bin Value',
            collapsed: true,
            collapsible: true,
            store: Ext.data.StoreManager.lookup('storeXbinvalue'),
            columns: [
                        { header: 'Low Value', dataIndex: 'low', flex: 1,
                            editor: {
                                xtype: 'textfield',
                                allowBlank: false
                            }
                        },
                        { header: 'High Value', dataIndex: 'high', flex: 1,
                            editor: {
                                xtype: 'textfield',
                                allowBlank: false
                            }
                        }
                    ],
            selType: 'cellmodel',
            plugins: [
                        Ext.create('Ext.grid.plugin.CellEditing', {
                            clicksToEdit: 1
                        })
                    ],
            tbar: [{
                text: 'Add Value',
                scope: this,
                handler: function () {
                    storeXbinvalue.add({ "low": "100", "high": "200" });
                    storeXbinvalue.commitChanges();
                }
            }]
            //height: 200,
            //width: 400,
            //renderTo: Ext.getBody()
        });

        var ybinvalue = Ext.create('Ext.grid.Panel', {
            title: 'Y Bin Value',
            id: me.prefix + 'ybinvalue',
            collapsed: true,
            collapsible: true,
            store: Ext.data.StoreManager.lookup('storeYbinvalue'),
            columns: [
                        { header: 'Low Value', dataIndex: 'low', flex: 1,
                            editor: {
                                xtype: 'textfield',
                                allowBlank: false
                            }
                        },
                        { header: 'High Value', dataIndex: 'high', flex: 1,
                            editor: {
                                xtype: 'textfield',
                                allowBlank: false
                            }
                        }
                    ],
            selType: 'cellmodel',
            plugins: [
                        Ext.create('Ext.grid.plugin.CellEditing', {
                            clicksToEdit: 1
                        })
                    ],
            tbar: [{
                text: 'Add Value',
                scope: this,
                handler: function () {
                    var dataY = Ext.getCmp(me.prefix + 'numberofbiny').getValue();
                    //console.log(dataY);
                    if (y < dataY) {
                        y = y + 1;
                        storeYbinvalue.add({ "low": "100", "high": "200" });
                        storeYbinvalue.commitChanges();
                        console.log(storeYbinvalue.proxy.reader.rawData);
                    }
                    console.log(y);

                }
            }]
            //height: 200,
            //width: 400,
            //renderTo: Ext.getBody()
        });

        var zbinvalue = Ext.create('Ext.grid.Panel', {
            title: 'Z Bin Value',
            id: me.prefix + 'zbinvalue',
            collapsed: true,
            collapsible: true,
            store: Ext.data.StoreManager.lookup('storeZbinvalue'),
            columns: [
                        { header: 'Low Value', dataIndex: 'low', flex: 1,
                            editor: {
                                xtype: 'textfield',
                                allowBlank: false
                            }
                        },
                        { header: 'High Value', dataIndex: 'high', flex: 1,
                            editor: {
                                xtype: 'textfield',
                                allowBlank: false
                            }
                        }
                    ],
            selType: 'cellmodel',
            plugins: [
                        Ext.create('Ext.grid.plugin.CellEditing', {
                            clicksToEdit: 1
                        })
                    ],
            tbar: [{
                text: 'Add Value',
                scope: this,
                handler: function () {
                    storeZbinvalue.add({ "low": "100", "high": "200" });
                    storeZbinvalue.commitChanges();
                }
            }]
            //height: 200,
            //width: 400,
            //renderTo: Ext.getBody()
        });

        var rpmbinvalue = Ext.create('Ext.grid.Panel', {
            title: 'RPM Bin Value',
            id: me.prefix + 'rpmbinvalue',
            collapsed: true,
            collapsible: true,
            store: Ext.data.StoreManager.lookup('storeRPMbinvalue'),
            columns: [
                        { header: 'Low Value', dataIndex: 'low', flex: 1,
                            editor: {
                                xtype: 'textfield',
                                allowBlank: false
                            }
                        },
                        { header: 'High Value', dataIndex: 'high', flex: 1,
                            editor: {
                                xtype: 'textfield',
                                allowBlank: false
                            }
                        }
                    ],
            selType: 'cellmodel',
            plugins: [
                        Ext.create('Ext.grid.plugin.CellEditing', {
                            clicksToEdit: 1
                        })
                    ],
            tbar: [{
                text: 'Add Value',
                scope: this,
                handler: function () {
                    storeRPMbinvalue.add({ "low": "100", "high": "200" });
                    storeRPMbinvalue.commitChanges();
                }
            }]
            //height: 200,
            //width: 400,
            //renderTo: Ext.getBody()
        });

        var speedbinvalue = Ext.create('Ext.grid.Panel', {
            title: 'Speed Bin Value',
            id: me.prefix + 'speedbinvalue',
            collapsed: true,
            collapsible: true,
            store: Ext.data.StoreManager.lookup('storeSpeedbinvalue'),
            columns: [
                        { header: 'Low Value', dataIndex: 'low', flex: 1,
                            editor: {
                                xtype: 'textfield',
                                allowBlank: false
                            }
                        },
                        { header: 'High Value', dataIndex: 'high', flex: 1,
                            editor: {
                                xtype: 'textfield',
                                allowBlank: false
                            }
                        }
                    ],
            selType: 'cellmodel',
            plugins: [
                        Ext.create('Ext.grid.plugin.CellEditing', {
                            clicksToEdit: 1
                        })
                    ],
            tbar: [{
                text: 'Add Value',
                scope: this,
                handler: function () {
                    storeSpeedbinvalue.add({ "low": "100", "high": "200" });
                    storeSpeedbinvalue.commitChanges();
                }
            }]
            //height: 200,
            //width: 400,
            //renderTo: Ext.getBody()
        });
        var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

        //woody
        //1 Histogram
        var ColorManage = {
            title: "HistogramBinConfig",
            id: prefix + 'hitogramBinConfig',
            xtype: 'fieldset',
            defaultType: 'textfield',
            layout: { type: 'table', columns: 2 },
            defaults: { style: 'margin:2px 5px;', labelWidth: 170 },
            items: [
                { id: me.prefix + 'name', name: 'Name', fieldLabel: 'Name', afterLabelTextTpl: required, labelStyle: 'text-align: right'
                    , xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false, emptyText: '[Name]', colspan: 2
                },
                { id: me.prefix + 'note', name: 'Note', fieldLabel: 'Note', afterLabelTextTpl: required, labelStyle: 'text-align: right'
                    , xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false, emptyText: '[Note]', colspan: 2
                },
                { id: me.prefix + 'numberofbinx', name: 'NumberOfBinX', fieldLabel: 'NumberOfBinX', afterLabelTextTpl: required, labelStyle: 'text-align: right'
                    , xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false, minLength: 0, maxLength: 11, value: 11
                },
                { id: me.prefix + 'numberofbinrpm', name: 'NumberOfBinRPM', fieldLabel: 'NumberOfBinRPM', afterLabelTextTpl: required, labelStyle: 'text-align: right'
                    , xtype: 'numberfield', fieldStyle: 'text-align: right', allowBlank: false, minLength: 0, maxLength: 10, value: 10
                },
                { id: me.prefix + 'numberofbiny', name: 'NumberOfBinY', fieldLabel: 'NumberOfBinY', afterLabelTextTpl: required, labelStyle: 'text-align: right'
                    , xtype: 'numberfield', fieldStyle: 'text-align: right', allowBlank: false, minLength: 0, maxLength: 11, value: 11
                },
                { id: me.prefix + 'numberofbinspeed', name: 'NumberOfBinSpeed', fieldLabel: 'NumberOfBinSpeed', afterLabelTextTpl: required, labelStyle: 'text-align: right'
                    , xtype: 'numberfield', fieldStyle: 'text-align: right', allowBlank: false, minLength: 0, maxLength: 10, value: 10
                },
                { id: me.prefix + 'numberofbinx', name: 'NumberOfBinY', fieldLabel: 'NumberOfBinY', afterLabelTextTpl: required, labelStyle: 'text-align: right'
                    , xtype: 'numberfield', fieldStyle: 'text-align: right', allowBlank: false, colspan: 2, minLength: 0, maxLength: 11, value: 11
                }
            ]
        };

        var xbinvalue = {
            title: "X Bin Value Range (-32767 - 32767)",
            //id: prefix + 'hitogramBinConfig',
            xtype: 'fieldset',
            defaultType: 'textfield',
            layout: { type: 'table', columns: 2 },
            defaults: { style: 'margin:2px 5px;', labelWidth: 170 },
            items: [
                { id: me.prefix + 'numberofbinxlow', name: 'ValueOfBinXLow', fieldLabel: 'ValueBinX Low', afterLabelTextTpl: required, labelStyle: 'text-align: right'
                    , xtype: 'numberfield', fieldStyle: 'text-align: right', allowBlank: false, emptyText: '[-32767 - 32767]'
                },
                { id: me.prefix + 'numberofbinxhigh', name: 'ValueOfBinXHigh', fieldLabel: 'ValueBinX High', afterLabelTextTpl: required, labelStyle: 'text-align: right'
                    , xtype: 'numberfield', fieldStyle: 'text-align: right', allowBlank: false, emptyText: '[-32767 - 32767]'
                },
            ]
        };

        //Display
        Ext.apply(me, {
            iconCls: 'icon-details',
            title: 'HistogramBinConfig Management',
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
                maxHeight: 800,
                width: 750,
                defaultType: 'textfield',
                buttonAlign: 'center',
                autoScroll: true,
                //                layout: 'vbox',
                //                layout: { type: 'table' }
                defaults: { style: 'margin:5px 5px 2px 10px;', labelWidth: 180, anchor: '100%' },
                items: [ColorManage, xbinvalue, ybinvalue, zbinvalue, rpmbinvalue, speedbinvalue]
            }],
            buttons: [
            {
                iconCls: 'icon-save',
                text: 'Save',
                id: prefix + 'conf-button-save',
                handler: function (btn, evt) {
                    var form = me.down('form').getForm().isValid();
                    if (false) {
                        Ext.MessageBox.show({ msg: 'Please wait save items...', width: 300, closable: false });


                        form.submit({
                            //url from
                            url: window.createColor,
                            timeout: 999999,
                            params: {
                                ColorName: Ext.getCmp(prefix + 'Name').getValue()
                            },
                            success: function (formPanel, action) {
                                var data = Ext.decode(action.response.responseText);


                                Ext.MessageBox.alert('Status Register user comple !!');
                                me.intend = "save-success";
                                me.close();

                            }, //success
                            failure: function (formPanel, action) {
                                var data = Ext.decode(action.response.responseText);

                                Ext.MessageBox.alert('Status: failure register user', data.error);
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
        EditHistogramBinConfig.superclass.initComponent.apply(me, arguments);
    } // end initComponent
});                      // end Ext.define('EditHistogramBinConfig


EditHistogramBinConfig.prototype.create = function () {
    var prefix = this.prefix;

    console.log('create');
    // Ext.getCmp(prefix + 'principle-code').setValue("");
    // Ext.getCmp(prefix + 'status').setValue("Creating");
    // Ext.getCmp(prefix + 'effective-date').setValue(currentDateServerSt);
}

///grid edit
EditHistogramBinConfig.prototype.onAddClick = function (model, me, cellEditing) {
    var prefix = 'quickconfwindow-';
    var quickStore = Ext.getStore(prefix + 'gridstore');
    var cell = Ext.getSelectionModel(prefix + 'celledit');
    //console.log(grid);
    //var me = 'quickconfwindow - xvalue';
    var rec = new model({
        ID: '1',
        valueLow: 0,
        valueMax: 200//,
        //availDate: Ext.Date.clearTime(new Date()),
        //indoor: false
    });

    //quickStore.getStore().insert(0, rec);
    quickStore.insert(0, rec);
    cell.startEditByPosition({
        row: 0,
        column: 0
    });
},

EditHistogramBinConfig.prototypeonRemoveClick = function (grid, rowIndex) {
    var me = 'quickconfwindow - xvalue';
    me.getStore().removeAt(rowIndex);
}

