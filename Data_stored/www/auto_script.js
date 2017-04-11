var onOffAutoPref = '2';
var heaterFilterAutoPref = '0';
var dayAutoPref = '9';
var hrAutoPref = '12';
var minAutoPref = '0';
var amPmAutoPref = '0';
var autoInt;

function buttonClick(clicked_id){
	console.log('Button clicked');	
	if (clicked_id == "auto-button"){
		var para = document.createElement("P");  
		var turn = document.createTextNode('Turn ');
		var at = document.createTextNode(' at ');
		var colon = document.createTextNode(" : ");
		var onOffselect = document.createElement("select");
		var heaterFilterselect = document.createElement("select");
		var whenSchedselect = document.createElement("select");
		var hrSelect = document.createElement('select');
		var minSelect = document.createElement('select');	
		var AMPMselect = document.createElement("select");
		var saveChoice = document.createElement('Button');
		var cancelBtn = document.createElement('Button');
		var save = document.createTextNode("Save");
		var cancel = document.createTextNode("Cancel");
		
		
		onOffselect.id = "on_off_sel";
		onOffselect.text = "On";
		
		heaterFilterselect.id = "heater_filter_sel";
		heaterFilterselect.text = "Heater";
		
		whenSchedselect.id = "when_sel";
		whenSchedselect.text = "Today";	

		hrSelect.id = "hr_sel";
		hrSelect.text = "12";
		
		minSelect.id = "min_sel";
		minSelect.text = "00";
		
		AMPMselect.id = "AM_PM_sel";
		AMPMselect.text = "AM";
		
		saveChoice.appendChild(save);
		cancelBtn.appendChild(cancel);
		
		
		cancelBtn.onclick = function(){
			document.removeElementById("auto-settings");
			//break;
		}

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
		option14.value="12";
		option14.text="12";
		
		var option15 = document.createElement("option");
		option15.value="01";
		option15.text="1";
		
		var option16 = document.createElement("option");
		option16.value="02";
		option16.text="2";
		
		var option17 = document.createElement("option");
		option17.value="03";
		option17.text="3";
		
		var option18 = document.createElement("option");
		option18.value="04";
		option18.text="4";
		
		var option19 = document.createElement("option");
		option19.value="05";
		option19.text="5";
		
		var option20 = document.createElement("option");
		option20.value="06";
		option20.text="6";
		
		var option21 = document.createElement("option");
		option21value="07";
		option21.text="7";
		
		var option22 = document.createElement("option");
		option22.value="08";
		option22.text="8";
		
		var option23 = document.createElement("option");
		option23.value="09";
		option23.text="9";
		
		var option24 = document.createElement("option");
		option24.value="10";
		option24.text="10";
		
		var option25 = document.createElement("option");
		option25.value="11";
		option25.text="11";
		
		var option26 = document.createElement("option");
		option26.value="00";
		option26.text="00";
		
		var option27 = document.createElement("option");
		option27.value="01";
		option27.text="01";
		
		var option28 = document.createElement("option");
		option28.value="02";
		option28.text="02";
		
		var option29 = document.createElement("option");
		option29.value="03";
		option29.text="03";
		
		var option30 = document.createElement("option");
		option30.value="04";
		option30.text="04";
		
		var option31 = document.createElement("option");
		option31.value="05";
		option31.text="05";
		
		var option32 = document.createElement("option");
		option32.value="06";
		option32.text="06";
		
		var option33 = document.createElement("option");
		option33.value="07";
		option33.text="07";
		
		var option34 = document.createElement("option");
		option34.value="08";
		option34.text="08";
		
		var option35 = document.createElement("option");
		option35.value="09";
		option35.text="09";
		
		var option36 = document.createElement("option");
		option36.value="10";
		option36.text="10";
		
		var option37 = document.createElement("option");
		option37.value="11";
		option37.text="11";
		
		var option38 = document.createElement("option");
		option38.value="12";
		option38.text="12";
		
		var option39 = document.createElement("option");
		option39.value="13";
		option39.text="13";
		
		var option40 = document.createElement("option");
		option40.value="14";
		option40.text="14";
		
		var option41 = document.createElement("option");
		option41.value="15";
		option41.text="15";
		
		var option42 = document.createElement("option");
		option42.value="16";
		option42.text="16";
		
		var option43 = document.createElement("option");
		option43.value="17";
		option43.text="17";
		
		var option44 = document.createElement("option");
		option44.value="18";
		option44.text="18";
		
		var option45 = document.createElement("option");
		option45.value="19";
		option45.text="19";
		
		var option46 = document.createElement("option");
		option46.value="20";
		option46.text="20";
		
		var option47 = document.createElement("option");
		option47.value="21";
		option47.text="21";
		
		var option48 = document.createElement("option");
		option48.value="22";
		option48.text="22";
		
		var option49 = document.createElement("option");
		option49.value="23";
		option49.text="23";
		
		var option50 = document.createElement("option");
		option50.value="24";
		option50.text="24";
		
		var option51 = document.createElement("option");
		option51.value="25";
		option51.text="25";
		
		var option52 = document.createElement("option");
		option52value="26";
		option52.text="26";
		
		var option53 = document.createElement("option");
		option53.value="27";
		option53.text="27";
		
		var option54 = document.createElement("option");
		option54.value="28";
		option54.text="28";
		
		var option55 = document.createElement("option");
		option55.value="29";
		option55.text="29";
		
		var option56 = document.createElement("option");
		option56.value="30";
		option56.text="30";
		
		var option57 = document.createElement("option");
		option57.value="31";
		option57.text="31";
		
		var option58 = document.createElement("option");
		option58.value="32";
		option58.text="32";
		
		var option59 = document.createElement("option");
		option59.value="33";
		option59.text="33";
		
		var option60 = document.createElement("option");
		option60.value="34";
		option60.text="34";
		
		var option61 = document.createElement("option");
		option61.value="35";
		option61.text="35";
		
		var option62 = document.createElement("option");
		option62.value="36";
		option62.text="36";
		
		var option63 = document.createElement("option");
		option63.value="37";
		option63.text="37";
		
		var option64 = document.createElement("option");
		option64.value="38";
		option64.text="38";
		
		var option65 = document.createElement("option");
		option65.value="39";
		option65.text="39";
		
		var option66 = document.createElement("option");
		option66.value="40";
		option66.text="40";
		
		var option67 = document.createElement("option");
		option67.value="41";
		option67.text="41";
		
		var option68 = document.createElement("option");
		option68.value="42";
		option68.text="42";
		
		var option69 = document.createElement("option");
		option69.value="43";
		option69.text="43";
		
		var option70 = document.createElement("option");
		option70.value="44";
		option70.text="44";
		
		var option71 = document.createElement("option");
		option71.value="45";
		option71.text="45";
		
		var option72 = document.createElement("option");
		option72.value="46";
		option72.text="46";
		
		var option73 = document.createElement("option");
		option73.value="47";
		option73.text="47";
		
		var option74 = document.createElement("option");
		option74.value="48";
		option74.text="48";
		
		var option75 = document.createElement("option");
		option75.value="49";
		option75.text="49";
		
		var option76 = document.createElement("option");
		option76.value="50";
		option76.text="50";
		
		var option77 = document.createElement("option");
		option77.value="51";
		option77.text="51";
		
		var option78 = document.createElement("option");
		option78.value="52";
		option78.text="52";
		
		var option79 = document.createElement("option");
		option79.value="53";
		option79.text="53";
		
		var option80 = document.createElement("option");
		option80.value="54";
		option80.text="54";
		
		var option81 = document.createElement("option");
		option81.value="55";
		option81.text="55";
		
		var option82 = document.createElement("option");
		option82.value="56";
		option82.text="56";
		
		var option83 = document.createElement("option");
		option83.value="57";
		option83.text="57";
		
		var option84 = document.createElement("option");
		option84.value="58";
		option84.text="58";
		
		var option85 = document.createElement("option");
		option85.value="59";
		option85.text="59";
		
		var option86 = document.createElement("option");
		option86.value="AM";
		option86.selected="";
		option86.text="AM";

		var option87 = document.createElement("option");
		option87.value="PM";
		option87.text="PM";	

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
		hrSelect.appendChild(option14);
		hrSelect.appendChild(option15);
		hrSelect.appendChild(option16);
		hrSelect.appendChild(option17);
		hrSelect.appendChild(option18);
		hrSelect.appendChild(option19);
		hrSelect.appendChild(option20);
		hrSelect.appendChild(option21);
		hrSelect.appendChild(option22);
		hrSelect.appendChild(option23);
		hrSelect.appendChild(option24);
		hrSelect.appendChild(option25);
		minSelect.appendChild(option26);
		minSelect.appendChild(option27);
		minSelect.appendChild(option28);
		minSelect.appendChild(option29);
		minSelect.appendChild(option30);
		minSelect.appendChild(option31);
		minSelect.appendChild(option32);
		minSelect.appendChild(option33);
		minSelect.appendChild(option34);
		minSelect.appendChild(option35);
		minSelect.appendChild(option36);
		minSelect.appendChild(option37);
		minSelect.appendChild(option38);
		minSelect.appendChild(option39);
		minSelect.appendChild(option40);
		minSelect.appendChild(option41);
		minSelect.appendChild(option42);
		minSelect.appendChild(option43);
		minSelect.appendChild(option44);
		minSelect.appendChild(option45);
		minSelect.appendChild(option46);
		minSelect.appendChild(option47);
		minSelect.appendChild(option48);
		minSelect.appendChild(option49);
		minSelect.appendChild(option50);
		minSelect.appendChild(option51);
		minSelect.appendChild(option52);
		minSelect.appendChild(option53);
		minSelect.appendChild(option54);
		minSelect.appendChild(option55);
		minSelect.appendChild(option56);
		minSelect.appendChild(option57);
		minSelect.appendChild(option58);
		minSelect.appendChild(option59);
		minSelect.appendChild(option60);
		minSelect.appendChild(option61);
		minSelect.appendChild(option62);
		minSelect.appendChild(option63);
		minSelect.appendChild(option64);
		minSelect.appendChild(option65);
		minSelect.appendChild(option66);
		minSelect.appendChild(option67);
		minSelect.appendChild(option68);
		minSelect.appendChild(option69);
		minSelect.appendChild(option70);
		minSelect.appendChild(option71);
		minSelect.appendChild(option72);
		minSelect.appendChild(option73);
		minSelect.appendChild(option74);
		minSelect.appendChild(option75);
		minSelect.appendChild(option76);
		minSelect.appendChild(option77);
		minSelect.appendChild(option78);
		minSelect.appendChild(option79);
		minSelect.appendChild(option80);
		minSelect.appendChild(option81);
		minSelect.appendChild(option82);
		minSelect.appendChild(option83);
		minSelect.appendChild(option84);
		minSelect.appendChild(option85);
		AMPMselect.appendChild(option86);
		AMPMselect.appendChild(option87);
		document.getElementById("auto-settings").appendChild(turn);
		document.getElementById("auto-settings").appendChild(onOffselect);
		document.getElementById("auto-settings").appendChild(heaterFilterselect);
		document.getElementById("auto-settings").appendChild(whenSchedselect);
		document.getElementById("auto-settings").appendChild(at);
		document.getElementById("auto-settings").appendChild(hrSelect);
		document.getElementById("auto-settings").appendChild(colon);
		document.getElementById("auto-settings").appendChild(minSelect);
		document.getElementById("auto-settings").appendChild(AMPMselect);
		//document.getElementById("auto-settings").appendChild(saveChoice);
	
		document.getElementById("auto-button").disabled = true;
		document.getElementById("done-button").disabled = false;
	}
	
	else if (clicked_id == "done-button"){
		console.log('Done button clicked');
		saveAutoSettings();
		autoInt = setInterval(displayAutoSettings, 30000);
	}
}

