

/*===========================start of experiment list================================*/

var xmlHttpSA;

function showAllExp(){
  //alert("Hello Show All The Studies");
   
   xmlHttpSA = createXMLHttpRequest();
   
   var urlSA = "participant.php";
   var postStrSA = "functionname=";
    
   xmlHttpSA.onreadystatechange=stateChangedSA; 
   xmlHttpSA.open("POST",urlSA,true);
   xmlHttpSA.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
   xmlHttpSA.send(postStrSA);
}

function stateChangedSA(){
  if (xmlHttpSA.readyState==4 || xmlHttpSA.readyState=="complete")
  { 
    
    var resultSA = xmlHttpSA.responseText;
	resultSA = resultSA.replace(/\r|\n/ig,"");
	
	//alert("Show All Experiments "+resultSA);
   } 
}


var xmlHttpInit;

function initSelect(){
  
 //alert("Init Select");
  
  xmlHttpInit = createXMLHttpRequest();
  
  var urlInit = "participant.php";
  var postStrInit = "functionname=initpage";
  
  xmlHttpInit.onreadystatechange=InitStateChanged; 
  xmlHttpInit.open("POST",urlInit,true);
  xmlHttpInit.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  xmlHttpInit.send(postStrInit);
	
  document.getElementById("showexperiment").style.display="block";
  document.getElementById("showoneexp").style.display="none";
  document.getElementById("editinformation").style.display="none";	
  document.getElementById("showinterested").style.display="none";
  document.getElementById("showsearch").style.display="none";
	
}

function InitStateChanged(){

  if (xmlHttpInit.readyState==4 || xmlHttpInit.readyState=="complete")
  { 
    var selectPage = document.getElementById("select_page");
    var resultInit = xmlHttpInit.responseText;
		//alert(resultInit);
	
		var resultObject = eval('(' + resultInit + ')');
	
	var recordNum = parseInt(resultObject.recordNum);
	//alert(recordNum);
	var pageNum = 0;
	
	
	if((recordNum/5) == parseInt(recordNum/5)) // int
	{
	  pageNum = recordNum/5;
	}
	else
	{
	 pageNum = parseInt(recordNum/5) + 1;
	}
	selectPage.innerHTML="";
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
		 //alert(studyIdOne);
	   oneRecord += "Study Id:  "+resultObject[j].study_id +"<br/>";
	   oneRecord += "<a href='javascript:showoneexp("+studyIdOne+");'>";
	   oneRecord += "Name:  "+resultObject[j].study_name+"</a><br/>";
	   oneRecord += "KeyWords:  "+resultObject[j].study_keyword+"<br/>";
	   oneRecord += "Type:  "+resultObject[j].study_type+"<br/>";
	   oneRecord += "Start Time:  "+resultObject[j].study_starttime+" ";
	   oneRecord += "End Time:  "+resultObject[j].study_endtime+"<br/>";
	   oneRecord += "Payment:  "+resultObject[j].study_payment+" "+resultObject[j].study_paytype;
		 //alert(oneRecord);
	   var jj = j+1;
	   document.getElementById(jj).innerHTML = oneRecord;	
	  }
	}
	else
	{
	 for(var j=0;j<recordNum;j++)
     {//
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
	
	
//alert("page "+pageNum+"   "+resultObject[0].study_keyword);
	
   } 

}

var xmlHttpPageChange;

