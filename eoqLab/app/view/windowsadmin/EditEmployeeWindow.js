
Ext.apply(Ext.form.field.VTypes, {

    //  vtype validation function
    psssword: function (val) {
        //var pass = ;
        var repass = '';
        return fileName.test(val);
    },
    // vtype Text property to display error Text
    // when the validation function returns false
    fileText: "File must be Microsoft Excel",
    // vtype Mask property for keystroke filter mask
    fileMask: /[a-z_\.]/i

});

Ext.define('EditEmployeeWindow', {
    extend: 'Ext.Window',
    initComponent: function () {
        var me = this;
        var prefix = "quickconfwindow-";
        me.prefix = prefix;
        me.items = [];

        //data => window.departCombo
        //Create store combobox
        var DepartCombobox = Ext.create('Ext.data.Store', {
            autoLoad: true,
            fields: ['DepartID', 'DepartName'],
            proxy: {
                type: 'ajax',
                url: window.departCombobox,
                reader: {
                    type: 'json',
                    root: 'items'
                }
            },
            storeId: me.prefix + 'departcommb',
            root: 'items'
        });

        var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

        //woody
        //1 input from
        var employeeManage = {
            title: "Information",
            id: prefix + 'create',
            xtype: 'fieldset',
            defaultType: 'textfield',
            layout: { type: 'table', columns: 1 },
            defaults: { style: 'margin:2px 5px;', labelWidth: 170 },
            items: [
                { id: me.prefix + 'departID',
                    name: 'DepartID',
                    xtype: 'combo',
                    editable: false,
                    anchor: '-10',
                    fieldLabel: 'Department',
                    afterLabelTextTpl: required,
                    labelStyle: 'text-align: right',
                    value: 'Plese Select',
                    store: DepartCombobox,
                    queryMode: 'remote',
                    displayField: 'DepartName',
                    valueField: 'DepartID'
                },
                { id: me.prefix + 'EmpName', name: 'EmpNAME', fieldLabel: 'Employee Name', afterLabelTextTpl: required, labelStyle: 'text-align: right'
                    , xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false, emptyText: '[Employee Name]'
                }, { id: me.prefix + 'EmpAderess', name: 'EmpAddress', fieldLabel: 'Address', vafterLabelTextTpl: required, labelStyle: 'text-align: right'
                    , xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false, emptyText: '[Address]'
                },
                { id: me.prefix + 'Street', name: 'Street', fieldLabel: 'Street', afterLabelTextTpl: required, labelStyle: 'text-align: right'
                    , xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false, emptyText: '[Street]'
                },
                { id: me.prefix + 'District', name: 'District', fieldLabel: 'District', afterLabelTextTpl: required, labelStyle: 'text-align: right'
                    , xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false, emptyText: '[District]'
                },
                { id: me.prefix + 'Provicne', name: 'Province', fieldLabel: 'Provicne', afterLabelTextTpl: required, labelStyle: 'text-align: right'
                    , xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false, emptyText: '[Province]'
                },
                { id: me.prefix + 'Zipcode', name: 'Zipcode', fieldLabel: 'Zipcode', afterLabelTextTpl: required, labelStyle: 'text-align: right'
                    , xtype: 'numberfield', hideTrigger: true, minValue: 0, maxValue:99999, fieldStyle: 'text-align: right', allowBlank: false, emptyText: '[00000]'
                },
                { id: me.prefix + 'Email', name: 'Email', fieldLabel: 'Email', afterLabelTextTpl: required, labelStyle: 'text-align: right'
                    , xtype: 'textfield', vtype:'email', fieldStyle: 'text-align: right', allowBlank: false, emptyText: 'xx@xx.xxx'
                },
                { id: me.prefix + 'Phone', name: 'Phone', fieldLabel: 'Phone number', afterLabelTextTpl: required, labelStyle: 'text-align: right'
                    , xtype: 'numberfield', hideTrigger: true, fieldStyle: 'text-align: right', allowBlank: false, emptyText: '08123456789'
                }
                
                //,
//                {
//                    title: 'Email',
//                    // id: prefix + 'email',
//                    //xtype: 'fieldset',
//                    collapsed: true,
//                    collapsible: true,
//                    //width: 640,
//                    tiems: [
//                        { id: me.prefix + 'Email', name: 'Email', fieldLabel: 'Provicne', afterLabelTextTpl: required, labelStyle: 'text-align: right'
//                            , vtype: 'email', xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false, emptyText: '[Province]'
//                        }
//                    ]
//                },
//                {
//                    title: 'Phone',
//                    //id: prefix + 'empphone',
//                    //xtype: 'fieldset',
//                    collapsed: true,
//                    collapsible: true,
//                    //width: 640,
//                    tiems: [
//                        { id: me.prefix + 'Phone', name: 'Phone', fieldLabel: 'Phone', afterLabelTextTpl: required, labelStyle: 'text-align: right'
//                            , xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false, emptyText: '[080123456789]'
//                        }
//                    ]

//                }
            ]
        };

        var employeeEmailManage = {
            title: "Information",
            id: prefix + 'createEmail',
            xtype: 'fieldset',
            defaultType: 'textfield',
            layout: { type: 'table', columns: 1 },
            defaults: { style: 'margin:2px 5px;', labelWidth: 170 },
            items: [
                    { id: me.prefix + 'EmpName1', name: 'EmpNAME', fieldLabel: 'Employee Name', afterLabelTextTpl: required, labelStyle: 'text-align: right'
                        , xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false, emptyText: '[Employee Name]'
                    }, 
                    { id: me.prefix + 'EmpAderess1', name: 'EmpAddress', fieldLabel: 'Address', vafterLabelTextTpl: required, labelStyle: 'text-align: right'
                        , xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false, emptyText: '[Address]'
                    }
                ]
        };


        //Display
        Ext.apply(me, {
            iconCls: 'icon-details',
            title: 'New User ID',
            y: 20,
            resizable: false,
            modal: true,
            buttonAlign: 'center',
            autoScroll: true,
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
                items: [employeeManage, employeeEmailManage]
            }],
            buttons: [
            {
                iconCls: 'icon-save',
                text: 'Save',
                id: prefix + 'conf-button-save',
                disabled: true,
                formBind: true,
                handler: function (btn, evt) {
                    var form = me.down('form').getForm();
                    //var isvalid = me.isValid();
                    if (true) {
                        // me.prepareData();

                        Ext.MessageBox.show({ msg: 'Please wait save items...', width: 300, closable: false });

                        form.submit({
                            //url from
                            url: window.create,
                            timeout: 999999,
                            params: {
                                unitID: Ext.getCmp(prefix + 'UNITAID').getValue(),
                                matName: Ext.getCmp(prefix + 'MATNAME').getValue(),
                                matDetail: Ext.getCmp(prefix + 'MATDETAIL').getValue(),
                                matPrice: Ext.getCmp(prefix + 'MATPrice').getValue(),
                                matReorderPront: Ext.getCmp(prefix + 'MATREORDERPOINT').getValue()
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
        EditEmployeeWindow.superclass.initComponent.apply(me, arguments);
    } // end initComponent
});                                                                          // end Ext.define('EditEmployeeWindow


EditEmployeeWindow.prototype.create = function () {
    var prefix = this.prefix;
    
    console.log('create');
    // Ext.getCmp(prefix + 'principle-code').setValue("");
    // Ext.getCmp(prefix + 'status').setValue("Creating");
    // Ext.getCmp(prefix + 'effective-date').setValue(currentDateServerSt);
}

EditEmployeeWindow.prototype.isValid = function () {
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

EditEmployeeWindow.prototype.editUserAndRoles = function (id, username, email, role, parent) {
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

EditEmployeeWindow.prototype.prepareData = function () {
    var confItems = this.items;
    for (var i = 0; i < confItems.length; i++) {
        if (confItems.items[i].hidden) {
            this.resetData(confItems.items[i]);
        }
    }
}




