package com.blog2;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothGattDescriptor;
import android.bluetooth.BluetoothManager;
import android.bluetooth.BluetoothSocket;
import android.bluetooth.le.BluetoothLeAdvertiser;
import android.bluetooth.le.BluetoothLeScanner;
import android.content.Intent;
import android.provider.Settings;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Set;
import java.util.UUID;

public class BluetoothModule extends ReactContextBaseJavaModule {
    private BluetoothAdapter BA;
    public BluetoothDevice bd1;
    public BluetoothSocket bs1;

    private Set<BluetoothDevice> btd1;


    BluetoothModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @NotNull
    @Override
    public String getName() {
        return "BluetoothModule";
    }


    @ReactMethod
    public void checkBluetooth(Callback callback){
        BA = BluetoothAdapter.getDefaultAdapter();

        // String address1 = BA.getAddress();
        Boolean isBluetoothEnabled = BA.isEnabled();

        if(!isBluetoothEnabled){
            Intent i1 = new Intent();
            i1.setAction(Settings.ACTION_BLUETOOTH_SETTINGS);
            startActivity(i1);
            callback.invoke("false", "[]");
        }

        // getting list of bonded/paired devices
        Set <BluetoothDevice> bluetoothDevices = BA.getBondedDevices();

        callback.invoke(String.valueOf(isBluetoothEnabled), String.valueOf(bluetoothDevices));
    }

    @ReactMethod
    public void printReciept(String printer_name, String print_data, Callback callback){

        btd1 = BA.getBondedDevices();  // returned set of paired devices

    
        // attaching bluetooth device to a variable bd1
        for(BluetoothDevice pairedDev: btd1){
            if(pairedDev.getName().equals(printer_name)) {
                bd1 = pairedDev;
                Log.d("BluetoothModule", String.valueOf(pairedDev.getName()) + "Successfully Attached");
            }
        }

        // now connecting to bluetooth device
        UUID uuid = UUID.fromString("00001101-0000-1000-8000-00805f9b34fb");
        try {

            bs1 = bd1.createRfcommSocketToServiceRecord(uuid);
            bs1.connect();

            Log.d("BluetoothModule", printer_name + " is successfully connected to the socket! awesome!");

            OutputStream os1 = bs1.getOutputStream();

            String name1 = "           Purchase Recipet\n";
            name1 += print_data;
            name1 += "\n";
            name1 += "---------------- THANKYOU ------------------";


            os1.write(name1.getBytes());

        } catch (IOException e) {
            e.printStackTrace();
        }


        //        Log.d("BluetoothModule", "isEnabled = " + String.valueOf(b1));
        //        Log.d("BluetoothModule", String.valueOf(address1));
        //        Log.d("BluetoothModule", String.valueOf(btd1));


        // callback to my react-native application
        callback.invoke(String.valueOf(btd1));

    }

}
