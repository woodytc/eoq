var onBackgroundColor = function () {
    var val = this.getValue();
    var fieldLabel = this.getFieldLabel();
    if (val == 'true') {
        this.setFieldStyle('background: #8ecf81;');
    } else {
        this.setFieldStyle('background: #ffa485;');
    }
    this.setValue(fieldLabel);
    //console.log(this.getValue());
}

/* [20310828] Narin K. - Fixed for ObdCoreWindow.js
 *                     - remove hidden: 'true'for SupportPIDs01Index,SupportPIDs21Index,SupportPIDs41Index
 *                     - move index of SupportPIDs01Index,SupportPIDs21Index,SupportPIDs41Index from 31 to 0 to display on screen
 *                     - rearrange index
 *                     - reference from http://en.wikipedia.org/wiki/OBD-II_PIDs          
 */
Ext.define('DeviceCommunication.view.device.ObdWindow', {
    extend: 'Ext.Window',
    initComponent: function () {
        Ext.apply(this, {
            width: 500,
            height: 500,
            title: 'Standard PIDs',
            bodyPadding: 5,
            autoScroll: true,
            resizable: false,
            items: [{
                xtype: 'fieldset', title: 'PID Support 00', defaultType: 'textfield',
                layout: { type: 'column' },
                defaults: {
                    layout: 'anchor', labelWidth: 350, width: 400, readOnly: true,
                    margin: '3 3 3 3', columnWidth: 1, bodyStyle: 'padding:5px 0 5px 5px', hideLabel: true,
                    listeners: {render: onBackgroundColor}
                },
                items: [
                            {fieldLabel: "IsSupportPIDs01", name: 'IsSupportPIDs01' }, //- 31
                            {fieldLabel: "Monitor status since DTCs cleared", name: 'IsSupportMonitorStatusSinceDTCsCleared' }, //- 0
                            {fieldLabel: "Freeze DTC", name: 'IsSupportFreezeDTC' }, //- 1
                            {fieldLabel: "Fuel system status", name: 'IsSupportFuelSystemStatus' }, //- 2
                            {fieldLabel: "Calculated engine load value", name: 'IsSupportCalculatedEngineLoadValue' }, //- 3
                            {fieldLabel: "Engine coolant temperature", name: 'IsSupportEngineCoolantTemperature' }, //- 4
                            {fieldLabel: "Short term fuel % trim—Bank 1", name: 'IsSupportShortTermFuelPercentTrimBank1' }, //- 5
                            {fieldLabel: "Long term fuel % trim—Bank 1", name: 'IsSupportLongTermFuelPercentTrimBank1' }, //- 6
                            {fieldLabel: "Short term fuel % trim—Bank 2", name: 'IsSupportShortTermFuelPercentTrimBank2' }, //- 7
                            {fieldLabel: "Long term fuel % trim—Bank 2", name: 'IsSupportLongTermFuelPercentTrimBank2' }, //- 8
                            {fieldLabel: "Fuel pressure", name: 'IsSupportFuelPressure' }, //- 9
                            {fieldLabel: "Intake manifold absolute pressure", name: 'IsSupportIntakeManifoldAbsolutePressure' }, //- 10
                            {fieldLabel: "Engine RPM", name: 'IsSupportEngineRPM' }, //- 11
                            {fieldLabel: "Vehicle speed", name: 'IsSupportVehicleSpeed' }, //- 12
                            {fieldLabel: "Timing advance", name: 'IsSupportTimingAdvance' }, //- 13
                            {fieldLabel: "Intake air temperature", name: 'IsSupportIntakeAirTemperature' }, //- 14
                            {fieldLabel: "MAF air flow rate", name: 'IsSupportMAFAirFlowRate' }, //- 15
                            {fieldLabel: "Throttle position", name: 'IsSupportThrottlePosition' }, //- 16
                            {fieldLabel: "Commanded secondary air status", name: 'IsSupportCommandedSecondaryAirStatus' }, //- 17
                            {fieldLabel: "Oxygen sensors present", name: 'IsSupportOxygenSensorsPresent' }, //- 18
                            {fieldLabel: "Bank 1, Sensor 1: Oxygen sensor voltage, Short term fuel trim", name: 'IsSupportBank1Sensor1OxygenSensorVoltageShortTermFuelTrim' }, //- 19
                            {fieldLabel: "Bank 1, Sensor 2: Oxygen sensor voltage, Short term fuel trim", name: 'IsSupportBank1Sensor2OxygenSensorVoltageShortTermFuelTrim' }, //- 20
                            {fieldLabel: "Bank 1, Sensor 3: Oxygen sensor voltage, Short term fuel trim", name: 'IsSupportBank1Sensor3OxygenSensorVoltageShortTermFuelTrim' }, //- 21
                            {fieldLabel: "Bank 1, Sensor 4: Oxygen sensor voltage, Short term fuel trim", name: 'IsSupportBank1Sensor4OxygenSensorVoltageShortTermFuelTrim' }, //- 22
                            {fieldLabel: "Bank 2, Sensor 1: Oxygen sensor voltage, Short term fuel trim", name: 'IsSupportBank2Sensor1OxygenSensorVoltageShortTermFuelTrim' }, //- 23
                            {fieldLabel: "Bank 2, Sensor 2: Oxygen sensor voltage, Short term fuel trim", name: 'IsSupportBank2Sensor2OxygenSensorVoltageShortTermFuelTrim' }, //- 24
                            {fieldLabel: "Bank 2, Sensor 3: Oxygen sensor voltage, Short term fuel trim", name: 'IsSupportBank2Sensor3OxygenSensorVoltageShortTermFuelTrim' }, //- 25
                            {fieldLabel: "Bank 2, Sensor 4: Oxygen sensor voltage, Short term fuel trim", name: 'IsSupportBank2Sensor4OxygenSensorVoltageShortTermFuelTrim' }, //- 26
                            {fieldLabel: "OBD standards this vehicle conforms to", name: 'IsSupportOBDStandardsThisVehicleConformsTo' }, //- 27
                            {fieldLabel: "Oxygen sensors present (Similar to PID 13)", name: 'IsSupportOxygenSensorsPresentSimilarToPID13' }, //- 28
                            {fieldLabel: "Auxiliary input status", name: 'IsSupportAuxiliaryInputStatus' }, //- 29
                            {fieldLabel: "Run time since engine start", name: 'IsSupportRunTimeSinceEngineStart' }, //- 30
                            
                        ]
            }, {
                xtype: 'fieldset', title: 'PID Support 20', defaultType: 'textfield',
                layout: { type: 'column' },
                defaults: {
                    layout: 'anchor', labelWidth: 350, width: 400, readOnly: true,
                    margin: '3 3 3 3', columnWidth: 1, bodyStyle: 'padding:5px 0 5px 5px', hideLabel: true,
                    listeners: { render: onBackgroundColor }
                },
                items: [
                    {fieldLabel: "IsSupportPIDs21", name: 'IsSupportPIDs21' }, // -31
                    {fieldLabel: "Distance traveled with malfunction indicator lamp (MIL) on", name: 'IsSupportDistanceTraveledWithMalfunctionIndicatorLampMILOn' }, // -0
                    {fieldLabel: "Fuel Rail Pressure (relative to manifold vacuum)", name: 'IsSupportFuelRailPressureRelativeToManifoldVacuum' }, // -1
                    {fieldLabel: "Fuel Rail Pressure (diesel, or gasoline direct inject)", name: 'IsSupportFuelRailPressureDieselOrGasolineDirectInject' }, // -2
                    {fieldLabel: "O2S1_WR_lambda(1): Equivalence Ratio Voltage", name: 'IsSupportO2S1_WR_lambda1EquivalenceRatioVoltage' }, // -3
                    {fieldLabel: "O2S2_WR_lambda(1): Equivalence Ratio Voltage", name: 'IsSupportO2S2_WR_lambda1EquivalenceRatioVoltage' }, // -4
                    {fieldLabel: "O2S3_WR_lambda(1): Equivalence Ratio Voltage", name: 'IsSupportO2S3_WR_lambda1EquivalenceRatioVoltage' }, // -5
                    {fieldLabel: "O2S4_WR_lambda(1): Equivalence Ratio Voltage", name: 'IsSupportO2S4_WR_lambda1EquivalenceRatioVoltage' }, // -6
                    {fieldLabel: "O2S5_WR_lambda(1): Equivalence Ratio Voltage", name: 'IsSupportO2S5_WR_lambda1EquivalenceRatioVoltage' }, // -7
                    {fieldLabel: "O2S6_WR_lambda(1): Equivalence Ratio Voltage", name: 'IsSupportO2S6_WR_lambda1EquivalenceRatioVoltage' }, // -8
                    {fieldLabel: "O2S7_WR_lambda(1): Equivalence Ratio Voltage", name: 'IsSupportO2S7_WR_lambda1EquivalenceRatioVoltage' }, // -9
                    {fieldLabel: "O2S8_WR_lambda(1): Equivalence Ratio Voltage", name: 'IsSupportO2S8_WR_lambda1EquivalenceRatioVoltage' }, // -10
                    {fieldLabel: "Commanded EGR", name: 'IsSupportCommandedEGR' }, // -11
                    {fieldLabel: "EGR Error", name: 'IsSupportEGRError1' }, // -12
                    {fieldLabel: "Commanded evaporative purge", name: 'IsSupportCommandedEvaporativePurge' }, // -13
                    {fieldLabel: "Fuel Level Input", name: 'IsSupportFuelLevelInput' }, // -14
                    {fieldLabel: "# of warm-ups since codes cleared", name: 'IsSupportNumberOfWarmUpsSinceCodesCleared' }, // -15
                    {fieldLabel: "Distance traveled since codes cleared", name: 'IsSupportDistanceTraveledSinceCodesCleared' }, // -16
                    {fieldLabel: "Evap. System Vapor Pressure", name: 'IsSupportEvapSystemVaporPressure' }, // -17
                    {fieldLabel: "Barometric pressure", name: 'IsSupportBarometricPressure' }, // -18
                    {fieldLabel: "O2S1_WR_lambda(1): Equivalence Ratio Current", name: 'IsSupportO2S1_WR_lambda1EquivalenceRatioCurrent' }, // -19
                    {fieldLabel: "O2S2_WR_lambda(1): Equivalence Ratio Current", name: 'IsSupportO2S2_WR_lambda1EquivalenceRatioCurrent' }, // -20
                    {fieldLabel: "O2S3_WR_lambda(1): Equivalence Ratio Current", name: 'IsSupportO2S3_WR_lambda1EquivalenceRatioCurrent' }, // -21
                    {fieldLabel: "O2S4_WR_lambda(1): Equivalence Ratio Current", name: 'IsSupportO2S4_WR_lambda1EquivalenceRatioCurrent' }, // -22
                    {fieldLabel: "O2S5_WR_lambda(1): Equivalence Ratio Current", name: 'IsSupportO2S5_WR_lambda1EquivalenceRatioCurrent' }, // -23
                    {fieldLabel: "O2S6_WR_lambda(1): Equivalence Ratio Current", name: 'IsSupportO2S6_WR_lambda1EquivalenceRatioCurrent' }, // -24
                    {fieldLabel: "O2S7_WR_lambda(1): Equivalence Ratio Current", name: 'IsSupportO2S7_WR_lambda1EquivalenceRatioCurrent' }, // -25
                    {fieldLabel: "O2S8_WR_lambda(1): Equivalence Ratio Current", name: 'IsSupportO2S8_WR_lambda1EquivalenceRatioCurrent' }, // -26
                    {fieldLabel: "Catalyst Temperature Bank 1, Sensor 1", name: 'IsSupportCatalystTemperatureBank1Sensor1' }, // -27
                    {fieldLabel: "Catalyst Temperature Bank 2, Sensor 1", name: 'IsSupportCatalystTemperatureBank2Sensor1' }, // -28
                    {fieldLabel: "Catalyst Temperature Bank 1, Sensor 2", name: 'IsSupportCatalystTemperatureBank1Sensor2' }, // -29
                    {fieldLabel: "Catalyst Temperature Bank 2, Sensor 2", name: 'IsSupportCatalystTemperatureBank2Sensor2' }, // -30
                    
                ]
            }, {
                xtype: 'fieldset', title: 'PID Support 40', defaultType: 'textfield',
                layout: { type: 'column' },
                defaults: {
                    layout: 'anchor', labelWidth: 350, width: 400, readOnly: true,
                    margin: '3 3 3 3', columnWidth: 1, bodyStyle: 'padding:5px 0 5px 5px', hideLabel: true,
                    listeners: { render: onBackgroundColor }
                },
                items: [
                    { fieldLabel: "IsSupportPIDs41", name: 'IsSupportPIDs41' }, // -31
                    {fieldLabel: "Monitor status this drive cycle", name: 'IsSupportMonitorStatusThisDriveCycle' }, // -0
                    {fieldLabel: "Control module voltage", name: 'IsSupportFuelRailPressureRelativeToManifoldVacuum' }, // -1
                    {fieldLabel: "Absolute load value", name: 'IsSupportAbsoluteLoadValue' }, // -2
                    {fieldLabel: "Command equivalence ratio", name: 'IsSupportCommandEquivalenceRatio' }, // -3
                    {fieldLabel: "Relative throttle position", name: 'IsSupportRelativeThrottlePosition' }, // -4
                    {fieldLabel: "Ambient air temperature", name: 'IsSupportAmbientAirTemperature' }, // -5
                    {fieldLabel: "Absolute throttle position B", name: 'IsSupportAbsoluteThrottlePositionB' }, // -6
                    {fieldLabel: "Absolute throttle position C", name: 'IsSupportAbsoluteThrottlePositionC' }, // -7
                    {fieldLabel: "Accelerator pedal position D", name: 'IsSupportAcceleratorPedalPositionD' }, // -8
                    {fieldLabel: "Accelerator pedal position E", name: 'IsSupportAcceleratorPedalPositionE' }, // -9
                    {fieldLabel: "Accelerator pedal position F", name: 'IsSupportAcceleratorPedalPositionF' }, // -10
                    {fieldLabel: "Commanded throttle actuator", name: 'IsSupportCommandedThrottleActuator' }, // -11
                    {fieldLabel: "Time run with MIL on", name: 'IsSupportTimeRunWithMILOn' }, // -12
                    {fieldLabel: "Time since trouble codes cleared", name: 'IsSupportTimeSinceTroubleCodesCleared' }, // -13
                    {fieldLabel: "Fuel Level Input", name: 'IsSupportFuelLevelInput' }, // -14
                    {fieldLabel: "Maximum value for equivalence ratio, oxygen sensor voltage, oxygen sensor current, and intake manifold absolute pressure", name: 'IsSupportMaximumValueForEquivalenceRatioOxygenSensorVoltageOxygenSensorCurrentAndIntakeManifoldAbsolutePressure' }, // -15
                    {fieldLabel: "Maximum value for air flow rate from mass air flow sensor", name: 'IsSupportMaximumValueForAirFlowRateFromMassAirFlowSensor' }, // -16
                    {fieldLabel: "Fuel Type", name: 'IsSupportFuelType' }, // -17
                    {fieldLabel: "Ethanol fuel %", name: 'IsSupportEthanolFuel' }, // -18
                    {fieldLabel: "Absolute Evap system Vapour Pressure", name: 'IsSupportAbsoluteEvapSystemVapourPressure' }, // -19
                    {fieldLabel: "Evap system vapor pressure", name: 'IsSupportEvapsystemvaporPressure' }, // -20
                    {fieldLabel: "Short term secondary oxygen sensor trim bank 1 and bank 3", name: 'IsSupportShortTermSecondaryOxygenSensorTrimBank1AndBank3' }, // -21
                    {fieldLabel: "Long term secondary oxygen sensor trim bank 1 and bank 3", name: 'IsSupportLongTermSecondaryOxygenSensorTrimBank1AndBank3' }, // -22
                    {fieldLabel: "Short term secondary oxygen sensor trim bank 2 and bank 4", name: 'IsSupportShortTermSecondaryOxygenSensorTrimBank2AndBank4' }, // -23
                    {fieldLabel: "Long term secondary oxygen sensor trim bank 2 and bank 4", name: 'IsSupportLongTermSecondaryOxygenSensorTrimBank2AndBank4' }, // -24
                    {fieldLabel: "Fuel rail pressure (absolute)", name: 'IsSupportFuelRailPressureAbsolute' }, // -25
                    {fieldLabel: "Relative accelerator pedal position", name: 'IsSupportRelativeAcceleratorPedalPosition' }, // -26
                    {fieldLabel: "Engine oil temperature", name: 'IsSupportEngineOilTemperature' }, // -27
                    {fieldLabel: "Fuel injection timing", name: 'IsSupportFuelInjectionTiming' }, // -28
                    {fieldLabel: "Engine fuel rate", name: 'IsSupportEngineFuelRate' }, // -29
                    {fieldLabel: "Emission requirements to which vehicle is designed", name: 'IsSupportEmissionRequirementsToWhichVehicleIsDesigned' }, // -30
                    
                ]
            }
            ]
        });
        DeviceCommunication.view.device.ObdWindow.superclass.initComponent.apply(this, arguments);
    }
});

