Ext.define('EditMaterialWindow', {
    extend: 'Ext.Window',
    initComponent: function () {
        var me = this;
        var prefix = "quickconfwindow-";
        me.prefix = prefix;
        me.items = [];

        //Create store combobox
        var catelogyCombobox = Ext.create('Ext.data.JsonStore', {
            //model: 'ComboboxDefault',
            autoLoad: true,
            fields: ['Id', 'Name'],
            proxy: {
                type: 'ajax',
                api: { read: window.catelogComboBox },
                reader: {
                    type: 'json',
                    root: 'items'//,
                    //totalProperty: 'total'
                }
            }
        });

        var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
        
        //woody
        //1 input from
        var materailManage = {
            title: "Information",
            id: prefix + 'create',
            xtype: 'fieldset',
            defaultType: 'textfield',
            layout: { type: 'table', columns: 1 },
            defaults: { style: 'margin:2px 5px;', labelWidth: 170 },
            items: [
                { id: prefix + 'catelogy', name: 'catelogyid', xtype: 'combo', mode: 'local', editable: false, displayField: 'Name', valueField: 'Id'
                        , queryMode: 'local', allowBlank: false, emptyText: 'selected'
                    , store: catelogyCombobox,
                    fieldLabel: 'หมวดสินค้า', afterLabelTextTpl: required, labelStyle: 'text-align: right', width: 500
                },
                { name: 'matname', fieldLabel: 'ชื่อสินค้า', afterLabelTextTpl: required, labelStyle: 'text-align: right'
                    , xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false, emptyText: '[ซื่อสินค้า]', width: 500
                },
                { name: 'matdetail', fieldLabel: 'รายละเอียดสินค้า', afterLabelTextTpl: required, labelStyle: 'text-align: right'
                    , xtype: 'textareafield', fieldStyle: 'text-align: right', allowBlank: false, emptyText: '[รายละเอียดสินค้า]', width: 500
                }
            ]
        };

        //Display
        Ext.apply(me, {
            iconCls: 'icon-details',
            title: 'บันทึกสินค้าใหม่',
            y: 10,
            resizable: false,
            modal: true,
            buttonAlign: 'center',
            //            autoScroll: true,
            layout: 'vbox',
            width: 650,
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
                items: [materailManage]
            }],
            buttons: [
            {
                iconCls: 'icon-save',
                text: 'Save',
                id: prefix + 'conf-button-save',
                handler: function (btn, evt) {
                    var form = me.down('form').getForm();
                    //var isvalid = me.isValid();
                    if (me.down('form').getForm().isValid()) {
                        // me.prepareData();

                        Ext.MessageBox.show({ msg: 'Please wait save items...', width: 300, closable: false });

                        form.submit({
                            //url from
                            url: window.create,
                            timeout: 999999,
//                            params: {
//                                catelogyID: Ext.getCmp(me.prefix + 'catelogyid').getValue(),
//                                matName: Ext.getCmp('matname').getValue(),
//                                matDetail: Ext.getCmp(prefix + 'matdetail').getValue()
//                            },
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
        EditMaterialWindow.superclass.initComponent.apply(me, arguments);
    } // end initComponent
});                                                                        // end Ext.define('EditMaterialWindow


EditMaterialWindow.prototype.create = function () {
    var prefix = this.prefix;
    
    console.log('create');
    // Ext.getCmp(prefix + 'principle-code').setValue("");
    // Ext.getCmp(prefix + 'status').setValue("Creating");
    // Ext.getCmp(prefix + 'effective-date').setValue(currentDateServerSt);
}




