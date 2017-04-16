// Function to control heater and filter
var heaterOn = false;
var filterOn = false;
var heaterStartTime = 'begin';
var filterStartTime = 'begin';
var heaterTimeMade = false;
var filterTimeMade = false;
var heaterInt;
var filterInt;
var autoInt;
var airTempInt;
var waterTempInt;
var waterLevelInt;
var phInt;
var onOffAutoPref = '2';
var heaterFilterAutoPref = '0';
var dayAutoPref = '9';
var hrAutoPref = '12';
var minAutoPref = '0';
var amPmAutoPref = '0';

window.onload = function(){
	console.log('Starting up!');
	airTempInt = setInterval(updateAirTempInfo, 30000);
	waterTempInt = setInterval(updateWaterTempInfo, 30000);
	waterLevelInt = setInterval(updateWaterLevelInfo, 30000);
	pHInt = setInterval(updatepHInfo, 30000);
	initializeHeater();
	initializeFilter();
	heaterInt = setInterval(updateHeaterInfo, 30000);
	filterInt = setInterval(updateFilterInfo, 30000);
	
}

function initializeHeater(){
	console.log('initialize heater');
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", 'http://reyunionsvrg.local/arduino/heater/shr', false);
	xmlHttp.send(null);
	xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
		document.getElementById('Heater Info').innerHTML = xmlHttp.response;
	}
    if (xmlHttp.readyState == 4 && xmlHttp.status == 500)
       setTimeout(initializeHeater,1000);
    }
	console.log(xmlHttp.response);
	document.getElementById('Heater Info').innerHTML = xmlHttp.response;
	if(xmlHttp.response.localeCompare('On') == 1)
	{
		console.log('Heater was turned on.');
		heaterOn = true;
	}
	else if(xmlHttp.response.localeCompare('Off') == 1){
		console.log('Heater was turned off.');
		heaterOn = false;
	}
	else{
		 setTimeout(initializeHeater,1000);
	}
	
	var xmlHttp2 = new XMLHttpRequest();
	xmlHttp2.open("GET", 'http://reyunionsvrg.local/arduino/getHeaterTime/shr', false);
	xmlHttp2.send(null);
	
	xmlHttp2.onreadystatechange = function() { 
    if (xmlHttp2.readyState == 4 && xmlHttp2.status == 200){
	}      
    if (xmlHttp2.readyState == 4 && xmlHttp2.status == 500)
        setTimeout(initializeHeater,1000);
	}
	console.log(xmlHttp2.response);
	
	if(xmlHttp2.response == "notSet"){
		if(!heaterTimeMade){
			createHeaterTime();
		}
	}
	else if(xmlHttp2.response.length > 0){
		var heaterString = (xmlHttp2.response);
		var heaterTime = parseInt(heaterString);
		console.log(heaterString);
		console.log(heaterTime);
		heaterStartTime = new Date(heaterTime);
		heaterInt = setInterval(updateHeaterTime, 10000);
		return;
	}
	else{
		if(!heaterTimeMade){
			createHeaterTime();
		}
	}
			
}

function initializeFilter(){
	console.log('initialize filter');
	var xmlHttp2 = new XMLHttpRequest();
	xmlHttp2.open("GET", 'http://reyunionsvrg.local/arduino/filter/shr', false);
	xmlHttp2.send(null);
	xmlHttp2.onreadystatechange = function() { 
    if (xmlHttp2.readyState == 4 && xmlHttp2.status == 200){
		document.getElementById('Filter Info').innerHTML = xmlHttp2.response;
	}
    if (xmlHttp2.readyState == 4 && xmlHttp2.status == 500)
       setTimeout(initializeFilter,1000);
    }
	console.log(xmlHttp2.response);
	document.getElementById('Filter Info').innerHTML = xmlHttp2.response;
	if(xmlHttp2.response.localeCompare('On')==0)
	{
		console.log('Filter was turned on.');
		filterOn = true;
		
	}
	else if(xmlHttp2.response.localeCompare('Off')==0)
	{
		console.log('Filter was turned off.');
		filterOn = false;
	}
	else{
		setTimeout(initializeFilter,1000);
	}
	
	var xmlHttp3 = new XMLHttpRequest();
	xmlHttp3.open("GET", 'http://reyunionsvrg.local/arduino/getFilterTime/shr', false);
	xmlHttp3.send(null);
	
	xmlHttp3.onreadystatechange = function() { 
    if (xmlHttp3.readyState == 4 && xmlHttp3.status == 200){
	}      
    if (xmlHttp3.readyState == 4 && xmlHttp3.status == 500)
        setTimeout(initializeFilter,1000);
	}
	console.log(xmlHttp3.response);
	if(xmlHttp3.response == "notSet"){
		if(!filterTimeMade){
			createFilterTime();
		}
	}
	else if(xmlHttp3.response.length > 0){
		var filterString = (xmlHttp3.response);
		var filterTime = parseInt(filterString);
		console.log(filterString);
		console.log(filterTime);
		filterStartTime = new Date(filterTime);
		filterInt = setInterval(updateFilterTime, 10000);
		return;
	}
	else{
		if(!filterTimeMade){
			createFilterTime();
		}
	}
	
}

