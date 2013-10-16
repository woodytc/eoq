﻿Ext.Loader.setConfig({ enabled: true });

Ext.require('Ext.chart.*');
Ext.require(['Ext.Window', 'Ext.layout.container.Fit', 'Ext.fx.target.Sprite']);

Ext.QuickTips.init();

Ext.application({
    name: 'DeviceCommunication',
    appFolder: 'app',
    controllers: ['DeviceCommunicationController'],
    launch: function () {
        //console.log("app -> launch");

        Ext.create('Ext.container.Viewport', {
            layout: {type: 'border', padding: 5 },
            defaults: {split: true, frame: false},
            items: [
            {
                        xtype: 'panel',
                        region: 'north',
                        height: 25, // give north and south regions a height
                        title: 'Device Management [ ' + window.currentUser + ' : ' + window.CurrentUserRole
                                + ' ]<a href=' + window.actionLogoff + ' style="font-family:verdana;font-size:12px;color:red;text-decoration: none;">   Logoff</a>'
            },
            { 
                xtype: 'tabpanel', 
                region: 'center', 
                items: [
                    {xtype: 'devicelist', iconCls: 'icon-tabs'},
                    {xtype: 'requestpendinglist', iconCls: 'icon-tabs'}
                ]
            }]
        });
    }
});