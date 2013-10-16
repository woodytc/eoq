Ext.define('DeviceCommunication.model.Log', {
    extend: 'Ext.data.Model'
            , fields: [
                { name: 'TimeGenerated', type: 'date', dateFormat: 'MS' },
                'MessageType',
                //'JouneyId',
                { name: 'Seq', type: 'int' },
                'HeaderTime',
                { name: 'AckCompleted', type: 'int' }, //'AckCompleted',
                'WriteResponseElapsed',
                'ServerId',
                'ServerTime',
                'ResponseSeq',
                'StatusCode',
                'RequestId',
                'RequestCommand',
                'ResponseMsgType',
                'TimesOfRequstCommand',
                'DeviceAddress',
                'Encryption',
                'ErrorMessage',
                'PacketId']
});