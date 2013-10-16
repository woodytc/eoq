Ext.define('UsermanagementViewModel', {
    extend: 'Ext.data.Model',
    fields: ['UserName', 'Email', 'Roles', 'IsApproved'
        ],
    idProperty: 'UserName'
});