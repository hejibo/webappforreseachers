var username;
var password;
var repassword;
var email;
var lastname;
var firstname;
var gender;
var age;
var occupation;
var country;
var state;
var city;
var interests;

var usernameXmlHR=null;
var xmlHttp = null;

function checkusername(){
   username = document.getElementById("username").value;
   usernameXmlHR = createXMLHttpRequest();
   var usernameUrl = "register.php";	
   var usernamePostStr = "function=checkusername&username="+username;
   
   usernameXmlHR.onreadystatechange=checkname;
   usernameXmlHR.open("POST",usernameUrl,true);
   usernameXmlHR.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
   usernameXmlHR.send(usernamePostStr);
   
}

function checkname(){
 if (usernameXmlHR.readyState==4 || usernameXmlHR.readyState=="complete")
  { 
     
	var checkresult = usernameXmlHR.responseText;
	checkresult = checkresult.replace(/\r|\n/ig,"");
	if(checkresult == "exist")
       alert("The username has already existed.");
   } 
}

function checkpassword(){
     password = document.getElementById("password").value;
     repassword = document.getElementById("repassword").value;
   
    if((password != repassword)&&(password != "")&&(repassword != ""))
     {
	  alert("The passwords you entered must be the same.");
	  document.getElementById("password").value = "";
	  document.getElementById("repassword").value = "";
	 }
}

function sendContent(){

     username = document.getElementById("username").value;
     password = document.getElementById("password").value;
     repassword = document.getElementById("repassword").value;
     email = document.getElementById("email").value;
     lastname = document.getElementById("lastname").value;
     firstname = document.getElementById("firstname").value;
     gender = document.getElementById("gender").value;
     age = document.getElementById("age").value;
     occupation = document.getElementById("occupation").value;
     country = document.getElementById("country").value;
     state = document.getElementById("state").value;
     city = document.getElementById("city").value;
  

     //put all the items selected into array interests
	 
     var check = document.getElementsByName("checkbox");
	 var intstr = new Array();
 	 for(var i=0;i<check.length;i++)
	{
	  if(check[i].checked)
	  {
	   // intstr = intstr + check[i].value +"#";
	    intstr.push(check[i].value);
	  }
	}
	interests = "";
	for(var j=0;j<intstr.length-1;j++)
	{
	  interests = interests + intstr[j]+"#"; 
	}
	interests = interests+intstr[intstr.length-1];
	  
	
	  if((username !== "")&&(password !== "")&&(repassword !== "")&&(email !== "")&&(lastname !== "")
	  &&(firstname !== "")&&(gender !== "")&&(age !== "")&&(occupation !== "")&&(country !== "")
	  &&(state !== "")&&(city !== ""))
     {
  	     xmlHttp = createXMLHttpRequest();			
	     var url = "register.php";	
		var postStr = "function=sendContent&username="+username+"&password="+password+"&email="+email+"&lastname="+lastname+
		 "&firstname="+firstname+"&gender="+gender+"&age="+age+"&occupation="+occupation+"&country="+country+
		 "&state="+state+"&city="+city+"&interests="+interests;
         
		 
         /*
		 var oneinfo = {"username":""+username+"","password":""+password+"","email":""+email+"",
		 "lastname":""+lastname+"","firstname":""+firstname+"","gender":""+gender+"","age":+age,
		 "occupation":""+occupation+"","country":""+country+"","state":""+state+"","city":""+city+"",
		 "interests":[ 'AA','BB' ]};
		*/
		
		 xmlHttp.onreadystatechange=stateChanged; 
		 xmlHttp.open("POST",url,true);
   	     xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
         
		 xmlHttp.send(postStr);

	 }
	 else
	   alert("Please fill in the form.");
	 
  }



function stateChanged(){
   if(xmlHttp.readyState == 4 ||xmlHttp.readyState == "complete")
  {
    var result = xmlHttp.responseText;
	result = result.replace(/\r|\n/ig,"");
   
	if(result == "success")
	  {
	   alert("Success");
       window.location.href='login.html';	  
	  }
	else
	  alert("Failed. Please try again.");
 
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