function changePassword() {
    document.getElementById('error-passwd').style.display = "none";
    document.getElementById('failed-passwd-cap-letter').style.display = "none";
    document.getElementById('failed-passwd-number').style.display = "none";
    document.getElementById('failed-passwd-lenght').style.display = "none";
    document.getElementById('failed-passwd-spec-char').style.display = "none";
    document.getElementById('failed-passwd-small-letter').style.display = "none";
    document.getElementById('conf-passwd').style.display = "none";
    isUserPassword();
}

function isUserPassword() {
    var currentPasswd = document.getElementById('currentPassword').value;
    console.log(currentPasswd);
    var http = new XMLHttpRequest();

    http.open("GET", 'checkPassword.php?password=' + currentPasswd, true);
    http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    http.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
    http.onreadystatechange = function () {
        //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            var response = http.responseText;
            if (response == 'NU') {
                console.log(response);
                document.getElementById('error-passwd').style.display = "block";
            } else {
                console.log(response);
                validatePassword();
            }
        }
        if (http.readyState == 4 && http.status == 401) {
            window.location.assign("unauthorized.html");
        }
    }
    http.send();
}

function validatePassword() {
    var password = document.getElementById("newPassword").value;

    var lowercaseLetterRegExp = /[a-z]/g;
    var uppercaseLetterRegExp = /[A-Z]/g;
    var numberRegExp = /[0-9]/g;
    var specialCharRegExp = /[\*\.\!\@\#\$\%\^\&\(\)\{\}\[\]\:\;\<\>\,\.\?\/\~\_\+\-\=\|]/g;

    var hasLowercase = true;
    var hasUppercase = true;
    var hasNumner = true;
    var hasSpecialChar = true;
    var hasMinLength = true;

    if (!lowercaseLetterRegExp.test(password)) {
        hasLowercase = false;
        document.getElementById('failed-passwd-small-letter').style.display = "block";
    }
    if (!uppercaseLetterRegExp.test(password)) {
        hasUppercase = false;
        document.getElementById('failed-passwd-cap-letter').style.display = "block";
    }
    if (!numberRegExp.test(password)) {
        hasNumner = false;
        document.getElementById('failed-passwd-number').style.display = "block";
    }
    if (!specialCharRegExp.test(password)) {
        hasSpecialChar = false;
        document.getElementById('failed-passwd-spec-char').style.display = "block";
    }
    if (password.length < 8) {
        hasMinLength = false;
        document.getElementById('failed-passwd-lenght').style.display = "block";
    }

    if(hasLowercase && hasUppercase && hasNumner && hasSpecialChar && hasMinLength){
        confirmation();
    }
}

function confirmation(){
    var passOne = document.getElementById('newPassword').value;
    var passTwo = document.getElementById('confirmPassword').value;
    if(passOne !== passTwo){
        document.getElementById('conf-passwd').style.display = "block";
    }else{
        replacePassword();
    }
}

function replacePassword(){
    var newPasswd = document.getElementById('newPassword').value;
    console.log(newPasswd);
    var http = new XMLHttpRequest();
	http.open("POST", 'change-password.php', true);
	http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    http.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
    const data = {password : newPasswd};
    const json = JSON.stringify(data);
    http.onreadystatechange = function () {
        //Call a function when the state changes.
		if (http.readyState == 4 && http.status == 200) {
			window.location.assign("account-administration-final.html");
		}
		if (http.readyState == 4 && http.status == 401) {
            console.log('au')
			window.location.assign("unauthorized.html");
		}
	}
	http.send(json);
}