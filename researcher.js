/*===================================Keywords Search Part Starts========================================*/
function changeSearch(){
   for(var i=6;i<=10;i++)
   document.getElementById(i).innerHTML = "";	

}

var xmlHttpSK;

function searchKeyWords(){
   var searchkeyword = document.getElementById("searchkeyword").value; 
  
   document.getElementById("showexpe").style.display="none";
   document.getElementById("showpars").style.display="none";
   document.getElementById("showinter").style.display="none";
   document.getElementById("createnew").style.display="none";
   document.getElementById("calender").style.display="none";
   document.getElementById("showoneexp").style.display="none";
   document.getElementById("editinformation").style.display="none";
   document.getElementById("showsearch").style.display="block";  
  
   if(searchkeyword != "")
  {
    
    //alert(searchkeyword);
	xmlHttpSK = createXMLHttpRequest();
 
    var urlSK = "researcher.php";
    var postStrSK = "functionname=searchKeyWords&searchkeywords="+searchkeyword;
  
    xmlHttpSK.onreadystatechange=stateChangedSK; 
    xmlHttpSK.open("POST",urlSK,true);
    xmlHttpSK.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xmlHttpSK.send(postStrSK);
  }

}

function stateChangedSK(){

 if (xmlHttpSK.readyState==4 || xmlHttpSK.readyState=="complete")
  { 
    var resultSK = xmlHttpSK.responseText;
	//alert(resultSK);
	var resultObject = eval('(' + resultSK + ')');
	
	var status = resultObject.status;
	
	if(status == "success"){
	
	var recordNum = parseInt(resultObject.recordNum);
	var pageNum = 0;
	var selectPage = document.getElementById("search_result");
	
	if((recordNum/5) == parseInt(recordNum/5)) // int
	{
	  pageNum = recordNum/5;
	}
	else
	{
	 pageNum = parseInt(recordNum/5) + 1;
	}
	
	for(var i=1;i<=pageNum;i++)
	{ 
	   selectPage.add(new Option(i,i));   
	}
	
	
	
	if(recordNum >=5)
	{
	  for(var j=0;j<5;j++)
     {
	   var oneRecord="";
	   var studyIdOne = parseInt(resultObject[j].study_id);
	   oneRecord += "Study Id:  "+resultObject[j].study_id +"<br/>";
	   oneRecord += "<a href='javascript:showoneexp("+studyIdOne+");'>";
	   oneRecord += "Name:  "+resultObject[j].study_name+"</a><br/>";
	   oneRecord += "KeyWords:  "+resultObject[j].study_keyword+"<br/>";
	   oneRecord += "Type:  "+resultObject[j].study_type+"<br/>";
	   oneRecord += "Start Time:  "+resultObject[j].study_starttime+" ";
	   oneRecord += "End Time:  "+resultObject[j].study_endtime+"<br/>";
	   oneRecord += "Payment:  "+resultObject[j].study_payment+" "+resultObject[j].study_paytype;
	
	   var jj = j+6;
	   document.getElementById(jj).innerHTML = oneRecord;	
	  }
	}
	else
	{
	 for(var j=0;j<recordNum;j++)
     {
	   var oneRecord="";
	   var studyIdOne = parseInt(resultObject[j].study_id);
	   oneRecord += "Study Id:  "+resultObject[j].study_id +"<br/>";
	   oneRecord += "<a href='javascript:showoneexp("+studyIdOne+");'>";
	   oneRecord += "Name:  "+resultObject[j].study_name+"</a><br/>";
	   oneRecord += "KeyWords:  "+resultObject[j].study_keyword+"<br/>";
	   oneRecord += "Type:  "+resultObject[j].study_type+"<br/>";
	   oneRecord += "Start Time:  "+resultObject[j].study_starttime+" ";
	   oneRecord += "End Time:  "+resultObject[j].study_endtime+"<br/>";
	   oneRecord += "Payment:  "+resultObject[j].study_payment+" "+resultObject[j].study_paytype;
	
	   var jj = j+6;
	   document.getElementById(jj).innerHTML = oneRecord;	
	  }
	}
	
	}
	//else if(status == "Not found"){
	else{
	  alert("No Results.");
	  for(var j =6;j<11;j++)
	   document.getElementById(j).innerHTML = "";
	}
	
	
	// alert(pageNum);
   } 
}

/*===================================Keywords Search Part Ends========================================*/


/*===========================start of experiment list================================*/

var xmlHttpSA;

