const urlParams = new URLSearchParams(window.location.search);
const homeworkId = urlParams.get('homework_id');
const problemId = urlParams.get("problem_id");
const problemType = urlParams.get("problem_type");
const studentId = urlParams.get("student_id");

const scoreInput = document.getElementById("score-input");
function correctInput() {
	scoreInput.value = scoreInput.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
	if (scoreInput.value > 100) {
		scoreInput.value = 100;
	}
	else if (scoreInput.value < 0) {
		scoreInput.value = 0;
	}
}

//update problem title and short description
if (problemType == "custom" || problemType == "assigned") {
	var httpProblem = new XMLHttpRequest();
	httpProblem.open('GET', "get_homework_problem_info.php?homework_id=" + homeworkId + "&problem_id=" + problemId + "&problem_type=" + problemType, true);
	httpProblem.setRequestHeader('Content-Type', 'application/json');
	httpProblem.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	httpProblem.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
	httpProblem.onreadystatechange = function () {
		if (httpProblem.readyState == 4 && httpProblem.status == 200) {
			// console.log(httpProblem.responseText)
			var result = JSON.parse(httpProblem.responseText);
			document.getElementById("problem-description").textContent = result[0]["description"];
		}
		if (httpProblem.readyState == 4 && httpProblem.status == 401) {
			window.location.assign("unauthorized.html");
		}
	}
	httpProblem.send();
}
else {
	window.location.assign("unauthorized.html");
}

var httpGetStudentSolution = new XMLHttpRequest();
httpGetStudentSolution.open('GET', "get_hmk_problem_info_info.php?homework_id=" + homeworkId + "&problem_id=" + problemId + "&user_id=" + studentId, true);
httpGetStudentSolution.setRequestHeader('Content-Type', 'application/json');
httpGetStudentSolution.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
httpGetStudentSolution.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
httpGetStudentSolution.onreadystatechange = function () {
	if (httpGetStudentSolution.readyState == 4 && httpGetStudentSolution.status == 200) {
		// console.log(httpGetStudentSolution.responseText);
		var result = JSON.parse(httpGetStudentSolution.responseText);
		document.getElementById("solution-body").textContent = result[0]["solution"];
		scoreInput.value = result[0]["score"];
	}
	if (httpGetStudentSolution.readyState == 4 && httpGetStudentSolution.status == 401) {
		window.location.assign("unauthorized.html");
	}
}
httpGetStudentSolution.send();


var httpGetUsername = new XMLHttpRequest();
httpGetUsername.open('GET', "getInformationId.php?id=" + studentId, true);
httpGetUsername.setRequestHeader('Content-Type', 'application/json');
httpGetUsername.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
httpGetUsername.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
httpGetUsername.onreadystatechange = function () {
	if (httpGetUsername.readyState == 4 && httpGetUsername.status == 200) {
		var result = JSON.parse(httpGetUsername.responseText);
		document.getElementById("student-username").textContent = result["username"];
	}
	if (httpGetUsername.readyState == 4 && httpGetUsername.status == 401) {
		window.location.assign("unauthorized.html");
	}
}
httpGetUsername.send();


function assignScore() {

	const score = document.getElementById("score-input").value;

	var httpSendScore = new XMLHttpRequest();
	httpSendScore.open('PUT', "set_student_hmk_problem_score.php", true);
	httpSendScore.setRequestHeader('Content-Type', 'application/json');
	httpSendScore.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	httpSendScore.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));

	var data = {
		homework_id: homeworkId,
		user_id: studentId,
		problem_id: problemId,
		score: score
	}
	const json = JSON.stringify(data);

	httpSendScore.onreadystatechange = function () {
		if (httpSendScore.readyState == 4 && httpSendScore.status == 200) {
			// console.log(httpSendScore.responseText);
			window.location.assign("prof-view-homework-problem.html?hmkId=" + homeworkId + "&problemId=" + problemId + "&type=" + problemType);
		}
		if (httpSendScore.readyState == 4 && httpSendScore.status == 401) {
			window.location.assign("unauthorized.html");
		}
	}
	httpSendScore.send(json);

}