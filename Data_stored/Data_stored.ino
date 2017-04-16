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
#include <Bridge.h>
#include <BridgeServer.h>
#include <BridgeClient.h>
#include <FileIO.h>
#include <TimeLib.h>

#define ONE_WIRE_BUS 6
#define pHSensorPin 3
#define Offset 0.00
#define ArrayLength 10



// Listen to the default port 5555, the Yún webserver
// will forward there all the HTTP requests you send
BridgeServer server;
int numAutoSettings = 0;
int i;
int pHArray[ArrayLength];
int pHArrayIndex=0;
LiquidCrystal lcd(12,11,5,4,3,2);

int heatVal;
int filterVal;
int filterRelayPin = 7;
int filterSwitchPin = 8;
int heaterRelayPin = 10;
int waterTemp=0;
int airTemp=0;
String heaterStartTime="notSet";
String filterStartTime="notSet";
String autoData="notSet";
int autoTime= 0;
int autoEndTime = 0;
int programTime = 0;
float heaterLimit = 80;

// Create a onewire instanace
OneWire oneWire(ONE_WIRE_BUS);

DallasTemperature sensors(&oneWire);

Process date;
int lastSecond = -1;

//Ds1620 setup
Ds1620 ds1620 = Ds1620(A0/*rst*/,A1/*clk*/,A2/*dq*/);

void setup() {

  setupInterrupts();
  // setup code
  pinMode(heaterRelayPin, OUTPUT);
  pinMode(filterRelayPin, OUTPUT);
  lcd.begin(20,4);

  Bridge.begin();
  if (!date.running()) {
    date.begin("date");
    date.addParameter("+TIME: %T");
    date.run();
  }

  sensors.begin();

  ds1620.config();

    server.listenOnLocalhost();
    server.begin();

}

void loop() {
  BridgeClient client = server.accept();
  // There is a new client?
  if (client) {
    // Process request
    process(client);

    // Close connection and free resources.
    client.stop();
  }

  lcd.setCursor(0,2);

  // DS18B20 temperature module
  sensors.requestTemperatures(); // Tell the DS18B20 to get make a measurement
  waterTemp = (int)sensors.getTempFByIndex(0);

  //DS1620 temerature module
  ds1620.start_conv();
  int raw_data = ds1620.read_data();
  ds1620.stop_conv();
  float temp = raw_data / 2.0; 
  airTemp = (int)((9*temp)/5) + 32;


}



void process(BridgeClient client) {
  // read the command
  String command = client.readStringUntil('/');
  //client.print(command);

  // is "digital" command?
  if (command == "digital") {
    digitalCommand(client);
  }

  else if (command == "filter") {
    if(digitalRead(filterRelayPin))
      client.print(F("On"));
    else
      client.print(F("Off"));
  }

  else if (command == "heater") {
  if(digitalRead(heaterRelayPin))
    client.println(F("On"));
  else
    client.println(F("Off"));
  }

  else if (command == "air_temperature") {
    client.println(airTemp);
  }

  else if (command == "water_temperature") {
    client.println(waterTemp);
  }

  else if(command == "water_level") {
  if(digitalRead(A5)==HIGH)
  {
    client.println("Low   ");
  }
  else if(digitalRead(A4)==HIGH)   
  {
    client.println("Medium");
  }
  else
  {
    client.println("High  ");
  }
}

  else if(command == "pH_level") {

    getPHData(client);
  }

  else if(command == "storeHeaterTime"){
    storeHeaterTime(client);
  }

  else if(command == "storeFilterTime"){
    storeFilterTime(client);
  }

  else if(command == "getHeaterTime"){
    retrieveHeaterTime(client);
  }

  else if(command == "heaterStatusTime"){
    retrieveHeaterStatusTime(client);
  }

  else if(command == "getFilterTime"){
    retrieveFilterTime(client);
  }

  else if(command == "filterStatusTime"){
    retrieveFilterStatusTime(client);
  }

  else if(command == "setAutoSetting"){
    client.println("setting setting");
    setAutomation(client);
  }

  else if(command == "check_auto_setting"){
    checkAutomation(client);
  }
  else
  {
    client.print(command);
  }

}

