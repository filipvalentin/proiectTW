function login() {

	const email = document.getElementById("email").value;
	var password = document.getElementById("password").value;

	if (email && password) {
		if (sendAuthRequest(email, password) == false) {
			document.getElementById("login-error-message").style.display = "block";
		}
		else {
			
			window.location.replace("home.html");
		}
	}
}

//autorizarea este deocamdata pe 7 zile
function sendAuthRequest(email, password) {

	var http = new XMLHttpRequest();

	http.open('POST', "auth_user.php", true);

	//Send the proper header information along with the request
	http.setRequestHeader('Content-Type', 'application/json');
	http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

	const data = {
		email: email,
		password: password
	};

	const json = JSON.stringify(data);

	http.onreadystatechange = function () {//Call a function when the state changes.
		if (http.readyState == 4 && http.status == 200) {
			localStorage.setItem("JWTTOKEN", http.responseText);
			return true;
		}
		if (http.readyState == 4 && http.status == 401) {
			return false;
		}

	}

	http.send(json);

}