function showAllExp(){
  // alert("Hello Show All The Studies");
  
   
   xmlHttpSA = createXMLHttpRequest();
   
   var urlSA = "researcher.php";
   var postStrSA = "functionname=showallexp";
    
   xmlHttpSA.onreadystatechange=stateChangedSA; 
   xmlHttpSA.open("POST",urlSA,true);
   xmlHttpSA.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
   xmlHttpSA.send(postStrSA);
   
   document.getElementById("showexpe").style.display="block";
   document.getElementById("showpars").style.display="none";
   document.getElementById("showinter").style.display="none";
   document.getElementById("createnew").style.display="none";
   document.getElementById("calender").style.display="none";
   document.getElementById("showoneexp").style.display="none";
   document.getElementById("editinformation").style.display="none";
   document.getElementById("showsearch").style.display="none";
   
}

function stateChangedSA(){
  if (xmlHttpSA.readyState==4 || xmlHttpSA.readyState=="complete")
  { 
    
    var resultSA = xmlHttpSA.responseText;
	resultSA = resultSA.replace(/\r|\n/ig,"");
    
//	alert("Show All Experiments "+resultSA);
   } 
}


var xmlHttpInit;

function initSelect(){
  
 // alert("Init Select");
  
  xmlHttpInit = createXMLHttpRequest();
  
  var urlInit = "researcher.php";
  var postStrInit = "functionname=initpage";
  
  xmlHttpInit.onreadystatechange=InitStateChanged; 
  xmlHttpInit.open("POST",urlInit,true);
  xmlHttpInit.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  xmlHttpInit.send(postStrInit);
}


function InitStateChanged(){

  if (xmlHttpInit.readyState==4 || xmlHttpInit.readyState=="complete")
  { 
    var selectPage = document.getElementById("select_page");
    var resultInit = xmlHttpInit.responseText;
	
	var resultObject = eval('(' + resultInit + ')');
	
	var recordNum = parseInt(resultObject.recordNum);
	var pageNum = 0;
	
	
	if((recordNum/5) == parseInt(recordNum/5)) // int
	{
	  pageNum = recordNum/5;
	}
	else
	{
	 pageNum = parseInt(recordNum/5) + 1;
	}
	
	for(var i=1;i<=pageNum;i++)
	{ 
	   selectPage.add(new Option(i,i));   
	}
	
	if(recordNum >=5)
	{
	  for(var j=0;j<5;j++)
     {
	   var oneRecord="";
	   var studyIdOne = parseInt(resultObject[j].study_id);
	   oneRecord += "Study Id:  "+resultObject[j].study_id +"<br/>";
	   oneRecord += "<a href='javascript:showoneexp("+studyIdOne+");'>";
	   oneRecord += "Name:  "+resultObject[j].study_name+"</a><br/>";
	   oneRecord += "KeyWords:  "+resultObject[j].study_keyword+"<br/>";
	   oneRecord += "Type:  "+resultObject[j].study_type+"<br/>";
	   oneRecord += "Start Time:  "+resultObject[j].study_starttime+" ";
	   oneRecord += "End Time:  "+resultObject[j].study_endtime+"<br/>";
	   oneRecord += "Payment:  "+resultObject[j].study_payment+" "+resultObject[j].study_paytype;
	
	   var jj = j+1;
	   document.getElementById(jj).innerHTML = oneRecord;	
	  }
	}
	else
	{
	 for(var j=0;j<recordNum;j++)
     {
	   var oneRecord="";
	   var studyIdOne = parseInt(resultObject[j].study_id);
	   oneRecord += "Study Id:  "+resultObject[j].study_id +"<br/>";
	   oneRecord += "<a href='javascript:showoneexp("+studyIdOne+");'>";
	   oneRecord += "Name:  "+resultObject[j].study_name+"</a><br/>";
	   oneRecord += "KeyWords:  "+resultObject[j].study_keyword+"<br/>";
	   oneRecord += "Type:  "+resultObject[j].study_type+"<br/>";
	   oneRecord += "Start Time:  "+resultObject[j].study_starttime+" ";
	   oneRecord += "End Time:  "+resultObject[j].study_endtime+"<br/>";
	   oneRecord += "Payment:  "+resultObject[j].study_payment+" "+resultObject[j].study_paytype;
	
	   var jj = j+1;
	   document.getElementById(jj).innerHTML = oneRecord;	
	  }
	}
	
	
//	alert("page "+pageNum+"   "+resultObject[0].study_keyword);
	
   } 

}

