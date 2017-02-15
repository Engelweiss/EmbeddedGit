#include <OneWire.h>
#include <DallasTemperature.h>
#include <LiquidCrystal.h>

// Assign to pin 10 of your Arduino to the DS18B20
#define ONE_WIRE_BUS 9

// Create a onewire instanace
OneWire oneWire(ONE_WIRE_BUS);

// Declare a DS18B20 Instance and assing the OneWire reference to it.
DallasTemperature sensors(&oneWire);
 LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

void setup(void)
{
  // Start serial port
  Serial.begin(9600);
  //Start the DallasTemperature Library
    sensors.begin();
    lcd.begin(20,4);
    
}

void loop(void)
{ 
  lcd.setCursor(0, 0);
  sensors.requestTemperatures(); // Tell the DS18B20 to get make a measurement
  lcd.print("Water Temp: ");
  lcd.setCursor(0, 1);
  lcd.print(sensors.getTempFByIndex(0),4);
  lcd.print("F");
  delay(1000); 
}



