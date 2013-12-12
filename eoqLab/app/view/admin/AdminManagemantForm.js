Ext.define('AdminManagementForm', {
    extend: 'Ext.Panel',

    constructor: function (config) {
        //console.log(config);

        var me = this;

        var urlregister = window.register;

        var prefix = "AdminManagementForm-";
        var itemsPerPage = 10;
        var usernmae = "";
        var role = "";
        me.prefix = prefix;
        //Define proxy datastore
        var proxyOptions = {
            type: 'ajax',
            reader: {
                type: 'json',
                root: 'items',
                totalProperty: 'total'
            },
            simpleSortMode: true
        };

        //Create datastore
        //me.gridStore = Ext.create('Ext.data.JsonStore', {
        //    id: me.prefix + 'gridStore',
        //    pageSize: 25,
        //    model: 'UsermanagementViewModel',
        //    proxy: proxyOptions
        //});


        //Define data combo 
        //me.roleStore = Ext.create('Ext.data.Store', {
        //    fields: ['name', 'value'],
        //    data: [{ name: 'All Role', value: 'All Role' }, { name: 'User Management', value: 'UserManager' }, { name: 'Member', value: 'Member'}]
        //})


        Ext.apply(this, {
            iconCls: 'icon-tabs',
            title: 'Admin Management',
            layout: 'border',
            autoScroll: true,
            border: true,
            items: [
                    {
                        //Header                
                        xtype: 'panel',
                        title: 'User Management',
                        bodyStyle: 'padding:5px 5px 0',
                        region: 'north',
                        border: true,
                        fieldDefaults: { labelAlign: 'left' },
                        defaults: { xtype: 'container', flex: 1, layout: 'anchor' },
                        buttonAlign: 'center',
                        layout: 'hbox',
                        items: [
                                {   // column 1
                                    defaults: { labelWidth: 200 },
                                    defaultType: 'textfield',
                                    margins: '10 5 0 20',
                                    fieldDefaults: { labelAlign: 'left' },
                                    items: [
                                            { id: me.prefix + 'username', name: 'username', fieldLabel: 'Username', emptyText: '[Username]', anchor: '-10' }
                                    ]
                                }, //end colum 1
                                { // column 2
                                defaults: { labelWidth: 200, anchor: '100%' },
                                defaultType: 'textfield',
                                margins: '10 20 0 60',
                                fieldDefaults: { labelAlign: 'left' },
                                items: [
                                            { id: me.prefix + 'role',
                                                name: 'Role',
                                                xtype: 'combo',
                                                mode: 'local',
                                                editable: false,
                                                fieldLabel: 'Role',
                                                displayField: 'name',
                                                valueField: 'value',
                                                anchor: '-10',
                                                value: 'ALL Role',
                                                store: me.roleStore
                                            }

                                       ]
                            }//end colum 2
                        ]//end main item in header
                        , buttons: [ //buttons
                                    {
                                    iconCls: 'icon-find',
                                    id: me.prefix + 'user-search-btn-Search',
                                    text: 'Search',
                                    //Handler event btn search click
                                    handler: function (btn, evt) {
                                        //get value from textbox and combobox
                                        me.username = Ext.getCmp(me.prefix + 'username').getValue();
                                        me.role = Ext.getCmp(me.prefix + 'role').getValue();
                                        //Call function search load data display grid
                                        me.search(window.gridData, me.username, me.role);
                                    } // end handler
                                }, {
                                    iconCls: 'icon-reload',
                                    id: me.prefix + 'user-btn-Reset',
                                    text: 'Reset',
                                    handler: function (btn, evt) {
                                        Ext.getCmp(me.prefix + 'username').setValue('');
                                        Ext.getCmp(me.prefix + 'role').setValue('All Role');
                                    } // end handler
                                }
                          ] // end buttons Header
                    }//end Header
            
            , {
            xtype: 'grid',
            id: me.prefix + 'grid',
            title: 'User Management List',
            columnLines: true,
            //  autoScore: true,
            region: 'center',
            //store: me.gridStore,
            //selModel: Ext.create('Ext.selection.CheckboxModel'),
            columns: [
            { text: 'Username', dataIndex: 'UserName', width: 250, sortable: false, align: 'center' },
            { text: 'E-Mail', dataIndex: 'Email', width: 250, sortable: false, align: 'center' },
            { text: 'Role', dataIndex: 'Roles', width: 250, sortable: false, align: 'center' },
            { text: 'Status', dataIndex: 'IsApproved', width: 250, sortable: false, align: 'center'}
            //{ text: 'Redeploy', dataIndex: 'CanRedeploy', renderer: renderIcon, width: 100, align: 'center' }
            ],

            bbar: Ext.create('Ext.PagingToolbar', {
            id: me.prefix + 'PagingToolbar',
            store: me.gridStore
            , displayInfo: true
            , displayMsg: 'Displaying User and Roles Order {0} - {1} of {2}'
            , emptyMsg: "No User and Roles Order to display",
            }),
            viewConfig: {
            listeners: {
            itemdblclick: me.popUpEditItem,
            //    itemclick: me.manageRedeployBtn
            }
            }, //end view config
            dockedItems: [{
            xtype: 'toolbar',
            items: [{
            iconCls: 'icon-details',
            text: 'Change Role',
            tooltip: 'Manage Role',
            disabled: false,
            handler: function (btn, evt) {
            var gridpanel = btn.up().up();
            var recordSelected = gridpanel.getSelectionModel().getSelection();
            if (recordSelected.length == 1) {
            //me.popUpEditItem(gridpanel, recordSelected[0], btn);
            //console.log("grid:"+gridpanel+"rec:"+recordSelected[0]+"btn:"+btn);
            me.popUpEditItem(gridpanel, recordSelected[0], btn);
            }
            } //end handler
            },
            {
            iconCls: 'icon-details',
            text: 'Change Password',
            tooltip: 'Change User Password',
            disabled: false,
            handler: function (btn, evt) {
            var gridpanel = btn.up().up();
            var recordSelected = gridpanel.getSelectionModel().getSelection();
            if (recordSelected.length == 1) {
            //me.popUpEditItem(gridpanel, recordSelected[0], btn);
            //console.log("grid:"+gridpanel+"rec:"+recordSelected[0]+"btn:"+btn);
            me.popUpResetPassword(gridpanel, recordSelected[0], btn);
            }
            } //end handler
            },
            {
            iconCls: 'icon-details',
            text: 'Disable/Enable User',
            tooltip: 'Disable/Enable User',
            disabled: false,
            handler: function (btn, evt) {
            var gridpanel = btn.up().up();
            var recordSelected = gridpanel.getSelectionModel().getSelection();
            if (recordSelected.length == 1) {
            //me.popUpEditItem(gridpanel, recordSelected[0], btn);
            //console.log("grid:"+gridpanel+"rec:"+recordSelected[0]+"btn:"+btn);
            me.popUpDisableUser(gridpanel, recordSelected[0], btn);
            animateTarget: btn;
            }
            } //end handler
            },

            '->'
            , {
            iconCls: 'icon-add',
            text: 'New User and Role',
            handler: function (btn, evt) {
            Ext.MessageBox.show({
            msg: 'Please wait generate items...', width: 300, closable: false
            });

            var quickConfWindow = new EditUserManagemantWindow(
            {
            listeners: {
            close: function (panel, eOpts) {
            console.log('listeners');
            console.log(panel);
            console.log(eOpts);
            if (panel.intend === 'save-success') {
            console.log('insave success');
            me.search(window.gridData,me.username,me.role);
            }
            }
            },
            animateTarget: btn
            }
            );

            quickConfWindow.create();
            // quickConfWindow.saveService = window.SaveQuickDeploymentAct;
            Ext.MessageBox.hide();
            quickConfWindow.show();

            } // end handler
            }] // end items
            }]//end dockedItems
            }//end grid
            
            ]//end item
        }); //end apply
        //me.gridStore.setpro
        AdminManagementForm.superclass.constructor.apply(this, arguments);
    } // end constructor
});
//fn change role
AdminManagementForm.prototype.popUpEditItem = function (dataview, record, parent, mode) {
    var id = record.get('UserName');
    var email = record.get('Email');
    var role = record.get('Roles');

    AdminManagementForm.prototype.popUpEditUserAndRoles(id, id, email, role === 'User Managemant' ? "UserManage" : role, parent);
};

