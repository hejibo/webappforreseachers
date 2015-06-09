<?php

    session_start();
	$response="";
	$account_name = $_SESSION['account_name'];
	$functionname = $_POST["functionname"];
	
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
	 
  	if ($functionname == "showAllExp")
  	{
        $response = "showallexp function in php!";
  	}
  	//init
  	else if($functionname == "initpage")
  	{
  	    //$sqlPageNum = "SELECT count(*) AS total FROM acc_study";	 
  	    $sqlPageNum = "SELECT count(*) AS total FROM acc_study";	 
  	    $resultPageNum = mysql_query($sqlPageNum);
 			$studyInfoArr = array();
			
  		while($row = mysql_fetch_array($resultPageNum))
  	   {
  	     $recordNum = $row['total'];
  	     }
  
  		$studyInfoArr['recordNum'] = $recordNum;
  		$sqlPageNum = "SELECT study_id FROM acc_study order by study_id asc";	 
  	    $resultPageNum = mysql_query($sqlPageNum);
          $studyIdArr = array();	
 				 $i = 0;
  	    while($row = mysql_fetch_array($resultPageNum))
  	   {
  	     $studyIdArr [$i] = $row['study_id'];
  	     $i++;
 			 //echo($i);
  		 }
		 
  		$size = sizeof($studyIdArr);
		
          if($size >= 5)
  		{
  		  for($j = 0;$j<5;$j++)
  		 {
  		   $sqlIdArray = "SELECT * FROM study_info WHERE study_id = '$studyIdArr[$j]'";
		 
  		   $resultIdArray = mysql_query($sqlIdArray);
 			 $row = mysql_fetch_array($resultIdArray);
			 
			 $studyInfoArr[$j]['study_id'] = $row['study_id'];
  		   $studyInfoArr[$j]['study_name'] = $row['study_name'];
  		   $studyInfoArr[$j]['study_starttime'] = $row['study_starttime'];
  		   $studyInfoArr[$j]['study_endtime'] = $row['study_endtime'];
  		   $studyInfoArr[$j]['study_payment'] = $row['study_payment'];
  		   $studyInfoArr[$j]['study_paytype'] = $row['study_paytype'];
			 
 			 $sqlSearchType = "SELECT study_type FROM study_types WHERE study_id = '$studyIdArr[$j]'"; 
  		   $resultSearchType = mysql_query($sqlSearchType);
  		   while($row = mysql_fetch_array($resultSearchType))
  		  {
 				$studyInfoArr[$j]['study_type'] = $row['study_type'];
 			}
		 
  		 $sqlSearchKey = "SELECT study_keyword FROM study_keywords WHERE study_id = '$studyIdArr[$j]'";	 
  		 $resultSearchKey = mysql_query($sqlSearchKey);
  		 $studykeywords="";
     		 while($row = mysql_fetch_array($resultSearchKey)){
  		   $studykeywords =  $studykeywords.$row['study_keyword']." ; ";
 		 }
  	       $studyInfoArr[$j]['study_keyword'] = $studykeywords; 
	
		 
  		 }
  		}
  		else
  		{
  	   	  for($j = 0;$j<$size;$j++)
  		 {
  		   $sqlIdArray = "SELECT * FROM study_info WHERE study_id = '$studyIdArr[$j]'";
		 
  		   $resultIdArray = mysql_query($sqlIdArray);
             $row = mysql_fetch_array($resultIdArray);
		 
  	       $studyInfoArr[$j]['study_id'] = $row['study_id'];
  		   $studyInfoArr[$j]['study_name'] = $row['study_name'];
  		   $studyInfoArr[$j]['study_starttime'] = $row['study_starttime'];
  		   $studyInfoArr[$j]['study_endtime'] = $row['study_endtime'];
  		   $studyInfoArr[$j]['study_payment'] = $row['study_payment'];
  		   $studyInfoArr[$j]['study_paytype'] = $row['study_paytype'];
	
  	       $sqlSearchType = "SELECT study_type FROM study_types WHERE study_id = '$studyIdArr[$j]'"; 
  		   $resultSearchType = mysql_query($sqlSearchType);
  		   while($row = mysql_fetch_array($resultSearchType))
  		  {
  		    $studyInfoArr[$j]['study_type'] = $row['study_type'];
  		    }
			
			
  	     $sqlSearchKey = "SELECT study_keyword FROM study_keywords WHERE study_id = '$studyIdArr[$j]'";	 
  		 $resultSearchKey = mysql_query($sqlSearchKey);
  		 $studykeywords="";
     		 while($row = mysql_fetch_array($resultSearchKey))
  		{
  		   $studykeywords =  $studykeywords.$row['study_keyword']." ; ";
  		 }
  	       $studyInfoArr[$j]['study_keyword'] = $studykeywords; 
	
	
  		  }
				
		
		
  		}
  		 $json = json_encode($studyInfoArr);
  	     $response = $json;
 			 echo($response);
			 
  	   //  $response = $studyInfoArr[0]['study_keyword'];
		
  	}
  	 else if($functionname == "pagechange")
  	{
  	 // function=pagechange&selectedpage="+selectedPage;
  	 $selectedPage = $_POST['selectedpage'];
  	 $startId = $selectedPage*5-4;
  	 $endId = $selectedPage*5;
	 
  	 $sqlCP = "SELECT study_id FROM acc_study WHERE study_id BETWEEN $startId AND $endId";
  		//AND study_id BETWEEN 6 AND 10";
		
       $resultCP = mysql_query($sqlCP);
	 
  	 $studyIdArrCP = array();
       $studyInfoArrCP = array();
  	 $i=0;
         
  	  while($row = mysql_fetch_array($resultCP))
      {
       $studyIdArrCP[$i] = $row['study_id'];
  	 $i++;
       }
	 
  	 $studyInfoArrCP['recordNum'] = sizeof($studyIdArrCP) ;
	 
       $finalRes = "";
  	 for($j = 0;$j<sizeof($studyIdArrCP);$j++)
  	 {
  	   $finalRes = $finalRes.$studyIdArrCP[$j]."  ";
  	   $currId = $studyIdArrCP[$j];
	    
  	   $sqlSearchOneCP = "SELECT * FROM study_info WHERE study_id = '$currId'";	 
  	   $resultSearchOneCP = mysql_query($sqlSearchOneCP);
  		 while($row = mysql_fetch_array($resultSearchOneCP))
  		{
  		 $studyInfoArrCP[$j]['study_id'] = $row['study_id'];
  		 $studyInfoArrCP[$j]['study_name'] = $row['study_name'];
  		 $studyInfoArrCP[$j]['study_starttime'] = $row['study_starttime'];
  		 $studyInfoArrCP[$j]['study_endtime'] = $row['study_endtime'];
  		 $studyInfoArrCP[$j]['study_payment'] = $row['study_payment'];
  		 $studyInfoArrCP[$j]['study_paytype'] = $row['study_paytype'];
		 
  		 }
		

  		 $sqlSearchTypeCP = "SELECT study_type FROM study_types WHERE study_id = '$currId'";	 
  		 $resultSearchTypeCP = mysql_query($sqlSearchTypeCP);
  		 while($row = mysql_fetch_array($resultSearchTypeCP))
  		{
  		 $studyInfoArrCP[$j]['study_type'] = $row['study_type'];
  		 }
		 
  		 $sqlSearchKeyCP = "SELECT study_keyword FROM study_keywords WHERE study_id = '$currId'";	 
  		 $resultSearchKeyCP = mysql_query($sqlSearchKeyCP);
  		 $studykeywordsCP="";
     		 while($row = mysql_fetch_array($resultSearchKeyCP))
  		{
  		   $studykeywordsCP =  $studykeywordsCP.$row['study_keyword']." ; ";
  		 }
  		 $studyInfoArrCP[$j]['study_keyword'] = $studykeywordsCP; 
		
  	 }
	 
	 
  	    $jsonCP = json_encode($studyInfoArrCP);
    		$response = $jsonCP;
				echo $response;
  	 //$response = " From PHP: ".$finalRes;
	
  	}
 
      else if($functionname == "showoneexp")
  	{
  	  $searchStudyId = $_POST['searchStudyId'];
	  
  	  $sqlSearchOneExp = "SELECT * FROM study_info WHERE study_id = '$searchStudyId'";	 
  	  $resultSearchOneExp = mysql_query($sqlSearchOneExp);
  	  $OneStudyArr = array();
  	   while($row = mysql_fetch_array($resultSearchOneExp))
  	 {
			  $OneStudyArr['study_id'] = $row['study_id'];
    	  $OneStudyArr['study_name'] = $row['study_name'];
    	  $OneStudyArr['study_time'] = $row['study_starttime']." to ".$row['study_endtime'];
    	  $OneStudyArr['study_pay'] = $row['study_payment']." ".$row['study_paytype'];
    	  $OneStudyArr['study_description'] = $row['study_description'];
    	  $OneStudyArr['study_requirement'] = $row['study_requirement'];
	  
  	   }	   
	   
	  
  	  $sqlSearchOneExp = "SELECT study_keyword FROM study_keywords WHERE study_id = '$searchStudyId'";	 
  	  $resultSearchOneExp = mysql_query($sqlSearchOneExp);
  	  $OneStudyArr['study_keyword'] = "";
	  
    	  while($row = mysql_fetch_array($resultSearchOneExp))
  	 {
    	  $OneStudyArr['study_keyword'] = $OneStudyArr['study_keyword'].$row['study_keyword']."  ";
  	
  	   }
	

      
  	  $sqlSearchOneExp = "SELECT study_type FROM study_types WHERE study_id = '$searchStudyId'";	 
  	  $resultSearchOneExp = mysql_query($sqlSearchOneExp);
	  
    	  while($row = mysql_fetch_array($resultSearchOneExp))
  	 {
    	  $OneStudyArr['study_type'] = $row['study_type'];
  	
  	   }


  	   //$account_name
  	  $sqlSearchOneExp = "SELECT e_mail FROM researcher_info WHERE acc_name = '$account_name'";	 
  	  $resultSearchOneExp = mysql_query($sqlSearchOneExp);
	  
    	  while($row = mysql_fetch_array($resultSearchOneExp))
  	 {
    	  $OneStudyArr['e_mail'] = $row['e_mail'];
  	
  	   }
	   
  	   $jsonOS = json_encode($OneStudyArr);
    	   $response = $jsonOS;
				 echo $response;
  	}
		
	//========================show one experiment end===========================
	//========================show interested experiment start========================//
	else if($functionname == "showpage")
	  	{
	  	    //$sqlPageNum = "SELECT count(*) AS total FROM acc_study";	 
	  	    $sqlPageNum = "SELECT count(*) AS total FROM acc_interest";	 
	  	    $resultPageNum = mysql_query($sqlPageNum);
	 			$studyInfoArr = array();
			$study_id = $_POST['study_id'];	
	  		while($row = mysql_fetch_array($resultPageNum))
	  	   {
	  	     $recordNum = $row['total'];
	  	     }
  
	  		$studyInfoArr['recordNum'] = $recordNum;
	  		$sqlPageNum = "SELECT study_id FROM acc_interest WHERE acc_name = '$account_name' order by study_id asc";	 
	  	    $resultPageNum = mysql_query($sqlPageNum);
	          $studyIdArr = array();	
	 				 $i = 0;
	  	    while($row = mysql_fetch_array($resultPageNum))
	  	   {
	  	     $studyIdArr [$i] = $row['study_id'];
	  	     $i++;
	 			 //echo($i);
	  		 }
		 
	  		$size = sizeof($studyIdArr);
		
	          if($size >= 5)
	  		{
	  		  for($j = 0;$j<5;$j++)
	  		 {
	  		   $sqlIdArray = "SELECT * FROM study_info WHERE study_id = '$studyIdArr[$j]'";
		 
	  		   $resultIdArray = mysql_query($sqlIdArray);
	 			 $row = mysql_fetch_array($resultIdArray);
			 
				 $studyInfoArr[$j]['study_id'] = $row['study_id'];
	  		   $studyInfoArr[$j]['study_name'] = $row['study_name'];
	  		   $studyInfoArr[$j]['study_starttime'] = $row['study_starttime'];
	  		   $studyInfoArr[$j]['study_endtime'] = $row['study_endtime'];
	  		   $studyInfoArr[$j]['study_payment'] = $row['study_payment'];
	  		   $studyInfoArr[$j]['study_paytype'] = $row['study_paytype'];
			 
	 			 $sqlSearchType = "SELECT study_type FROM study_types WHERE study_id = '$studyIdArr[$j]'"; 
	  		   $resultSearchType = mysql_query($sqlSearchType);
	  		   while($row = mysql_fetch_array($resultSearchType))
	  		  {
	 				$studyInfoArr[$j]['study_type'] = $row['study_type'];
	 			}
		 
	  		 $sqlSearchKey = "SELECT study_keyword FROM study_keywords WHERE study_id = '$studyIdArr[$j]'";	 
	  		 $resultSearchKey = mysql_query($sqlSearchKey);
	  		 $studykeywords="";
	     		 while($row = mysql_fetch_array($resultSearchKey)){
	  		   $studykeywords =  $studykeywords.$row['study_keyword']." ; ";
	 		 }
	  	       $studyInfoArr[$j]['study_keyword'] = $studykeywords; 
	
		 
	  		 }
	  		}
	  		else
	  		{
	  	   	  for($j = 0;$j<$size;$j++)
	  		 {
	  		   $sqlIdArray = "SELECT * FROM study_info WHERE study_id = '$studyIdArr[$j]'";
		 
	  		   $resultIdArray = mysql_query($sqlIdArray);
	             $row = mysql_fetch_array($resultIdArray);
		 
	  	       $studyInfoArr[$j]['study_id'] = $row['study_id'];
	  		   $studyInfoArr[$j]['study_name'] = $row['study_name'];
	  		   $studyInfoArr[$j]['study_starttime'] = $row['study_starttime'];
	  		   $studyInfoArr[$j]['study_endtime'] = $row['study_endtime'];
	  		   $studyInfoArr[$j]['study_payment'] = $row['study_payment'];
	  		   $studyInfoArr[$j]['study_paytype'] = $row['study_paytype'];
	
	  	       $sqlSearchType = "SELECT study_type FROM study_types WHERE study_id = '$studyIdArr[$j]'"; 
	  		   $resultSearchType = mysql_query($sqlSearchType);
	  		   while($row = mysql_fetch_array($resultSearchType))
	  		  {
	  		    $studyInfoArr[$j]['study_type'] = $row['study_type'];
	  		    }
			
			
	  	     $sqlSearchKey = "SELECT study_keyword FROM study_keywords WHERE study_id = '$studyIdArr[$j]'";	 
	  		 $resultSearchKey = mysql_query($sqlSearchKey);
	  		 $studykeywords="";
	     		 while($row = mysql_fetch_array($resultSearchKey))
	  		{
	  		   $studykeywords =  $studykeywords.$row['study_keyword']." ; ";
	  		 }
	  	       $studyInfoArr[$j]['study_keyword'] = $studykeywords; 
	  		  }
	  		}
	  		 $json = json_encode($studyInfoArr);
	  	     $response = $json;
	 			 echo $response;
			 
	  	   //  $response = $studyInfoArr[0]['study_keyword'];
		
	  	}
	//========================show interested experiment end=========================//
	
	/*======================Edit Information Part Starts=====================================*/
	else if ($functionname == "editInformation")
	{
	
	 $sqlEI = "SELECT * FROM participant_info where acc_name = '$account_name'";	 
	 $resultEI = mysql_query($sqlEI);
     $findEI = array();
	 $row = mysql_fetch_array($resultEI);
	 $findEI['acc_name'] = $account_name;
	 $findEI['e_mail'] = $row['e_mail'];
	 $findEI['lastname'] = $row['lastname'];
	 $findEI['firstname'] = $row['firstname'];
	 $findEI['gender'] = $row['gender'];
	 $findEI['age'] = $row['age'];
	 $findEI['occupation'] = $row['occupation'];
     $findEI['country'] = $row['country'];
     $findEI['state'] = $row['state'];
     $findEI['city'] = $row['city'];
	
	 $sqlEI = "SELECT password FROM account_info where acc_name = '$account_name'";	 
	 $resultEI = mysql_query($sqlEI);
	 $row = mysql_fetch_array($resultEI);

     $findEI['password'] = $row['password'];
     $findEI['reenterpass'] = $row['password'];	
	 
	 $jsonEI = json_encode($findEI);
  	 $response = $jsonEI;
	 	echo $response;
		 
  	// $response = $findEI['password'];
     //$response = "Edit Information From PHP".$findEI;
	 
	}
	else if($functionname == "updateInformation"){
	 $newusername = $_POST['newusername'];
	 $newpassword = $_POST['newpassword'];
	 $newemail = $_POST['newemail'];
	 $newlastname = $_POST['newlastname'];
	 $newfirstname = $_POST['newfirstname'];
	 $newgender = $_POST['newgender'];
	 $newage = $_POST['newage'];
	 $newoccupation = $_POST['newoccupation'];
	 $newcountry = $_POST['newcountry'];
	 $newstate = $_POST['newstate'];
	 $newcity = $_POST['newcity'];
     $status = "";
	 // = "sucess";
	 
     //update participant_information
     $sqlUpdate = "update participant_info set lastname='$newlastname',
	 firstname='$newfirstname',gender='$newgender',age=$newage,e_mail='$newemail',
	 occupation='$newoccupation',city='$newcity',state='$newstate',
	 country='$newcountry' where acc_name = '$account_name'"; 	 
	 
	  if(!mysql_query($sqlUpdate))
	   {
	      die('Error: ' . mysql_error());
		  $status = "failed";
	     }
	 else 
	 {
	   $status = "success";
	 }
	
	$response = $status;
	echo $response;
	}
	
	/*========================Edit Information Part Ends===================================*/
	
	/* =======================start of interest========================*/
	else if ($functionname == 'interest'){
	  $studyId=$_POST['study_id'];
    $sqlSaveParticiAcc = "insert into acc_interest(acc_name,study_id) values('$account_name','$studyId')"; 
		mysql_query($sqlSaveParticiAcc);
		$response="participate";
		echo $response;
}