function buttonClick(clicked_id){
	console.log('Button clicked');	
	var xmlHttp = new XMLHttpRequest();

    if (clicked_id == "1"){
		document.getElementById('Heater Info').innerHTML = "On";
    xmlHttp.open("GET", 'http://reyunionsvrg.local/arduino/digital/10/1', true); // true for asynchronous 
    xmlHttp.send(null);
	//updateHeaterInfo();
	xmlHttp.onreadystatechange = function() { 
	
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
       document.getElementById('Heater Info').innerHTML = xmlHttp.response;
    if (xmlHttp.readyState == 4 && xmlHttp.status == 500)
       setTimeout(updateHeaterInfo,1000);
   
	response = xmlHttp.response;
	

		if(response.localeCompare('On') == 1)
		{
			document.getElementById('Heater Info').innerHTML = "On";
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
    } 

    else if (clicked_id == "2"){
		document.getElementById('Heater Info').innerHTML = "Off";
	xmlHttp.open("GET", 'http://reyunionsvrg.local/arduino/digital/10/0', true); // true for asynchronous 
    xmlHttp.send(null);
	xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
       document.getElementById('Heater Info').innerHTML = xmlHttp.response;
    if (xmlHttp.readyState == 4 && xmlHttp.status == 500)
       setTimeout(updateHeaterInfo,1000);
   
	response = xmlHttp.response;
	

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

    } 

    else if (clicked_id == "3"){
		document.getElementById('Filter Info').innerHTML = "On";
    xmlHttp.open("GET", 'http://reyunionsvrg.local/arduino/digital/7/1', true); // true for asynchronous 
    xmlHttp.send(null);
	
	xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        document.getElementById('Filter Info').innerHTML = xmlHttp.response;
    if (xmlHttp.readyState == 4 && xmlHttp.status == 500)
        setTimeout(updateFilterInfo,1000);
	
	response = xmlHttp.response;
	console.log(response);
	if(response.localeCompare('On') == 1)
	{
		console.log('Filter was turned on.');
		if(filterOn == false)
		{
			filterOn = true;
			createFilterTime();
		}
	}
	else if(response.localeCompare('Off') == 1)
	{
		console.log('Filter was turned off.');
		filterOn = false;
		resetFilterTime();
	}
	else{
		console.log('Undefined response');
		console.log(response);
		console.log(response.localeCompare('Off'));
		console.log(response.localeCompare('On'));
	}

    }
    } 

    else if (clicked_id == "4"){
		document.getElementById('Filter Info').innerHTML = "Off";
    xmlHttp.open("GET", 'http://reyunionsvrg.local/arduino/digital/7/0', true); // true for asynchronous 
    xmlHttp.send(null);	
	
	xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        document.getElementById('Filter Info').innerHTML = xmlHttp.response;
    if (xmlHttp.readyState == 4 && xmlHttp.status == 500)
        setTimeout(updateFilterInfo,1000);
	
	response = xmlHttp.response;
	console.log(response);
	if(response.localeCompare('On') == 1)
	{
		console.log('Filter was turned on.');
		if(filterOn == false)
		{
			filterOn = true;
			createFilterTime();
		}
	}
	else if(response.localeCompare('Off') == 1)
	{
		console.log('Filter was turned off.');
		filterOn = false;
		resetFilterTime();
	}
	else{
		console.log('Undefined response');
		console.log(response);
		console.log(response.localeCompare('Off'));
		console.log(response.localeCompare('On'));
	}
	
    }
    } 
	
}


function displayAutoSettings(){
	var xmlHttp = new XMLHttpRequest();
}

function updateHeaterInfo(){
	console.log('updateHeaterInfo called');
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", 'http://reyunionsvrg.local/arduino/heater/shr', true); // true for asynchronous 
    xmlHttp.send(null);
	xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
       document.getElementById('Heater Info').innerHTML = xmlHttp.response;
    if (xmlHttp.readyState == 4 && xmlHttp.status == 500)
       setTimeout(updateHeaterInfo,1000);
   
	response = xmlHttp.response;
	 
}

}

function updateFilterInfo(){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        document.getElementById('Filter Info').innerHTML = xmlHttp.response;
    if (xmlHttp.readyState == 4 && xmlHttp.status == 500)
        setTimeout(updateFilterInfo,1000);
	
	response = xmlHttp.response;
	
}
}

function updateAirTempInfo(){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        document.getElementById('Air Temp').innerHTML = xmlHttp.response;
    if (xmlHttp.readyState == 4 && xmlHttp.status == 500)
        setTimeout(updateAirTempInfo,1000);
    }
    xmlHttp.open("GET", 'http://reyunionsvrg.local/arduino/air_temperature/shr', true); // true for asynchronous 
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
    xmlHttp.open("GET", 'http://reyunionsvrg.local/arduino/water_temperature/shr', true); // true for asynchronous 
    xmlHttp.send(null);
}

