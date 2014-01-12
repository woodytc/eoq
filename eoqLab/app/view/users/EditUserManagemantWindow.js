
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

Ext.define('EditUserManagemantWindow', {
    extend: 'Ext.Window',
    initComponent: function () {
        var me = this;
        var prefix = "quickconfwindow-";
        me.prefix = prefix;
        me.items = [];
        me.sndeviceStore = Ext.create('Ext.data.Store', {
            fields: ['Id', 'ItemId', 'ReqId',
                { name: 'Imei' },
                { name: 'ReqNo' },
                { name: 'ReqStatus' },
                { name: 'ReqType' }
            ]
        });

        me.roleStore = Ext.create('Ext.data.Store', {
            fields: ['name', 'value'],
            data: [{ name: 'Admin', value: 'admin' }, { name: 'Member', value: 'member'}]
        })

        me.configRoleStore = Ext.create('Ext.data.Store', {
            fields: ['name', 'value'],
            data: [
                    { name: 'Admin', value: 'admin' },
                    { name: 'Member', value: 'Member' }
            ]

        });

        me.branchCombobox = Ext.create('Ext.data.JsonStore', {
            //model: 'ComboboxDefault',
            autoLoad: true,
            fields: ['BranchID', 'BranchName'],
            proxy: {
                type: 'ajax',
                api: { read: window.branchCombobox },
                reader: {
                    type: 'json',
                    root: 'items'//,
                    //totalProperty: 'total'
                }
            }
        });

        //woody
        //1 input from
        var managerole = {
            title: "Information",
            id: prefix + 'create',
            xtype: 'fieldset',
            defaultType: 'textfield',
            layout: { type: 'table', columns: 1 },
            defaults: { style: 'margin:2px 5px;', labelWidth: 170 },
            items: [
                { id: me.prefix + 'username', name: 'Username', fieldLabel: 'Username', labelStyle: 'text-align: right'
                    , xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false
                },
                { id: me.prefix + 'email', name: 'E-Mail', fieldLabel: 'E-Mail', labelStyle: 'text-align: right'
                    , xtype: 'textfield', vtype: 'email', fieldStyle: 'text-align: right', allowBlank: false
                },
                { id: me.prefix + 'password', name: 'Password', fieldLabel: 'Password', labelStyle: 'text-align: right'
                    , xtype: 'textfield', inputType: 'password', fieldStyle: 'text-align: right', minLength: 6, allowBlank: false
                },
                { id: me.prefix + 'repassword', name: 'Repassword', fieldLabel: 'Repassword', labelStyle: 'text-align: right'
                    , xtype: 'textfield', inputType: 'password', fieldStyle: 'text-align: right', minLength: 6, allowBlank: false
                },
                { id: me.prefix + 'role',
                    name: 'Role', 
                    labelStyle: 'text-align: right',
                    xtype: 'combo',
                    mode: 'local',
                    editable: false,
                    fieldLabel: 'Role',
                    displayField: 'name',
                    valueField: 'value',
                    anchor: '-10',
                    value: 'Member',
                    store: me.roleStore
                },
                { id: prefix + 'branch', name: 'branchID', xtype: 'combo', mode: 'local', editable: false, displayField: 'BranchName', valueField: 'BranchID'
                        , queryMode: 'local', allowBlank: false, emptyText: 'selected'
                    , store: me.branchCombobox,
                    fieldLabel: 'Branch', labelStyle: 'text-align: right', width: 500
                }
            ]
        };

        Ext.apply(me, {
            iconCls: 'icon-details',
            title: 'New User ID',
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
                items: [managerole]
            }],
            buttons: [
            {
                iconCls: 'icon-save',
                text: 'Save',
                id: prefix + 'conf-button-save',
                handler: function (btn, evt) {
                    var form = me.down('form').getForm();
                    var isvalid = me.isValid();
                    if (isvalid) {
                        // me.prepareData();

                        Ext.MessageBox.show({ msg: 'Please wait save items...', width: 300, closable: false });

                        form.submit({
                            url: window.register,
                            timeout: 999999,
                            params: {
                                UserName: Ext.getCmp(prefix + 'username').getValue(),
                                Password: Ext.getCmp(prefix + 'password').getValue(),
                                Email: Ext.getCmp(prefix + 'email').getValue(),
                                BranchID: Ext.getCmp(prefix + 'branch').getValue(),
                                Role: Ext.getCmp(prefix + 'role').getValue()

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
        EditUserManagemantWindow.superclass.initComponent.apply(me, arguments);
    } // end initComponent
});                                                                    // end Ext.define('EditUserManagemantWindow


EditUserManagemantWindow.prototype.create = function () {
    var prefix = this.prefix;
    
    console.log('create');
    // Ext.getCmp(prefix + 'principle-code').setValue("");
    // Ext.getCmp(prefix + 'status').setValue("Creating");
    // Ext.getCmp(prefix + 'effective-date').setValue(currentDateServerSt);
}

EditUserManagemantWindow.prototype.isValid = function () {
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

EditUserManagemantWindow.prototype.editUserAndRoles = function (id, username, email, role, parent) {
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

EditUserManagemantWindow.prototype.prepareData = function () {
    var confItems = this.items;
    for (var i = 0; i < confItems.length; i++) {
        if (confItems.items[i].hidden) {
            this.resetData(confItems.items[i]);
        }
    }
}




