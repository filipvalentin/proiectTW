function login() {

	const email = document.getElementById("email").value;
	var password = document.getElementById("password").value;

	if (email && password) {
		sendAuthRequest(
			email,
			password,
			() => { window.location.assign("home.html"); },
			() => { document.getElementById("login-error-message").style.display = "block"; }
		);
	}
}


function sendAuthRequest(email, password, funcOnSucess, funcOnFail) {

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
			localStorage.setItem("JWT", http.responseText);
			funcOnSucess();
		}
		if (http.readyState == 4 && http.status == 401) {
			funcOnFail();
		}

	}

	http.send(json);

}