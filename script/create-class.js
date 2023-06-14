function createClass(){
	const className = document.getElementById("class-name").value;

	var http = new XMLHttpRequest();

	http.open('POST', "create_class.php", true);

	//Send the proper header information along with the request
	http.setRequestHeader('Content-Type', 'application/json');
	http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	http.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));

	http.onreadystatechange = function () {//Call a function when the state changes.
		if (http.readyState == 4 && http.status == 200) {
			window.location.assign("my-classes.html");
		}
		if (http.readyState == 4 && http.status == 401) {
			window.location.assign("unauthorized.html");
		}
		
	}

	http.send(className);
}