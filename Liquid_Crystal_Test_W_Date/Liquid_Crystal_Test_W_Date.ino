#include <LiquidCrystal.h>
#include <Process.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <LiquidCrystal.h>

#define ONE_WIRE_BUS 9

LiquidCrystal lcd(12,11,5,4,3,2);
int heatSwitchPin = 6;
int heatVal;
int relayPin = 7;

// Create a onewire instanace
OneWire oneWire(ONE_WIRE_BUS);

DallasTemperature sensors(&oneWire);

Process date;
int lastSecond = -1;

void setup() {
  // setup code
  pinMode(relayPin, OUTPUT);
  lcd.begin(20,4);
  lcd.print("Pool Controller:");
  pinMode(heatSwitchPin, INPUT_PULLUP);

  Bridge.begin();
  if (!date.running()) {
    date.begin("date");
    date.addParameter("+TIME: %T");
    date.run();
  }

  sensors.begin();
}

void loop() {
  // loop code
  heatVal = digitalRead(heatSwitchPin);
  lcd.setCursor(0,2);
  if(heatVal) {
    lcd.print("Heater: ON ");
    digitalWrite(relayPin, HIGH);
  }
  else {
    lcd.print("Heater: OFF");
    digitalWrite(relayPin, LOW);
  }
 
  while (date.available() > 0) {
    // get the result of the date process (should be hh:mm:ss):
    String timeString = date.readString();
    lcd.setCursor(0,1);
    lcd.print(timeString);
  }

    // Temperature stuff
    sensors.requestTemperatures(); // Tell the DS18B20 to get make a measurement
    lcd.setCursor(0,3);
    lcd.print("Temp: ");
    lcd.print(sensors.getTempFByIndex(0),1);
    lcd.print("F");

  if (!date.running()) {
    date.begin("date");
    date.addParameter("+TIME: %T");
    date.run();
  }

  delay(200);
}