var xmlHttpPageChange;

function pageChange(){


  var selectedPage = document.getElementById("select_page").value;
 // alert("Selected page is "+selectedPage);
  xmlHttpPageChange = createXMLHttpRequest();
 

  var urlPageChange = "researcher.php";
  var postStrPageChange = "functionname=pagechange&selectedpage="+selectedPage;
  
  
  xmlHttpPageChange.onreadystatechange=pageChangeStateChanged; 
  xmlHttpPageChange.open("POST",urlPageChange,true);
  xmlHttpPageChange.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  xmlHttpPageChange.send(postStrPageChange);
  
}



function pageChangeStateChanged(){
   if (xmlHttpPageChange.readyState==4 || xmlHttpPageChange.readyState=="complete")
  { 
    var resultCP = xmlHttpPageChange.responseText;
	var resultObjectCP = eval('(' + resultCP + ')');
	var resObjNum = parseInt(resultObjectCP['recordNum']);
	  for(var j=0;j<resObjNum;j++)
     {
	   var oneRecord="";
	   oneRecord += "Study Id:  "+resultObjectCP[j].study_id +"<br/>";
	   var studyIdOne = parseInt(resultObjectCP[j].study_id);
	   //oneRecord += "<a href='javascript:showoneexp();'>";
       oneRecord += "<a href='javascript:showoneexp("+studyIdOne+");'>";	
	   oneRecord += " Name:  "+resultObjectCP[j].study_name+"</a><br/>";
	   oneRecord += "KeyWords:  "+resultObjectCP[j].study_keyword+"<br/>";
	   oneRecord += "Type:  "+resultObjectCP[j].study_type+"<br/>";
	   oneRecord += "Start Time:  "+resultObjectCP[j].study_starttime+" ";
	   oneRecord += "End Time:  "+resultObjectCP[j].study_endtime+"<br/>";
	   oneRecord += "Payment:  "+resultObjectCP[j].study_payment+" "+resultObjectCP[j].study_paytype;
	
   	   var jj = j+1;
       document.getElementById(jj).innerHTML = oneRecord;
	  }
	 
	 if(resObjNum != 5)
	{
	  var restDiv = 5 - resObjNum;
	  for(var k=5;k>resObjNum;k--)
	    document.getElementById(k).innerHTML = ""; 
	
	  }
	
	
	//alert(resultObjectCP['recordNum']);
	
   } 


}

/*============start of show one experiment part================*/


var xmlHttpShowOne;

function showoneexp(para){
   
   document.getElementById("showexpe").style.display="none";
   document.getElementById("showpars").style.display="none";
   document.getElementById("showinter").style.display="none";
   document.getElementById("createnew").style.display="none";
   document.getElementById("calender").style.display="none";
   document.getElementById("showoneexp").style.display="block";
   document.getElementById("editinformation").style.display="none";
   document.getElementById("showsearch").style.display="none";
   
   var searchStudyId = para;
   xmlHttpShowOne = createXMLHttpRequest();
  
   var urlShowOne = "researcher.php";
   var postStrShowOne = "functionname=showoneexp&searchStudyId="+searchStudyId;
  
   xmlHttpShowOne.onreadystatechange=showOneStateChanged; 
   xmlHttpShowOne.open("POST",urlShowOne,true);
   xmlHttpShowOne.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
   xmlHttpShowOne.send(postStrShowOne);
   
   //alert("Study_id:  "+para);
}

function showOneStateChanged(){

    if (xmlHttpShowOne.readyState==4 || xmlHttpShowOne.readyState=="complete")
  { 
    var resultShowOne = xmlHttpShowOne.responseText;
	//alert(resultShowOne);
	var resultObjectSO = eval('(' + resultShowOne + ')');
    document.getElementById("expdetailStudyname").innerHTML = resultObjectSO['study_name'];
    document.getElementById("expdetailKeywords").innerHTML = resultObjectSO['study_keyword'];
    document.getElementById("expdetailType").innerHTML = resultObjectSO['study_type'];
    document.getElementById("expdetailTime").innerHTML = resultObjectSO['study_time'];
    document.getElementById("expdetailPay").innerHTML = resultObjectSO['study_pay'];
    document.getElementById("expdetailConIn").innerHTML = resultObjectSO['e_mail'];
    document.getElementById("expdetailDes").innerHTML = resultObjectSO['study_description'];
    document.getElementById("expdetailReq").innerHTML = resultObjectSO['study_requirement'];
	
	}

}




