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
            title: 'LOGIN',
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
                afterLabelTextTpl: required,
                name: 'username',
                allowBlank: false
            }, {
                fieldLabel: 'Password',
                afterLabelTextTpl: required,
                name: 'password',
                allowBlank: false
            }],

            buttons: [{
                text: 'Save',
                handler: function () {
                    this.up('form').getForm().isValid();
                }
            }, {
                text: 'Cancel',
                handler: function () {
                    this.up('form').getForm().reset();
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