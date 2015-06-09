<?php
session_start();
set_include_path("../src/" . PATH_SEPARATOR . get_include_path());
  require_once 'Google/Client.php';
  require_once 'Google/Service/Calendar.php';
  
   $client_id = '974896899253-t4bc8adamnvl38ro83tgld7opd4a5p2c.apps.googleusercontent.com';
 $client_secret = 'xdbCU0IDmQOKBHWjERxNHRas';
 $redirect_uri = 'http://www.st256010.dreamhosters.com/Finalproject/calendar/src/calendar.php';

  
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


if($client->getAccessToken()!="[]"){
$event = new Google_Service_Calendar_Event();
$event->setSummary('Fight with Ruiting Yi');
$event->setLocation('Ischool');
$start = new Google_Service_Calendar_EventDateTime();
$start->setDateTime('2014-04-23T17:00:00.000-04:00');
$event->setStart($start);
$end = new Google_Service_Calendar_EventDateTime();
$end->setDateTime('2014-04-23T20:20:00.000-04:00');
$event->setEnd($end);
$attendee1 = new Google_Service_Calendar_EventAttendee();
$attendee1->setEmail('xiongyeqiu@gmail.com');
$attendees = array($attendee1);
$event->attendees = $attendees;

$createdEvent = $service->events->insert('primary', $event);


echo $createdEvent->getId();
}
?>
<div class="box">
  <div class="request">
    <?php if (isset($authUrl)): ?>
      <a class='login' href='<?php echo $authUrl; ?>'>Connect Me!</a>
    <?php else: ?>
      <form id="url" method="GET" action="<?php echo $_SERVER['PHP_SELF']; ?>">
        <input name="url" class="url" type="text">
        <input type="submit" value="Shorten">
      </form>
      <a class='logout' href='?logout'>Logout</a>
    <?php endif ?>
  </div>

  <?php if (isset($short)): ?>
    <div class="shortened">
      <?php var_dump($short); ?>
    </div>
  <?php endif ?>
</div>