DeviceCommunication.view.device.ObdWindow.prototype.view = function (data) {
    //PIDs supported [01 - 20]
    this.items.get(0).items.get(0).setValue(data.IsSupportPIDs01);
    this.items.get(0).items.get(1).setValue(data.IsSupportMonitorStatusSinceDTCsCleared);
    this.items.get(0).items.get(2).setValue(data.IsSupportFreezeDTC);
    this.items.get(0).items.get(3).setValue(data.IsSupportFuelSystemStatus);
    this.items.get(0).items.get(4).setValue(data.IsSupportCalculatedEngineLoadValue);
    this.items.get(0).items.get(5).setValue(data.IsSupportEngineCoolantTemperature);
    this.items.get(0).items.get(6).setValue(data.IsSupportShortTermFuelPercentTrimBank1);
    this.items.get(0).items.get(7).setValue(data.IsSupportLongTermFuelPercentTrimBank1);
    this.items.get(0).items.get(8).setValue(data.IsSupportShortTermFuelPercentTrimBank2);
    this.items.get(0).items.get(9).setValue(data.IsSupportLongTermFuelPercentTrimBank2);
    this.items.get(0).items.get(10).setValue(data.IsSupportFuelPressure);
    this.items.get(0).items.get(11).setValue(data.IsSupportIntakeManifoldAbsolutePressure);
    this.items.get(0).items.get(12).setValue(data.IsSupportEngineRPM);
    this.items.get(0).items.get(13).setValue(data.IsSupportVehicleSpeed);
    this.items.get(0).items.get(14).setValue(data.IsSupportTimingAdvance);
    this.items.get(0).items.get(15).setValue(data.IsSupportIntakeAirTemperature);
    this.items.get(0).items.get(16).setValue(data.IsSupportMAFAirFlowRate);
    this.items.get(0).items.get(17).setValue(data.IsSupportThrottlePosition);
    this.items.get(0).items.get(18).setValue(data.IsSupportCommandedSecondaryAirStatus);
    this.items.get(0).items.get(19).setValue(data.IsSupportOxygenSensorsPresent);
    this.items.get(0).items.get(20).setValue(data.IsSupportBank1Sensor1OxygenSensorVoltageShortTermFuelTrim);
    this.items.get(0).items.get(21).setValue(data.IsSupportBank1Sensor2OxygenSensorVoltageShortTermFuelTrim);
    this.items.get(0).items.get(22).setValue(data.IsSupportBank1Sensor3OxygenSensorVoltageShortTermFuelTrim);
    this.items.get(0).items.get(23).setValue(data.IsSupportBank1Sensor4OxygenSensorVoltageShortTermFuelTrim);
    this.items.get(0).items.get(24).setValue(data.IsSupportBank2Sensor1OxygenSensorVoltageShortTermFuelTrim);
    this.items.get(0).items.get(25).setValue(data.IsSupportBank2Sensor2OxygenSensorVoltageShortTermFuelTrim);
    this.items.get(0).items.get(26).setValue(data.IsSupportBank2Sensor3OxygenSensorVoltageShortTermFuelTrim);
    this.items.get(0).items.get(27).setValue(data.IsSupportBank2Sensor4OxygenSensorVoltageShortTermFuelTrim);
    this.items.get(0).items.get(28).setValue(data.IsSupportOBDStandardsThisVehicleConformsTo);
    this.items.get(0).items.get(29).setValue(data.IsSupportOxygenSensorsPresentSimilarToPID13);
    this.items.get(0).items.get(30).setValue(data.IsSupportAuxiliaryInputStatus);
    this.items.get(0).items.get(31).setValue(data.IsSupportRunTimeSinceEngineStart);

    //Mode 1 PID 00 [21 - 40]
    this.items.get(1).items.get(0).setValue(data.IsSupportPIDs21); 
    this.items.get(1).items.get(1).setValue(data.IsSupportDistanceTraveledWithMalfunctionIndicatorLampMILOn);
    this.items.get(1).items.get(2).setValue(data.IsSupportFuelRailPressureRelativeToManifoldVacuum);
    this.items.get(1).items.get(3).setValue(data.IsSupportFuelRailPressureDieselOrGasolineDirectInject);
    this.items.get(1).items.get(4).setValue(data.IsSupportO2S1_WR_lambda1EquivalenceRatioVoltage); 
    this.items.get(1).items.get(5).setValue(data.IsSupportO2S2_WR_lambda1EquivalenceRatioVoltage);
    this.items.get(1).items.get(6).setValue(data.IsSupportO2S3_WR_lambda1EquivalenceRatioVoltage); 
    this.items.get(1).items.get(7).setValue(data.IsSupportO2S4_WR_lambda1EquivalenceRatioVoltage); 
    this.items.get(1).items.get(8).setValue(data.IsSupportO2S5_WR_lambda1EquivalenceRatioVoltage);
    this.items.get(1).items.get(9).setValue(data.IsSupportO2S6_WR_lambda1EquivalenceRatioVoltage); 
    this.items.get(1).items.get(10).setValue(data.IsSupportO2S7_WR_lambda1EquivalenceRatioVoltage); 
    this.items.get(1).items.get(11).setValue(data.IsSupportO2S8_WR_lambda1EquivalenceRatioVoltage); 
    this.items.get(1).items.get(12).setValue(data.IsSupportCommandedEGR);
    this.items.get(1).items.get(13).setValue(data.IsSupportEGRError1);
    this.items.get(1).items.get(14).setValue(data.IsSupportCommandedEvaporativePurge); 
    this.items.get(1).items.get(15).setValue(data.IsSupportFuelLevelInput);
    this.items.get(1).items.get(16).setValue(data.IsSupportNumberOfWarmUpsSinceCodesCleared); 
    this.items.get(1).items.get(17).setValue(data.IsSupportDistanceTraveledSinceCodesCleared);
    this.items.get(1).items.get(18).setValue(data.IsSupportEvapSystemVaporPressure); 
    this.items.get(1).items.get(19).setValue(data.IsSupportBarometricPressure);
    this.items.get(1).items.get(20).setValue(data.IsSupportO2S1_WR_lambda1EquivalenceRatioCurrent);
    this.items.get(1).items.get(21).setValue(data.IsSupportO2S2_WR_lambda1EquivalenceRatioCurrent); 
    this.items.get(1).items.get(22).setValue(data.IsSupportO2S3_WR_lambda1EquivalenceRatioCurrent); 
    this.items.get(1).items.get(23).setValue(data.IsSupportO2S4_WR_lambda1EquivalenceRatioCurrent);
    this.items.get(1).items.get(24).setValue(data.IsSupportO2S5_WR_lambda1EquivalenceRatioCurrent);
    this.items.get(1).items.get(25).setValue(data.IsSupportO2S6_WR_lambda1EquivalenceRatioCurrent);
    this.items.get(1).items.get(26).setValue(data.IsSupportO2S7_WR_lambda1EquivalenceRatioCurrent); 
    this.items.get(1).items.get(27).setValue(data.IsSupportO2S8_WR_lambda1EquivalenceRatioCurrent); 
    this.items.get(1).items.get(28).setValue(data.IsSupportCatalystTemperatureBank1Sensor1);
    this.items.get(1).items.get(29).setValue(data.IsSupportCatalystTemperatureBank2Sensor1); 
    this.items.get(1).items.get(30).setValue(data.IsSupportCatalystTemperatureBank1Sensor2); 
    this.items.get(1).items.get(31).setValue(data.IsSupportCatalystTemperatureBank2Sensor2); 
    

    //Mode 1 PID 00 [41 - 60]
    this.items.get(2).items.get(0).setValue(data.IsSupportPIDs41);
    this.items.get(2).items.get(1).setValue(data.IsSupportMonitorStatusThisDriveCycle);
    this.items.get(2).items.get(2).setValue(data.IsSupportControlModuleVoltage);
    this.items.get(2).items.get(3).setValue(data.IsSupportAbsoluteLoadValue);
    this.items.get(2).items.get(4).setValue(data.IsSupportCommandEquivalenceRatio); 
    this.items.get(2).items.get(5).setValue(data.IsSupportRelativeThrottlePosition);
    this.items.get(2).items.get(6).setValue(data.IsSupportAmbientAirTemperature); 
    this.items.get(2).items.get(7).setValue(data.IsSupportAbsoluteThrottlePositionB); 
    this.items.get(2).items.get(8).setValue(data.IsSupportAbsoluteThrottlePositionC); 
    this.items.get(2).items.get(9).setValue(data.IsSupportAcceleratorPedalPositionD);
    this.items.get(2).items.get(10).setValue(data.IsSupportAcceleratorPedalPositionE);
    this.items.get(2).items.get(11).setValue(data.IsSupportAcceleratorPedalPositionF); 
    this.items.get(2).items.get(12).setValue(data.IsSupportCommandedThrottleActuator);
    this.items.get(2).items.get(13).setValue(data.IsSupportTimeRunWithMILOn); 
    this.items.get(2).items.get(14).setValue(data.IsSupportTimeSinceTroubleCodesCleared); 
    this.items.get(2).items.get(15).setValue(data.IsSupportMaximumValueForEquivalenceRatioOxygenSensorVoltageOxygenSensorCurrentAndIntakeManifoldAbsolutePressure);
    this.items.get(2).items.get(16).setValue(data.IsSupportMaximumValueForAirFlowRateFromMassAirFlowSensor);
    this.items.get(2).items.get(17).setValue(data.IsSupportFuelType); 
    this.items.get(2).items.get(18).setValue(data.IsSupportEthanolFuel);
    this.items.get(2).items.get(19).setValue(data.IsSupportAbsoluteEvapSystemVapourPressure); 
    this.items.get(2).items.get(20).setValue(data.IsSupportEvapsystemvaporPressure); 
    this.items.get(2).items.get(21).setValue(data.IsSupportShortTermSecondaryOxygenSensorTrimBank1AndBank3);
    this.items.get(2).items.get(22).setValue(data.IsSupportLongTermSecondaryOxygenSensorTrimBank1AndBank3); 
    this.items.get(2).items.get(23).setValue(data.IsSupportShortTermSecondaryOxygenSensorTrimBank2AndBank4); 
    this.items.get(2).items.get(24).setValue(data.IsSupportLongTermSecondaryOxygenSensorTrimBank2AndBank4); 
    this.items.get(2).items.get(25).setValue(data.IsSupportFuelRailPressureAbsolute); 
    this.items.get(2).items.get(26).setValue(data.IsSupportRelativeAcceleratorPedalPosition); 
    this.items.get(2).items.get(27).setValue(data.IsSupportHybridBatteryPackRemainingLife); 
    this.items.get(2).items.get(28).setValue(data.IsSupportEngineOilTemperature);
    this.items.get(2).items.get(29).setValue(data.IsSupportFuelInjectionTiming); 
    this.items.get(2).items.get(30).setValue(data.IsSupportEngineFuelRate); 
    this.items.get(2).items.get(31).setValue(data.IsSupportEmissionRequirementsToWhichVehicleIsDesigned);
    
}