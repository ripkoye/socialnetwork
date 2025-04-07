This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

# Indoor Positioning MVP (React Native)

This app scans for nearby BLE devices and displays RSSI + sensor data (accelerometer). Built using React Native CLI with TypeScript.

---

## 🚀 Getting Started (from bootup)

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies
```bash
npm install
```

### 3. Install iOS native modules (CocoaPods)
```bash
cd ios
pod install
cd ..
```

### 4. Start the Metro bundler
```bash
npx react-native start
```

### 5. In a separate terminal, run the app on iOS
```bash
npx react-native run-ios
```

> ⚠️ If you want to scan real BLE devices or read sensor data (like accelerometer), run the app on a **real iOS device** — the iOS Simulator does **not support Bluetooth or sensors**.

---

## 📦 BLE + Sensor Libraries Used

- [`react-native-ble-plx`](https://github.com/dotintent/react-native-ble-plx) – BLE scanning
- [`react-native-sensors`](https://github.com/react-native-sensors/react-native-sensors) – Accelerometer

---

## 📱 Permissions (iOS)

In `ios/YourAppName/Info.plist`, make sure these are set:

```xml
<key>NSBluetoothAlwaysUsageDescription</key>
<string>Bluetooth is used to scan nearby devices.</string>
<key>NSBluetoothPeripheralUsageDescription</key>
<string>Needed for BLE.</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>Used to access BLE device locations.</string>
```

---

## 🧠 Common Dev Commands

```bash
# Check git status
git status

# Stage & commit changes
git add .
git commit -m "Commit message"
git push
```

---

## 📄 File Structure (MVP)
```
/src
  └── screens/
        └── SensorScreen.tsx   # BLE + RSSI display
App.tsx                        # Entry point
ios/                           # iOS native code
```

---

## ✅ Ready to Scan?

Just run:
```bash
npx react-native run-ios --device
```

And you're scanning BLE devices + accelerometer from the jump.
