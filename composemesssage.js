/*==============================start of send Email part======================================*/

var xmlHttpSE;

function sendEmail(){
 
  var emailTo = document.getElementById("emailTo").value;
  var emailSubject = document.getElementById("emailSubject").value;
  var emailContent = document.getElementById("emailContent").value;
  
  xmlHttpSE = createXMLHttpRequest();
  
  var urlSE = "composemesssage.php";
  var postStrSE = "functionname=sendEmail&emailTo="+emailTo+"&emailSubject="+emailSubject+"&emailContent="+emailContent;
  //alert(postStrSE);
  
  xmlHttpSE.onreadystatechange=stateChangedSE; 
  xmlHttpSE.open("POST",urlSE,true);
  xmlHttpSE.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  xmlHttpSE.send(postStrSE);

}

function stateChangedSE(){

 if (xmlHttpSE.readyState==4 || xmlHttpSE.readyState=="complete")
  { 
	var resultSE = xmlHttpSE.responseText;
	resultSE = resultSE.replace(/\r|\n/ig,"");
	//alert(resultSE);
	
	}
}



/*===============================end of send Email part=====================================*/


var xmlHttpRP;

function returnToPage(){

  xmlHttpRP = createXMLHttpRequest();
  
  var urlRP = "composemesssage.php";
  var postStrRP = "functionname=returnToPage";
  
  xmlHttpRP.onreadystatechange=stateChangedRP; 
  xmlHttpRP.open("POST",urlRP,true);
  xmlHttpRP.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  xmlHttpRP.send(postStrRP);
}

function stateChangedRP(){

    if (xmlHttpRP.readyState==4 || xmlHttpRP.readyState=="complete")
  { 
	var resultRP = xmlHttpRP.responseText;
	resultRP = resultRP.replace(/\r|\n/ig,"");
	//alert(resultRP);
	if(resultRP == "res")
	{
	 //alert("Go to researcher page");
     window.location.href='researcher.html';
	}
	else if(resultRP == "part")
   {
     //alert("Go to participant page");
     window.location.href='participant.html';
	}
   } 
}





/*================================start of signout part======================================*/
//user sign out, destroy session
var xmlHttpSO;

function signout(){
   xmlHttpSO = createXMLHttpRequest();
   
   var urlSO = "composemesssage.php";
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
	//alert(resultSO);
	
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
