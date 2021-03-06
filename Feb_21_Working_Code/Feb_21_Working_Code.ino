#include <LiquidCrystal.h>
#include <Process.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <LiquidCrystal.h>
#include <stdlib.h>
#include <math.h>
#include <Stdio.h>
#include <Arduino.h>
#include <ds1620.h>

#define ONE_WIRE_BUS 9

LiquidCrystal lcd(12,11,5,4,3,2);
int heatSwitchPin = 6;
int heatVal;
int filterVal;
int relayPin = 7;
int filterSwitchPin = 8;
int filterRelayPin = 10;

// Create a onewire instanace
OneWire oneWire(ONE_WIRE_BUS);

DallasTemperature sensors(&oneWire);

Process date;
int lastSecond = -1;

//Ds1620 setup
Ds1620 ds1620 = Ds1620(A0/*rst*/,A1/*clk*/,A2/*dq*/);

void setup() {
  // setup code
  pinMode(relayPin, OUTPUT);
  pinMode(filterRelayPin, OUTPUT);
  lcd.begin(20,4);
  pinMode(heatSwitchPin, INPUT_PULLUP);
  pinMode(filterSwitchPin, INPUT_PULLUP);

  Bridge.begin();
  if (!date.running()) {
    date.begin("date");
    date.addParameter("+TIME: %T");
    date.run();
  }

  sensors.begin();

  ds1620.config();
}

// Loop through our 5 component modules
void loop() {
  // Heater module
  heatVal = digitalRead(heatSwitchPin);
  lcd.setCursor(0,2);
  if(heatVal) {
    lcd.print("H:ON  ");
    digitalWrite(relayPin, HIGH);
  }
  else {
    lcd.print("H:OFF ");
    digitalWrite(relayPin, LOW);
  }

  // Filter module
  filterVal = digitalRead(filterSwitchPin);
  if(filterVal) {
    lcd.print("F:ON ");
    digitalWrite(filterRelayPin, HIGH);
  }
  else {
    lcd.print("F:OFF");
    digitalWrite(filterRelayPin, LOW);
  }

  // Date module
  while (date.available() > 0) {
    // get the result of the date process (should be hh:mm:ss):
    String timeString = date.readString();
    lcd.setCursor(0,1);
    lcd.print(timeString);
  }
  delay(100);
  if (!date.running()) {
    date.begin("date");
    date.addParameter("+TIME: %T");
    date.run();
  }

  // DS18B20 temperature module
  sensors.requestTemperatures(); // Tell the DS18B20 to get make a measurement
  lcd.setCursor(0,3);
  lcd.print("Temp: ");
  lcd.print(sensors.getTempFByIndex(0),1);
  lcd.print("F");



  //DS1620 temerature module
  ds1620.start_conv();
  int raw_data = ds1620.read_data();
  ds1620.stop_conv();
  float temp = raw_data / 2.0; 
  lcd.setCursor(0,0);
  lcd.print("DS1620: ");
  lcd.print(temp);
  lcd.print("C");

  delay(100);
}
