function removeUser(user_id){
	var http = new XMLHttpRequest();

	http.open('DELETE', "remove_student_from_class.php", true);

	//Send the proper header information along with the request
	http.setRequestHeader('Content-Type', 'application/json');
	http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	http.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));

	const data = {
		class_id: id,
		user_id: user_id
	};

	const json = JSON.stringify(data);

	http.onreadystatechange = function () {//Call a function when the state changes.
		if (http.readyState == 4 && http.status == 200) {
			console.log(http.responseText);
			window.location.assign(window.location);
		}
		if (http.readyState == 4 && http.status == 401) {
			window.location.assign("unauthorized.html");
		}

	}

	http.send(json);
}