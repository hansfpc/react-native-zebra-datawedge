import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import DataWedgeIntents from 'react-native-datawedge-intents';
import { DeviceEventEmitter } from 'react-native';


export default class App extends Component<{}> {
  constructor(props)
  {
    super(props);
    this.state = {enumeratedScanners: "Scanners will appear here", barcodeLabelType: "", barcodeData: "", barcodeSource: ""};
    this.scanHandler = (deviceEvent) =>
    {

      console.log(deviceEvent);
      this.state.barcodeData = deviceEvent.data;
      this.state.barcodeLabelType = deviceEvent.labelType;
      this.state.barcodeSource = deviceEvent.source;
      this.setState(this.state);
    };
    this.enumerateScannersHandler = (deviceEvent) =>
    {
      //console.log(deviceEvent);
      var scanners = "";
      for (var i = 0; i < deviceEvent.Scanners.length; i++)
        scanners = scanners + '[' + deviceEvent.Scanners[i] + '] ';
      this.state.enumeratedScanners = scanners;
      this.setState(this.state);
    }
    DeviceEventEmitter.addListener('enumerated_scanners', this.enumerateScannersHandler);
    DeviceEventEmitter.addListener('barcode_scan', this.scanHandler);
    //  NOTE: DataWedge must be configured to send intents with this action for the demo to work (do not specify a category)
    //  Feel free to modify this call to listen for a different action.
    DataWedgeIntents.registerReceiver('com.zebra.dwintents.ACTION', '');
  }

  render() {
    let barcodeData = this.state.barcodeData;
    let barcodeType = this.state.barcodeLabelType;
    let barcodeSource = this.state.barcodeSource;
    let enumeratedScanners = this.state.enumeratedScanners;
    return (
        <ScrollView>
          <View style={styles.container}>

            <View style={styles.row}>
              <Text style={styles.rowText}>
                Scanned Data: {barcodeData} - {barcodeType}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowText}>
                Soft Scan Trigger:
              </Text>
              <View style={styles.optionsView}>
                <TouchableOpacity onPress={()=>{DataWedgeIntents.sendIntent(DataWedgeIntents.ACTION_SOFTSCANTRIGGER,DataWedgeIntents.START_SCANNING)}}>
                  <Text style={styles.optionsText}>
                    START_SCANNING
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{DataWedgeIntents.sendIntent(DataWedgeIntents.ACTION_SOFTSCANTRIGGER,DataWedgeIntents.STOP_SCANNING)}}>
                  <Text style={styles.optionsText}>
                    STOP_SCANNING
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{DataWedgeIntents.sendIntent(DataWedgeIntents.ACTION_SOFTSCANTRIGGER,DataWedgeIntents.TOGGLE_SCANNING)}}>
                  <Text style={styles.optionsText}>
                    TOGGLE_SCANNING
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowText}>
                Scanner Input Plugin:
              </Text>
              <View style={styles.optionsView}>
                <TouchableOpacity onPress={()=>{DataWedgeIntents.sendIntent(DataWedgeIntents.ACTION_SCANNERINPUTPLUGIN,DataWedgeIntents.ENABLE_PLUGIN)}}>
                  <Text style={styles.optionsText}>
                    ENABLE_SCANNING
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{DataWedgeIntents.sendIntent(DataWedgeIntents.ACTION_SCANNERINPUTPLUGIN,DataWedgeIntents.DISABLE_PLUGIN)}}>
                  <Text style={styles.optionsText}>
                    DISABLE_SCANNING
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowText}>
                Enumerate Scanners:
              </Text>
              <View style={styles.optionsView}>
                <TouchableOpacity onPress={()=>{DataWedgeIntents.sendIntent(DataWedgeIntents.ACTION_ENUMERATESCANNERS)}}>
                  <Text style={styles.optionsText}>
                    ENUMERATE
                  </Text>
                </TouchableOpacity>
                <Text style={styles.optionsTextNoColor}>
                  {enumeratedScanners}
                </Text>
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowText}>
                Set Default Profile:
              </Text>
              <View style={styles.optionsView}>
                <TextInput style={{width:250}} placeholder="Profile Name" onChangeText={(profileText) => this.setState({profileText})} />
                <TouchableOpacity onPress={()=>{DataWedgeIntents.sendIntent(DataWedgeIntents.ACTION_SETDEFAULTPROFILE, this.state.profileText)}}>
                  <Text style={styles.optionsText}>
                    SET DEFAULT PROFILE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowText}>
                Reset Default Profile:
              </Text>
              <View style={styles.optionsView}>
                <TouchableOpacity onPress={()=>{DataWedgeIntents.sendIntent(DataWedgeIntents.ACTION_RESETDEFAULTPROFILE)}}>
                  <Text style={styles.optionsText}>
                    RESET DEFAULT PROFILE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowText}>
                Switch to Profile:
              </Text>
              <View style={styles.optionsView}>
                <TextInput style={{width:250}} placeholder="Profile Name" onChangeText={(switchText) => this.setState({switchText})} />
                <TouchableOpacity onPress={()=>{DataWedgeIntents.sendIntent(DataWedgeIntents.ACTION_SWITCHTOPROFILE, this.state.switchText)}}>
                  <Text style={styles.optionsText}>
                    SWITCH TO PROFILE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  optionsView: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    margin: 5,
  },
  rowText: {
    fontSize: 18,
    textAlign: 'left',
    color: '#555555',
    margin: 2,
  },
  optionsText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: '#0077a0',
    padding: 10,
    margin: 1,
  },
  optionsTextNoColor: {
    fontSize: 14,
    textAlign: 'center',
    padding: 10,
    margin: 1,
  },
  row: {
    margin: 5,
    flexDirection: 'column'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
