// Function to control heater and filter
function buttonClick(clicked_id){

    if (clicked_id == "1"){
        $.get( "curl.php", {
        pin: "7", state: "1"} );
		document.write("turned on heater");
    } 

    if (clicked_id == "2"){
        $.get( "curl.php", {
        pin: "7", state: "0"} ); 
		document.write("turned off heater");
    } 

    if (clicked_id == "3"){
        $.get( "curl.php", {
        pin: "10", state: "1"} );  
		document.write("turned on filter");
    } 

    if (clicked_id == "4"){
        $.get( "curl.php", {
        pin: "10", state: "0"} ); 
	document.write("turned off filter");		
    } 

}

function updateClock() {
    var now = new Date(), // current date
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
					'August', 'September', 'October', 'November', 'December']; 
		var hours = new String(now.getHours());
		var minutes = new String(now.getMinutes());
		var seconds = new String(now.getSeconds());
		if(hours.length ==1)
		{
			hours = "0" + hours;
		}
		if(minutes.length ==1)
		{
			minutes = "0" + minutes;
		}
		if(seconds.length ==1)
		{
			seconds = "0" + seconds;
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