//fn reset password
AdminManagementForm.prototype.popUpResetPassword = function (dataview, record, parent, mode) {
    var id = record.get('UserName');
    var email = record.get('Email');
    var role = record.get('Roles');
    AdminManagementForm.prototype.resetPassword(id, id, email, role, parent);
};

//fn Disable user
AdminManagementForm.prototype.popUpDisableUser = function (dataview, record, parent, mode) {
    var id = record.get('UserName');
    var email = record.get('Email');
    var role = record.get('Roles');
    var status = record.get('IsApproved');

    AdminManagementForm.prototype.disableUser(id, id, email, role, status, parent);
};

//fn search
AdminManagementForm.prototype.search = function (url, username, role) {
    var prefix = 'AdminManagementForm-';

    var quickStore = Ext.getStore(prefix + 'gridStore');
    quickStore.proxy.url = url;
    quickStore.getProxy().extraParams.username = username;
    quickStore.getProxy().extraParams.role = role;

    var pagingToolbar = Ext.getCmp(prefix + 'PagingToolbar');
    pagingToolbar.moveFirst();
};



//handle change role
AdminManagementForm.prototype.popUpEditUserAndRoles = function (id, username, email, role, parent, mode) {
    var prefix = 'roleform-';
    var url = window.changeRole;
    var rolesArray = new Array();

    var roleStore = Ext.create('Ext.data.Store', {
        fields: ['name', 'value'],
        data: [{ name: 'Admin', value: 'admin' }, { name: 'Member', value: 'member'}]
    });
    var win = new Ext.Window({
        id: prefix + 'update',
        iconCls: 'icon-details',
        title: 'New User ID',
        y: 20,
        resizable: false,
        modal: true,
        buttonAlign: 'center',
        //            autoScroll: true,
        layout: 'vbox',
        xtype: 'fieldset',
        defaultType: 'textfield',
        layout: { type: 'table', columns: 1 },
        defaults: { style: 'margin:2px 5px;', labelWidth: 170 },
        items: [
                    { id: prefix + 'username', name: 'Username', fieldLabel: 'Username'
                        , xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false, readOnly: true
                    },
                    { id: prefix + 'role',
                        name: 'Role',
                        xtype: 'combo',
                        mode: 'local',
                        editable: false,
                        fieldLabel: 'Role',
                        displayField: 'name',
                        valueField: 'value',
                        anchor: '-10',
                        value: 'Member',
                        store: roleStore
                    }
                ],
        buttons: [{
            text: 'save',
            onClick: function (button) {
                // SAVE ACTION
                //check role old version
                /*
                var dummy = new Array("Administrator","Manage","Member");
                       
                Ext.each(dummy, function(value) {
                if(Ext.getCmp(prefix + value).getValue()) 
                rolesArray.push(value);
                            
                });
                */
                var role = Ext.getCmp(prefix + 'role').getValue();

                Ext.Ajax.request({
                    method: 'post',
                    url: url,
                    params: {
                        username: username,
                        roles: role
                    },
                    success: function (response) {
                        var text = response.responseText;
                        Ext.MessageBox.alert('Change role successfull !!');
                        AdminManagementForm.prototype.search(window.gridData, "", "All Role");
                        // process server response here
                    }
                });

                win.destroy();

            }
        },
                {
                    iconCls: 'icon-cancel',
                    text: 'Cancel',
                    name: 'button-cancel',
                    handler: function (btn, evt) {
                        intend = "cancel";
                        win.destroy();
                    }
                }]
    }).show();
    //set value to form
    var item = (role.split(','));
    Ext.getCmp(prefix + 'username').setValue(username);

    if (item.length > 0 && Ext.String.trim(item[0]) != "") {

        Ext.each(item, function (value) {
            Ext.getCmp(prefix + 'role').setValue(value === 'User Management' ? 'Manage' : value);
            //Ext.getCmp(prefix + Ext.String.trim(value)).setValue(value);
        });
    }
}


