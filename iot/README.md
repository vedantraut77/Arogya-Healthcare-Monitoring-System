# 📡 IoT Firmware - Arogya Healthcare Monitoring System

This folder contains the ESP32 firmware used in the **Arogya Healthcare Monitoring System**.

The firmware is responsible for collecting real-time patient vital signs from connected sensors and transmitting the data wirelessly to the cloud database, where it is displayed on the web dashboard.

---

# 🏥 Overview

The IoT module continuously monitors a patient's health using multiple biomedical sensors connected to an **ESP32** microcontroller.

The collected sensor readings are processed and sent to **Firebase Realtime Database** over Wi-Fi, allowing doctors and caregivers to remotely monitor patient health in real time.

---

# ✨ Features

- 🌡️ Real-time body temperature monitoring
- ❤️ Heart rate monitoring
- 🩸 Blood oxygen (SpO₂) monitoring
- 📡 Wi-Fi connectivity using ESP32
- ☁️ Firebase Realtime Database integration
- ⚡ Continuous live data transmission
- 🚨 Designed for remote healthcare monitoring

---

# 🔧 Hardware Components

| Component | Purpose |
|-----------|---------|
| ESP32 DevKit | Main microcontroller |
| MAX30102 | Heart Rate & SpO₂ Sensor |
| Pulse Sensor | Pulse Detection |
| DS18B20 Temperature Sensor | Body Temperature |
| PCB | Circuit Prototyping |
| Jumper Wires, resistor | Connections|
| USB Cable | Programming & Power |

---

# 🔌 System Architecture

```
Patient
   │
   ▼
Biomedical Sensors
   │
   ▼
ESP32
   │
 Wi-Fi
   │
   ▼
Firebase Realtime Database
   │
   ▼
React Web Dashboard
```

---

# 📁 Files

```
iot/
│
├── smart_health_monitoring_system_IoT_code.ino
└── README.md
```

---

# 🚀 Uploading Firmware

1. Install **Arduino IDE**
2. Install **ESP32 Board Package**
3. Install required libraries
4. Open

```
smart_health_monitoring_system_IoT_code.ino
```

5. Select

```
Board:
ESP32 Dev Module
```

6. Select the correct COM Port

7. Upload the firmware.

---

# 📚 Required Libraries

Install the following libraries from the Arduino Library Manager.

- WiFi
- Firebase ESP Client
- OneWire
- DallasTemperature
- Wire
- MAX30100 / MAX30102 Library

---

# 📷 Hardware Setup

<img width="554" height="554" alt="iot_hardware" src="https://github.com/user-attachments/assets/b039aeb3-5929-4acd-b314-88b3d78d9ff1" />

---

# 📶 Data Flow

```
Sensors
   │
Read Sensor Values
   │
ESP32
   │
Connect to Wi-Fi
   │
Upload to Firebase
   │
Realtime Database
   │
Website Dashboard
```

---

# ⚠️ Notes

- Replace the Wi-Fi credentials with your own before uploading.
- Configure your Firebase project correctly.
- Ensure all sensors are properly connected before powering the ESP32.

---

# 🔮 Future Improvements

- ECG Sensor Integration
- GPS Tracking
- GSM Module
- Fall Detection
- Battery Monitoring
- Edge AI for anomaly detection
- OTA Firmware Updates

---

# 👨‍💻 Author

**Vedant Raut**

Bachelor of Engineering (Information Technology)

Marathwada Mitra Mandal's College of Engineering, Pune

---
