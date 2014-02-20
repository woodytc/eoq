//Color
Ext.define('EOQ.Model.SalesItem', {
    extend: 'Ext.data.Model',
    idProperty: 'SaleID',
    fields: [
                    { name: 'SaleID', type: 'int' },
                    { name: 'MaterialName' },
                    { name: 'UnitName' },
                    { name: 'ColorName' },
                    { name: 'BrandName' },
                    { name: 'SizeName' },
                    { name: 'Amount' },
                    { name: 'TotalPrice', type: 'float' },
                    { name: 'Tax', type: 'float' },
                    { name: 'CreateDate', type: 'date', dateFormat: 'MS' }
            ]
});