const urlParams = new URLSearchParams(window.location.search);
const homeworkId = urlParams.get('hmkId');
const problemId = urlParams.get("problemId");
const problemType = urlParams.get("type");

document.getElementById("problem-id").textContent = problemId;

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
			document.getElementById("problem-title").textContent = result[0]["title"];
			document.getElementById("problem-difficulty").textContent = result[0]["difficulty"];
			document.getElementById("problem-tags").textContent = result[0]["tags"];
			document.getElementById("description").textContent = result[0]["description"].substring(0, 100) + "...";
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





var average =  0;

//username, status, studentid, comment
var userImages = new Map();

var httpInitiatePage = new XMLHttpRequest();
httpInitiatePage.open('GET', "get_prof_view_homework_problem.php?homework_id=" + homeworkId + "&problem_id=" + problemId, true);
httpInitiatePage.setRequestHeader('Content-Type', 'application/json');
httpInitiatePage.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
httpInitiatePage.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
httpInitiatePage.onreadystatechange = function () {
	if (httpInitiatePage.readyState == 4 && httpInitiatePage.status == 200) {

		// console.log(httpInitiatePage.responseText)

		var result = JSON.parse(httpInitiatePage.responseText);
		result.forEach(element => {
			displayStudentEntry(element);

			if (element["comment"]) {
				displayCommentTemplate(element);
			}
		});
		
	}
	if (httpInitiatePage.readyState == 4 && httpInitiatePage.status == 401) {
		window.location.assign("unauthorized.html");
	}
}
httpInitiatePage.send();


function displayAverageStars(){
	//TODO
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

	let classViewButton = clone.getElementById("entry-view-solution-button");
	classViewButton.setAttribute("onclick", "location.href = 'view-solution.html?homework_id=" + homeworkId +
		"&problem_id=" + problemId + "&problem_type=" + problemType + "&student_id=" + userId + "\';");
	classViewButton.id = "s" + userId + "sb";

	let classDescription = clone.getElementById("entry-solution-status");
	classDescription.textContent = jsonObj["status"];
	classDescription.id = "s" + userId + "s";

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

	average += parseInt(rating);

	studentList.appendChild(clone);
}

function displayCommentTemplate(jsonObj) {
	const userId = jsonObj["user_id"];

	const commentList = document.getElementById("comment-section");
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


	let commentDeleteButton = clone.getElementById("comment-delete-button");
	commentDeleteButton.setAttribute("onclick", "deleteComment(\'" + homeworkId + "\',\'" + problemId + "\',\'" + userId + "\')");
	commentDeleteButton.id = "cm" + userId + "dcb";

	let commentDateAdded = clone.getElementById("comment-post-date");
	commentDateAdded.textContent = jsonObj["added_at"];
	commentDateAdded.id = "cm" + userId + "s";

	let commentText = clone.getElementById("comment-message");
	commentText.textContent = jsonObj["comment"];
	commentText.id = "cm" + userId + "txt";



	commentList.appendChild(clone);
}


function deleteComment(hmkId, problemId, userId) {

	var httpDeleteComment = new XMLHttpRequest();
	httpDeleteComment.open('DELETE', "remove_user_comment.php", true);
	httpDeleteComment.setRequestHeader('Content-Type', 'application/json');
	httpDeleteComment.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	httpDeleteComment.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));

	var data = {
		homework_id: hmkId,
		problem_id: problemId,
		user_id: userId
	}

	const json = JSON.stringify(data);

	httpDeleteComment.onreadystatechange = function () {
		if (httpDeleteComment.readyState == 4 && httpDeleteComment.status == 200) {
			window.location.assign(window.location);
		}
		if (httpDeleteComment.readyState == 4 && httpDeleteComment.status == 401) {
			window.location.assign("unauthorized.html");
		}
	}
	httpDeleteComment.send(json)
}