void digitalCommand(BridgeClient client) {
  int pin, value;

  // Read pin number
  pin = client.parseInt();

  // If the next character is a '/' it means we have an URL
  // with a value like: "/digital/13/1"
  if (client.read() == '/') {
    value = client.parseInt();
    digitalWrite(pin, value);
  } else {
    value = digitalRead(pin);
  }

  // Send feedback to client
  if(pin == heaterRelayPin)
  {
  if(digitalRead(heaterRelayPin))
    client.println(F("On"));
  else
    client.println(F("Off"));
  
  }
  else if(pin == filterRelayPin)
  {
    if(digitalRead(filterRelayPin))
    client.println(F("On"));
  else
    client.println(F("Off"));
  }
  
}

void storeHeaterTime(BridgeClient client) {
  //client.readStringUntil('/');
  heaterStartTime = client.readStringUntil('/');
  
}

void storeFilterTime(BridgeClient client) {
  //client.readStringUntil('/');
  filterStartTime = client.readStringUntil('/');
  
}

void retrieveHeaterTime(BridgeClient client) {

      client.print(heaterStartTime);
 
}

void retrieveHeaterStatusTime(BridgeClient client) {
    if(digitalRead(heaterRelayPin))
    client.println(F("On "));
  else
    client.println(F("Off "));
  
      client.print(heaterStartTime);
 
}

void retrieveFilterTime(BridgeClient client) {
      client.print(filterStartTime);
}

void retrieveFilterStatusTime(BridgeClient client) {
    if(digitalRead(heaterRelayPin))
    client.println(F("On "));
  else
    client.println(F("Off "));
  
      client.print(filterStartTime);
}

void setAutomation(BridgeClient client) {
  autoData =  client.readStringUntil('/');
  autoTime = client.parseInt() * 60;
  
  if(autoData == "heater")
  {
    digitalWrite(heaterRelayPin, 1);
  }
  else if(autoData == "filter")
  {
    digitalWrite(filterRelayPin, 1);
  }

  autoEndTime = programTime + autoTime;
  
}

void checkAutomation(BridgeClient client) {
  client.println(autoData + " " + autoTime);
}

void getPHData(BridgeClient client) {
  // loop code
  static float pHValue,voltage;
 delay(500);
  for(i=0;i<ArrayLength;i++)
  {
    pHArray[i]=analogRead(pHSensorPin);
    delay(10);
  }
  voltage = averageArray(pHArray)*5.0/1024;
  pHValue = 3.5*voltage+Offset;
  client.print(pHValue);
}


double averageArray(int* arr){
  int j;
  double avg;
  long amount=0;
  for(j=0;j<ArrayLength;j++){
     amount+=arr[j];
  }
  avg = amount/ArrayLength;
  return avg;
}

void setupInterrupts(){

  cli();             // disable global interrupts
  TCCR1A = 0;        // set entire TCCR1A register to 0
  TCCR1B = 0x04;

  TCCR1C = 0; // not forcing output compare
  TCNT1 = 0; // set timer counter initial value (16 bit vaue)
  
   // Interrupts on overflow (every 1 second)
   OCR1A = 0xF440; 

   TIMSK1 = 2;
    // enable global interrupts:
    sei();
}

ISR(TIMER1_COMPA_vect)
{
   programTime++;
   if(waterTemp>=heaterLimit){
      int heaterOff = 0;
      if(digitalRead(heaterRelayPin) == 1){
        digitalWrite(heaterRelayPin, 0);
      }
      else{
        heaterOff = 1;
      }

      if(heaterOff == 0){
        // Make a new heater time variable
      }
   }
   if(programTime == autoEndTime){
    if(autoData == "heater")
    {
      digitalWrite(heaterRelayPin, 0);
    }
    else if(autoData == "filter")
    {
      digitalWrite(filterRelayPin, 0);
    }
   }

}