//fn resertpassword
AdminManagementForm.prototype.resetPassword = function (id, username, email, role, parent, mode) {
    console.log('resetpassword');
    var url = window.changePassword;
    var prefix = 'resetform-';
    var win = new Ext.Window({
        id: prefix + 'update',
        iconCls: 'icon-details',
        title: 'Reset Password',
        y: 20,
        resizable: false,
        modal: true,
        buttonAlign: 'center',
        //            autoScroll: true,
        layout: 'vbox',
        xtype: 'fieldset',
        defaultType: 'textfield',
        layout: { type: 'table', columns: 1 },
        defaults: { style: 'margin:2px 5px;', labelWidth: 170 },
        items: [
                    { id: prefix + 'username', name: 'Username', fieldLabel: 'Username'
                        , xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false, readOnly: true
                    },
                    { id: prefix + 'password', name: 'Password', fieldLabel: 'Password'
                    , xtype: 'textfield', inputType: 'password', fieldStyle: 'text-align: right', minLength: 6, allowBlank: false, minLengthText: 'Require atleast 6 characters'
                    },
                    { id: prefix + 'repassword', name: 'Repassword', fieldLabel: 'Repassword'
                        , xtype: 'textfield', inputType: 'password', fieldStyle: 'text-align: right', minLength: 6, allowBlank: false, minLengthText: 'Require atleast 6 characters'
                    }
                ],
        buttons: [{
            text: 'Save',
            onClick: function () {
                // SAVE ACTION

                try {
                    if (Ext.getCmp(prefix + 'password').getValue() === Ext.getCmp(prefix + 'repassword').getValue()) {
                        Ext.Ajax.request({
                            method: 'post',
                            url: url,
                            params: {
                                username: username,
                                password: Ext.getCmp(prefix + 'password').getValue()
                            },
                            success: function (response) {
                                var text = response.responseText;
                                AdminManagementForm.prototype.search(window.gridData, "", "");
                                // process server response here
                                Ext.MessageBox.alert('Reset password successful !!!');

                            }
                        });
                        win.destroy();
                    } else {
                        alert("Password not math!!!");
                        //win.destroy();
                    }
                } catch (e) {
                    win.destroy();
                }
            }
        },
                {
                    iconCls: 'icon-cancel',
                    text: 'Cancel',
                    name: 'button-cancel',
                    handler: function (btn, evt) {
                        intend = "cancel";
                        win.destroy();
                    }
                }]
    }).show();
    Ext.getCmp(prefix + 'username').setValue(username);
}

