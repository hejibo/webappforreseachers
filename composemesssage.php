<?php
    //start session and store account_name in the session
    session_start();
	$response="";
	$account_name = $_SESSION['account_name'];
	$functionname = $_POST["functionname"];
	
    //connect to MySQL database
    $server_name = "mysql.rosta-farzan.net";
    $user_name = "grp4";
	$server_password = "d6q7pCH";
    $con = mysql_connect($server_name,$user_name,$server_password);
	
	if(!$con)
	{
	  die('Could not connect: '.mysql_error());
	}
	
	 mysql_select_db("inf2560_g4", $con);
	
	
	 	 if ($functionname == "sendEmail")
	{
   	  $emailTo = $_POST['emailTo'];
	  $emailSubject = $_POST['emailSubject'];
	  $emailContent = $_POST['emailContent'];
	  
	  
	  //add from email
	  $sqlType = "SELECT acc_type FROM account_info WHERE acc_name = '$account_name'";	 
	  $resultType = mysql_query($sqlType);
	  
  	  $row = mysql_fetch_array($resultType);
  	  $type=$row['acc_type'];
	  
	  if($type == "res")
	  {
	   $sqlEmail = "SELECT e_mail FROM researcher_info WHERE acc_name = '$account_name'";	 
	   $resultEmail = mysql_query($sqlEmail);
  	   $row = mysql_fetch_array($resultEmail);
	   $emailFrom = $row['e_mail'];
	   
	   	//*****************************Yeqiu Xiong**************************//
	   sendMail($emailFrom,$emailTo,$emailSubject,$emailContent);
	   	//*****************************Yeqiu Xiong**************************//
	  }
	  else if($type == "part")
	   {
	    $sqlEmail = "SELECT e_mail FROM participant_info WHERE acc_name = '$account_name'";	 
	    $resultEmail = mysql_query($sqlEmail);
  	    $row = mysql_fetch_array($resultEmail);
	    $emailFrom = $row['e_mail'];
		
			//*****************************Yeqiu Xiong**************************//
	   sendMail($emailFrom,$emailTo,$emailSubject,$emailContent);
	   	//*****************************Yeqiu Xiong**************************//
           echo 'Hello...';
	   }
		 $success='success!';
		 $response = $type.$emailFrom.$success;
	  
	}
	else if ($functionname == "returnToPage")
	{
	  $sqlType = "SELECT acc_type FROM account_info WHERE acc_name = '$account_name'";	 
	  $resultType = mysql_query($sqlType);
	  $type="";
	  
  	  $row = mysql_fetch_array($resultType);
  	 
	  $response = $row['acc_type'];
	
	}
     else if ($functionname == "sighOut")
	{
	  session_destroy();
      $response = "signout";
	}
	
	echo $response;
    mysql_close($con);
	
	//*****************************Yeqiu Xiong**************************//
	function sendMail($f,$t,$sub,$mes){
		$to=$t;
		$subject=$sub;
		$message=$mes;
		$from=$f;
		$headers="From:".$from;
		mail($to,$subject,$message,$headers);

	}
	//*****************************Yeqiu Xiong**************************//

?>
