function registerpage(){
  window.location.href='register.html';
}

var xmlHttp;
 
function sendLoginMessage(){

  var sendname = document.getElementById("accname").value;
  var sendpassword = document.getElementById("accpassword").value;
  if(sendname == "")
  {
     alert("Missing account name. Please correct and try again.");
  }
  if((sendname!= "")&&(sendpassword == ""))
  {
    alert("Please enter your password.");
  }
   if((sendname!= "")&&(sendpassword != ""))
  {
  xmlHttp = createXMLHttpRequest();
  
  var url = "login.php";
  var postStr = "username="+sendname+"&password="+sendpassword;
  
  
  xmlHttp.onreadystatechange=stateChanged; 
  xmlHttp.open("POST",url,true);
  xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  xmlHttp.send(postStr);
  //alert(postStr); 
   }
}

function stateChanged(){
  if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
  { 
	var result = xmlHttp.responseText;
	result = result.replace(/\r|\n/ig,"");
	//alert(result);
	
	if(result == "res")
	{
	  alert("Welcome back researcher!");
	  window.location.href='researcher.html';
	}
	else if(result == "part")
	{
	  alert("Welcome back participant!");  
	  window.location.href='participant.html';
	}
	else
	{
	  alert(result); 
	} 
   
   } 
}

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