/*=============end of show one experiment part=================*/




/*==========================end of experiment list ===================================*/


/*==========================start of participants list ===================================*/
var xmlHttpSP;
function showpars(){

   document.getElementById("showexpe").style.display="none";
   document.getElementById("showpars").style.display="block";
   document.getElementById("showinter").style.display="none";
   document.getElementById("createnew").style.display="none";
   document.getElementById("calender").style.display="none";
   document.getElementById("showoneexp").style.display="none";
   document.getElementById("editinformation").style.display="none";
   document.getElementById("showsearch").style.display="none";

   document.getElementById("showoneid").length = 0;
   
   xmlHttpSP = createXMLHttpRequest();
  
   var urlSP = "researcher.php";
   var postStrSP = "functionname=showpars";
  
   xmlHttpSP.onreadystatechange=stateChangedSP; 
   xmlHttpSP.open("POST",urlSP,true);
   xmlHttpSP.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
   xmlHttpSP.send(postStrSP);
 
  }

function stateChangedSP()
{
   if (xmlHttpSP.readyState==4 || xmlHttpSP.readyState=="complete")
  { 
	var resultSP = xmlHttpSP.responseText;
	var resultObjectSP = eval('(' + resultSP + ')');
	var resObjNum = parseInt(resultObjectSP['size']);
	var selectpart = document.getElementById("showoneid");
	selectpart.add(new Option("select","select"));
   //selectPage.add(new Option(i,i));
   
	for(var i=1;i<=resObjNum;i++)
	{
	 var curr = resultObjectSP[i-1];
	 selectpart.add(new Option(curr,curr));
	}
	//alert(resObjNum);
   } 
  }

var xmlHttpOG;
  
function showOneGroup()
{
  var selectId = document.getElementById("showoneid").value;
  
     
   xmlHttpOG = createXMLHttpRequest();
  
   var urlOG = "researcher.php";
   var postStrOG = "functionname=showOneGroup&selectid="+selectId;
  
   xmlHttpOG.onreadystatechange=stateChangedOG; 
   xmlHttpOG.open("POST",urlOG,true);
   xmlHttpOG.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
   xmlHttpOG.send(postStrOG);
  
}
var recordNum = 0;

function stateChangedOG(){
    if (xmlHttpOG.readyState==4 || xmlHttpOG.readyState=="complete")
  { 
	var resultOG = xmlHttpOG.responseText;
	
	//alert(resultOG);
    var resultObjectOG = eval('(' + resultOG + ')');
	
    recordNum = parseInt(resultObjectOG.recordNum);
	var pageNum=0;
	
	var aa = recordNum/5;
	
	if(recordNum/5 == parseInt(recordNum/5)){
	  pageNum = parseInt(recordNum/5);
	}
	else
	{
	  pageNum = parseInt(recordNum/5)+1;
	}
	
	//pageNum = parseInt(12/5)+1;
	document.getElementById("parslistpage").length = 0;
    var selectPage = document.getElementById("parslistpage");
	
	for(var i=1;i<=pageNum;i++)
	{
	 selectPage.add(new Option(i,i));
	}
	
	
	for(var k=11;k<16;k++)
	{
	 document.getElementById(k).innerHTML = "";
	}
	
    for(var j=0;j<recordNum;j++)
   {
	   var oneRecord="";
	   oneRecord += "Account Name:  "+resultObjectOG[j].account_name +"<br/>";
	   oneRecord += "Name:  "+resultObjectOG[j].lastname+" , "+resultObjectOG[j].firstname+"<br/>";
	   oneRecord += "Gender:  "+resultObjectOG[j].gender+"<br/>";
	   oneRecord += "Age:  "+resultObjectOG[j].age+"<br/>";
	   oneRecord += "E_mail:  "+resultObjectOG[j].e_mail+"<br/>";
	   oneRecord += "Occupation:  "+resultObjectOG[j].occupation+"<br/>";
	   oneRecord += "Address:  "+resultObjectOG[j].city+"  "+resultObjectOG[j].state
	   +"  "+resultObjectOG[j].country;
	   oneRecord += "Interests:  "+resultObjectOG[j].subscribe_name+"<br/>";

   	   var jj = j+11;
       document.getElementById(jj).innerHTML = oneRecord;
	  }
   }
}


