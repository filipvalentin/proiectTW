
const JWT = parseJwt(localStorage.getItem("JWT"));
const role = JWT["role"];

var httpCustomProblems = new XMLHttpRequest();

httpCustomProblems.open('GET', "get_my_classes.php", true);

//Send the proper header information along with the request
httpCustomProblems.setRequestHeader('Content-Type', 'application/json');
httpCustomProblems.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
httpCustomProblems.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));

httpCustomProblems.onreadystatechange = function () {//Call a function when the state changes.
	if (httpCustomProblems.readyState == 4 && httpCustomProblems.status == 200) {

		// console.log(http.responseText);

		var result = JSON.parse(httpCustomProblems.responseText);

		result.forEach(element => {
			displayClass(element);
		});

	}
	if (httpCustomProblems.readyState == 4 && httpCustomProblems.status == 401) {

		window.location.assign("unauthorized.html");
	}

}

httpCustomProblems.send();


function displayClass(jsonObj) {

	const classId = jsonObj["id"];

	const classList = document.getElementById("class-list");
	var template = document.getElementById("teacher-class-template");
	if (role == "student") {
		template = document.getElementById("student-class-template");
	}
	const clone = template.content.cloneNode(true);


	let classIdNode = clone.getElementById("class-div");
	classIdNode.id = "c" + classId;

	let classTitle = clone.getElementById("class-title");
	classTitle.textContent = jsonObj["class_name"];
	classTitle.id = "c" + classId + "t";

	let classViewButton = clone.getElementById("class-goto-button");
	if (role == "teacher") {
		classViewButton.setAttribute("onclick", "location.href = 'class-admin-overview.html?id=" + jsonObj["id"] + "\';");
	}
	else if (role == "student") {
		classViewButton.setAttribute("onclick", "location.href = 'class-student-overview.html?id=" + jsonObj["id"] + "\';");
	}
	else {
		classViewButton.setAttribute("onclick", "location.href = 'unauthorized.html");
	}
	classViewButton.id = "c" + classId + "b";

	if (role == "student") {
		let teacher = clone.getElementById("teacher");
		getTeacher(teacher, classId);
	}


	let classDescription = clone.getElementById("class-description");
	classDescription.textContent = jsonObj["description"];
	classDescription.id = "c" + classId + "d";

	classList.appendChild(clone);

}

function getTeacher(node, classId) {
	var httpTeacher = new XMLHttpRequest();

	httpTeacher.open('GET', "get_teacher_by_class_id.php?class_id=" + classId, true);
	httpTeacher.setRequestHeader('Content-Type', 'application/json');
	httpTeacher.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	httpTeacher.onreadystatechange = function () {
		if (httpTeacher.readyState == 4 && httpTeacher.status == 200) {
			// console.log(httpTeacher.responseText);
			var result = JSON.parse(httpTeacher.responseText);
			node.textContent = result["username"];
			node.setAttribute("href", "profile.html?id=" + result["user_id"]);
		}
	}
	httpTeacher.send();
}