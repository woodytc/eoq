
Ext.define('DeviceCommunication.view.device.DailyBasisWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.dailybasiswindow',
    renderHyperLink: function (val, obj, record) {
        var imei = record.get('Imei');
        var fordate = Ext.Date.format(record.get('ForDate'), 'd/m/Y');
        var url = window.GetDailyBasisKmlFile + "?imei=" + imei + "&fordate=" + fordate;
        return '<a href="' + url + '" /><img src="' + window.ContentUrl + 'images/kml_icon.png' + '" /></a>';
    },
    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            height: Ext.getBody().getViewSize().height * 0.95, // Change to support labtop screen
            width: Ext.getBody().getViewSize().width * 0.95,  // Change to support labtop screen
            minWidth: 500,
            minHeight: 400,
            title: 'Daily Basis',
            layout: 'border',
            defaults: { split: true },
            modal: false,
            iconCls: 'icon-details',
            items: [
                {
                    xtype: 'gridpanel',
                    region: 'center',
                    id: 'daily-basis-list',
                    store: Ext.create('Ext.data.JsonStore', {
                        model: 'DeviceCommunication.model.DailyBasis',
                        proxy: {
                            type: 'ajax',
                            api: { read: window.BaseUrl + "Devices/GetDailyBasis" },
                            timeout: 120000,
                            reader: {
                                type: 'json',
                                root: 'data',
                                totalProperty: 'total'
                            }
                        }
                    }),
                    columns: [
                        { dataIndex: 'Version', text: 'Ver.', width: 50, sortable: false, align: 'center' },
                        { dataIndex: 'Imei', sortable: false, hidden: true },
                        { dataIndex: 'ForDate', text: 'For Date', width: 80, sortable: false, renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                        { dataIndex: 'HavDistanceFromGeopointsMeter', text: 'Server Hav Distance(M)', width: 90, sortable: false, align: 'right' },
                        { dataIndex: 'TotalOfGeopoint', text: 'Total Geopoint', width: 90, sortable: false, align: 'right' },
                        { dataIndex: 'MeterPerGeopoint', text: 'Meter/Geopoint', width: 90, sortable: false, align: 'right' },
                        { renderer: this.renderHyperLink, width: 75, text: 'KML', sortable: false, align: 'center', tooltip: 'Download Kml' }
                    //                        { xtype: 'actioncolumn', width: 75, text: 'Kml', sortable: false, align: 'center',
                    //                            items: [
                    //                                {
                    //                                    icon: window.ContentUrl + 'images/kml_icon.png',
                    //                                    tooltip: 'Download Kml',
                    //                                    handler: function (grid, rowIndex, colIndex) {
                    //                                        var rec = this.up().up().store.getAt(rowIndex);
                    //                                        var imei = rec.get('Imei');                                        
                    //                                        var fordate = Ext.Date.format(rec.get('ForDate'), 'd/m/Y');
                    //                                        var url = window.GetDailyBasisKmlFile + "?imei=" + imei + "&fordate=" + fordate;                                        

                    //                                        document.location = url;                                        
                    //                                        //console.log('imei: ' + imei + ', date: ' + fordate);                                        

                    //                                    } //end handle
                    //                                }
                    //                            ]
                    //                        } // end xtype
                    ],
                    listeners: {
                        selectionchange: function (model, records) {
                            if (records[0]) {
                                var imei = records[0].get('Imei');
                                var forDate = records[0].get('ForDate');
                                var data = {};
                                data.Imei = imei;
                                data.forDate = forDate;
                                //console.log(forDate);

                                $.ajax({
                                    type: "POST",
                                    cache: false,
                                    data: Ext.encode(data),
                                    //async: false,
                                    url: window.GetGeopoints,
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    success: function (result) {
                                        //console.log(result.data);
                                        var googleMap = Ext.getCmp('google-map');
                                        googleMap.removeAllMarker();

                                        result.data.forEach(function (geopoint) {
                                            //console.log(geopoint.Latitude);
                                            var seq = geopoint.Seq;
                                            var lat = geopoint.Latitude;
                                            var lng = geopoint.Longitude;
                                            var heading = geopoint.Heading;
                                            var totalNear = geopoint.TotalNear;
                                            var maxTotalNear = geopoint.MaxTotalNear;
                                            var latlng = new google.maps.LatLng(lat, lng);

                                            //EngineStartStopAlert, ObdCoreId, TowingAlert
                                            var fromMessage = geopoint.FromMessage;

                                            var mark = new google.maps.Marker(
                                                {
                                                    position: latlng,
                                                    title: "Seq:" + seq + ", Geopoint:(" + lat + ", " + lng + "), Near: " + totalNear + " (200m), FromMsg: " + fromMessage,
                                                    map: googleMap.getMap(), //[20130828] Narin K. - Fixed display position of journey
                                                }
                                            );

                                            mark.TotalNear = totalNear;
                                            mark.MaxTotalNear = maxTotalNear;

                                            if (fromMessage.indexOf("EngineStartStopAlert") >= 0) {
                                                mark.icon = window.EngineStartStopAlert;
                                            } else if (fromMessage.indexOf("ObdCoreId") >= 0) {
                                                mark.icon = window.ObdCore;
                                            } else if (fromMessage.indexOf("TowingAlert") >= 0) {
                                                mark.icon = window.TowingAlert;
                                            } else if (fromMessage.indexOf("Alert") >= 0) {
                                                mark.icon = window.Alerts;
                                            } else {
                                                if (heading >= 338 || heading < 23) {
                                                    mark.icon = window.direction_up_icon;
                                                }
                                                else if (23 <= heading && heading < 68) {
                                                    mark.icon = window.direction_upright_icon;
                                                }
                                                else if (68 <= heading && heading < 113) {
                                                    mark.icon = window.direction_right_icon;
                                                }
                                                else if (113 <= heading && heading < 158) {
                                                    mark.icon = window.direction_downright_icon;
                                                }
                                                else if (158 <= heading && heading < 203) {
                                                    mark.icon = window.direction_down_icon;
                                                }
                                                else if (203 <= heading && heading < 248) {
                                                    mark.icon = window.direction_downleft_icon;
                                                }
                                                else if (248 <= heading && heading < 293) {
                                                    mark.icon = window.direction_left_icon;
                                                }
                                                else if (293 <= heading && heading < 338) {
                                                    mark.icon = window.direction_upleft_icon;
                                                }
                                            }

                                            mark.size = new google.maps.Size(22, 20);
                                            googleMap.addMarker(mark, 200);
                                            googleMap.getMap().panTo(latlng);


                                        }); //ebd foreach

//                                        _latlng = latlng;
//                                        _heading = heading;
//                                        try {
//                                            _map_panorama = new google.maps.StreetViewPanorama($("#map_panorama").get(0));
//                                            _map_panorama.setPov({
//                                                heading: parseInt(_heading), pitch: 10, zoom: 1
//                                            });
//                                            _map_panorama.setPosition(_latlng);
//                                        } catch (err) { }
                                    },
                                    error: function (xhr, ajaxOptions, thrownError) {
                                        Ext.MessageBox.hide();
                                        alert(xhr.status + " " + thrownError);
                                    }
                                }); //end ajax
                            }
                        }
                    }
                }//end gridpanel, center
                , {
                    xtype: 'gmappanel',
                    width: Ext.getBody().getViewSize().width * 0.95 * 0.5,
                    region: 'east',
                    zoomLevel: 16,
                    id: 'google-map',
                    center: new google.maps.LatLng(13.730157, 100.580547)
                }
            ]
        });

        DeviceCommunication.view.device.DailyBasisWindow.superclass.initComponent.apply(this, arguments);
    },
    getDailybasisGrid: function () {
        return this.items.get(0);
    },
    doRefreshData: function (imei) {
        this.getDailybasisGrid().store.getProxy().extraParams.imei = imei;
        this.getDailybasisGrid().store.load();
    }
});