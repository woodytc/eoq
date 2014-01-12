Ext.define('ImportWindow', {
    extend: 'Ext.Window',
    initComponent: function () {
        var me = this;
        var prefix = "quickconfwindow-";
        me.prefix = prefix;
        me.items = [];

        var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

        //woody
        //1 input from
        var unitManage = {
            title: "Information",
            id: prefix + 'create',
            xtype: 'fieldset',
            defaultType: 'textfield',
            layout: { type: 'table', columns: 1 },
            defaults: { style: 'margin:2px 5px;', labelWidth: 170 },
            items: [
                { id: me.prefix + 'unitName', name: 'unitName', fieldLabel: 'แผนก', afterLabelTextTpl: required, labelStyle: 'text-align: right'
                    , xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false, emptyText: '[กล่อง,ชิ้น,อัน]'
                }
            ]
        };
        
        //model 
        Ext.define('Task', {
            extend: 'Ext.data.Model',
            idProperty: 'taskId',
            fields: [
                    { name: 'projectId', type: 'int' },
                    { name: 'project', type: 'string' },
                    { name: 'taskId', type: 'int' },
                    { name: 'description', type: 'string' },
                    { name: 'estimate', type: 'float' },
                    { name: 'rate', type: 'float' },
                    { name: 'due', type: 'date', dateFormat: 'm/d/Y' }
            ]
        });
        //data
        var data1 = [];
        var obj = { projectId: 100, project: 'Ext Forms: Field Anchoring', taskId: 112, description: 'Integrate 2.0 Forms with 2.0 Layouts', estimate: 6, rate: 150, due: '06/24/2007' };
        data1.push(obj);
        var data = [
                    { projectId: 100, project: 'Ext Forms: Field Anchoring', taskId: 112, description: 'Integrate 2.0 Forms with 2.0 Layouts', estimate: 6, rate: 150, due: '06/24/2007' },
                    { projectId: 100, project: 'Ext Forms: Field Anchoring', taskId: 113, description: 'Implement AnchorLayout', estimate: 4, rate: 150, due: '06/25/2007' },
                    { projectId: 100, project: 'Ext Forms: Field Anchoring', taskId: 114, description: 'Add support for multiple types of anchors', estimate: 4, rate: 150, due: '06/27/2007' },
                    { projectId: 100, project: 'Ext Forms: Field Anchoring', taskId: 115, description: 'Testing and debugging', estimate: 8, rate: 0, due: '06/29/2007' },
                    { projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 101, description: 'Add required rendering "hooks" to GridView', estimate: 6, rate: 100, due: '07/01/2007' },
                    { projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 102, description: 'Extend GridView and override rendering functions', estimate: 6, rate: 100, due: '07/03/2007' },
                    { projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 103, description: 'Extend Store with grouping functionality', estimate: 4, rate: 100, due: '07/04/2007' },
                    { projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 121, description: 'Default CSS Styling', estimate: 2, rate: 100, due: '07/05/2007' },
                    { projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 104, description: 'Testing and debugging', estimate: 6, rate: 100, due: '07/06/2007' },
                    { projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 105, description: 'Ext Grid plugin integration', estimate: 4, rate: 125, due: '07/01/2007' },
                    { projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 106, description: 'Summary creation during rendering phase', estimate: 4, rate: 125, due: '07/02/2007' },
                    { projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 107, description: 'Dynamic summary updates in editor grids', estimate: 6, rate: 125, due: '07/05/2007' },
                    { projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 108, description: 'Remote summary integration', estimate: 4, rate: 125, due: '07/05/2007' },
                    { projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 109, description: 'Summary renderers and calculators', estimate: 4, rate: 125, due: '07/06/2007' },
                    { projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 110, description: 'Integrate summaries with GroupingView', estimate: 10, rate: 125, due: '07/11/2007' },
                    { projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 111, description: 'Testing and debugging', estimate: 8, rate: 125, due: '07/15/2007' }
                    ];
        //cell edit
        var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        });

        //grit data 
        //store
        var store = Ext.create('Ext.data.Store', {
            model: 'Task',
            data: data,
            sorters: { property: 'due', direction: 'ASC' },
            groupField: 'project'
        });
        
        // showSummary
        var showSummary = true;
        //grid summary
        var grid = Ext.create('Ext.grid.Panel', {
            //{
            xtype: 'grit',
            id: prefix + 'create',
            width: 800,
            height: 450,
            frame: true,
            title: 'Sponsored Projects',
            iconCls: 'icon-grid',
            //renderTo: document.body,
            store: store,
            plugins: [cellEditing],
            selModel: {
                selType: 'cellmodel'
            },
            dockedItems: [{
                dock: 'top',
                xtype: 'toolbar',
                items: [{
                    tooltip: 'Toggle the visibility of the summary row',
                    text: 'Toggle Summary',
                    enableToggle: true,
                    pressed: true,
                    handler: function () {
                        showSummary = !showSummary;
                        var view = grid.lockedGrid.getView();
                        view.getFeature('group').toggleSummaryRow(showSummary);
                        view.refresh();
                        view = grid.normalGrid.getView();
                        view.getFeature('group').toggleSummaryRow(showSummary);
                        view.refresh();
                    }
                }]
            }],
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
                locked: true,
                tdCls: 'task',
                sortable: true,
                dataIndex: 'description',
                hideable: false,
                summaryType: 'count',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return ((value === 0 || value > 1) ? '(' + value + ' Tasks)' : '(1 Task)');
                }
            }, {
                header: 'Project',
                width: 180,
                sortable: true,
                dataIndex: 'project'
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
            //};
        });

        console.log(grid);

        //Display
        Ext.apply(me, {
            iconCls: 'icon-details',
            title: 'New Unit',
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
                items: [grid]
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
                            url: window.createUnit,
                            timeout: 999999,
                            params: {
                                unitName: Ext.getCmp(prefix + 'unitName').getValue()
                            },
                            success: function (formPanel, action) {
                                var data = Ext.decode(action.response.responseText);


                                Ext.MessageBox.alert('Status', "Save Sucesssful");
                                me.intend = "save-success";
                                me.close();

                            }, //success
                            failure: function (formPanel, action) {
                                var data = Ext.decode(action.response.responseText);

                                Ext.MessageBox.alert('Status: failure ', data.error);
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
        ImportWindow.superclass.initComponent.apply(me, arguments);
    } // end initComponent
});                                                                               // end Ext.define('ImportWindow


