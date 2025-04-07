import React, {useEffect,  useState} from 'react';
import {View, Text, StyleSheet, Button, PermissionsAndroid, Platform, FlatList} from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';
import { useIMU } from '../useIMU';
import { isEmulator } from 'react-native-device-info';
import DeviceIsPhysical from 'react-native-device-info';
import WifiManager from 'react-native-wifi-reborn';

const Manager = new BleManager();

async function getWifiSignalStrength() {
  if(Platform.OS === 'android'){
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission Required',
        message: 'This app needs location permission to access WiFi signal strength.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },);
      if(granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        return null;
      }
  }else{
    const rssi = 'N/A';
    return rssi;
  }
  try {
    const rssi = await WifiManager.getCurrentSignalStrength();
    console.log('WiFi Signal Strength:', rssi);
    return rssi;
  } catch (error) {
    console.error('Error getting WiFi signal strength:', error);
    return null;
  }
}

export default function SensorScreen() {
    const [devices, setDevices] = useState<Device[]>([]);
    //const [accelerometerData, setAccelerometerData] = useState({x: 0, y: 0, z: 0});

    const [accelerometer, setAccelerometer] = useState({ x: 0, y: 0, z: 0 });
    const [gyroscope, setGyroscope] = useState({ x: 0, y: 0, z: 0 });
    const [magnetometer, setMagnetometer] = useState({ x: 0, y: 0, z: 0 });
    const [rssi, setRssi] = useState<number | null>(null);

    useEffect(() => {
      // Check if running on an emulator
      const initializeSensors = async () => {
          const isRunningOnEmulator = await DeviceIsPhysical.isEmulator();
          if (isRunningOnEmulator) {
              console.log("Running on an emulator. Initializing default sensor data.");
              setAccelerometer({ x: 0, y: 0, z: 0 });
              setGyroscope({ x: 0, y: 0, z: 0 });
              setMagnetometer({ x: 0, y: 0, z: 0 });
          } else {
              console.log("Running on a physical device. Initializing real sensor data.");
              const { accelerometer, gyroscope, magnetometer } = useIMU(200);
              setAccelerometer(accelerometer);
              setGyroscope(gyroscope);
              setMagnetometer(magnetometer);
          }
      };

      initializeSensors();
  }, []);

  useEffect( () => {
    const fetchRSSI = async () => {
      const rssi = await getWifiSignalStrength();
      setRssi(rssi);
    };
    fetchRSSI();
  }, []);

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

      <Text style={{ padding: 20}}>Wifi RSSI: {rssi}</Text>
      <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold' }}>Accelerometer</Text>
      <Text>x: {accelerometer.x.toFixed(2)} y: {accelerometer.y.toFixed(2)} z: {accelerometer.z.toFixed(2)}</Text>

      <Text style={{ fontWeight: 'bold' }}>Gyroscope</Text>
      <Text>x: {gyroscope.x.toFixed(2)} y: {gyroscope.y.toFixed(2)} z: {gyroscope.z.toFixed(2)}</Text>

      <Text style={{ fontWeight: 'bold' }}>Magnetometer</Text>
      <Text>x: {magnetometer.x.toFixed(2)} y: {magnetometer.y.toFixed(2)} z: {magnetometer.z.toFixed(2)}</Text>
    </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
    deviceText: { fontSize: 14, marginVertical: 2 },
    sensorText: { fontSize: 16, marginTop: 10 },
  });