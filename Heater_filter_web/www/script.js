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