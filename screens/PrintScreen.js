import React, {useState, useEffect} from 'react';
import {Text, View, TextInput, TouchableOpacity, NativeModules, ToastAndroid, StyleSheet} from 'react-native';

const {BluetoothModule} = NativeModules;

const PrintScreen = () => {

  const [printer_name, set_printer_name] = useState("Phi Printer-3199");
  const [print_data, set_print_data] = useState("");

  const print = () => {
    ToastAndroid.show("कृपया थोड़ी देर प्रतिक्षा करें ! प्रिंटिंग का काम प्रगति पर है ।", ToastAndroid.SHORT);

    BluetoothModule.printReciept(printer_name, print_data, (res) => {
      ToastAndroid.show("Done Printing\n" + res, ToastAndroid.SHORT);
    });
  };

  // checking that bluetooth enabled or not and getting list of bluetooth devices
  useEffect(() => {
    console.log(BluetoothModule);
    BluetoothModule.checkBluetooth((isEnabled, bluetoothDevices) => {
      if(isEnabled == "false"){
        alert("Please enable bluetooth from the settings !");
        return ;
      }else{
        console.log("Bluetooth Devices = ", bluetoothDevices);
      }
    })
  }, []);

  return (
    <>
      <View style={{padding: 10}}>

        <View style={styles.views}>
          <Text>Enter Correct Printer Name: </Text>
          <TextInput
            style={styles.inputs}
            value={printer_name}
            onChangeText={(v) => set_printer_name(v) }
          />
        </View>

        <View style={styles.views}>
          <Text> Write Here to Print </Text>
          <TextInput
            style={styles.inputs}
            value={print_data}
            onChangeText={(v) => set_print_data(v) }
            multiline={true}
            numberOfLines={4}
            placeholder="write something here !"
          />
        </View>  

        <View style={styles.views}>
          <TouchableOpacity onPress={print} >
            <Text style={{padding: 10, borderRadius: 5, fontWeight: 'bold', backgroundColor: 'lightgrey', textAlign: 'center'}}>
              Print Reciept
            </Text>
          </TouchableOpacity>
        </View>

      </View>

    </>
  );
};

const styles = StyleSheet.create({
  inputs: {
    borderColor: 'lightgrey',
    padding: 5,
    borderWidth: 1,
    borderRadius: 5
  },
  views: {
    marginTop: 15
  }
});

export default PrintScreen;