/*
var xmlHttpSOP;

function showOnePagePar(){

   var selectPage = document.getElementById("parslistpage").value;
      
   xmlHttpSOP = createXMLHttpRequest();
  
   var urlSOP = "researcher.php";
   var postStrSOP = "functionname=showOnePagePar&selectpage="+selectPage;
  
   xmlHttpSOP.onreadystatechange=stateChangedSOP; 
   xmlHttpSOP.open("POST",urlSOP,true);
   xmlHttpSOP.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
   xmlHttpSOP.send(postStrSOP);
  
}

//var selectPage = document.getElementById("parslistpage");showOnePagePar()
function stateChangedSOP{



}
*/




/*==========================end of participants list ===================================*/

	 
function showinter(){
   document.getElementById("showexpe").style.display="none";
   document.getElementById("showpars").style.display="none";
   document.getElementById("showinter").style.display="block";
   document.getElementById("createnew").style.display="none";
   document.getElementById("calender").style.display="none";
   document.getElementById("showoneexp").style.display="none";	
   document.getElementById("editinformation").style.display="none";
   document.getElementById("showsearch").style.display="none";
   
   }
	 
	 
	 
/*================================start of create new study part======================================*/

var studynameCN;
var keywordsCN;
var studytypeCN;
var startMonCN;
var startDayCN;
var startYearCN;
var endMonCN;
var endDayCN;
var endYearCN;
var paymentCN;
var paytypeCN;
var requerimentCN;
var descriptionCN;

var xmlHttpCN;



function createnew(){
   document.getElementById("showexpe").style.display="none";
   document.getElementById("showpars").style.display="none";
   document.getElementById("showinter").style.display="none";
   document.getElementById("createnew").style.display="block";
   document.getElementById("calender").style.display="none";
   document.getElementById("showoneexp").style.display="none";	
   document.getElementById("editinformation").style.display="none";
   document.getElementById("showsearch").style.display="none";
   
}
 
function checkStartDay(){
   startMonCN = document.getElementById("startMonCN").value;
   startDayCN = document.getElementById("startDayCN").value;

  if(( startMonCN == 2)&&( startDayCN>28))
    alert("Start time is wrong.");
  else if((startMonCN == 4)&&(startDayCN == 31))
    alert("Start time is wrong.");
  else if((startMonCN == 6)&&(startDayCN == 31))
    alert("Start time is wrong.");
  else if((startMonCN == 9)&&(startDayCN == 31))
    alert("Start time is wrong.");
  else if((startMonCN == 11)&&(startDayCN == 31))
    alert("Start time is wrong.");
  
}

function checkEndDay(){
   endMonCN = document.getElementById("endMonCN").value;
   endDayCN = document.getElementById("endDayCN").value;

  if(( endMonCN == 2)&&( endDayCN>28))
    alert("End time is wrong.");
  else if((endMonCN == 4)&&(endDayCN == 31))
    alert("End time is wrong.");
  else if((endMonCN == 6)&&(endDayCN == 31))
    alert("End time is wrong.");
  else if((endMonCN == 9)&&(endDayCN == 31))
    alert("End time is wrong.");
  else if((endMonCN == 11)&&(endDayCN == 31))
    alert("End time is wrong.");
  
}

function submitNewInfo(){
 
  studynameCN = document.getElementById("studynameCN").value;
  keywordsCN = document.getElementById("keywordsCN").value;
  studytypeCN = document.getElementById("studytypeCN").value;
  
  startMonCN = document.getElementById("startMonCN").value;
  startDayCN = document.getElementById("startDayCN").value;
  startYearCN = document.getElementById("startYearCN").value;

  endMonCN = document.getElementById("endMonCN").value;
  endDayCN = document.getElemenById("endDayCN").value;
  endYearCN = document.getElementById("endYearCN").value;

  paymentCN = document.getElementById("paymentCN").value
  paytypeCN = document.getElementById("paytypeCN").value;
  requerimentCN = document.getElementById("requerimentCN").value;
  descriptionCN = document.getElementById("descriptionCN").value;
}

