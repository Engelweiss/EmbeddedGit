<?php
  $pin = $_GET['pin'];
  $state = $_GET['state'];
 
  // Create cURL call
  //$service_url = 'http://10.30.77.167/arduino/digital/' . $pin . '/' . $state;
  $service_url = 'http://10.30.77.167/arduino/digital/7/1';
  $curl = curl_init($service_url);
  curl_setopt($curl,CURLOPT_RETURNTRANSFER,true); 
  // Send cURL to Yun board
 // curl_setopt($curl, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4 ); 
  // Pass cURL to browser
  $curl_response = curl_exec($curl);
  curl_close($curl);
  //Print answer
  echo $curl_response;
  echo 'ECHO TEST';
?>
