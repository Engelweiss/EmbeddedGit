// Function to control heater and filter
var heaterOn = false;
var filterOn = false;
var heaterRefreshTime = 0;
function buttonClick(clicked_id){
	var xmlHttp = new XMLHttpRequest();

    if (clicked_id == "1"){
    xmlHttp.open("GET", 'http://reyunionsvrg.local/arduino/digital/10/1', false); // true for asynchronous 
    xmlHttp.send(null);
	updateHeaterInfo();
    } 

    if (clicked_id == "2"){
        $.get( "curl.php", {
        pin: "7", state: "0"} ); 
	xmlHttp.open("GET", 'http://reyunionsvrg.local/arduino/digital/10/0', false); // true for asynchronous 
    xmlHttp.send(null);
    updateHeaterInfo();
    } 

    if (clicked_id == "3"){
        $.get( "curl.php", {
        pin: "10", state: "1"} );  
    xmlHttp.open("GET", 'http://reyunionsvrg.local/arduino/digital/7/1', false); // true for asynchronous 
    xmlHttp.send(null);
    updateFilterInfo()
    } 

    if (clicked_id == "4"){
        $.get( "curl.php", {
        pin: "10", state: "0"} ); 
    xmlHttp.open("GET", 'http://reyunionsvrg.local/arduino/digital/7/0', false); // true for asynchronous 
    xmlHttp.send(null);	
    updateFilterInfo()	
    } 

}

function updateHeaterInfo(){
	console.log('updateHeaterInfo called');
	var xmlHttp2 = new XMLHttpRequest();
	xmlHttp2.onreadystatechange = function() { 
    if (xmlHttp2.readyState == 4 && xmlHttp2.status == 200)
       document.getElementById('Heater Info').innerHTML = xmlHttp2.response;
    if (xmlHttp2.readyState == 4 && xmlHttp2.status == 500)
       setTimeout(updateHeaterInfo,1000);
   
	response = xmlHttp2.response;
	
	if(response.localeCompare('On') == 1)
	{
		console.log('Heater was turned on.');
		if(heaterOn == false)
		{
			heaterOn = true;
			createHeaterTime();
		}
	}
	else if(response.localeCompare('Off') == 1)
	{
		console.log('Heater was turned off.');
		heaterOn = false;
		resetHeaterTime();
	}
	else{
		console.log('Undefined response');
		console.log(response);
		console.log(response.localeCompare('Off'));
		console.log(response.localeCompare('On'));
	}
    }
	
    xmlHttp2.open("GET", 'http://reyunionsvrg.local/arduino/heater/stuff', true); // true for asynchronous 
    xmlHttp2.send(null);
}

function updateFilterInfo(){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        document.getElementById('Filter Info').innerHTML = xmlHttp.response;
    if (xmlHttp.readyState == 4 && xmlHttp.status == 500)
        setTimeout(updateFilterInfo,1000);
    }
    xmlHttp.open("GET", 'http://reyunionsvrg.local/arduino/filter/stuff', true); // true for asynchronous 
    xmlHttp.send(null);
}

function updateAirTempInfo(){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        document.getElementById('Air Temp').innerHTML = xmlHttp.response;
    if (xmlHttp.readyState == 4 && xmlHttp.status == 500)
        setTimeout(updateAirTempInfo,1000);
    }
    xmlHttp.open("GET", 'http://reyunionsvrg.local/arduino/air_temperature/stuff', true); // true for asynchronous 
    xmlHttp.send(null);
	
}

function updateWaterTempInfo(){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) 
        document.getElementById('Water Temp').innerHTML = xmlHttp.response;
    if (xmlHttp.readyState == 4 && xmlHttp.status == 500)
        setTimeout(updateWaterTempInfo,1000);
    }
    xmlHttp.open("GET", 'http://reyunionsvrg.local/arduino/water_temperature/stuff', true); // true for asynchronous 
    xmlHttp.send(null);
}

function updateWaterLevelInfo(){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        document.getElementById('Water Level').innerHTML = xmlHttp.response;
    if (xmlHttp.readyState == 4 && xmlHttp.status == 500)
        setTimeout(updateFilterInfo,1000);
    }
    xmlHttp.open("GET", 'http://reyunionsvrg.local/arduino/water_level/stuff', true); // true for asynchronous 
    xmlHttp.send(null);
}

function updateClock() {
    var now = new Date(), // current date
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
					'August', 'September', 'October', 'November', 'December']; 
		hours = new String(now.getHours());
		minutes = new String(now.getMinutes());
		seconds = new String(now.getSeconds());
		zero = new String("0");
		var ampm = new String(" AM");
		if(hours.length == 1)
		{
			hours=zero.concat(hours);
		}
		else if(parseInt(hours, 10)>12)
		{
			var hourInt = parseInt(hours, 10);
			hourInt = hourInt - 12;
			hours = hourInt;
			ampm = " PM";
		}

		if(minutes.length == 1)
		{
			minutes=zero.concat(minutes);
		}
		if(seconds.length == 1)
		{
			seconds=zero.concat(seconds);
		}
		time = hours + ':' + minutes + ':' + seconds + ampm;

        date = [now.getDate(), 
                months[now.getMonth()],
                now.getFullYear()].join(' ');

    // set the content of the element with the ID time to the formatted string
    document.getElementById('time').innerHTML = [date, time].join(' / ');

    // call this function again in 1000ms
    setTimeout(updateClock, 1000);
}

function createHeaterTime() {
	console.log('heater time created');
	document.getElementById('Heater-time').innerHTML ='for 0 days 0 hours 0 minutes' ;
	updateHeaterTime(new Date());
}

function updateHeaterTime(heaterStart){
	var now = new Date();
	time1 = heaterStart.getTime();
	time2 = now.getTime();
	timeElapsed = time2 - time1;
	var x =timeElapsed;
	days = x % 86400000;
	x = x - days*86400000;
	hours = x % 1440000;
	x = x - hours*1440000;
	minutes = x % 60000;
	
	outputString = new String('for ' + days + ' days ' + hours + ' hours ' + minutes + ' minutes ');
	document.getElementById('Heater-time').innerHTML = outputString;
	if(heaterOn && heaterRefreshTime>10)
	{
		setTimeout(updateHeaterTime(heaterStart), 1000);
		heaterRefreshTime = 0;
	}
	else
	{
		heaterRefreshTime++;
	}
	
}

function resetHeaterTime(){
	document.getElementById('Heater-time').innerHTML = '';
}

