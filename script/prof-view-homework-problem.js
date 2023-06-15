const urlParams = new URLSearchParams(window.location.search);
const homeworkId = urlParams.get('hmkId');
const problemId = urlParams.get("problemId");
const problemType = urlParams.get("type");

document.getElementById("problem-id").textContent = problemId;

//username, status, studentid, comment

var http = new XMLHttpRequest();
http.open('GET', "get_prof_view_homework_problem.php?homework_id=" + homeworkId + "&problem_id=" + problemId, true);
http.setRequestHeader('Content-Type', 'application/json');
http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
http.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
http.onreadystatechange = function () {
	if (http.readyState == 4 && http.status == 200) {

		console.log(http.responseText)

		var result = JSON.parse(http.responseText);
		result.forEach(element => {
			displayStudentEntry(element);
			if (element["comment"]) {
				displayCommentTemplate(element);
			}
		});
	}
	if (http.readyState == 4 && http.status == 401) {
		window.location.assign("unauthorized.html");
	}
}
http.send();



function displayStudentEntry(jsonObj) {
	const userId = jsonObj["user_id"];

	const studentList = document.getElementById("student-list");
	const template = document.getElementById("student-entry-template");

	const clone = template.content.cloneNode(true);


	let username = clone.getElementById("entry-student-username");
	username.textContent = jsonObj["username"];
	username.id = "s" + userId + "un";


	let userImage = clone.getElementById("entry-student-pic");
	userImage.id = "s" + userId + "im";
	var httpImage = new XMLHttpRequest();
	httpImage.open('GET', "getImage2.php?id=" + userId, true);
	httpImage.setRequestHeader('Content-Type', 'application/json');
	httpImage.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	// httpImage.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
	httpImage.onreadystatechange = function () {
		if (httpImage.readyState == 4 && httpImage.status == 200) {
			// console.log(httpImage.responseText)
			userImage.setAttribute("src", httpImage.responseText);
		}
		// if (httpImage.readyState == 4 && httpImage.status == 401) {
		// 	window.location.assign("unauthorized.html");
		// }
	}
	httpImage.send();

	let classViewButton = clone.getElementById("entry-view-solution-button");
	classViewButton.setAttribute("onclick", "location.href = 'view-solution.html?homework_id=" + homeworkId +
		"&problem_id=" + problemId + "&student_id=" + userId + "\';");
	classViewButton.id = "s" + userId + "sb";

	let classDescription = clone.getElementById("entry-solution-status");
	classDescription.textContent = jsonObj["status"];
	classDescription.id = "s" + userId + "s";

	studentList.appendChild(clone);
}

function displayCommentTemplate(jsonObj) {

}