function sendCreateNewInfo(){
 
  studynameCN = document.getElementById("studynameCN").value;
  keywordsCN = document.getElementById("keywordsCN").value;
  studytypeCN = document.getElementById("studytypeCN").value;
  
  startMonCN = document.getElementById("startMonCN").value;
  startDayCN = document.getElementById("startDayCN").value;
  startYearCN = document.getElementById("startYearCN").value;

  endMonCN = document.getElementById("endMonCN").value;
  endDayCN = document.getElementById("endDayCN").value;
  endYearCN = document.getElementById("endYearCN").value;

  paymentCN = document.getElementById("paymentCN").value;
  paytypeCN = document.getElementById("paytypeCN").value;
  requerimentCN = document.getElementById("requerimentCN").value;
  descriptionCN = document.getElementById("descriptionCN").value;
    
	if((studynameCN != "")&&(keywordsCN != "")&&(studytypeCN != "")&&(startMonCN != 0)&&(startDayCN != 0)
	&&(startYearCN != 0)&&(endMonCN !=0)&&(endDayCN != 0)&&(endYearCN != 0)&&(paymentCN != "")&&(paytypeCN != "")
	&&(requerimentCN != "")&&(descriptionCN != ""))
     {
	
      xmlHttpCN = createXMLHttpRequest();
	  // YYYY-MM-DD
      var startTimeCN = startYearCN+"-"+startMonCN+"-"+startDayCN;
      var endTimeCN = endYearCN+"-"+endMonCN+"-"+endDayCN;
      var urlCN = "researcher.php";
      var postStrCN = "functionname=createNewStudy&studynameCN="+studynameCN+"&keywordsCN="+keywordsCN
	  +"&studytypeCN="+studytypeCN+"&startTimeCN="+startTimeCN+"&endTimeCN="+endTimeCN
	  +"&paymentCN="+paymentCN+"&paytypeCN="+paytypeCN+"&requerimentCN="+requerimentCN+"&descriptionCN="+descriptionCN;
        
	  //alert("Crete new study "+postStrCN);
      xmlHttpCN.onreadystatechange=stateChangedCN; 
      xmlHttpCN.open("POST",urlCN,true);
      xmlHttpCN.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
      xmlHttpCN.send(postStrCN);
	
	}     
   else
   {   
    alert("Please fill in the form!");
   }

}

function stateChangedCN(){

    if (xmlHttpCN.readyState==4 || xmlHttpCN.readyState=="complete")
  { 
	var resultCN = xmlHttpCN.responseText;
	resultCN = resultCN.replace(/\r|\n/ig,"");
	alert(resultCN);
    RSSBuild(studytypeCN);
    showAllExp();
    alert("Return to exp list");
   } 
}
var xmlHttpRSS
function RSSBuild(type){
xmlHttpRSS = createXMLHttpRequest();
 var urlRSS = "RSSBuild.php";
 var postStrRSS = "study_type="+studytypeCN;
  xmlHttpRSS.onreadystatechange=stateChangedRSS; 
      xmlHttpRSS.open("POST",urlRSS,true);
      xmlHttpRSS.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
      xmlHttpRSS.send(postStrRSS);
	  }
	  
function stateChangedRSS(){
if (xmlHttpRSS.readyState==4 || xmlHttpRSS.readyState=="complete")
  { 
  var resultRSS = xmlHttpRSS.responseText;
    alert("RSS is updated!");
   } 
}

/*================================end of create new study part======================================*/




/*================================start of google calender part======================================*/	 
var xmlHttpgetCLD;
var xmlHttpinsertCLD;

function calender(){
   document.getElementById("showexpe").style.display="none";
   document.getElementById("showpars").style.display="none";
   document.getElementById("showinter").style.display="none";
   document.getElementById("createnew").style.display="none";
   document.getElementById("calender").style.display="block";
   document.getElementById("showoneexp").style.display="none";	
   document.getElementById("editinformation").style.display="none";	
   document.getElementById("showsearch").style.display="none";
}

function getCalender(){

  document.getElementById("showGetDiv").style.display="block";
  document.getElementById("showInsertDiv").style.display="none";
  xmlHttpgetCLD=createXMLHttpRequest();
	var urlgetCLD = "calendar.php";
    var postStrgetCLD = "action=getCalendar";
    
    xmlHttpgetCLD.onreadystatechange=stateChangedgetCLD; 
    xmlHttpgetCLD.open("POST",urlgetCLD,true);
    xmlHttpgetCLD.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xmlHttpgetCLD.send(postStrgetCLD);

}

function insertCalender(){
  document.getElementById("showGetDiv").style.display="none";
  document.getElementById("showInsertDiv").style.display="block";
  
}

function authenticate(){

  window.location.href="http://www.st256010.dreamhosters.com/Finalproject/calendar/src/calendar.php";
  alert("You have been authenticated. Go ahead!");
}