//function disable user 
AdminManagementForm.prototype.disableUser = function (id, username, email, role, status, parent, mode) {

    var prefix = 'disableform-';
    var url = window.disableUser;
    var status = status === 'Enable' ? true : false;
    var win = new Ext.Window({
        id: prefix + 'update',
        iconCls: 'icon-details',
        title: 'New User ID',
        y: 20,
        resizable: false,
        modal: true,
        buttonAlign: 'center',
        autoScroll: true,
        layout: 'vbox',
        xtype: 'fieldset',
        defaultType: 'textfield',
        layout: { type: 'table', columns: 1 },
        defaults: { style: 'margin:2px 5px;', labelWidth: 170 },
        items: [
                    { id: prefix + 'username', name: 'Username', fieldLabel: 'Username'
                        , xtype: 'textfield', fieldStyle: 'text-align: right', allowBlank: false, readOnly: true
                    },
                    { id: prefix + 'enableuser',
                        name: 'Enableuser',
                        xtype: 'checkbox',
                        mode: 'local',
                        fieldLabel: 'Enable User',
                        displayField: 'Enable User',
                        valueField: 'value',
                        anchor: '-10',
                        value: '1'
                    }
                ],
        buttons: [{
            text: 'Save',
            onClick: function () {
                // SAVE ACTION
                console.log('save btn');
                try {
                    console.log(Ext.getCmp(prefix + 'enableuser').getValue());
                    Ext.Ajax.request({
                        method: 'post',
                        url: url,
                        params: {
                            username: username,
                            status: Ext.getCmp(prefix + 'enableuser').getValue()
                        },
                        success: function (response) {
                            var text = response.responseText;
                            AdminManagementForm.prototype.search(window.gridData, "", "");
                            // process server response here
                            Ext.MessageBox.alert('Disable user successful !!!');
                        }
                    });
                    //      record.set('<reqd field from store>',Ext.getCmp('textAreaId').getValue());
                    win.destroy();
                } catch (e) {
                    win.destroy();
                }
            }
        },
                {
                    iconCls: 'icon-cancel',
                    text: 'Cancel',
                    name: 'button-cancel',
                    handler: function (btn, evt) {
                        intend = "cancel";
                        win.destroy();
                    }
                }]
    }).show();

    Ext.getCmp(prefix + 'username').setValue(username);
    Ext.getCmp(prefix + 'enableuser').setValue(status);
}