function changeEmail(){
    document.getElementById('isnt-email').style.display = "none";
    document.getElementById('error-email').style.display = "none";
    document.getElementById('taken-email').style.display = "none";
    document.getElementById('empty-email').style.display = "none";
    document.getElementById('empty2-email').style.display = "none";
    document.getElementById('empty3-email').style.display = "none";
    if(document.getElementById('currentEmail').value==''){
        document.getElementById('empty-email').style.display = "block";
    }
    if(document.getElementById('newEmail').value==''){
        document.getElementById('empty2-email').style.display = "block";
    }
    if(document.getElementById('confirmationEmail').value==''){
        document.getElementById('empty3-email').style.display = "block";
    }
    if(document.getElementById('confirmationEmail').value !='' && document.getElementById('newEmail').value !='' && document.getElementById('confirmationEmail').value !=''){
        isUserEmail();
    }
}

function isUserEmail(){
    var currentEmail = document.getElementById('currentEmail').value;
    console.log(currentEmail);
    var http = new XMLHttpRequest();

	http.open("GET", '../php/getEmail.php', true);
	http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    http.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
    console.log(currentEmail);
    http.onreadystatechange = function () {
        //Call a function when the state changes.
        console.log(currentEmail);
		if (http.readyState == 4 && http.status == 200) {
            console.log('heirup');
            console.log(emailUser);
			var emailUser = http.responseText;
            if(emailUser != currentEmail){
                console.log('heirup');
                console.log(emailUser);
                document.getElementById('error-email').style.display = "block";
            }else{
                isTakenEmail();
            }
		}
		if (http.readyState == 4 && http.status == 401) {
            console.log('au')
			window.location.assign("unauthorized.html");
		}
	}
	http.send();
}

function isTakenEmail(){
    var newEmail = document.getElementById('newEmail').value;
    console.log(newEmail);
    var http = new XMLHttpRequest();
	http.open("GET", '../php/checkEmail.php?email='+newEmail, true);
	http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    http.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
    http.onreadystatechange = function () {
        //Call a function when the state changes.
		if (http.readyState == 4 && http.status == 200) {
			var response = http.responseText;
            console.log(response);
            if(response == 'DA'){
                console.log(response);
                document.getElementById('taken-email').style.display = "block";
            }else{
                confirmation();
            }
		}
		if (http.readyState == 4 && http.status == 401) {
            console.log('au')
			window.location.assign("unauthorized.html");
		}
	}
	http.send();
}

function confirmation(){
    var emailOne = document.getElementById('newEmail').value;
    var emailTwo = document.getElementById('confirmationEmail').value;
    if(emailOne !== emailTwo){
        document.getElementById('isnt-email').style.display = "block";
    }else{
        replaceEmail();
    }
    
}

function replaceEmail(){
    var newEmail = document.getElementById('newEmail').value;
    console.log(newEmail);
    var http = new XMLHttpRequest();
	http.open("POST", '../php/change-email.php', true);
	http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    http.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
    const data = {email : newEmail};
    const json = JSON.stringify(data);
    http.onreadystatechange = function () {
        //Call a function when the state changes.
		if (http.readyState == 4 && http.status == 200) {
			window.location.assign("account-administration.html");
		}
		if (http.readyState == 4 && http.status == 401) {
            console.log('au')
			window.location.assign("unauthorized.html");
		}
	}
	http.send(json);
}