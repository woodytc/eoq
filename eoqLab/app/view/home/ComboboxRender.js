Ext.ns("Ext.ux.renderer");

Ext.ux.renderer.ComboRenderer = function (options) {
    var value = options.value;
    var combo = options.combo;

    var returnValue = value;
    var valueField = combo.valueField;


    var idx = combo.store.findBy(function (record) {

        if (record.get(valueField) == value) {
            returnValue = record.get(combo.displayField);
            //record.set(combo.valueField, value); 
            record.dirty = true;
            record.editing = true;
            return true;
        }
        return false;
    });

    // This is our application specific and might need to be removed for your apps
    if (idx < 0 && value == 0) {
        returnValue = '';
    }

    return returnValue;
};

Ext.ux.renderer.Combo = function(combo) {
    return function(value, meta, record) {
        return Ext.ux.renderer.ComboRenderer({ value: value, meta: meta, record: record, combo: combo });
    };
};


// {header: 'Type', dataIndex: 'AddressTypeId', width: 100, renderer: Ext.ux.renderer.Combo(addressTypeCombo), editor: addressTypeCombo},
 