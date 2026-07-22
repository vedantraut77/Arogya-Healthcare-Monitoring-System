# 🩺 Arogya - Real-Time E-Healthcare System

> A full-stack IoT-based healthcare monitoring system for real-time patient monitoring, remote healthcare assistance, predictive health analysis, and centralized health data visualization.

![Status](https://img.shields.io/badge/Status-Completed-success)
![React](https://img.shields.io/badge/Frontend-React-61DAFB)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933)
![Firebase](https://img.shields.io/badge/Database-Firebase-FFCA28)
![ESP32](https://img.shields.io/badge/IoT-ESP32-blue)
![Machine Learning](https://img.shields.io/badge/AI-LSTM%20%7C%20Random%20Forest-purple)
![License](https://img.shields.io/badge/License-MIT-green)

---

# 📖 Overview

**Arogya** is a real-time healthcare monitoring system developed as a Final Year Engineering Project.

The system combines **IoT devices**, **cloud computing**, **machine learning**, and a **modern web application** to remotely monitor patient health. Patient vital signs collected through ESP32-based sensors are transmitted to Firebase, where they are securely stored, analyzed through a machine learning service, and visualized on an interactive dashboard for healthcare professionals.

The project demonstrates the integration of **Embedded Systems**, **Cloud Computing**, **Machine Learning**, and **Full-Stack Web Development** within a smart healthcare environment.

---

# ✨ Features

- 🩺 Real-time patient health monitoring
- 📊 Live dashboard with patient vitals
- 👨‍⚕️ Patient management system
- 📈 Health analytics and visualization
- 🚨 Health alert monitoring
- 🤖 AI-assisted health risk prediction
- 📉 Predictive vital sign analysis
- 🔐 Secure user authentication
- ☁️ Firebase cloud integration
- 📡 ESP32 IoT device integration
- 📱 Fully responsive interface

---

# 🏗️ Project Structure

```text
Arogya-Real-Time-E-Healthcare-System
│
├── website/
│   ├── React Application
│   ├── Dashboard
│   ├── Authentication
│   ├── Firebase Integration
│   └── Patient Monitoring
│
├── iot/
│   └── ESP32 Firmware
│
├── docs/
│
└── README.md
```

---

# ⚙️ Technology Stack

## Frontend

- React.js
- React Router
- CSS3
- JavaScript (ES6)

## Backend & Cloud

- Firebase Authentication
- Firebase Realtime Database
- Firestore

## Internet of Things

- ESP32
- MAX30102 Pulse Oximeter
- DS18B20 Temperature Sensor
- Pulse Sensor

## Machine Learning

- LSTM (Time-Series Prediction)
- Random Forest (Risk Classification)

> The Machine Learning module is implemented as an independent prediction service that processes patient data from Firebase and returns prediction results to the healthcare dashboard.

## Development Tools

- Visual Studio Code
- Arduino IDE
- Git
- GitHub

---

# 📡 System Workflow

```text
Patient
    │
    ▼
IoT Sensors
    │
    ▼
ESP32
    │
 Wi-Fi
    │
    ▼
Firebase
    │
    ├────────────► React Dashboard
    │                    │
    │                    ▼
    │              Doctor / Caregiver
    │
    ▼
Machine Learning Service
(LSTM + Random Forest)
    │
    ▼
Prediction Results
    │
    ▼
Firebase
```

---

# 📂 Repository Contents

## 🌐 Website

Contains the complete React-based healthcare dashboard including:

- User Authentication
- Patient Dashboard
- Patient Monitoring
- Analytics
- Firebase Integration

Location

```text
website/
```

---

## 📡 IoT

Contains the ESP32 firmware responsible for collecting patient vitals and sending them to Firebase.

Location

```text
iot/
```

---

## 🤖 Machine Learning

The project architecture integrates an external Machine Learning service responsible for:

- Predicting future patient vital signs using LSTM
- Classifying patient health risk using Random Forest
- Returning prediction results for visualization on the healthcare dashboard

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Arogya-Real-Time-E-Healthcare-System.git
```

## Website

```bash
cd website
npm install
npm run dev
```

---

# 📷 Screenshots

## Home Page

<img width="1895" height="971" alt="Home Page" src="https://github.com/user-attachments/assets/a6eb9a0d-a39c-4c4f-94f2-1357fe6e883f" />

---

# 🔮 Future Improvements

- ECG Integration
- Wearable Device Support
- Mobile Application
- Telemedicine Platform
- Emergency Notification System
- Explainable AI (XAI)
- Digital Twin Healthcare
- Smart Hospital Furniture Integration
- Personalized Healthcare Recommendations

---

# 👨‍💻 Contributors

- **Vedant Raut**
- Jineet Vaishnav
- Trupti Kashid
- Devanshu Ukey

---

# 📄 License

This project is released under the MIT License.

---

# ⭐ Acknowledgements

Developed as the **Final Year Project** for the Bachelor of Engineering (Information Technology) program.

**Sponsored by:** S2R2 Technologies

**Institution:** Marathwada Mitra Mandal's College of Engineering, Pune.