function updateWaterLevelInfo(){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        document.getElementById('Water Level').innerHTML = xmlHttp.response;
    if (xmlHttp.readyState == 4 && xmlHttp.status == 500)
        setTimeout(updateWaterLevelInfo,1000);
    }
    xmlHttp.open("GET", 'http://reyunionsvrg.local/arduino/water_level/shr', true); // true for asynchronous 
    xmlHttp.send(null);
}

function updatepHInfo(){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        document.getElementById('pH Level').innerHTML = xmlHttp.response;
    if (xmlHttp.readyState == 4 && xmlHttp.status == 500)
        setTimeout(updatepHInfo,1000);
    }
    xmlHttp.open("GET", 'http://reyunionsvrg.local/arduino/pH_level/shr', false); // true for asynchronous 
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
	heaterStartTime= new Date();
	heaterTimeMili = heaterStartTime.getTime();	
	var heaterTimeMiliStr = heaterTimeMili.toString();
	console.log(heaterTimeMili);
	document.getElementById('Heater-time').innerHTML =' for 0 days 0 hours 0 minutes';
	var requestString = 'http://reyunionsvrg.local/arduino/storeHeaterTime/' + heaterTimeMili + '/shr';
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", requestString, false); // true for asynchronous 
    xmlHttp.send(null);
	xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 500)
       setTimeout(createHeaterTime,1000);
	}
	heaterTimeMade = true;
	heaterInt = setInterval(updateHeaterTime, 10000);
}

function createFilterTime() {
	console.log('filter time created');
	filterStartTime= new Date();
	filterTimeMili = filterStartTime.getTime();	
	var filterTimeMiliStr = filterTimeMili.toString();
	console.log(filterTimeMili);
	document.getElementById('Filter-time').innerHTML =' for 0 days 0 hours 0 minutes';
	var requestString = 'http://reyunionsvrg.local/arduino/storeFilterTime/' + filterTimeMili + '/shr';
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", requestString, false); // true for asynchronous 
    xmlHttp.send(null);
	xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 500)
       setTimeout(createFilterTime,1000);
	}
	filterTimeMade = true;
	filterInt = setInterval(updateFilterTime, 10000);
}

function updateHeaterTime(){
	var now = new Date();
	time1 = heaterStartTime.getTime();
	time2 = now.getTime();
	timeElapsed = time2 - time1;
	var x =timeElapsed;
	days = Math.floor(x / 86400000);
	x = x - days*86400000;
	hours = Math.floor(x / 3600000);
	x = x - hours*3600000;
	minutes = Math.floor(x / 60000);
	
	outputString = new String(' for ' + days + ' days ' + hours + ' hours ' + minutes + ' minutes ');
	document.getElementById('Heater-time').innerHTML = outputString;

}

function updateFilterTime(){
	var now = new Date();
	time1 = filterStartTime.getTime();
	time2 = now.getTime();
	timeElapsed = time2 - time1;
	var x =timeElapsed;
	days = Math.floor(x / 86400000);
	x = x - days*86400000;
	hours = Math.floor(x / 3600000);
	x = x - hours*3600000;
	minutes = Math.floor(x / 60000);
	
	outputString = new String(' for ' + days + ' days ' + hours + ' hours ' + minutes + ' minutes ');
	document.getElementById('Filter-time').innerHTML = outputString;

}


function resetHeaterTime(){
	document.getElementById('Heater-time').innerHTML = '';
	clearInterval(heaterInt);
	document.getElementById('Heater-time').innerHTML =' for 0 days 0 hours 0 minutes';
	filterStartTime= new Date();
	filterTimeMili = filterStartTime.getTime();	
	var filterTimeMiliStr = filterTimeMili.toString();
	console.log(filterTimeMili);
	var requestString = 'http://reyunionsvrg.local/arduino/storeFilterTime/' + filterTimeMili + '/shr';
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", requestString, false); // true for asynchronous 
    xmlHttp.send(null);
	xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
    if (xmlHttp.readyState == 4 && xmlHttp.status == 500)
       setTimeout(createFilterTime,1000);
	}
	filterInt = setInterval(updateFilterTime, 10000);
}

function resetFilterTime(){
	document.getElementById('Filter-time').innerHTML = '';
	clearInterval(filterInt);
	document.getElementById('Filter-time').innerHTML =' for 0 days 0 hours 0 minutes';
	filterStartTime= new Date();
	filterTimeMili = filterStartTime.getTime();	
	var filterTimeMiliStr = filterTimeMili.toString();
	console.log(filterTimeMili);
	var requestString = 'http://reyunionsvrg.local/arduino/storeFilterTime/' + filterTimeMili + '/shr';
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", requestString, false); // true for asynchronous 
    xmlHttp.send(null);
	xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
    if (xmlHttp.readyState == 4 && xmlHttp.status == 500)
       setTimeout(createFilterTime,1000);
	}
	filterInt = setInterval(updateFilterTime, 10000);
	
}
