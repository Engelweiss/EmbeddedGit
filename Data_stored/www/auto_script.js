var onOffAutoPref = '2';
var heaterFilterAutoPref = '0';
var dayAutoPref = '9';
var hrAutoPref = '12';
var minAutoPref = '0';
var amPmAutoPref = '0';
var autoInt;
var heaterStartTime = 'begin';
var filterStartTime = 'begin';
var heaterTimeMade = false;
var filterTimeMade = false;
var HeaterFilter;
var AutoTime;

window.onload = function(){
	initializeSettings();
	
}

function initializeSettings(){
	
}

function buttonClick(clicked_id){
	console.log('Button clicked');	
	if (clicked_id == "auto-button"){
		var para = document.createElement("P");  
		var turnOn = document.createTextNode('Turn On');
		var forText = document.createTextNode(' for ');
		var minutes = document.createTextNode(' minutes ');
		var onOffselect = document.createElement("select");
		var heaterFilterselect = document.createElement("select");
		var numMinutes = document.createElement('Input');
		
		turnOn.id = "turn_on";
		forText.id = "for_text";
		minutes.id = "minutes";
		
		numMinutes.type = "text";
		numMinutes.id = "num_minutes";
		numMinutes.width = "20px";
		numMinutes.onkeypress = "return isNumber(event)"
		
		heaterFilterselect.id = "heater_filter_sel";
		heaterFilterselect.text = "Heater";

		
		var option1 = document.createElement("option");
		option1.value="Heater";
		option1.selected="";
		option1.text="Heater";

		var option2 = document.createElement("option");
		option2.value="Filter";
		option2.text="Filter";

		heaterFilterselect.appendChild(option1);
		heaterFilterselect.appendChild(option2);
		
		document.getElementById("auto-settings").appendChild(turnOn);
		document.getElementById("auto-settings").appendChild(heaterFilterselect);
		document.getElementById("auto-settings").appendChild(forText);
		document.getElementById("auto-settings").appendChild(numMinutes);
		document.getElementById("auto-settings").appendChild(minutes);
	
		document.getElementById("auto-button").disabled = true;
		document.getElementById("done-button").disabled = false;
	}
	
	else if (clicked_id == "done-button"){
		console.log('Done button clicked');
		saveAutoSettings();
		var turnOn = document.getElementById("turn_on");
		var heaterFilterselect = document.getElementById("heater_filter_sel");
		var forText = document.getElementById("for_text");
		var numMinutes = document.getElementById("num_minutes");
		var minutes = document.getElementById("minutes");

	}
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

function saveAutoSettings(){
		console.log("Saving auto settings");
		var turnOn = document.getElementById("turn_on");
		var heaterFilterselect = document.getElementById("heater_filter_sel");
		var minutes = document.getElementById("num_minutes");

		var selectedHeaterFilter = heaterFilterselect.selectedIndex;
		var heaterFilterText;
		
		if(selectedHeaterFilter == 0){
			heaterFilterText = "heater";
			createHeaterTime();
		}
		else if(selectedHeaterFilter ==1){
			heaterFilterText = "filter";
			createFilterTime();
		}
		document.getElementById("settings").innerHTML = "Turn on "+ heaterFilterText + " for " + minutes.value + " minutes";
	
	var selection = minutes.value;
	var requestString = 'http://reyunionsvrg.local/arduino/setAutoSetting/' + heaterFilterText + "/" + selection + '/shr';	
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", requestString, false); // true for asynchronous 
    xmlHttp.send(null);
	xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 500)
       setTimeout(saveAutoSettings,1000);
	}
	
	if(selectedHeaterFilter == 0){
			heaterFilterText = "heater";
			createHeaterTime();
		}
		else if(selectedHeaterFilter ==1){
			heaterFilterText = "filter";
			createFilterTime();
		}
}

function createHeaterTime() {
	console.log('heater time created');
	heaterStartTime= new Date();
	heaterTimeMili = heaterStartTime.getTime();	
	var heaterTimeMiliStr = heaterTimeMili.toString();
	console.log(heaterTimeMili);
	var requestString = 'http://reyunionsvrg.local/arduino/storeHeaterTime/' + heaterTimeMili + '/shr';
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", requestString, false); // true for asynchronous 
    xmlHttp.send(null);
	xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 500)
       setTimeout(createHeaterTime,1000);
	}
	heaterTimeMade = true;
}

function createFilterTime() {
	console.log('filter time created');
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
	filterTimeMade = true;
}

