<?php
include("feedcreator.class.php"); 

  $type=$_POST['study_type'];
 $server_name = "mysql.rosta-farzan.net";
    $user_name = "grp4";
	$server_password = "d6q7pCH";
    $con = mysql_connect($server_name,$user_name,$server_password);
	if(!$con)
	{
	  die('Could not connect: '.mysql_error());
	}
	
	 mysql_select_db("inf2560_g4", $con);
	 
	 $sqlFindRSS = "SELECT SI.study_name AS sn, RI.lastname AS ln, RI.firstname AS fn, RI.e_mail AS em, SI.study_description AS dp, SI.study_starttime AS st, SI.study_endtime AS et, SI.study_requirement AS rq, SI.study_payment AS py, SI.study_paytype AS pt
	FROM researcher_info RI, study_info SI, acc_study AST, study_types ST
	WHERE RI.acc_name=AST.acc_name AND AST.study_id=SI.study_id AND SI.study_id=ST.study_id AND ST.study_type='$type'";
	$RSSresult=array();
	$resultFindRSS=mysql_query($sqlFindRSS);
	$count1=0;
	 while($row = mysql_fetch_array($resultFindRSS))
	   {
	     $RSSresult[$count1]['title'] = $row['sn'];
		 $RSSresult[$count1]['author'] = $row['fn']." ".$row['ln'];
		 $RSSresult[$count1]['authoremail'] = $row['em'];
		 $RSSresult[$count1]['description'] = $row['dp'];
		 $RSSresult[$count1]['date'] = "from ".$row['st']." to ".$row['et'];
		 $RSSresult[$count1]['comments'] = $row['rq'];
		 $RSSresult[$count1]['source'] = $row['py']." ".$row['pt'];
		 $count1++;
	     }
	$rss = new UniversalFeedCreator(); 
	$rss->useCached(); 
	$rss->title = $type." news"; 
	$rss->description = "All studies within the domain of ".$type; 
	$rss->link = "http://www.dailyphp.net/news"; 
	
	for($count2=0;$count2<count($RSSresult);$count2++){
	$item = new FeedItem(); 
    $item->title = $RSSresult[$count2]['title'];
    $item->author = $RSSresult[$count2]['author'];
	$item->authoremail = $RSSresult[$count2]['authoremail'];
    $item->description = $RSSresult[$count2]['description']; 
    $item->date = $RSSresult[$count2]['description'];
	$item->comments = $RSSresult[$count2]['comments'];
	$item->source = $RSSresult[$count2]['source'];
    $rss->addItem($item); 
	}
	$rss->saveFeed("RSS1.0", "RSSFile/".$type.".xml"); 
?>