function stateChangedgetCLD(){
  if (xmlHttpgetCLD.readyState==4 || xmlHttpgetCLD.readyState=="complete")
  { 
   var resultgetCLD = xmlHttpgetCLD.responseText;
	var resultgetCLDObject = eval('(' + resultgetCLD + ')');
for(var i=0;i<resultgetCLDObject.length;i++){
       document.getElementById('title'+(i+1)).innerHTML="Title: "+resultgetCLDObject[i].summary+"</br>";
document.getElementById('time'+(i+1)).innerHTML="Time: from "+resultgetCLDObject[i].starttime.dateTime+" to "+resultgetCLDObject[i].endtime.dateTime+"</br>";
}
   } 
}

function insertCalendarEvent(){
	var gmail= document.getElementById("gmail_address").value;
	var summary=document.getElementById("calenderContent").value;
	var starttime_year=document.getElementById("startyear").value;
	var starttime_month=document.getElementById("startmonth").value;
	var starttime_day=document.getElementById("startday").value;
	var starttime_hour=document.getElementById("starthour").value;
	var starttime_minute=document.getElementById("startminute").value;
	var endtime_year=document.getElementById("endyear").value;
	var endtime_month=document.getElementById("endmonth").value;
	var endtime_day=document.getElementById("endday").value;
	var endtime_hour=document.getElementById("endhour").value;
	var endtime_minute=document.getElementById("endminute").value;

	xmlHttpinsertCLD=createXMLHttpRequest();
	var urlinsertCLD = "calendar.php";
	var postStrinsertCLD = "gmail="+gmail+"&action=insertCalendar"+"&summary="+summary+"&starttime_year="+starttime_year+"&starttime_month="+starttime_month+"&starttime_day="+starttime_day+"&starttime_hour="+starttime_hour+"&starttime_minute="+starttime_minute+"&endtime_year="+endtime_year+"&endtime_month="+endtime_month+"&endtime_day="+endtime_day+"&endtime_hour="+endtime_hour+"&endtime_minute="+endtime_minute;
    
	xmlHttpinsertCLD.onreadystatechange=stateChangedinsertCLD; 
	xmlHttpinsertCLD.open("POST",urlinsertCLD,true);
	xmlHttpinsertCLD.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlHttpinsertCLD.send(postStrinsertCLD);
alert("insert");

}

function stateChangedinsertCLD(){
  if (xmlHttpinsertCLD.readyState==4 || xmlHttpinsertCLD.readyState=="complete")
  { 
alert("Inserted!");
   } 
}


/*================================end of google calender part======================================*/


/*================================start of edit information part======================================*/

var xmlHttpEI;

function editInformation()
{
  
//  window.location.href='researcherregister.html';

   document.getElementById("showexpe").style.display="none";
   document.getElementById("showpars").style.display="none";
   document.getElementById("showinter").style.display="none";
   document.getElementById("createnew").style.display="none";
   document.getElementById("calender").style.display="none";
   document.getElementById("showoneexp").style.display="none";	
   document.getElementById("editinformation").style.display="block";
   document.getElementById("showsearch").style.display="none";
      

   document.getElementById("editUsername").disabled = "true";
    
   xmlHttpEI = createXMLHttpRequest();
  
   var urlEI = "researcher.php";
   var postStrEI = "functionname=editInformation";
  
  
   xmlHttpEI.onreadystatechange=stateChangedEI; 
   xmlHttpEI.open("POST",urlEI,true);
   xmlHttpEI.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
   xmlHttpEI.send(postStrEI);
  
}

function stateChangedEI(){

  if (xmlHttpEI.readyState==4 || xmlHttpEI.readyState=="complete")
  { 
	var resultEI = xmlHttpEI.responseText;
	//resultEI = resultEI.replace(/\r|\n/ig,"");
	var resultObjectEI = eval('(' + resultEI + ')');
	

    document.getElementById("editUsername").value = resultObjectEI['acc_name'];
    document.getElementById("editPassword").value = resultObjectEI['password'];
    document.getElementById("editReenter").value = resultObjectEI['password'];
    document.getElementById("editEmail").value = resultObjectEI['e_mail'];
    document.getElementById("editLastname").value = resultObjectEI['lastname'];
    document.getElementById("editFirstname").value = resultObjectEI['firstname'];
    document.getElementById("editGender").value = resultObjectEI['gender'];
    document.getElementById("editAge").value = resultObjectEI['age'];
    document.getElementById("editOccupation").value = resultObjectEI['occupation'];
    document.getElementById("editCountry").value = resultObjectEI['country'];
    document.getElementById("editState").value = resultObjectEI['state'];
    document.getElementById("editCity").value = resultObjectEI['city'];
	
	 } 

}

