#include <LiquidCrystal.h>
#include <Process.h>

LiquidCrystal lcd(12,11,5,4,3,2);
int heatSwitchPin = 6;
int filterSwitchPin = 7;
int heatVal;

Process date;
int lastSecond = -1;

void setup() {
  // setup code
  lcd.begin(20,4);
  lcd.print("Pool Controller:");
  pinMode(heatSwitchPin, INPUT_PULLUP);
  pinMode(filterSwitchPin, INPUT_PULLUP);

  Bridge.begin();
  if (!date.running()) {
    date.begin("date");
    date.addParameter("+TIME: %T");
    date.run();
  }
}

void loop() {
  // loop code
  heatVal = digitalRead(heatSwitchPin);
  lcd.setCursor(0,2);
  if(heatVal) {
    lcd.print("Heater: ON ");
    digitalWrite(13, HIGH);
  }
  else {
    lcd.print("Heater: OFF");
    digitalWrite(13, LOW);
  }
 
  while (date.available() > 0) {
    // get the result of the date process (should be hh:mm:ss):
    String timeString = date.readString();
    lcd.setCursor(0,1);
    lcd.print(timeString);
  }

  if (!date.running()) {
    date.begin("date");
    date.addParameter("+TIME: %T");
    date.run();
  }

  delay(200);
}
