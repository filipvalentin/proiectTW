
function switchSolve() {
	document.getElementById("solve-panel").style.display = "block";

	document.getElementById("comments-panel").style.display = "none";

	document.getElementById("solve-goto-button").classList.toggle("active");
	document.getElementById("comments-goto-button").classList.toggle("active");
}

function switchComments() {
	document.getElementById("solve-panel").style.display = "none";

	document.getElementById("comments-panel").style.display = "block";

	document.getElementById("solve-goto-button").classList.toggle("active");
	document.getElementById("comments-goto-button").classList.toggle("active");
}

var canSubmit = true;

function submitSolution() {


	if(!canSubmit){
		alert("Deadline expired!"); //TODO finisare?!
		return;
	}

	var solution = document.getElementById("solution").value;
	var httpSendSolution = new XMLHttpRequest();
	httpSendSolution.open('POST', "submit_homework_problem_solution.php", true);
	httpSendSolution.setRequestHeader('Content-Type', 'application/json');
	httpSendSolution.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	httpSendSolution.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));

	var data = { //user id+role e trimis deja prin JWT
		homework_id: homeworkId,
		problem_id: problemId,
		solution: solution
	}

	const json = JSON.stringify(data);

	httpSendSolution.onreadystatechange = function () {
		if (httpSendSolution.readyState == 4 && httpSendSolution.status == 200) {
			// console.log(httpProblem.responseText)
			
			//TODO notificare de submitted
		}
		if (httpSendSolution.readyState == 4 && httpSendSolution.status == 401) {
			window.location.assign("unauthorized.html");
		}
	}
	httpSendSolution.send(json);

}


function sendRating(){
	
}


const urlParams = new URLSearchParams(window.location.search);
const homeworkId = urlParams.get('hmkId');
const problemId = urlParams.get("problemId");
const problemType = urlParams.get("type");






if (problemType == "custom" || problemType == "assigned") {
	var httpProblemDescription = new XMLHttpRequest();
	httpProblemDescription.open('GET', "get_homework_problem_info.php?homework_id=" + homeworkId + "&problem_id=" + problemId + "&problem_type=" + problemType, true);
	httpProblemDescription.setRequestHeader('Content-Type', 'application/json');
	httpProblemDescription.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	httpProblemDescription.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
	httpProblemDescription.onreadystatechange = function () {
		if (httpProblemDescription.readyState == 4 && httpProblemDescription.status == 200) {

			console.log(httpProblemDescription.responseText);
			var result = JSON.parse(httpProblemDescription.responseText);
			document.getElementById("description").textContent = result[0]["description"].substring(0, 100) + "...";
			document.getElementById("problem-title").textContent = result[0]["title"];

		}
		if (httpProblemDescription.readyState == 4 && httpProblemDescription.status == 401) {
			window.location.assign("unauthorized.html");
		}
	}
	httpProblemDescription.send();
}
else {
	window.location.assign("unauthorized.html");
}



//update problem title and short description

var httpProblem = new XMLHttpRequest();
httpProblem.open('GET', "get_hmk_problem_info_info.php?homework_id=" + homeworkId + "&problem_id=" + problemId + "&problem_type=" + problemType, true);
httpProblem.setRequestHeader('Content-Type', 'application/json');
httpProblem.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
httpProblem.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
httpProblem.onreadystatechange = function () {
	if (httpProblem.readyState == 4 && httpProblem.status == 200) {

		// console.log(httpProblem.responseText);

		var result = JSON.parse(httpProblem.responseText);

		document.getElementById("problem-difficulty").textContent = result["difficulty"];
		document.getElementById("problem-tags").textContent = result["tags"];
		document.getElementById("hmk-title").textContent = result["title"];

		document.getElementById("solution").textContent = result["solution"];

		const deadline = new Date(result["deadline"]);
		const now = new Date();
		if(deadline < now){
			canSubmit = false;
		}
	}
	if (httpProblem.readyState == 4 && httpProblem.status == 401) {
		window.location.assign("unauthorized.html");
	}
}
httpProblem.send();


var httpGetComments = new XMLHttpRequest();
httpGetComments.open('GET', "get_prof_view_homework_problem.php?homework_id=" + homeworkId + "&problem_id=" + problemId, true);
httpGetComments.setRequestHeader('Content-Type', 'application/json');
httpGetComments.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
httpGetComments.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
httpGetComments.onreadystatechange = function () {
	if (httpGetComments.readyState == 4 && httpGetComments.status == 200) {

		console.log(httpGetComments.responseText)

		var result = JSON.parse(httpGetComments.responseText);
		result.forEach(element => {
			if (element["comment"]) {
				displayCommentTemplate(element);
			}
		});
		
	}
	if (httpGetComments.readyState == 4 && httpGetComments.status == 401) {
		window.location.assign("unauthorized.html");
	}
}
httpGetComments.send();

function displayCommentTemplate(jsonObj) {
	const userId = jsonObj["user_id"];

	const commentList = document.getElementById("comment-list");
	const template = document.getElementById("comment-template");

	const clone = template.content.cloneNode(true);


	let username = clone.getElementById("comment-username");
	username.textContent = jsonObj["username"];
	username.setAttribute("href", "profile.html?id=" + userId);
	username.id = "cm" + userId + "un";


	let userImage = clone.getElementById("comment-user-pic");
	userImage.id = "cm" + userId + "im";
	var httpImage = new XMLHttpRequest();
	httpImage.open('GET', "getImage2.php?id=" + userId, true);
	httpImage.setRequestHeader('Content-Type', 'application/json');
	httpImage.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	// httpImage.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
	httpImage.onreadystatechange = function () {
		if (httpImage.readyState == 4 && httpImage.status == 200) {
			userImage.setAttribute("src", httpImage.responseText);
		}
	}
	httpImage.send();


	let commentDateAdded = clone.getElementById("comment-post-date");
	commentDateAdded.textContent = jsonObj["comment_date"];
	commentDateAdded.id = "cm" + userId + "s";

	let commentText = clone.getElementById("comment-message");
	commentText.textContent = jsonObj["comment"];
	commentText.id = "cm" + userId + "txt";



	commentList.appendChild(clone);
}