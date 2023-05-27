// const form = document.querySelector("register");
// eInput = form.querySelector("input");
// text = form.querySelector("emailcheck");

// form.addEventListener("submit", (e)=>{
// 	e.preventDefault();
// 	let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
// 	form.classList.add("error")
// })

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
	
	if(lowercaseLetterRegExp.test(password)){
		hasLowercase = true;
	}
	if(uppercaseLetterRegExp.test(password)){
		hasUppercase = true;
	}
	if(numberRegExp.test(password)){
		hasNumner = true;
	}
	if(specialCharRegExp.test(password)){
		hasSpecialChar = true;
	}
	if(password.length >= 8){
		hasMinLength = true;
	}

	colorizeRequirementItems(hasLowercase, hasUppercase, hasNumner, hasSpecialChar, hasMinLength);




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

	if(hasMinLength){
		iatleast8c.classList.remove("requirement-item-wrong");
		iatleast8c.classList.add("requirement-item-correct");
	}
	else{
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

function validateForm() {
	var password = document.getElementById("password").value;
	var retypePassword = document.getElementById("retypePassword").value;
	// console.
	if (password != retypePassword) {
		return false;
	}//else{

	//}

}

function register() {
	console.log("eee");
	var http = new XMLHttpRequest();
	const url = "register.php";

	const username = document.getElementById("username").value;
	const email = document.getElementById("username").value;
	const password = document.getElementById("password").value;
	const accountType = document.getElementById("accountType").value;

	http.open('POST', url, true);

	//Send the proper header information along with the request
	http.setRequestHeader('Content-Type', 'application/json');
	http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  
	const data = {
		username: username,
		email: email,
		accountType: accountType,
		password: password //asuming we use HTTPS
	};

	const json = JSON.stringify(data);

	http.onreadystatechange = function () {//Call a function when the state changes.
		if (http.readyState == 4 && http.status == 200) {
			alert(http.responseText);
		}
	}

	http.send(json);
}


//nu stiu ce fac
function displayPasswordStrengthPopup(){
	var popup = document.getElementById("password-strength-popup");
    popup.style.display = "grid";
  
}
var popup = document.getElementById("password-strength-popup");
const passwordField = document.getElementById("password");
passwordField.addEventListener('focusout', function (event) {
	popup.style.display = "none";
});

