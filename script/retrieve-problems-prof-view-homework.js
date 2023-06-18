
const urlParams = new URLSearchParams(window.location.search);
const homework_id = urlParams.get('id');

const JWT = parseJwt(localStorage.getItem("JWT"));
const role = JWT["role"];

var http = new XMLHttpRequest();
http.open('GET', "../php/get_homework.php?id=" + homework_id, true);
http.setRequestHeader('Content-Type', 'application/json');
http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
http.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
http.onreadystatechange = function () {
	if (http.readyState == 4 && http.status == 200) {
		var result = JSON.parse(http.responseText);
		document.getElementById("hmk-title").textContent = result[0]["title"];
		document.getElementById("hmk-deadline").textContent = result[0]["deadline"];
	}
	if (http.readyState == 4 && http.status == 401) {
		window.location.assign("unauthorized.html");
	}
}
http.send();


var httpCustomProblems = new XMLHttpRequest();
httpCustomProblems.open('GET', "../php/get_homework_custom_problems_info.php?id=" + homework_id, true);
httpCustomProblems.setRequestHeader('Content-Type', 'application/json');
httpCustomProblems.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
httpCustomProblems.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
httpCustomProblems.onreadystatechange = function () {
	if (httpCustomProblems.readyState == 4 && httpCustomProblems.status == 200) {
		// console.log(httpCustomProblems.responseText);
		var result = JSON.parse(httpCustomProblems.responseText);
		const customProblemResultList = document.getElementById("custom-problem-list");
		result.forEach(element => {
			displayProblemEntry(element, customProblemResultList, "custom");
		});
	}
	if (httpCustomProblems.readyState == 4 && httpCustomProblems.status == 401) {
		window.location.assign("unauthorized.html");
	}
}
httpCustomProblems.send();


var httpAssignedProblems = new XMLHttpRequest();
httpAssignedProblems.open('GET', "../php/get_homework_assigned_problems_info.php?id=" + homework_id, true);
httpAssignedProblems.setRequestHeader('Content-Type', 'application/json');
httpAssignedProblems.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
httpAssignedProblems.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
httpAssignedProblems.onreadystatechange = function () {
	if (httpAssignedProblems.readyState == 4 && httpAssignedProblems.status == 200) {
		// console.log(httpAssignedProblems.responseText);
		var result = JSON.parse(httpAssignedProblems.responseText);
		const assignedProblemResultList = document.getElementById("assigned-problem-list");
		result.forEach(element => {
			displayProblemEntry(element, assignedProblemResultList, "assigned");
		});
	}
	if (httpAssignedProblems.readyState == 4 && httpAssignedProblems.status == 401) {
		window.location.assign("unauthorized.html");
	}
}
httpAssignedProblems.send();


function displayProblemEntry(jsonObj, parent, type) {
	const template = document.getElementById("entry-template");
	const clone = template.content.cloneNode(true);

	const problemId = jsonObj["id"];

	let problemIdNode = clone.getElementById("problem-item-div");
	problemIdNode.id = "p" + problemId;

	let problemTitle = clone.getElementById("problem-title");
	problemTitle.textContent = jsonObj["title"];
	problemTitle.id = "p" + problemId + "t";

	let problemIdLabel = clone.getElementById("problem-id");
	problemIdLabel.textContent = problemId;
	problemIdLabel.id = "p" + problemId + "id";

	let problemGotoButton = clone.getElementById("problem-goto-button");
	if(role == "teacher"){
		problemGotoButton.setAttribute("onclick", "location.href = 'prof-view-homework-problem.html?hmkId=" + homework_id + "&problemId=" + problemId + "&type=" + type + "\';")
	}
	else if(role == "student"){
		problemGotoButton.setAttribute("onclick", "location.href = 'student-view-homework-problem.html?hmkId=" + homework_id + "&problemId=" + problemId + "&type=" + type + "&intent=solve\';")
	}
	problemGotoButton.id = "p" + problemId + "t";

	parent.appendChild(clone);
}