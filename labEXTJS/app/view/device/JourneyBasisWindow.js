/* [20130724] Narin K.
   Add export KML column
      - add renderHyperLink function
      - add renderer column
*/
Ext.define('DeviceCommunication.view.device.JourneyBasisWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.journeybasiswindow',
    renderHyperLink: function (val, obj, record) {
        var imei = record.get('Imei');
        var journeyId = record.get('JourneyId');
        var startJourney = Ext.Date.format(record.get('StartJourney'), 'dmYHi');
        var stopJourney = Ext.Date.format(record.get('StopJourney'), 'dmYHi');
        var url = window.GetJourneyBasisKmlFile + "?imei=" + imei + "&journeyId=" + journeyId + "&startJourney=" + startJourney + "&stopJourney=" + stopJourney;
        return '<a href="' + url + '" /><img src="' + window.ContentUrl + 'images/kml_icon.png' + '" /></a>';
    },
    initComponent: function () {
        Ext.apply(this, {
            height: Ext.getBody().getViewSize().height * 0.95,
            width: Ext.getBody().getViewSize().width * 0.95,
            minWidth: 500,
            minHeight: 400,
            title: 'Journey Basis',
            layout: 'border',
            defaults: { split: true },
            iconCls: 'icon-grid',
            items: [
                {
                    xtype: 'gridpanel',
                    region: 'center',
                    store: Ext.create('Ext.data.JsonStore', {
                        model: 'DeviceCommunication.model.JourneyBasis',
                        proxy: {
                            type: 'ajax',
                            api: { read: window.BaseUrl + "Devices/GetJourneyBasis" },
                            reader: {
                                type: 'json',
                                root: 'data',
                                totalProperty: 'total'
                            }
                        }
                    }),
                    columns: [
                        { dataIndex: 'IsLoasStartJney', text: '',
                            renderer: function (val) {
                                if (val) {
                                    return '<img src=' + window.ContentUrl + 'icons/cross.gif>';
                                }
                                else {
                                    return '<img src=' + window.ContentUrl + 'icons/accept.gif>';
                                }
                            }, width: 30, align: 'center'
                        },
                        { dataIndex: 'Version', text: 'Ver.', width: 30, sortable: false, align: 'center' },
                        { dataIndex: 'JourneyId', text: 'JNEY ID', width: 50, sortable: false },
                        { dataIndex: 'Profile', text: 'Profile', width: 50, sortable: false },
                        { dataIndex: 'StartJourney', text: 'Start JNEY(Local)', width: 100, sortable: false, renderer: Ext.util.Format.dateRenderer('d/m/Y H:i') },
                        { dataIndex: 'StopJourney', text: 'Stop JNEY(Local)', width: 100, sortable: false, renderer: Ext.util.Format.dateRenderer('d/m/Y H:i') },
                        { dataIndex: 'JneyDuration', text: 'JNEY Duration', width: 80, sortable: false, align: 'right' },
                        { dataIndex: 'DrivingDuration', text: 'Driving Duration(Summary)', width: 150, sortable: false, align: 'right' },
                        { dataIndex: 'IdlingDuration', text: 'Idling Duration(Summary)', width: 150, sortable: false, align: 'right' },
                        { dataIndex: 'HavDistanceFromGeopointsMeter', text: 'Server Hav Distance(M)', width: 110, sortable: false, align: 'right' },
                        { dataIndex: 'FullHavDistanceMeter', text: 'Full Hav Distance(M)', width: 120, sortable: false, align: 'right' },
                        { dataIndex: 'HavDistanceMeter', text: 'Partial Hav Distance(M)', width: 120, sortable: false, align: 'right' },
                        { dataIndex: 'FullIntDistanceMeter', text: 'Full Int of OBD Distance(M)', width: 120, sortable: false, align: 'right' },
                        { dataIndex: 'DrValue', text: 'Dr Value', width: 120, sortable: false, align: 'right',
                            renderer: function (v) {
                                if (v == null) return "NA";
                                return Ext.util.Format.number(v, '0.0000000');
                            }
                        },
                        { dataIndex: 'DrStandardDeviation', text: 'Dr Standard Deviation', width: 120, sortable: false, align: 'right',
                            renderer: function (v) {
                                if (v == null) return "NA";
                                return Ext.util.Format.number(v, '0.0000000');
                            }
                        },
                        { dataIndex: 'Imei', text: 'IMEI.', width: 150, sortable: false, align: 'center', hidden: true },
                        { dataIndex: 'JourneyStartId', text: 'JNEY Start ID.', width: 150, sortable: false, align: 'center', hidden: true },
                        { dataIndex: 'JourneySummaryId', text: 'JNEY SummaryID.', width: 150, sortable: false, align: 'center', hidden: true },
                        { renderer: this.renderHyperLink, width: 75, text: 'KML', sortable: false, align: 'center', tooltip: 'Download Kml' }, 
                    ]
                }//end gridpanel, center
            ]//end items
        });

        DeviceCommunication.view.device.JourneyBasisWindow.superclass.initComponent.apply(this, arguments);
    },
    getJneybasisGrid: function () {
        return this.items.get(0);
    },
    doRefreshData: function (imei) {
        this.getJneybasisGrid().store.getProxy().extraParams.imei = imei;
        this.getJneybasisGrid().store.load();
    }
});