/*=======================search part=============================*/
/*====================Search KeyWords Part Starts=====================================================*/

 if($functionname == "searchKeyWords"){
  $searchkeywords = $_POST['searchkeywords'];
    $swordsArr = explode("*",$searchkeywords);
  $resultStudyId = array();
  $i=0;
  
  $length = sizeof($swordsArr);

   
  for($j=0;$j<$length;$j++)
 {
 
  $sqlSKW = "select study_id from study_info where study_name like '%$swordsArr[$j]%' or
  study_description like '$swordsArr[$j]' or study_requirement like '$swordsArr[$j]' ";
  $resultSKW = mysql_query($sqlSKW);
  
	  while($row = mysql_fetch_array($resultSKW))
 {
	   $resultStudyId[$i] = $row['study_id'];
	   $i++;
   }
   
   
  $sqlSKW = "select study_id from study_types where study_type like '%$swordsArr[$j]%'";
  $resultSKW = mysql_query($sqlSKW);
  
	  while($row = mysql_fetch_array($resultSKW))
 {
	   $resultStudyId[$i] = $row['study_id'];
	   $i++;
   }
    
  $sqlSKW = "select study_id from study_keywords where study_keyword like '%$swordsArr[$j]%'";
  $resultSKW = mysql_query($sqlSKW);
  
	  while($row = mysql_fetch_array($resultSKW))
 {
	   $resultStudyId[$i] = $row['study_id'];
	   $i++;
   }
 }//end of for
    if(sizeof($resultStudyId) != 0)
 { 
  $finalIdArr=array();
  $n = 0;
  $returnRe = "";
  for($k=0;$k<sizeof($resultStudyId);$k++)
  {
    $returnRe = $returnRe.$resultStudyId[$k]."; ";
    $currId = $resultStudyId[$k];
    $num = 0;
	for($m=0;$m<sizeof($resultStudyId);$m++)
	{
	  if( $currId == $resultStudyId[$m])
	  {
	    $num++;
	  }
	}
	if($num>=$length)
   {
     	 $finalIdArr[$n] = $resultStudyId[$k];
     $n++;        
	}
  }
  
  $re = array_unique($finalIdArr);
  $re2="";
  $studyInfoArr = array();
  
    for($n=0;$n<sizeof($re);$n++)
   {
	$re2 = $re2.$re[$n]."  ";
    $sqlIdArray = "SELECT * FROM study_info WHERE study_id = '$re[$n]'";
	$resultIdArray = mysql_query($sqlIdArray);
      $row = mysql_fetch_array($resultIdArray);
	
       $studyInfoArr[$n]['study_id'] = $row['study_id'];
	   $studyInfoArr[$n]['study_name'] = $row['study_name'];
	   $studyInfoArr[$n]['study_starttime'] = $row['study_starttime'];
	   $studyInfoArr[$n]['study_endtime'] = $row['study_endtime'];
	   $studyInfoArr[$n]['study_payment'] = $row['study_payment'];
	   $studyInfoArr[$n]['study_paytype'] = $row['study_paytype'];

       $sqlSearchType = "SELECT study_type FROM study_types WHERE study_id = '$re[$n]'"; 
	   $resultSearchType = mysql_query($sqlSearchType);
	   while($row = mysql_fetch_array($resultSearchType))
	  {
	    $studyInfoArr[$n]['study_type'] = $row['study_type'];
	    }
		
		
     $sqlSearchKey = "SELECT study_keyword FROM study_keywords WHERE study_id = '$re[$n]'";	 
	 $resultSearchKey = mysql_query($sqlSearchKey);
	 $studykeywords="";
 		 while($row = mysql_fetch_array($resultSearchKey))
	{
	   $studykeywords =  $studykeywords.$row['study_keyword']." ; ";
	 }
       $studyInfoArr[$n]['study_keyword'] = $studykeywords; 
  }
	$studyInfoArr['recordNum'] = sizeof($re);
	$studyInfoArr['status'] = "success";
	 $jsonSK = json_encode($studyInfoArr);
	}
	else
	{
	 $studyInfoArr['status'] = "Not found"; 
	 $jsonSK = json_encode($studyInfoArr);
	
	}
  $response = $jsonSK;
  
	echo $response;



  //$response = $account_name."  ".$searchkeywords." ".$resultStudyId[0] ;

}

/*====================Search KeyWords Part Ends=====================================================*/


	//sign out function
	else if ($functionname == "signout")
	{
	  session_destroy();
      $response = "signout";
			echo $response;
	}
	
    mysql_close($con);
?>
	