function changePassword(){
    document.getElementById("editPassword").value = "";
    document.getElementById("editReenter").value = "";
}

function checkPassword(){
    var editPassword = document.getElementById("editPassword").value;
    var editReenter = document.getElementById("editReenter").value;
    
	if(editPassword != editReenter)
	{
   	 document.getElementById("editPassword").value = "";
     document.getElementById("editReenter").value = "";
	 alert("The passwords you entered must be the same.");
	  
	}
}

var xmlHttpUp;

function updateInformation(){

	var editUsername = document.getElementById("editUsername").value;
    var editPassword = document.getElementById("editPassword").value;
    var editReenter = document.getElementById("editReenter").value;
    var editEmail = document.getElementById("editEmail").value;
    var editLastname = document.getElementById("editLastname").value;
    var editFirstname = document.getElementById("editFirstname").value;
    var editGender = document.getElementById("editGender").value;
    var editAge = document.getElementById("editAge").value;
    var editOccupation = document.getElementById("editOccupation").value;
    var editCountry = document.getElementById("editCountry").value;
    var editState = document.getElementById("editState").value;
    var editCity = document.getElementById("editCity").value;

	
	if((editUsername != "")&&(editPassword != "")&&(editReenter != "")&&(editEmail != "")&&(editLastname != "")
	  &&(editFirstname != "")&&(editGender != "")&&(editAge != "")&&(editOccupation != "")
	  &&(editCountry != "")&&(editState != "")&&(editCity != ""))
      {
  	     xmlHttpUp = createXMLHttpRequest();			
	     var urlUp = "researcher.php";	
		 var postStrUp = "functionname=updateInformation&newusername="+editUsername+"&newpassword="+editPassword
		 +"&newemail="+editEmail+"&newlastname="+editLastname
		 +"&newfirstname="+editFirstname+"&newgender="+editGender+"&newage="+editAge
		 +"&newoccupation="+editOccupation+"&newcountry="+editCountry
		 +"&newstate="+editState+"&newcity="+editCity;
         
		// alert(postStrUp);
		 
		 xmlHttpUp.onreadystatechange=stateChangedUp; 
		 xmlHttpUp.open("POST",urlUp,true);
   	     xmlHttpUp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
         
		 xmlHttpUp.send(postStrUp);
	     
	  }	 
	  else
         alert("Please fill in the form.");
}

function stateChangedUp(){

   if (xmlHttpUp.readyState==4 || xmlHttpUp.readyState=="complete")
  { 
	var resultUp = xmlHttpUp.responseText;
	resultUp = resultUp.replace(/\r|\n/ig,"");
	
	if(resultUp == "success")
   	 {
	   alert("Successfully update the account information");
	  // document.getElementById("editinformation").innerHTML = "Successfully update the account information.";
	 }
	 else if(resultUp == "failed")
	 {
       alert("Failed. Please try again.");
	 }
	}

}
/*================================end of edit information part===================================*/




/*================================start of signout part======================================*/
//user sign out, destroy session
var xmlHttpSO;

function signout(){
   xmlHttpSO = createXMLHttpRequest();
   
   var urlSO = "researcher.php";
   var postStrSO = "functionname=sighOut";
  
  
  xmlHttpSO.onreadystatechange=stateChangedSO; 
  xmlHttpSO.open("POST",urlSO,true);
  xmlHttpSO.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  xmlHttpSO.send(postStrSO);
}


function stateChangedSO(){

    if (xmlHttpSO.readyState==4 || xmlHttpSO.readyState=="complete")
  { 
	var resultSO = xmlHttpSO.responseText;
	resultSO = resultSO.replace(/\r|\n/ig,"");
	if(resultSO == "signout")
	{
	   alert("Signout successfully.");
	   window.location.href='login.html';
	}else
	  alert("Signout failed!Please try again.");
   } 
}
/*================================end of signout part======================================*/


function createXMLHttpRequest(){
 var XMLHttp;
 try
 {
 // Firefox, Opera 8.0+, Safari
  XMLHttp=new XMLHttpRequest();
   }
  catch (e)
  {
    // Internet Explorer
     try
    {
     XMLHttp=new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e)
   {
     XMLHttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    }
   return XMLHttp;
}