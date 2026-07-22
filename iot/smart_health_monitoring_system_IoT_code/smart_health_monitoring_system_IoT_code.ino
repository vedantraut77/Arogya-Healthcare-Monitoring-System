#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include "MAX30105.h"
#include "spo2_algorithm.h"
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

// WiFi & Firebase Configuration
#define WIFI_SSID "Peace"
#define WIFI_PASSWORD "peace123"
#define API_KEY "AIzaSyDKDyiwFr65Syt4eNlKAX2esc_f3KSWyEk"
#define DATABASE_URL "https://arogya-real-time-e-healthcare-default-rtdb.asia-southeast1.firebasedatabase.app/"
#define DATABASE_SECRET "opkxUMKj3VRxQydUlBJCAYDYTJWxfsS6rHOVKADl"

// LCD
LiquidCrystal_I2C lcd(0x27, 16, 2);  // Change to 0x3F if your LCD uses a different address

// Hardware Pins
#define ONE_WIRE_BUS 4
#define I2C_SDA 21
#define I2C_SCL 22

// Timing
#define BUFFER_SIZE 100
#define FIREBASE_UPDATE_INTERVAL 5000

// Mutexes
SemaphoreHandle_t i2cMutex;
SemaphoreHandle_t dataMutex;

// Sensors
MAX30105 particleSensor;
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature tempSensor(&oneWire);
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

// Data Structure
struct SensorData {
  float temperature;
  int32_t heartRate;
  int32_t spo2;
  long irValue;
  unsigned long timestamp;
} sensorData;

uint32_t irBuffer[BUFFER_SIZE];
uint32_t redBuffer[BUFFER_SIZE];

void setupWiFi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi connected");
}

void setupFirebase() {
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  config.signer.tokens.legacy_token = DATABASE_SECRET;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void setupLCD() {
  lcd.begin();        // IMPORTANT: use begin(), NOT init()
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Health Monitor");
  lcd.setCursor(0, 1);
  lcd.print("Initializing...");
}

void setupSensors() {
  Wire.begin(I2C_SDA, I2C_SCL);
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) {
    Serial.println("MAX30102 not found");
    while (1);
  }
  particleSensor.setup();
  particleSensor.setPulseAmplitudeRed(0x1F);
  particleSensor.setPulseAmplitudeGreen(0);
  tempSensor.begin();
}

void readSpO2() {
  if (xSemaphoreTake(i2cMutex, portMAX_DELAY)) {
    for (int i = 0; i < BUFFER_SIZE; i++) {
      irBuffer[i] = particleSensor.getIR();
      redBuffer[i] = particleSensor.getRed();
      delay(1);
    }
    int32_t spo2, heartRate;
    maxim_heart_rate_and_oxygen_saturation(irBuffer, BUFFER_SIZE, redBuffer,
                                           &spo2, nullptr, &heartRate, nullptr);
    sensorData.spo2 = spo2;
    sensorData.heartRate = heartRate;
    xSemaphoreGive(i2cMutex);
  }
}

void readTemperature() {
  if (xSemaphoreTake(dataMutex, portMAX_DELAY)) {
    tempSensor.requestTemperatures();
    sensorData.temperature = tempSensor.getTempCByIndex(0);
    xSemaphoreGive(dataMutex);
  }
}

void sendToFirebase() {
  if (Firebase.ready()) {
    FirebaseJson json;
    json.add("temp", sensorData.temperature);
    json.add("heartRate", sensorData.heartRate);
    json.add("SpO2", sensorData.spo2);
    json.add("timestamp", millis());
    Firebase.RTDB.setJSON(&fbdo, "/SensorData", &json);
  }
}

void updateLCD() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("HR:");
  lcd.print(sensorData.heartRate);
  lcd.print(" SpO2:");
  lcd.print(sensorData.spo2);
  lcd.setCursor(0, 1);
  lcd.print("Temp:");
  lcd.print(sensorData.temperature, 1);
  lcd.print((char)223); // Degree symbol
  lcd.print("C");
}

void checkWiFi() {
  if (WiFi.status() != WL_CONNECTED) {
    WiFi.disconnect();
    WiFi.reconnect();
  }
}

void setup() {
  Serial.begin(115200);
  i2cMutex = xSemaphoreCreateMutex();
  dataMutex = xSemaphoreCreateMutex();
  setupWiFi();
  setupFirebase();
  setupSensors();
  setupLCD();
}

void loop() {
  static unsigned long lastUpdate = 0;
  unsigned long currentMillis = millis();

  if (currentMillis - lastUpdate >= FIREBASE_UPDATE_INTERVAL) {
    readSpO2();
    readTemperature();
    sendToFirebase();
    updateLCD();
    lastUpdate = currentMillis;
  }

  checkWiFi();
  delay(100);
}
