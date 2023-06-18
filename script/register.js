


function checkPassword() {
	var password = document.getElementById("password").value;
	var retypePassword = document.getElementById("retypePassword").value;

	colorizeInputFields(retypePassword, password);

	var lowercaseLetterRegExp = /[a-z]/g;
	var uppercaseLetterRegExp = /[A-Z]/g;
	var numberRegExp = /[0-9]/g;
	var specialCharRegExp = /[\*\.\!\@\#\$\%\^\&\(\)\{\}\[\]\:\;\<\>\,\.\?\/\~\_\+\-\=\|]/g;

	var hasLowercase = false;
	var hasUppercase = false;
	var hasNumner = false;
	var hasSpecialChar = false;
	var hasMinLength = false;

	if (lowercaseLetterRegExp.test(password)) {
		hasLowercase = true;
	}
	if (uppercaseLetterRegExp.test(password)) {
		hasUppercase = true;
	}
	if (numberRegExp.test(password)) {
		hasNumner = true;
	}
	if (specialCharRegExp.test(password)) {
		hasSpecialChar = true;
	}
	if (password.length >= 8) {
		hasMinLength = true;
	}

	colorizeRequirementItems(hasLowercase, hasUppercase, hasNumner, hasSpecialChar, hasMinLength);

	return hasLowercase && hasUppercase && hasNumner && hasSpecialChar && hasMinLength;

}


function colorizeRequirementItems(hasLowercase, hasUppercase, hasNumner, hasSpecialChar, hasMinLength) {
	var i1lcs1ucs = document.getElementById("i1lcs1ucs");
	var i1number = document.getElementById("i1number");
	var i1specialc = document.getElementById("i1specialc");
	var iatleast8c = document.getElementById("iatleast8c");

	if (hasLowercase && hasUppercase) {
		i1lcs1ucs.classList.remove("requirement-item-wrong");
		i1lcs1ucs.classList.add("requirement-item-correct");
	}
	else {
		i1lcs1ucs.classList.remove("requirement-item-correct");
		i1lcs1ucs.classList.add("requirement-item-wrong");
	}

	if (hasNumner) {
		i1number.classList.remove("requirement-item-wrong");
		i1number.classList.add("requirement-item-correct");
	}
	else {
		i1number.classList.remove("requirement-item-correct");
		i1number.classList.add("requirement-item-wrong");
	}

	if (hasSpecialChar) {
		i1specialc.classList.remove("requirement-item-wrong");
		i1specialc.classList.add("requirement-item-correct");
	}
	else {
		i1specialc.classList.remove("requirement-item-correct");
		i1specialc.classList.add("requirement-item-wrong");
	}

	if (hasMinLength) {
		iatleast8c.classList.remove("requirement-item-wrong");
		iatleast8c.classList.add("requirement-item-correct");
	}
	else {
		iatleast8c.classList.remove("requirement-item-correct");
		iatleast8c.classList.add("requirement-item-wrong");
	}
}



function colorizeInputFields(retypePassword, password) {
	if (retypePassword == "") {
		document.getElementById("retypePassword").className = "";
	}
	else if (retypePassword === password) {
		document.getElementById("retypePassword").className = "";
		document.getElementById("retypePassword").classList.add("password-correct");
	}
	else {
		document.getElementById("retypePassword").className = "";
		document.getElementById("retypePassword").classList.add("password-wrong");
	}
}

function validateRegistration() {

	if (checkPassword() == false) {
		return false;
	}

	var password = document.getElementById("password").value;
	var retypePassword = document.getElementById("retypePassword").value;

	if (password != retypePassword) {
		return false;
	}

	const username = document.getElementById("username").value;

	// if (username == "")

	// const email = document.getElementById("username").value;

	const role = document.getElementById("role").value;


}





function displayPasswordStrengthPopup() {
	var popup = document.getElementById("password-strength-popup");
	popup.style.display = "grid";

}
var popup = document.getElementById("password-strength-popup");
const passwordField = document.getElementById("password");
passwordField.addEventListener('focusout', function (event) {
	popup.style.display = "none";
});






// USERNAME CHECKING


var typingTimer;                //timer identifier
var doneTypingInterval = 200;  //time in ms
var usernameInputField = document.getElementById('username');

//on keyup, start the countdown
usernameInputField.addEventListener('keyup', () => {
    clearTimeout(typingTimer);
    if (usernameInputField.value) {
        typingTimer = setTimeout(checkUsername, doneTypingInterval);
    }
	else{
		usernameInputField.className = "";
		global_isValidUsername = false;
	}
});



var global_isValidUsername = false;

const MAX_USERNAME_LENGTH = 35;

function checkUsername() {
	var username = usernameInputField.value;

	var regexPattern = /([a-zA-Z_0-9]+)/;
	var forbiddenCharsRegex = /[\!\@\#\$\%\^\&\*\(\)\-\=+\[\]\;\'\,\.\/\{\}\:\"\|\<\>\?\"]/
	var isValidUsername = regexPattern.test(username)
		&& !/ /.test(username)
		&& !forbiddenCharsRegex.test(username)
		&& username.length <= MAX_USERNAME_LENGTH;

	if (username == "") {
		usernameInputField.className = "";
		global_isValidUsername = false;
		return;
	}

	var http = new XMLHttpRequest();

	http.open("GET", "../php/verify_username.php?username=" + username, true);
	http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

	http.onreadystatechange = function () {
		if (http.readyState == 4 && http.status == 200) {
			handleTakenUsernamePopup(http.responseText, isValidUsername);
		}
	}

	http.send();
}

//logica: fiindca functia asta e apelata dupa fiecare key press
//pot sa am logica de afisare aici, si fiindca e async, functia asta se executa dupa
//ce s-a calculat daca e valid usernameul, deci totul e bun.
//verific daca usernameul e luat si afisez utilizatorului
//verific daca usernameul nu e valid si afisez utilizatorului
//apoi pe baza celor 2 flaguri colorez si caseta daca totul e bine
function handleTakenUsernamePopup(usernameTaken, isValidUsername) {

	var usernameInputField = document.getElementById("username");
	var usernameTakenPopup = document.getElementById("username-taken-popup");
	var usernameInvalidPopup = document.getElementById("username-invalid-popup");
	var usernameInvalidLengthPopup = document.getElementById("username-invalid-length-popup");


	if (isValidUsername == true) {
		usernameInvalidPopup.style.display = "none";
		usernameInvalidLengthPopup.style.display = "none";

		if (usernameTaken == 0) {
			usernameTakenPopup.style.display = "none";
		}
		else {
			usernameTakenPopup.style.display = "block";
		}

	}
	else {
		if (usernameInputField.value.length >= MAX_USERNAME_LENGTH) {
			usernameInvalidLengthPopup.style.display = "block";
		}
		else {
			usernameInvalidPopup.style.display = "block";
		}
	}

	if (usernameTaken == 1 || isValidUsername == false) {
		usernameInputField.classList.remove("requirement-item-correct");
		usernameInputField.classList.add("requirement-item-wrong");
		global_isValidUsername = false;
	}
	else {
		usernameInputField.classList.remove("requirement-item-wrong");
		usernameInputField.classList.add("requirement-item-correct");
		global_isValidUsername = true;
	}


}










function register(){

	var regErrMsgInvalidData = document.getElementById("register-error-message-invalid-data");
	regErrMsgInvalidData.style.display = "none";
	//check other locally done checks before proceeding

	if(global_isValidUsername && checkPassword()){
		sendRegisterRequest();
	}
	else{
		regErrMsgInvalidData.style.display = "block";
	}
}

// function checkValidData(){
// 	return ;
// }

function sendRegisterRequest() {

	var http = new XMLHttpRequest();
	const url = "../php/register.php";

	const username = document.getElementById("username").value;
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const role = document.getElementById("role").value;

	http.open('POST', url, true);

	//Send the proper header information along with the request
	http.setRequestHeader('Content-Type', 'application/json');
	http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

	const data = {
		username: username,
		email: email,
		role: role,
		password: password //asuming we use HTTPS
	};

	const json = JSON.stringify(data);

	http.onreadystatechange = function () {//Call a function when the state changes.
		if (http.readyState == 4 && http.status == 200) {
			console.log(http.responseText);	
			sendAuthRequest(email, password, role, ()=>{window.location.href = "my-classes.html";}, ()=>{});
		}
		if (http.readyState == 4 && http.status == 403) {
			document.getElementById("register-error-message").style.display = "block";
		}

	}

	http.send(json);
}