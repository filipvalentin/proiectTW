
const urlParams = new URLSearchParams(window.location.search);

const homeworkId = urlParams.get('hmkId');
const problemId = urlParams.get("problemId");
const problemType = urlParams.get("type");
var windowIntent = urlParams.get("intent");

if (windowIntent == "solve") {
	switchSolve();
}
else if (windowIntent == "comments") {
	switchComments();
}


function switchSolve() {
	document.getElementById("solve-panel").style.display = "block";

	document.getElementById("comments-panel").style.display = "none";

	document.getElementById("solve-goto-button").classList.add("active");
	document.getElementById("comments-goto-button").classList.remove("active");

	urlParams.set("intent", "solve");

	const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + urlParams.toString()
	window.history.replaceState({ path: newUrl }, "", newUrl);
}

function switchComments() {
	document.getElementById("solve-panel").style.display = "none";

	document.getElementById("comments-panel").style.display = "block";

	document.getElementById("solve-goto-button").classList.remove("active");
	document.getElementById("comments-goto-button").classList.add("active");

	urlParams.set("intent", "comments");
	const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + urlParams.toString()
	window.history.replaceState({ path: newUrl }, "", newUrl);

}

var canSubmit = true;

function submitSolution() {


	if (!canSubmit) {
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



function sendRating() {
	var httpSendRating = new XMLHttpRequest();
	httpSendRating.open('PUT', "update_rating.php", true);
	httpSendRating.setRequestHeader('Content-Type', 'application/json');
	httpSendRating.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	httpSendRating.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));

	var data = {
		hmk_id: homeworkId,
		problem_id: problemId,
		rating: rating
	}

	const json = JSON.stringify(data);

	httpSendRating.onreadystatechange = function () {
		if (httpSendRating.readyState == 4 && httpSendRating.status == 200) {
			console.log(httpSendRating.responseText);
			window.location.assign(window.location);
		}
		if (httpSendRating.readyState == 4 && httpSendRating.status == 401) {
			window.location.assign("unauthorized.html");
		}
	}
	httpSendRating.send(json);
}




function sendComment() {

	const comment = document.getElementById("new-comment-input").value;

	if (!comment) {
		alert("Cannot send an empty comment!"); //TODO
		return;
	}

	var httpSendComment = new XMLHttpRequest();
	httpSendComment.open('PUT', "add_homework_problem_comment.php", true);
	httpSendComment.setRequestHeader('Content-Type', 'application/json');
	httpSendComment.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	httpSendComment.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));

	var data = {
		homework_id: homeworkId,
		problem_id: problemId,
		comment: comment
	}

	const json = JSON.stringify(data);

	httpSendComment.onreadystatechange = function () {
		if (httpSendComment.readyState == 4 && httpSendComment.status == 200) {
			// console.log(httpSendComment.responseText);
			window.location.assign(location.protocol + '//' + location.host + location.pathname + "?" + urlParams.toString());
		}
		if (httpSendComment.readyState == 4 && httpSendComment.status == 401) {
			window.location.assign("unauthorized.html");
		}
	}
	httpSendComment.send(json);


}









if (problemType == "custom" || problemType == "assigned") {
	var httpProblemDescription = new XMLHttpRequest();
	httpProblemDescription.open('GET', "get_homework_problem_info.php?homework_id=" + homeworkId + "&problem_id=" + problemId + "&problem_type=" + problemType, true);
	httpProblemDescription.setRequestHeader('Content-Type', 'application/json');
	httpProblemDescription.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	httpProblemDescription.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
	httpProblemDescription.onreadystatechange = function () {
		if (httpProblemDescription.readyState == 4 && httpProblemDescription.status == 200) {

			// console.log(httpProblemDescription.responseText);
			var result = JSON.parse(httpProblemDescription.responseText);
			document.getElementById("description").textContent = result[0]["description"];
			document.getElementById("problem-title").textContent = result[0]["title"];
			document.getElementById("problem-difficulty").textContent = result[0]["difficulty"];
			document.getElementById("problem-tags").textContent = result[0]["tags"];

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



//VREAU DATELE TEMEI + PROBLEMEI SI CE A INTRODUS USERUL 
var httpProblem = new XMLHttpRequest();
httpProblem.open('GET', "get_hmk_problem_info_info.php?homework_id=" + homeworkId + "&problem_id=" + problemId, true);
httpProblem.setRequestHeader('Content-Type', 'application/json');
httpProblem.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
httpProblem.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
httpProblem.onreadystatechange = function () {
	if (httpProblem.readyState == 4 && httpProblem.status == 200) {

		console.log(httpProblem.responseText);

		var result = JSON.parse(httpProblem.responseText);
		document.getElementById("hmk-title").textContent = result[0]["title"];
		document.getElementById("solution").textContent = result[0]["solution"];

		displayRating(result[0]["rating"]);

		const deadline = new Date(result[0]["deadline"]);
		const now = new Date();
		if (deadline < now) {
			canSubmit = false;
		}
	}
	if (httpProblem.readyState == 4 && httpProblem.status == 401) {
		window.location.assign("unauthorized.html");
	}
}
httpProblem.send();


var httpGetComments = new XMLHttpRequest();
httpGetComments.open('GET', "get_homework_problem_comments.php?homework_id=" + homeworkId + "&problem_id=" + problemId, true);
httpGetComments.setRequestHeader('Content-Type', 'application/json');
httpGetComments.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
httpGetComments.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
httpGetComments.onreadystatechange = function () {
	if (httpGetComments.readyState == 4 && httpGetComments.status == 200) {

		// console.log(httpGetComments.responseText);

		var result = JSON.parse(httpGetComments.responseText);
		result.forEach(element => {
			displayCommentTemplate(element);
		});

	}
	if (httpGetComments.readyState == 4 && httpGetComments.status == 401) {
		window.location.assign("unauthorized.html");
	}
}
httpGetComments.send();



function displayCommentTemplate(jsonObj) {
	const user_id = jsonObj["user_id"];
	const comment_id = jsonObj["comment_id"];

	const commentList = document.getElementById("comment-list");
	const template = document.getElementById("comment-template");

	const clone = template.content.cloneNode(true);


	let username = clone.getElementById("comment-username");
	username.textContent = jsonObj["username"];
	username.setAttribute("href", "profile.html?id=" + user_id);
	username.id = "cm" + user_id + comment_id + "un";


	let userImage = clone.getElementById("comment-user-pic");
	userImage.id = "cm" + user_id + comment_id + "im";
	var httpImage = new XMLHttpRequest();
	httpImage.open('GET', "getImage2.php?id=" + user_id, true);
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
	commentDateAdded.id = "cm" + user_id + comment_id + "s";

	let commentText = clone.getElementById("comment-message");
	commentText.textContent = jsonObj["comment"];
	commentText.id = "cm" + user_id + comment_id + "txt";

	commentList.appendChild(clone);
}

