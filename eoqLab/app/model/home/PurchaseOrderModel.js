Ext.define('EOQ.model.PurchaseOrder', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'ProductID', type: 'int' },
        { name: 'CategoryName' },
        { name: 'ProductName' },
        { name: 'QTY', type: 'int' },
        { name: 'UnitType' },
        { name: 'Price', type: 'float' },
        { name: 'Total', type: 'float' }
    ]
});

//model 
Ext.define('Model.Task', {
    extend: 'Ext.data.Model',
    idProperty: 'taskId',
    fields: [
                    { name: 'MatId', type: 'int' },
                    { name: 'MatName', type: 'string' },
                    { name: 'project', type: 'string' },
                    { name: 'taskId', type: 'int' },
                    { name: 'description', type: 'string' },
                    { name: 'estimate', type: 'float' },
                    { name: 'rate', type: 'float' },
                    { name: 'due', type: 'date', dateFormat: 'm/d/Y' }
            ]
});

Ext.define('EOQ.Model.ProductsList', {
    extend: 'Ext.data.Model',
    idProperty: 'MatId',
    fields: [
                    { name: 'MatId', type: 'int' },
                    { name: 'MatName', type: 'string' },
            ]
});


Ext.define('EOQ.Model.CategoriesList', {
    extend: 'Ext.data.Model',
    idProperty: 'CategoryID',
    fields: [
                    { name: 'CategoryID', type: 'int' },
                    { name: 'CategoryName', type: 'string' },
            ]
});

window.testPurchaseOrderData = [
                    { MatId: 4, MatName : 'วัสดุ2', project: 'Ext Forms: Field Anchoring', taskId: 112, description: 'Integrate 2.0 Forms with 2.0 Layouts', estimate: 6, rate: 150, due: '06/24/2007' },
                    { MatId: 3, MatName: 'วัสดุ1', project: 'Ext Forms: Field Anchoring', taskId: 113, description: 'Implement AnchorLayout', estimate: 4, rate: 150, due: '06/25/2007' },
                    { MatId: 4, MatName: 'วัสดุ2', project: 'Ext Forms: Field Anchoring', taskId: 114, description: 'Add support for multiple types of anchors', estimate: 4, rate: 150, due: '06/27/2007' },
                    { MatId: 3, MatName: 'วัสดุ1', project: 'Ext Forms: Field Anchoring', taskId: 115, description: 'Testing and debugging', estimate: 8, rate: 0, due: '06/29/2007' },
                    { MatId: 4, MatName: 'วัสดุ2', project: 'Ext Grid: Single-level Grouping', taskId: 101, description: 'Add required rendering "hooks" to GridView', estimate: 6, rate: 100, due: '07/01/2007' },
                    { MatId: 4, MatName: 'วัสดุ2', project: 'Ext Grid: Single-level Grouping', taskId: 102, description: 'Extend GridView and override rendering functions', estimate: 6, rate: 100, due: '07/03/2007' },
                    { MatId: 4, MatName: 'วัสดุ2', project: 'Ext Grid: Single-level Grouping', taskId: 103, description: 'Extend Store with grouping functionality', estimate: 4, rate: 100, due: '07/04/2007' },
                    { MatId: 4, MatName: 'วัสดุ2', project: 'Ext Grid: Single-level Grouping', taskId: 121, description: 'Default CSS Styling', estimate: 2, rate: 100, due: '07/05/2007' },
                    { MatId: 3, MatName: 'วัสดุ1', project: 'Ext Grid: Single-level Grouping', taskId: 104, description: 'Testing and debugging', estimate: 6, rate: 100, due: '07/06/2007' },
                    { MatId: 3, MatName: 'วัสดุ1', project: 'Ext Grid: Summary Rows', taskId: 105, description: 'Ext Grid plugin integration', estimate: 4, rate: 125, due: '07/01/2007' },
                    { MatId: 3, MatName: 'วัสดุ1', project: 'Ext Grid: Summary Rows', taskId: 106, description: 'Summary creation during rendering phase', estimate: 4, rate: 125, due: '07/02/2007' },
                    { MatId: 4, MatName: 'วัสดุ2', project: 'Ext Grid: Summary Rows', taskId: 107, description: 'Dynamic summary updates in editor grids', estimate: 6, rate: 125, due: '07/05/2007' },
                    { MatId: 3, MatName: 'วัสดุ1', project: 'Ext Grid: Summary Rows', taskId: 108, description: 'Remote summary integration', estimate: 4, rate: 125, due: '07/05/2007' },
                    { MatId: 3, MatName: 'วัสดุ1', project: 'Ext Grid: Summary Rows', taskId: 109, description: 'Summary renderers and calculators', estimate: 4, rate: 125, due: '07/06/2007' },
                    { MatId: 4, MatName: 'วัสดุ2', project: 'Ext Grid: Summary Rows', taskId: 110, description: 'Integrate summaries with GroupingView', estimate: 10, rate: 125, due: '07/11/2007' },
                    { MatId: 4, MatName: 'วัสดุ2', project: 'Ext Grid: Summary Rows', taskId: 111, description: 'Testing and debugging', estimate: 8, rate: 125, due: '07/15/2007' }
                    ];
