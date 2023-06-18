const urlParams = new URLSearchParams(window.location.search);
const homeworkId = urlParams.get('hmkId');
const problemId = urlParams.get("problemId");
const problemType = urlParams.get("type");

var turnedIn = 0;
var remainingToScore = 0;
var scored = 0;

document.getElementById("problem-id").textContent = problemId;

//update problem title and short description
if (problemType == "custom" || problemType == "assigned") {
	var httpProblemDescription = new XMLHttpRequest();
	httpProblemDescription.open('GET', "get_homework_problem_info.php?homework_id=" + homeworkId + "&problem_id=" + problemId + "&problem_type=" + problemType, true);
	httpProblemDescription.setRequestHeader('Content-Type', 'application/json');
	httpProblemDescription.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	httpProblemDescription.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
	httpProblemDescription.onreadystatechange = function () {
		if (httpProblemDescription.readyState == 4 && httpProblemDescription.status == 200) {

			// console.log(httpProblem.responseText)
			var result = JSON.parse(httpProblemDescription.responseText);
			document.getElementById("problem-title").textContent = result[0]["title"];
			document.getElementById("problem-difficulty").textContent = result[0]["difficulty"];
			document.getElementById("problem-tags").textContent = result[0]["tags"];
			document.getElementById("description").textContent = result[0]["description"].substring(0, 100) + "...";
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





var sumOfStars = 0;
var numberOfStudents = 0;

//username, status, studentid, comment

var httpGetStudents = new XMLHttpRequest();
httpGetStudents.open('GET', "get_prof_view_homework_problem.php?homework_id=" + homeworkId + "&problem_id=" + problemId, true);
httpGetStudents.setRequestHeader('Content-Type', 'application/json');
httpGetStudents.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
httpGetStudents.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
httpGetStudents.onreadystatechange = function () {
	if (httpGetStudents.readyState == 4 && httpGetStudents.status == 200) {

		// console.log(httpGetStudents.responseText);

		var result = JSON.parse(httpGetStudents.responseText);
		result.forEach(element => {
			displayStudentEntry(element);

			getComments(element["user_id"]);
		});

		displayStats();
	}
	if (httpGetStudents.readyState == 4 && httpGetStudents.status == 401) {
		window.location.assign("unauthorized.html");
	}
}
httpGetStudents.send();


function getComments(userId) {
	var httpGetComments = new XMLHttpRequest();
	httpGetComments.open('GET', "get_homework_problem_comments.php?homework_id=" + homeworkId + "&problem_id=" + problemId + "&user_id=" + userId, true);
	httpGetComments.setRequestHeader('Content-Type', 'application/json');
	httpGetComments.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	httpGetComments.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
	httpGetComments.onreadystatechange = function () {
		if (httpGetComments.readyState == 4 && httpGetComments.status == 200) {

			// console.log(httpGetComments.responseText);

			var result = JSON.parse(httpGetComments.responseText);
			result.forEach(element => {
				displayCommentTemplate(element, userId);
			});

		}
		if (httpGetComments.readyState == 4 && httpGetComments.status == 401) {
			window.location.assign("unauthorized.html");
		}
	}
	httpGetComments.send();

}


function displayAverageStars() {
	const average = Math.ceil(sumOfStars / numberOfStudents);

	let star1 = document.getElementById("avg-rating-star1");
	if (average > 0) {
		star1.classList.add("checked");
	}

	let star2 = document.getElementById("avg-rating-star2");
	if (average > 1) {
		star2.classList.add("checked");
	}

	let star3 = document.getElementById("avg-rating-star3");
	if (average > 2) {
		star3.classList.add("checked");
	}

	let star4 = document.getElementById("avg-rating-star4");
	if (average > 3) {
		star4.classList.add("checked");
	}

	let star5 = document.getElementById("avg-rating-star5");
	if (average > 4) {
		star5.classList.add("checked");
	}
}


function displayStats(){
	document.getElementById("students-turn-in").textContent = turnedIn;
	document.getElementById("number-of-students").textContent = scored+remainingToScore;
	document.getElementById("scored-solutions").textContent = scored;
	document.getElementById("number-of-solutions").textContent = scored+remainingToScore;
	
	displayAverageStars();
}


function displayStudentEntry(jsonObj) {
	const userId = jsonObj["user_id"];

	const studentList = document.getElementById("student-list");
	const template = document.getElementById("student-entry-template");

	const clone = template.content.cloneNode(true);


	let username = clone.getElementById("entry-student-username");
	username.setAttribute("href", "profile.html?id=" + userId);
	username.textContent = jsonObj["username"];
	username.id = "s" + userId + "un";


	let userImage = clone.getElementById("entry-student-pic");
	userImage.id = "s" + userId + "im";
	var httpImage = new XMLHttpRequest();
	httpImage.open('GET', "get_image_unauthorized.php?id=" + userId, true);
	httpImage.setRequestHeader('Content-Type', 'application/json');
	httpImage.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	// httpImage.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
	httpImage.onreadystatechange = function () {
		if (httpImage.readyState == 4 && httpImage.status == 200) {
			userImage.setAttribute("src", httpImage.responseText);
		}

	}
	httpImage.send();

	let userSolutionViewButton = clone.getElementById("entry-view-solution-button");
	userSolutionViewButton.setAttribute("onclick", "location.href = 'view-solution.html?homework_id=" + homeworkId +
		"&problem_id=" + problemId + "&problem_type=" + problemType + "&student_id=" + userId + "\';");
	userSolutionViewButton.id = "s" + userId + "sb";

	let userSolutionStatus = clone.getElementById("entry-solution-status");
	if(jsonObj["status"]=="solved"){
		turnedIn++;
	}
	userSolutionStatus.textContent = jsonObj["status"];
	userSolutionStatus.id = "s" + userId + "s";

	let userSolutionScore = clone.getElementById("entry-solution-score");
	if (jsonObj["score"] == -1) {
		userSolutionScore.textContent = "unscored";
		remainingToScore++;
	}
	else {
		userSolutionScore.textContent = jsonObj["score"];
		scored++;
	}

	userSolutionScore.id = "s" + userId + "s";

	const rating = jsonObj["rating"];
	let star1 = clone.getElementById("star1");
	star1.id = "sstar1" + userId;
	if (rating > 0) {
		star1.classList.add("checked");
	}

	let star2 = clone.getElementById("star2");
	star2.id = "sstar2" + userId;
	if (rating > 1) {
		star2.classList.add("checked");
	}

	let star3 = clone.getElementById("star3");
	star3.id = "sstar2" + userId;
	if (rating > 2) {
		star3.classList.add("checked");
	}

	let star4 = clone.getElementById("star4");
	star4.id = "sstar2" + userId;
	if (rating > 3) {
		star4.classList.add("checked");
	}

	let star5 = clone.getElementById("star5");
	star2.id = "sstar5" + userId;
	if (rating > 4) {
		star5.classList.add("checked");
	}

	sumOfStars += parseInt(rating);
	numberOfStudents += 1;


	studentList.appendChild(clone);
}

function displayCommentTemplate(jsonObj, userId) {

	const commentList = document.getElementById("comment-section");
	const template = document.getElementById("comment-template");

	const clone = template.content.cloneNode(true);

	const commentId = jsonObj["comment_id"];

	let username = clone.getElementById("comment-username");
	username.textContent = jsonObj["username"];
	username.setAttribute("href", "profile.html?id=" + userId);
	username.id = "cm" + userId + commentId + "un";


	let userImage = clone.getElementById("comment-user-pic");
	userImage.id = "cm" + userId + commentId + "im";
	var httpImage = new XMLHttpRequest();
	httpImage.open('GET', "get_image_unauthorized.php?id=" + userId, true);
	httpImage.setRequestHeader('Content-Type', 'application/json');
	httpImage.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	// httpImage.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
	httpImage.onreadystatechange = function () {
		if (httpImage.readyState == 4 && httpImage.status == 200) {
			userImage.setAttribute("src", httpImage.responseText);
		}
	}
	httpImage.send();


	let commentDeleteButton = clone.getElementById("comment-delete-button");
	commentDeleteButton.setAttribute("onclick", "deleteComment(\'" + homeworkId + "\',\'" + problemId + "\',\'" + userId + "\',\'" + commentId + "\')");
	commentDeleteButton.id = "cm" + userId + commentId + "dcb";

	let commentDateAdded = clone.getElementById("comment-post-date");
	commentDateAdded.textContent = jsonObj["comment_date"];
	commentDateAdded.id = "cm" + userId + commentId + "s";

	let commentText = clone.getElementById("comment-message");
	commentText.textContent = jsonObj["comment"];
	commentText.id = "cm" + userId + commentId + "txt";



	commentList.appendChild(clone);
}


function deleteComment(hmkId, problemId, userId, commentId) {

	var httpDeleteComment = new XMLHttpRequest();
	httpDeleteComment.open('DELETE', "remove_user_comment.php", true);
	httpDeleteComment.setRequestHeader('Content-Type', 'application/json');
	httpDeleteComment.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	httpDeleteComment.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));

	var data = {
		homework_id: hmkId,
		problem_id: problemId,
		user_id: userId,
		comment_id: commentId
	}

	const json = JSON.stringify(data);

	httpDeleteComment.onreadystatechange = function () {
		if (httpDeleteComment.readyState == 4 && httpDeleteComment.status == 200) {
			// console.log(httpDeleteComment.responseText);
			window.location.assign(window.location);
		}
		if (httpDeleteComment.readyState == 4 && httpDeleteComment.status == 401) {
			window.location.assign("unauthorized.html");
		}
	}
	httpDeleteComment.send(json)
}