function displayAutoSettings(){
	console.log("Displaying auto settings");
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", 'http://reyunionsvrg.local/arduino/check_auto_setting/shr', true); // true for asynchronous 
    xmlHttp.send(null);
	xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 500)
        setTimeout(checkAutomation,1000);
    }	
	var response = xmlHttp.response;
	console.log("Automation " +response);
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
		var onOffselect = document.getElementById("on_off_sel");
		var heaterFilterselect = document.getElementById("heater_filter_sel");
		var whenSchedselect = document.getElementById("when_sel");
		var hrSelect = document.getElementById('hr_sel');
		var minSelect = document.getElementById('min_sel');	
		var AMPMselect = document.getElementById("AM_PM_sel");

		document.getElementById("settings").innerHTML = "Turn " + onOffselect.text + " " + heaterFilterselect.text + " at " + hrSelect.text + ":" +
							minSelect.text + " " +AMPMselect.text  ;
							
	var xmlHttp = new XMLHttpRequest();
	clientString = 'http://reyunionsvrg.local/arduino/add_auto_setting/shr';
	//xmlHttp.open("GET", 'http://reyunionsvrg.local/arduino/setAutoSetting/shr', true); // true for asynchronous
    xmlHttp.open("GET", clientString, true); // true for asynchronous 
    xmlHttp.send(null);
	xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 500)
       setTimeout(saveAutoSettings,1000);
	}
	//displayAutoSettings();
}

function checkAutomation(){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", 'http://reyunionsvrg.local/arduino/check_auto_setting/shr', true); // true for asynchronous 
    xmlHttp.send(null);
	xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 500)
        setTimeout(checkAutomation,1000);
    }	
	var response = xmlHttp.response;
	console.log("Automation " +response);
	if(response.length == 8){
		onOffAutoPref = response.charAt(0);
		heaterFilterAutoPref = response.charAt(1);
		dayAutoPref = response.charAt(2);
		hrAutoPref = response.charAt(3) + response.charAt(4);
		minAutoPref = response.charAt(5) + response.charAt(6);
		amPmAutoPref = response.charAt(7);
		
		console.log(onOffAutoPref + heaterFilterAutoPref + dayAutoPref + hrAutoPref + minAutoPref + amPmAutoPref);
		
	}
}