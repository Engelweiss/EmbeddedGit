// Function to control heater and filter
var heaterOn = false;
var filterOn = false;
var heaterStartTime;
var filterStartTime;
var heaterInt;
var filterInt;
function buttonClick(clicked_id){
	var xmlHttp = new XMLHttpRequest();

    if (clicked_id == "1"){
    xmlHttp.open("GET", 'http://reyunionsvrg.local/arduino/digital/10/1', false); // true for asynchronous 
    xmlHttp.send(null);
	updateHeaterInfo();
    } 

    if (clicked_id == "2"){
	xmlHttp.open("GET", 'http://reyunionsvrg.local/arduino/digital/10/0', false); // true for asynchronous 
    xmlHttp.send(null);
    updateHeaterInfo();
    } 

    if (clicked_id == "3"){
    xmlHttp.open("GET", 'http://reyunionsvrg.local/arduino/digital/7/1', false); // true for asynchronous 
    xmlHttp.send(null);
    updateFilterInfo();
    } 

    if (clicked_id == "4"){
    xmlHttp.open("GET", 'http://reyunionsvrg.local/arduino/digital/7/0', false); // true for asynchronous 
    xmlHttp.send(null);	
    updateFilterInfo()	;
    } 
	
	if (clicked_id == "auto-button"){
		var para = document.createElement("P");  
		var turn = document.createTextNode('Turn ');
		var at = document.createTextNode(' at ');
		var colon = document.createTextNode(" : ");
		var onOffselect = document.createElement("select");
		var heaterFilterselect = document.createElement("select");
		var whenSchedselect = document.createElement("select");
		var AMPMselect = document.createElement("select");
		var hrText = document.createElement('input');
		var minText = document.createElement('input');	
		
		//para.appendChild(text);                                          
		//document.body.appendChild(para);   
		hrText.type = "text";
		hrText.setAttribute("style", "width:50px");
		minText.type = "text";
		minText.setAttribute("style", "width:50px");
		
		onOffselect.id = "on_off_sel";
		onOffselect.text = "On";
		
		heaterFilterselect.id = "heater_filter_sel";
		heaterFilterselect.text = "Heater";
		
		whenSchedselect.id = "when_sel";
		whenSchedselect.text = "Today";	

		AMPMselect.id = "AM_PM_sel";
		AMPMselect.text = "AM";

		var option1 = document.createElement("option");
		option1.value="On";
		option1.selected="";
		option1.text="On";
		//option1.innerHTML= "method1";

		var option2 = document.createElement("option");
		option2.value="Off";
		option2.text="Off";
		
		var option3 = document.createElement("option");
		option3.value="Heater";
		option3.selected="";
		option3.text="Heater";

		var option4 = document.createElement("option");
		option4.value="Filter";
		option4.text="Filter";
		
		var option5 = document.createElement("option");
		option5.value="Today";
		option5.text="Today";
		
		var option6 = document.createElement("option");
		option6.value="Every day";
		option6.text="Every day";
		
		var option7 = document.createElement("option");
		option7.value="On Sundays";
		option7.text="On Sundays";
		
		var option8 = document.createElement("option");
		option8.value="On Mondays";
		option8.text="On Mondays";
		
		var option9 = document.createElement("option");
		option9.value="On Tuesdays";
		option9.text="On Tuesdays";
		
		var option10 = document.createElement("option");
		option10.value="On Wednesdays";
		option10.text="On Wednesdays";
		
		var option11 = document.createElement("option");
		option11.value="On Thursdays";
		option11.text="On Thursdays";
		
		var option12 = document.createElement("option");
		option12.value="On Fridays";
		option12.text="On Fridays";
		
		var option13 = document.createElement("option");
		option13.value="On Saturdays";
		option13.text="On Saturdays";
		
		var option14 = document.createElement("option");
		option14.value="AM";
		option14.selected="";
		option14.text="AM";

		var option15 = document.createElement("option");
		option15.value="PM";
		option15.text="PM";	

		onOffselect.appendChild(option1);
		onOffselect.appendChild(option2);
		heaterFilterselect.appendChild(option3);
		heaterFilterselect.appendChild(option4);
		whenSchedselect.appendChild(option5);
		whenSchedselect.appendChild(option6);
		whenSchedselect.appendChild(option7);
		whenSchedselect.appendChild(option8);
		whenSchedselect.appendChild(option9);
		whenSchedselect.appendChild(option10);
		whenSchedselect.appendChild(option11);
		whenSchedselect.appendChild(option12);
		whenSchedselect.appendChild(option13);
		AMPMselect.appendChild(option14);
		AMPMselect.appendChild(option15);
		document.getElementById("auto-settings").appendChild(turn);
		document.getElementById("auto-settings").appendChild(onOffselect);
		document.getElementById("auto-settings").appendChild(heaterFilterselect);
		document.getElementById("auto-settings").appendChild(whenSchedselect);
		document.getElementById("auto-settings").appendChild(at);
		document.getElementById("auto-settings").appendChild(hrText);
		document.getElementById("auto-settings").appendChild(colon);
		document.getElementById("auto-settings").appendChild(minText);
		document.getElementById("auto-settings").appendChild(AMPMselect);
		document.getElementById("auto-settings").appendChild(btnSave);

	}

}

displayAutoSettings(){
	
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
	
	response = xmlHttp.response;
	console.log(response);
	if(response.localeCompare('On') == 0)
	{
		console.log('Filter was turned on.');
		if(filterOn == false)
		{
			filterOn = true;
			createFilterTime();
		}
	}
	else if(response.localeCompare('Off') == 0)
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

function updatepHInfo(){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        document.getElementById('pH Level').innerHTML = xmlHttp.response;
    if (xmlHttp.readyState == 4 && xmlHttp.status == 500)
        setTimeout(updateFilterInfo,1000);
    }
    xmlHttp.open("GET", 'http://reyunionsvrg.local/arduino/pH_level/stuff', true); // true for asynchronous 
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
	//console.log('heater time created');
	document.getElementById('Heater-time').innerHTML ='for 0 days 0 hours 0 minutes';
	heaterStartTime= new Date();
	heaterInt = setInterval(updateHeaterTime, 10000);
}

function createFilterTime() {
	document.getElementById('Filter-time').innerHTML =' for 0 days 0 hours 0 minutes';
	filterStartTime= new Date();
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
	
	outputString = new String('for ' + days + ' days ' + hours + ' hours ' + minutes + ' minutes ');
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

	setTimeout(updateFilterTime, 10000);
}

function resetHeaterTime(){
	document.getElementById('Heater-time').innerHTML = '';
	clearInterval(heaterInt);
}

function resetFilterTime(){
	document.getElementById('Filter-time').innerHTML = '';
	clearInterval(filterInt);
}

