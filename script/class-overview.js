

var http = new XMLHttpRequest();

http.open('GET', "get_class_students.php?id=" + id, true);

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
			displayStudentEntry(element);
		});
	}
	else if (http.readyState == 4 && http.status == 401) {
		window.location.assign("unauthorized.html");
	}

}

if (canSend) {
	http.send();
}



function displayStudentEntry(jsonObj) {
	const userId = jsonObj["user_id"];

	const userTable = document.getElementById("user-table");
	const template = document.getElementById("entry-template");

	const clone = template.content.cloneNode(true);


	let username = clone.getElementById("entry-username");
	username.setAttribute("href", "profile.html?id=" + userId);
	username.textContent = jsonObj["username"];
	username.id = "sun" + userId;


	let userImage = clone.getElementById("entry-user-pic");
	userImage.id = "sup" + userId;
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

	let userAvgScore = clone.getElementById("entry-avg-score");
	displayUserAvgScore(userAvgScore, userId);
	userAvgScore.id = "ss" + userId;

	userTable.appendChild(clone);
}

function displayUserAvgScore(entryNode, userId) {
	var httpGetUserAvgScore = new XMLHttpRequest();
	httpGetUserAvgScore.open('GET', "get_student_avg_score.php?class_id=" + id + "&user_id=" + userId, true);
	httpGetUserAvgScore.setRequestHeader('Content-Type', 'application/json');
	httpGetUserAvgScore.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	httpGetUserAvgScore.onreadystatechange = function () {
		if (httpGetUserAvgScore.readyState == 4 && httpGetUserAvgScore.status == 200) {
			console.log(httpGetUserAvgScore.responseText);
			entryNode.textContent = httpGetUserAvgScore.responseText;
		}
	}
	httpGetUserAvgScore.send();
}