function pageChange(){


  var selectedPage = document.getElementById("select_page").value;
 // alert("Selected page is "+selectedPage);
  xmlHttpPageChange = createXMLHttpRequest();
 

  var urlPageChange = "participant.php";
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

	function showoneexp(para){
		
	   document.getElementById("showoneexp").style.display="block";
	   document.getElementById("showexperiment").style.display="none";
	   document.getElementById("showinterested").style.display="none";
		 
		 
	   var searchStudyId = para;
		 
	   xmlHttpShowOne = createXMLHttpRequest();
  
	   var urlShowOne = "participant.php";
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
		var study_type=resultObjectSO['study_type'];
		var type_rss='http://www.st256010.dreamhosters.com/Finalproject/calendar/src/RSSFile/'+study_type+'.xml';
		window.study_id=resultObjectSO.study_id;
		alert(study_id);
	    document.getElementById("expdetailStudyname").innerHTML = resultObjectSO['study_name'];
	    document.getElementById("expdetailKeywords").innerHTML = resultObjectSO['study_keyword'];
	    document.getElementById("expdetailType").innerHTML = resultObjectSO['study_type']+"<a href='' id='rss'><img src='img/Feed-icon.png' width='25' height='25'/></a>";
	    document.getElementById("expdetailTime").innerHTML = resultObjectSO['study_time'];
	    document.getElementById("expdetailPay").innerHTML = resultObjectSO['study_pay'];
	    document.getElementById("expdetailConIn").innerHTML = resultObjectSO['e_mail'];
	    document.getElementById("expdetailDes").innerHTML = resultObjectSO['study_description'];
	    document.getElementById("expdetailReq").innerHTML = resultObjectSO['study_requirement'];
			document.getElementById("rss").href= type_rss;
			//alert(document.getElementById("expdetailType").innerHTML); 
		}

	}

/*============end of show one experiment part================*/


/*================================start of edit information part======================================*/

var xmlHttpEI;

