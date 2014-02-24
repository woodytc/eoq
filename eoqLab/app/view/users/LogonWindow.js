Ext.define('LogonForm', {
    extend: 'Ext.form.Panel',

    constructor: function (config) {
        //console.log(config);

        var me = this;

        var urlregister = window.register;

        var prefix = "usermanagementform-";
        var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
        var itemsPerPage = 10;
        var usernmae = "";
        var role = "";
        me.prefix = prefix;


        Ext.apply(me, {
            xtype: 'form',
            layout: 'form',
            //collapsible: false,
            id: 'simpleForm',
            url: 'save-form.php',
            frame: true,
            title: 'ชนะชัย ชนาภา อลูมินั่ม C.N.A ยินดีต้อนรับเข้าสู่ระบบ',
            align: 'certer',
            bodyPadding: '5 5 0',
            width: 350,
            //            fieldDefaults: {
            //                msgTarget: 'side',
            //                labelWidth: 75
            //            },
            defaultType: 'textfield',
            items: [{
                fieldLabel: 'Username:',
                id: 'username',
                afterLabelTextTpl: required,
                name: 'username',
                allowBlank: false
            }, {
                fieldLabel: 'Password',
                id:'password',
                inputType: 'password',
                afterLabelTextTpl: required,
                name: 'password',
                allowBlank: false
            }],

            buttons: [{
                text: 'Logon',
                handler: function () {
                    if(this.up('form').getForm().isValid())
                    var form = this.up('form').getForm();
                    if (this.up('form').getForm().isValid()) 
                        me.logon(Ext.getCmp('username').getValue(), Ext.getCmp('password').getValue(), form);
                    else alert("Error: Please check valid data!!");
                }
            }, {
                text: 'Reset',
                handler: function () {
                    //this.up('form').getForm().reset();
                    Ext.getCmp('username').setValue("");
                    Ext.getCmp('password').setValue("");
                }
            }]
        }); //end apply
        //me.gridStore.setpro
        LogonForm.superclass.constructor.apply(this, arguments);
    } // end constructor
});

LogonForm.prototype.logon = function (username, password, form) {
    var me = this;
    form.submit({
        url: window.logon,
        timeout: 999999,
        params: {
            username: Ext.getCmp('username').getValue(),
            password: Ext.getCmp('password').getValue()
        },
        success: function (formPanel, action) {
            //console.log(action.toString());
            var data = Ext.decode(action.response.responseText);

            self.location = data.url;
            //Ext.MessageBox.alert('Status Register user comple !!',data.error);
            //me.intend = "save-success";
            //me.close();

        }, //success
        failure: function (formPanel, action) {
            //console.log(action.toString());
            var data = Ext.decode(action.response.responseText);
            Ext.MessageBox.alert('Status: failure register user', data.error);
        }
    }); // end form.submit

}

LogonForm.prototype.isValidate = function () {
    var user = Ext.getCmp('username').getValue()
    var pass = Ext.getCmp('password').getValue();

    if (user != '' && pass != '') {
        return true;
    } else {
        return false;
    }
}