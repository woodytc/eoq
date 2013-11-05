Ext.define('MaterialWindow', {
    extend: 'Ext.Window',
    initComponent: function () {
        var me = this;
        var register = window.register;
        var prefix = "materialWindows-";
        me.prefix = prefix;

        Ext.apply(me, {
            iconCls: 'icon-details',
            title: 'Material',
            resizable: false,
            modal: true,
            buttonAlign: 'center',
            autoScroll: true,
            items: [
            {//form
                xtype: 'form',
                //frame: true,
                height: 600,
                width: 660,
                defaultType: 'textfield',
                buttonAlign: 'center',
                layout: 'vbox',
                defaults: { style: 'margin:5px 5px 0px 10px;', labelWidth: 180, anchor: '100%' },
                items: [
                    {
                    xtype: 'fieldset',
                    columnWidth: 0.5,
                    title: Words.GenerationFields.currentversion,
                    collapsible: false,
                    defaultType: 'textfield', colspan: 2,
                    defaults: { anchor: '65%', labelWidth: 180, fieldStyle: 'text-align: right;' },
                    items: [
                        { id: prefix + 'CurrGeneration', fieldLabel: Words.GenerationFields.generationnumber, name: 'CurrGeneration', readOnly: true },
                        { id: prefix + 'CurrHardwareVersion', fieldLabel: Words.GenerationFields.hardwareversion, name: 'CurrHardwareVersion', readOnly: true },
                        { id: prefix + 'CurrMicFirmwareVersion', fieldLabel: Words.GenerationFields.micfwversion, name: 'CurrMicFirmwareVersion', readOnly: true },
                        { id: prefix + 'CurrObdFirmwareVersion', fieldLabel: Words.GenerationFields.obdfwversion, name: 'CurrObdFirmwareVersion', readOnly: true }
                    ]
                }]
            }] // end Item window  
                ,
            buttons: [
                {
                    iconCls: 'icon-save',
                    id: prefix + 'Save',
                    text: 'Save', {
                    iconCls: 'icon-cancel',
                    id: prefix + 'Cancel',
                    text: 'Cancel',
                    handler: function (btn, evt) {
                        me.intend = "cancel";
                        me.close();
                    }
                }]// end buttons of form                   
        }); // end Ext.apply
        UserManagemantWindow.superclass.initComponent.apply(this, arguments);
    } // end initComponent
});

GenerationWindow.prototype.isValid = function () {
    for (var i = 0; i < this.items.length; i++) {
        for (var j = 0; j < this.items.items[i].items.length; j++) {
            if (this.items.items[i].items.items[j].xtype == "fieldset") {
                var fieldset = this.items.items[i].items.items[j];
                for (var k = 0; k < fieldset.items.length; k++) {
                    if (fieldset.items.items[k].xtype != "button" &&
                    fieldset.items.items[k].xtype != "container") {
                        var vld = fieldset.items.items[k].isValid();
                        if (!vld) 
                            return vld;                        
                    }
                }
            }
            else if (this.items.items[i].items.items[j].xtype != "button" &&
                this.items.items[i].items.items[j].xtype != "container") {

                var vld = this.items.items[i].items.items[j].isValid();                
                if (!vld) 
                    return vld;                
            }
        }
    }
    return true;
}

GenerationWindow.prototype.getValue = function () {
    var record = {};
    var prefix = this.prefix;

    record.Id = Ext.getCmp(prefix + 'gen-id').getValue();
    record.Code = Ext.getCmp(this.prefix + 'algorithmFields').hide();
    //            Name: '',
    //            EffectiveDateSt: this.getEffectiveDateSt(),
    //            EffectiveTimeSt: this.getEffectiveTimeSt(),
    //                CreatedDateSt
    record.Note = Ext.getCmp(prefix + 'Note').getValue();
    record.HardwareVersionMajor = Ext.getCmp(prefix + 'HardwareVersionMajor').getValue();
    record.HardwareVersionMinor = Ext.getCmp(prefix + 'HardwareVersionMinor').getValue();

    record.MicFirmwareVersionMajor = Ext.getCmp(prefix + 'MicFirmwareVersionMajor').getValue();
    record.MicFirmwareVersionMinor = Ext.getCmp(prefix + 'MicFirmwareVersionMinor').getValue();

    record.ObdFirmwareVersionMajor = Ext.getCmp(prefix + 'ObdFirmwareVersionMajor').getValue();
    record.ObdFirmwareVersionMinor = Ext.getCmp(prefix + 'ObdFirmwareVersionMinor').getValue();

    var micFirmwareYN = Ext.getCmp(prefix + 'EnableMicFirmwareFilegroup');
    if (micFirmwareYN.items.items[0].getValue()) {
        record.EnableMicFirmwareFile = 1;
    }
    else {
        record.EnableMicFirmwareFile = 0;
    }
    record.FileMicFirmwareFile = Ext.getCmp(prefix + 'gem-mic-fw-file').getValue();

    var obdFirmwareYN = Ext.getCmp(prefix + 'EnableObdFirmwareFilegroup');
    if (obdFirmwareYN.items.items[0].getValue()) {
        record.EnableObdFirmwareFile = 1;
    }
    else {
        record.EnableObdFirmwareFile = 0;
    }
    record.FileObdFirmwareFile = Ext.getCmp(prefix + 'gem-obd-fw-file').getValue();

    return record;
}


UserManagemantWindow.prototype.display = function (record) {
    var me = this;

   // me.data = record;

    me.title = "Display Deploy";
    var prefix = me.prefix;

    


    // Buttons config in display-only mode
   // Ext.getCmp(prefix + 'button-save').disable(); // api options -> disable, show, hide
   // Ext.getCmp(prefix + 'deploy-btn-create-device').disable(); 

    temp = record;
}