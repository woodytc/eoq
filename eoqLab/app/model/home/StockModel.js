Ext.define('EOQ.model.Stock', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'ID', type: 'int' },
        { name: 'ProductID', type: 'int' },
        { name: 'ProductName' },
        { name: 'CategoryID', type: 'int' },
        { name: 'CategoryName' },
        { name: 'ColorID', type: 'int' },
        { name: 'ColorName' },
        { name: 'UnitID', type: 'int' },
        { name: 'UnitName' },
        { name: 'BrandID', type: 'int' },
        { name: 'BrandName' },
        { name: 'Amount', type: 'float' },
        { name: 'Price', type: 'float' }
    ]
});

//Color
Ext.define('EOQ.Model.Colors', {
    extend: 'Ext.data.Model',
    idProperty: 'ColorID',
    fields: [
                    { name: 'ColorID', type: 'int' },
                    { name: 'ColorName', type: 'string' },
            ]
});

Ext.define('EOQ.Model.Brands', {
    extend: 'Ext.data.Model',
    idProperty: 'BrandID',
    fields: [
                    { name: 'BrandID', type: 'int' },
                    { name: 'BrandName', type: 'string' },
            ]
});

window.TestStockData = [
          { ID : 1 ,ProductID: 3, ProductName: 'วัสดุ2', CategoryID: 2, CategoryName: 'หมวด2', ColorID: 1, ColorName: 'ขาว', UnitID: 1, UnitName: "ขวด", BrandID: 1, BrandName: 'แบรน1', Amount: 100.00, Price: 100.00 },
          { ID : 2 ,ProductID: 4, ProductName: 'วัสดุ2', CategoryID: 2, CategoryName: 'หมวด2', ColorID: 2, ColorName: 'ดำ', UnitID: 1, UnitName: "ขวด", BrandID: 2, BrandName: 'แบรน2', Amount: 100.00, Price: 30.00 },
];