<?php
session_start();
set_include_path("../src/" . PATH_SEPARATOR . get_include_path());
  require_once 'Google/Client.php';
  require_once 'Google/Service/Calendar.php';
  
   $client_id = '974896899253-t4bc8adamnvl38ro83tgld7opd4a5p2c.apps.googleusercontent.com';
 $client_secret = 'xdbCU0IDmQOKBHWjERxNHRas';
 $redirect_uri = 'http://www.st256010.dreamhosters.com/Finalproject/calendar/src/calendar.php';

 $acc_name=$_SESSION['account_name'];
 $gmail=$_POST['gmail'];
 $summary=$_POST['summary'];
 $startTime=$_POST['starttime_year'].'-'.$_POST['starttime_month'].'-'.$_POST['starttime_day'].'T'.$_POST['starttime_hour'].':'.$_POST['starttime_minute'].':00.000-04:00';
 $endTime=$_POST['endtime_year'].'-'.$_POST['endtime_month'].'-'.$_POST['endtime_day'].'T'.$_POST['endtime_hour'].':'.$_POST['endtime_minute'].':00.000-04:00';
 $action=$_POST['action'];
 
  
  $client = new Google_Client();
  $client->setClientId($client_id);
$client->setClientSecret($client_secret);
$client->setRedirectUri($redirect_uri);
$client->addScope("https://www.googleapis.com/auth/calendar");
  $client->setApplicationName("MyCalendar");

  
  
  $service = new Google_Service_Calendar($client);
  
  /************************************************
  If we're logging out we just need to clear our
  local access token in this case
 ************************************************/
if (isset($_REQUEST['logout'])) {
  unset($_SESSION['access_token']);
}

/************************************************
  If we have a code back from the OAuth 2.0 flow,
  we need to exchange that with the authenticate()
  function. We store the resultant access token
  bundle in the session, and redirect to ourself.
 ************************************************/
if (isset($_GET['code'])) {
  $client->authenticate($_GET['code']);
  $_SESSION['access_token'] = $client->getAccessToken();
  $redirect = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'];
  header('Location: ' . filter_var($redirect, FILTER_SANITIZE_URL));
}

/************************************************
  If we have an access token, we can make
  requests, else we generate an authentication URL.
 ************************************************/
if (isset($_SESSION['access_token']) && $_SESSION['access_token']) {
  $client->setAccessToken($_SESSION['access_token']);
} else {
  $authUrl = $client->createAuthUrl();
}


 if (isset($authUrl)){

echo "<script language='javascript' type='text/javascript'>";
echo "window.location.href='$authUrl'";
echo "</script>";
}
else{
header('Location:http://www.st256010.dreamhosters.com/Finalproject/calendar/src/researcher.html');
}

if($client->getAccessToken()!="[]"){
	if($action=="getCalendar"){
		getCalendar($acc_name,$service);
	}
	if($action=="insertCalendar"){
	    insertCalendar($acc_name,$gmail,$summary,$startTime,$endTime,$service);
	}
}


  
function getCalendar($acn,Google_Service_Calendar $ser) {
	$server_name = "mysql.rosta-farzan.net";
    $user_name = "grp4";
	$server_password = "d6q7pCH";
    $con = mysql_connect($server_name,$user_name,$server_password);
	
	if(!$con)
	{
	  die('Could not connect: '.mysql_error());
	}
	
	 mysql_select_db("inf2560_g4", $con);
	  $sqlgetcld = "SELECT event_id  FROM calendar_info WHERE acc_name = '$acn'";	 
	  $resultgetcld = mysql_query($sqlgetcld);
	  $eventIDs=array();
	  $i=0;
	  while($row = mysql_fetch_array($resultgetcld))
		{
		 $eventIDs[$i] = $row['event_id'];
		 $i++;
		 }
		 $allEvents= array();
		 for($j=0;$j<count($eventIDs);$j++){
		 $event = $ser->events->get('primary', $eventIDs[$j]);  
		 $allEvents[$j]['summary']=$event->getSummary();
		 $allEvents[$j]['starttime']=$event->getStart();
		 $allEvents[$j]['endtime']=$event->getEnd();
		 }
		 $json = json_encode($allEvents);
		 echo $json;
		 mysql_close($con);
}

function insertCalendar($acn,$gm,$sum,$stti,$enti,Google_Service_Calendar $ser){
	$event = new Google_Service_Calendar_Event();
	$event->setSummary($sum);
	$start = new Google_Service_Calendar_EventDateTime();
	$start->setDateTime($stti);
	$event->setStart($start);
	$end = new Google_Service_Calendar_EventDateTime();
	$end->setDateTime($enti);
	$event->setEnd($end);
	$attendee1 = new Google_Service_Calendar_EventAttendee();
	$attendee1->setEmail($gm);
	$attendees = array($attendee1);
	$event->attendees = $attendees;
	$createdEvent = $ser->events->insert('primary', $event);
	$eventid=$createdEvent->getId();
	
	$server_name = "mysql.rosta-farzan.net";
    $user_name = "grp4";
	$server_password = "d6q7pCH";
    $con = mysql_connect($server_name,$user_name,$server_password);
	
	if(!$con)
	{
	  die('Could not connect: '.mysql_error());
	}
	
	 mysql_select_db("inf2560_g4", $con);
	  $sqlgetcld = "INSERT INTO calendar_info VALUES('$acn','$eventid')";	 
	  mysql_query($sqlgetcld);
	  mysql_close($con);
}

?>


