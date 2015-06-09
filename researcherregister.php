<?php
  
    //session_start();
	$response;
    $functionname = $_POST["function"];
  
	//$account_name = $_SESSION['account_name'];
	//$functionname = $_POST["functionname"];
  
  
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
	 
	//to find whether acc_name exists or not 
	if($functionname == "checkusername")
	{
	
	 $username = $_POST["username"];
	 $sqlPass = "SELECT password from account_info WHERE acc_name = '$username'" ;
	
	 $resultPass = mysql_query($sqlPass);
     $pass = null;
	 
	 while($row = mysql_fetch_array($resultPass))
	{
	  $pass = $row['password'];
	}
	
	if($pass !="")
      $response = "exist";
	else
	  $response = "notexist";   
	 
	}//end of function checkusername(register.js)
    else if($functionname == "sendContent")
	{
  	 
     $username = $_POST["username"];
	 $password = $_POST["password"];
	 $email = $_POST["email"];
	 $lastname = $_POST["lastname"];
	 $firstname = $_POST["firstname"];
	 $gender = $_POST["gender"];
	 $age = $_POST["age"];
	 $occupation = $_POST["occupation"];
	 $country = $_POST["country"];
	 $state = $_POST["state"];
	 $city = $_POST["city"];
	 $success1 = 1;
	 $success2 = 1; //success


     //insert account information into account_info table
	  $sqlAcc = "insert into account_info(acc_name,password,acc_type)
    values('$username','$password','res')";

   if(!mysql_query($sqlAcc))
	{
	  die('Error: ' . mysql_error());
	  $success1 = 0;
	  
	}
	
    //insert information of form into participant_info table
    $sqlRes = "insert into researcher_info(acc_name,lastname,firstname,gender,age,e_mail,
              occupation,city,state,country)
              values('$username','$lastname','$firstname','$gender','$age',
			  '$email','$occupation','$city','$state','$country')";

   if(!mysql_query($sqlRes))
	{
	  die('Error: ' . mysql_error());
	  $success2 = 0;	  
	}
    
	if(($success1 == 1)&&($success2 == 1))
	     $response = "success";
	else
	    $response = "failed";
	
	}//end of function sendContent (register.js)
	 echo $response;
?>