Ext.define('DeviceCommunication.model.RequestAckCommand', {
    extend: 'Ext.data.Model'
        , fields: [
            'RequestId',
            { name: 'ResponseCount', type: 'int' },
            { name: 'RequestTime', type: 'date', dateFormat: 'MS' },
            { name: 'LastestResponse', type: 'date', dateFormat: 'MS' },
            { name: 'ResponsePacket', type: 'int' },
            { name: 'AckCount', type: 'int' },
            { name: 'LastestAck', type: 'date', dateFormat: 'MS' },
            'ResponsePacketMD5',
            'Imei'
        ]
});

/*
RequestId,
ResponseCount,
RequestTime,
LastestResponse,
ResponsePacket,
AckCount,
LastestAck,
Imei,
ResponsePacketMD5
*/