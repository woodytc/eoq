Ext.define('EditMaterialWindow', {
    extend: 'Ext.Window',
    initComponent: function () {
        var me = this;
        var prefix = "quickconfwindow-";
        me.prefix = prefix;
        me.items = [];

        //Create store combobox
        var catelogyCombobox = Ext.create('Ext.data.Store', {
            autoLoad: true,
            fields: ['Id', 'Name'],
            proxy: {
                type: 'ajax',
                url: window.catelogComboBox,
                reader: {
                    type: 'json',
                    root: 'items'
                }
            },
            storeId: me.prefix+'storecommb',
            root: 'items'
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
                { //id: me.prefix + 'catelogyid',
                    name: 'catelogyid',
                    xtype: 'combo',
                    editable: false,
                    anchor: '-10',
                    fieldLabel: 'หมวดสินค้า',
                    afterLabelTextTpl: required,
                    labelStyle: 'text-align: right',
                    value: '--กรุณาเลือก--',
                    store: catelogyCombobox,
                    queryMode: 'remote',
                    displayField: 'Name',
                    valueField: 'ID'
                },
                { name: 'matname', fieldLabel: 'ชื่อสินค้า', afterLabelTextTpl: required, labelStyle: 'text-align: right'
                    , xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false,  emptyText: '[ซื่อสินค้า]'
                },
                { name: 'matdetail', fieldLabel: 'รายละเอียดสินค้า', vafterLabelTextTpl: required, labelStyle: 'text-align: right'
                    , xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false,  emptyText: '[รายละเอียดสินค้า]'
                }
            ]
        };

        //Display
        Ext.apply(me, {
            iconCls: 'icon-details',
            title: 'บันทึกสินค้าใหม่',
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

                                Ext.MessageBox.alert('Status');
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




