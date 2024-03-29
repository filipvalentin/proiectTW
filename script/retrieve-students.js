
var http = new XMLHttpRequest();

http.open('GET', "../php/get_class_students.php?id=" + id, true);

var canSend = true;
if (!id) {
	canSend = false;
}

http.setRequestHeader('Content-Type', 'application/json');
http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
http.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));

http.onreadystatechange = function () {
	if (http.readyState == 4 && http.status == 200) {

		// console.log(http.responseText);

		var result = JSON.parse(http.responseText);

		result.forEach(element => {
			displayStudent(element);
		});
	}
	else if (http.readyState == 4 && http.status == 401) {

		window.location.assign("unauthorized.html");
	}

}

if (canSend) {
	http.send();
}



function displayStudent(jsonObj) {

	const studId = jsonObj["user_id"];

	const studentList = document.getElementById("student-list");
	const template = document.getElementById("student-template");

	const clone = template.content.cloneNode(true);


	let studentEntryNode = clone.getElementById("student-entry");
	studentEntryNode.id = "s" + studId;

	let studentImage = clone.getElementById("student-image");
	if (jsonObj["user_image"])
		studentImage.setAttribute("src", jsonObj["user_image"]);
	studentImage.id = "s" + studId + "i";

	let studName = clone.getElementById("student-username");
	studName.textContent = jsonObj["username"];
	studName.setAttribute("href", "profile.html?id=" + studId);
	studName.id = "s" + studId + "un";

	let userRemoveButton = clone.getElementById("remove-student-button");
	if (userRemoveButton) {
		userRemoveButton.setAttribute("onclick", "removeUser('" + jsonObj["user_id"] + "\')");
		userRemoveButton.id = "s" + studId + "b";
	}
	
	studentList.appendChild(clone);
}