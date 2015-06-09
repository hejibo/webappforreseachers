<?php
  //start session and store account_name in the session
  session_start();



//username="+sendname+"&password="
  $username = $_POST["username"];
  $password = $_POST["password"];
  $response;
  
  $_SESSION["account_name"] = $username;
 
  
  
  //connect to MySQL database
    $server_name = "localhost";
    $user_name = "root";
	$server_password = "910305";
    $con = mysql_connect($server_name,$user_name,$server_password);
	
	if(!$con)
	{
	  die('Could not connect: '.mysql_error());
	}
	
	mysql_select_db("webproject", $con);
	//webproject
	//check whether the password is correct or not
	$sqlPass = "select password from account_info where acc_name = '$username'";
	$resultPass = mysql_query($sqlPass,$con);
	$info = mysql_fetch_array($resultPass);
	$findPass = $info['password'];
	if($findPass != null)
	{
	if($findPass == $password)
	{
	//find the account type
	
	$sql = "SELECT acc_type from account_info WHERE acc_name = '$username' AND password = '$password'" ;
	
	$result = mysql_query($sql);
    $type = null;
	 
	 while($row = mysql_fetch_array($result))
	 {
	  $type = $row['acc_type'];
	 }
	 
      $response = $type;
  	  }
	 else
	   $response = "There was an error with your E-Mail/Password combination. Please try again.";
      }
	  else
	   $response = "Cannot find this account. Please register a new account.";
	//$response = $response.$username." Found password: ".$findPass;
	  echo $response;
?>


