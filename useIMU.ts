import { useEffect, useState } from 'react';
import { accelerometer, gyroscope, magnetometer } from 'react-native-sensors';

type SensorSubscription = {
  unsubscribe: () => void;
};

type Vector3 = {
    x: number;
    y: number;
    z: number;
};

type IMUData = {
    accelerometer: Vector3;
    gyroscope: Vector3;
    magnetometer: Vector3;
}

export function useIMU(updateInterval: number = 200): IMUData{
  const [accel, setAccel] = useState<Vector3>({ x: 0, y: 0, z: 0 });
  const [gyro, setGyro] = useState<Vector3>({ x: 0, y: 0, z: 0 });
  const [magneto, setMagneto] = useState<Vector3>({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const accelSub: SensorSubscription = accelerometer.subscribe(setAccel);
    const gyroSub: SensorSubscription = gyroscope.subscribe(setGyro);
    const magnetoSub: SensorSubscription = magnetometer.subscribe(setMagneto);

    return () => {
      accelSub.unsubscribe();
      gyroSub.unsubscribe();
      magnetoSub.unsubscribe();
    };
  }, [updateInterval]);

  return { accelerometer: accel, gyroscope: gyro, magnetometer: magneto };
}