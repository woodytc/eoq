Ext.define('EditColorWindow', {
    extend: 'Ext.Window',
    initComponent: function () {
        var me = this;
        var prefix = "quickconfwindow-";
        me.prefix = prefix;
        me.items = [];

        var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

        //woody
        //1 input from
        var ColorManage = {
            title: "Information",
            id: prefix + 'create',
            xtype: 'fieldset',
            defaultType: 'textfield',
            layout: { type: 'table', columns: 1 },
            defaults: { style: 'margin:2px 5px;', labelWidth: 170 },
            items: [
                { id: me.prefix + 'Name', name: 'Name', fieldLabel: 'สี่', afterLabelTextTpl: required, labelStyle: 'text-align: right'
                    , xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false, emptyText: '[ขาว,แดง]'
                }
            ]
        };

        //Display
        Ext.apply(me, {
            iconCls: 'icon-details',
            title: 'New Color',
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
                items: [ColorManage]
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
                            url: window.createColor,
                            timeout: 999999,
                            params: {
                                ColorName: Ext.getCmp(prefix + 'Name').getValue()
                            },
                            success: function (formPanel, action) {
                                var data = Ext.decode(action.response.responseText);


                                Ext.MessageBox.alert('Status','Save Sucesssful');
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
        EditColorWindow.superclass.initComponent.apply(me, arguments);
    } // end initComponent
}); // end Ext.define('EditColorWindow


EditColorWindow.prototype.create = function () {
    var prefix = this.prefix;

    console.log('create');
    // Ext.getCmp(prefix + 'principle-code').setValue("");
    // Ext.getCmp(prefix + 'status').setValue("Creating");
    // Ext.getCmp(prefix + 'effective-date').setValue(currentDateServerSt);
}

EditColorWindow.prototype.isValid = function () {
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

EditColorWindow.prototype.editUserAndRoles = function (id, username, email, role, parent) {
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

EditColorWindow.prototype.prepareData = function () {
    var confItems = this.items;
    for (var i = 0; i < confItems.length; i++) {
        if (confItems.items[i].hidden) {
            this.resetData(confItems.items[i]);
        }
    }
}
