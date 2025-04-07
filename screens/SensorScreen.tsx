import React, {useEffect,  useState} from 'react';
import {View, Text, StyleSheet, Button, PermissionsAndroid, Platform, FlatList} from 'react-native';
import { accelerometer } from 'react-native-sensors';
import { BleManager, Device } from 'react-native-ble-plx';

const Manager = new BleManager();

export default function SensorScreen() {
    const [devices, setDevices] = useState<Device[]>([]);
    const [accelerometerData, setAccelerometerData] = useState({x: 0, y: 0, z: 0});

    useEffect(() => {
        if (Platform.OS === 'android') {
            PermissionsAndroid.requestMultiple([
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
              PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            ]);
        }
    });

    useEffect(() => {
        const subscription = Manager.onStateChange ((state) => {
            if (state === 'PoweredOn') {
                Manager.startDeviceScan(null, null, (error, device) => {
                    if (error) {
                        console.error(error);
                        return;
                    }
                    if(device && device.rssi !== null) {
                        setDevices((prev) => {
                            const exists = prev.find((d) => d.id === device.id);
                            return exists ? prev : [...prev, device];
                        });
                    }
                });
                subscription.remove();
            }
        }, true);
        return () => {
            Manager.stopDeviceScan();
        }
    }, []);
      // Start accelerometer
/*
  useEffect(() => {
    const accel = accelerometer.subscribe(({ x, y, z }) => setAccelerometerData({ x, y, z }));
    return () => accel.unsubscribe();
  }, []);
  */

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nearby BLE Devices</Text>
    <FlatList
      data={devices}
      keyExtractor={(item: Device) => item.id}
      renderItem={({ item }: { item: Device }) => (
          <Text style={styles.deviceText}>{item.name || 'Unknown'} | RSSI: {item.rssi}</Text>
        )}
      />

      <Text style={styles.title}>Accelerometer</Text>
      <Text style={styles.sensorText}>
        x: {accelerometerData.x.toFixed(2)} y: {accelerometerData.y.toFixed(2)} z: {accelerometerData.z.toFixed(2)}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
    deviceText: { fontSize: 14, marginVertical: 2 },
    sensorText: { fontSize: 16, marginTop: 10 },
  });