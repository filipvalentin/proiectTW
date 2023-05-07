// const form = document.querySelector("register");
// eInput = form.querySelector("input");
// text = form.querySelector("emailcheck");

// form.addEventListener("submit", (e)=>{
// 	e.preventDefault();
// 	let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
// 	form.classList.add("error")
// })

function check() {
	var password = document.getElementById("password").value;
	var retypePassword = document.getElementById("retypePassword").value;

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
	var http = new XMLHttpRequest();
	var url = 'get_data.php';
	var params = 'orem=ipsum&name=binny';
	http.open('POST', url, true);

	//Send the proper header information along with the request
	http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	http.onreadystatechange = function () {//Call a function when the state changes.
		if (http.readyState == 4 && http.status == 200) {
			alert(http.responseText);
		}
	}
	http.send(params);
}