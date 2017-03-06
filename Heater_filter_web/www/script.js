// Function to control heater and filter
function buttonClick(clicked_id){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseTest);
    }
    if (clicked_id == "1"){
        $.get( "curl.php", {
        pin: "7", state: "1"} );
        
        

    xmlHttp.open("GET", 'http://10.30.77.167/arduino/digital/10/1', true); // true for asynchronous 
    xmlHttp.send(null);
		
    } 

    if (clicked_id == "2"){
        $.get( "curl.php", {
        pin: "7", state: "0"} ); 
	xmlHttp.open("GET", 'http://10.30.77.167/arduino/digital/10/0', true); // true for asynchronous 
    xmlHttp.send(null);
    } 

    if (clicked_id == "3"){
        $.get( "curl.php", {
        pin: "10", state: "1"} );  
    xmlHttp.open("GET", 'http://10.30.77.167/arduino/digital/7/1', true); // true for asynchronous 
    xmlHttp.send(null);
    } 

    if (clicked_id == "4"){
        $.get( "curl.php", {
        pin: "10", state: "0"} ); 
    xmlHttp.open("GET", 'http://10.30.77.167/arduino/digital/7/0', true); // true for asynchronous 
    xmlHttp.send(null);		
    } 

}

function updateHeaterInfo(){
	document.getElementById('Heater Info').innerHTML = "Off";
}

function updateFilterInfo(){
	document.getElementById('Filter Info').innerHTML = "Off";
}

function updateClock() {
    var now = new Date(), // current date
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
					'August', 'September', 'October', 'November', 'December']; 
		hours = new String(now.getHours());
		minutes = new String(now.getMinutes());
		seconds = new String(now.getSeconds());
		zero = new String("0");
		if(hours.length == 1)
		{
			hours=zero.concat(hours);
		}
		if(minutes.length == 1)
		{
			minutes=zero.concat(minutes);
		}
		if(seconds.length == 1)
		{
			seconds=zero.concat(seconds);
		}
		time = hours + ':' + minutes + ':' + seconds;

        date = [now.getDate(), 
                months[now.getMonth()],
                now.getFullYear()].join(' ');

    // set the content of the element with the ID time to the formatted string
    document.getElementById('time').innerHTML = [date, time].join(' / ');

    // call this function again in 1000ms
    setInterval(updateClock, 1000);
}
