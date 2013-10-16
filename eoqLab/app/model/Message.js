Ext.define('DeviceCommunication.model.Message', {
    extend: 'Ext.data.Model',
    fields: [
        'Imei',
        'MessageType',
        { name: 'Seq', type: 'int' },
         'Version', 'JouneyId', 'Size',
        { name: 'HeaderTime', type: 'date', dateFormat: 'MS' },
        { name: 'CreatedTime', type: 'date', dateFormat: 'MS' },
        'PacketId'
    ],
    idProperty: 'PacketId'
});