ImportWindow.prototype.create = function () {
    var prefix = this.prefix;
    
    console.log('create');
    // Ext.getCmp(prefix + 'principle-code').setValue("");
    // Ext.getCmp(prefix + 'status').setValue("Creating");
    // Ext.getCmp(prefix + 'effective-date').setValue(currentDateServerSt);
}

ImportWindow.prototype.isValid = function () {
    console.log('isValid');
    var prefix = this.prefix;

    console.log("pass: " + Ext.getCmp(prefix + 'password').getValue())

    var form = Ext.getCmp(prefix + 'form-info');
    for (var i = 0; i < form.items.length; i++) {
        for (var j = 0; j < form.items.items[i].items.length; j++) {
            if (form.items.items[i].hidden == false) {
                var component = form.items.items[i].items.items[j];
                console.log(component);
                if (component.xtype != "button") {

                    var vld = component.isValid();
                    console.log(vld);
                    if (!vld) {
                        return vld;
                    }
                }
            }
        }
    }

    if (Ext.getCmp(prefix + 'password').getValue() === Ext.getCmp(prefix + 'repassword').getValue()) {
        return true;
    } else {
        return false;
    }
    return true;
}

ImportWindow.prototype.editUserAndRoles = function (id, username, email, role, parent) {
    this.title = "Display Quick Deploy";
    var prefix = this.prefix;
    this.setValue(record);
    this.sndeviceStore.loadData(record.Devices);
    this.setDisplay();
    this.filterConf(Ext.getCmp(prefix + 'conf-type').setValue(record.ConfigurationType), "Display");

    Ext.getCmp(prefix + 'conf-button-save').disable();
    Ext.getCmp(prefix + 'q-deploy-btn-details-device').show();
    Ext.getCmp(prefix + 'q-deploy-btn-create-device').hide();
}

ImportWindow.prototype.prepareData = function () {
    var confItems = this.items;
    for (var i = 0; i < confItems.length; i++) {
        if (confItems.items[i].hidden) {
            this.resetData(confItems.items[i]);
        }
    }
}




