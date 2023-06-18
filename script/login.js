
const urlParams = new URLSearchParams(window.location.search);
var intent = null;

if (window.location.href.indexOf("login.html")>-1) {
	if (urlParams.has("intent")) {
		intent = urlParams.get('intent');
	}
	else {
		window.location.assign("index.html");
	}
}


function login() {

	const email = document.getElementById("email").value;
	var password = document.getElementById("password").value;

	if (email && password) {
		sendAuthRequest(
			email,
			password,
			intent,
			() => {
				if (intent == "student" || intent == "teacher") {
					window.location.assign("my-classes.html");
				}
				else if (intent == "admin") {
					window.location.assign("admin-problems.html");
				}
			},
			() => { document.getElementById("login-error-message").style.display = "block"; }
		);
	}
}


function sendAuthRequest(email, password, intent, funcOnSucess, funcOnFail) {

	var http = new XMLHttpRequest();

	http.open('POST', "../php/auth_user.php", true);

	//Send the proper header information along with the request
	http.setRequestHeader('Content-Type', 'application/json');
	http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

	const data = {
		email: email,
		password: password,
		intent: intent
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