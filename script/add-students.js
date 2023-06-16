
function addStudents() {

	var usersToAdd = new Array();
	document.getElementById("users-input").value
		.split("\n").forEach(e => {
			e.split(",").forEach(element => {
				element.split(" ").forEach(k => {
					if (k) {
						usersToAdd.push(k);
					}
				});
			});
		});

	// console.log(usersToAdd);

	var http = new XMLHttpRequest();

	http.open('POST', "add_students.php", true);

	//Send the proper header information along with the request
	http.setRequestHeader('Content-Type', 'application/json');
	http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	http.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));


	var data = {
		class_id: id,
		users: usersToAdd
	}

	const json = JSON.stringify(data);

	http.onreadystatechange = function () {//Call a function when the state changes.
		if (http.readyState == 4 && http.status == 200) {

			console.log(http.responseText);

			// window.location.assign("class-admin-students.html?id=" + id);
		}
		if (http.readyState == 4 && http.status == 401) {

			window.location.assign("unauthorized.html");
		}

	}

	http.send(json);
}