function editInformation()
{
  
//  window.location.href='register.html';

   document.getElementById("showinterested").style.display="none";
   document.getElementById("showexperiment").style.display="none";
   document.getElementById("showoneexp").style.display="none";	
   document.getElementById("editinformation").style.display="block";	
   document.getElementById("editUsername").disabled = "true";
    
   xmlHttpEI = createXMLHttpRequest();
  
   var urlEI = "participant.php";
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
	     var urlUp = "participant.php";	
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
	resultUp = resultUp.replace(/\s+/g,"");
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
/*================================start of interest part======================================*/
var xmlHttpIT;
function interest(){
  xmlHttpIT = createXMLHttpRequest();
  
  var urlIT = "participant.php";
  var postStrIT = "functionname=interest"+"&study_id="+window.study_id;
  
  xmlHttpIT.onreadystatechange=ITStateChanged; 
  xmlHttpIT.open("POST",urlIT,true);
  xmlHttpIT.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  xmlHttpIT.send(postStrIT);		
}

function ITStateChanged(){
  if (xmlHttpIT.readyState==4 || xmlHttpIT.readyState=="complete")
	{ 
		var resultIT = xmlHttpIT.responseText;
		resultIT = resultIT.replace(/\r|\n/ig,"");
		resultIT = resultIT.replace(/\s+/g,"");
		if(resultIT == "participate")
		alert('sucessfully participated!');
		else
		alert("Failed to participate!Please try again.");
	}
}
/*================================end of interest part======================================*/
/*================================start of show interested experiment=================== ===
function pageChange_2(){


  var selectedPage = document.getElementById("select_page_2");
 alert("Selected page is "+selectedPage.value);
  xmlHttpPageChange = createXMLHttpRequest();
 

  var urlPageChange = "participant.php";
  var postStrPageChange = "functionname=pagechange&selectedpage="+selectedPage; 
  
  xmlHttpPageChange.onreadystatechange=pageChangeStateChanged; 
  xmlHttpPageChange.open("POST",urlPageChange,true);
  xmlHttpPageChange.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  xmlHttpPageChange.send(postStrPageChange);
  
}

function pageChangeStateChanged_2(){
   if (xmlHttpPageChange.readyState==4 || xmlHttpPageChange_2.readyState=="complete")
  { 
    var resultCP = xmlHttpPageChange_2.responseText;
		alert(resultCP);
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
*/var xmlHttpShow;

function showinterested(){
   
 xmlHttpShow = createXMLHttpRequest();
   
   var urlShow = "participant.php";
   var postStrShow = "functionname=showpage"+"&study_id="+window.study_id;
   
   xmlHttpShow.onreadystatechange=ShowStateChanged; 
   xmlHttpShow.open("POST",urlShow,true);
   xmlHttpShow.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
   xmlHttpShow.send(postStrShow);
   
   document.getElementById("showexperiment").style.display="none";
   document.getElementById("showinterested").style.display="block";
   document.getElementById("showoneexp").style.display="none";
   document.getElementById("editinformation").style.display="none";	
   document.getElementById("showsearch").style.display="none";
	 
   }
	 

function ShowStateChanged(){

	   if (xmlHttpShow.readyState==4 || xmlHttpShow.readyState=="complete")
	   { 
	     var selectPage = document.getElementById("select_page_2");
			 //alert(selectPage);
	     var resultShow = xmlHttpShow.responseText;
	 		//alert(resultShow);
			var resultObject = eval('(' + resultShow + ')');
			var recordNum = parseInt(resultObject.recordNum);
	 	//alert(recordNum);
		var pageNum = 0;
	 	if((recordNum/5) == parseInt(recordNum/5)) // int
	 	{
	 	  pageNum = recordNum/5;
	 	}
	 	else
	 	{
	 	 pageNum = parseInt(recordNum/5) + 1;
	 	}
		//alert(pageNum);
	 	selectPage.innerHTML="";
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
	 		 //alert(studyIdOne);
	 	   oneRecord += "Study Id:  "+resultObject[j].study_id +"<br/>";
	 	   oneRecord += "<a href='javascript:showoneexp("+studyIdOne+");'>";
	 	   oneRecord += "Name:  "+resultObject[j].study_name+"</a><br/>";
	 	   oneRecord += "KeyWords:  "+resultObject[j].study_keyword+"<br/>";
	 	   oneRecord += "Type:  "+resultObject[j].study_type+"<br/>";
	 	   oneRecord += "Start Time:  "+resultObject[j].study_starttime+" ";
	 	   oneRecord += "End Time:  "+resultObject[j].study_endtime+"<br/>";
	 	   oneRecord += "Payment:  "+resultObject[j].study_payment+" "+resultObject[j].study_paytype;
	 		 //alert(oneRecord);
			 var jj = j+11;
 			//alert(jj);
			 
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
	 		 //alert(oneRecord);
	 	  var jj = j+11;
			//alert(jj);
	 	   document.getElementById(jj).innerHTML = oneRecord;	
	 	  }
	 	}
	}
}
/*==================================end of show interested experiment=======================*/
	
	function changeSearch(){
	   for(var i=6;i<=10;i++)
	   document.getElementById(i).innerHTML = "";	
   
	}

	var xmlHttpSK;

	function searchKeyWords(){
	   var searchkeyword = document.getElementById("searchkeyword").value; 

	   document.getElementById("showexperiment").style.display="none";
	   document.getElementById("showinterested").style.display="none";
	   document.getElementById("showoneexp").style.display="none";
	   document.getElementById("showsearch").style.display="block";  
  
	   if(searchkeyword != "")
	  {
	    alert(searchkeyword);
	
		xmlHttpSK = createXMLHttpRequest();
 
	    var urlSK = "participant.php";
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
	    var resultSK = xmlHttpSK.responseText;//status
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
		else if(status == "Not found"){
		  alert("No Results.");
		  for(var j =6;j<11;j++)
		   document.getElementById(j).innerHTML = "";
		}
	
	   } 
	}

	/*===================================Keywords Search Part Ends========================================*/
	
/*================================start of signout part======================================*/
//user sign out, destroy session
var xmlHttpSO;

function signout(){
   xmlHttpSO = createXMLHttpRequest();
   
   var urlSO = "participant.php";
   var postStrSO = "functionname=signout";
  
  
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
	if(resultSO == "signout	")
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