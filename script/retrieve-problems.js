var filterWords = null;
var filerDifficulty = null;
var filterTags = null;
var filterStartDate = null;
var filterEndDate = null;

var lastRetrievedIds = null;

//and display them
function retrieveProblems(pageCountMultiplier, itemsOnPage) {
	var http = new XMLHttpRequest();

	//standardul este ca am 5 (sau mai putine) probleme pe pagina
	var url = "get_my_problems.php?page=" + pageCountMultiplier + 
		"&itemsOnPage=" + itemsOnPage+
		"&filterWords=" + filterWords +
		"&filerDifficulty=" + filerDifficulty +
		"&filterTags=" + filterTags +
		"&filterStartDate=" + filterStartDate +
		"&filterEndDate=" + filterEndDate;
	// console.log(url.toString());
	http.open('GET', url.toString(), true);

	//Send the proper header information along with the request
	http.setRequestHeader('Content-Type', 'application/json');
	http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	http.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));

	http.onreadystatechange = function () {//Call a function when the state changes.
		if (http.readyState == 4 && http.status == 200) {

			// console.log(http.responseText);

			var result = JSON.parse(http.responseText);

			lastRetrievedIds = new Array();

			result.forEach(element => {
				displayProblem(element);
				lastRetrievedIds.push("p" + element["id"]);
			});

			// console.log(lastRetrievedIds);

		}
		if (http.readyState == 4 && http.status == 401) {
			console.log(http.responseText);
			// window.location.assign("unauthorized.html");
		}

	}

	http.send();
}


// TODO
function applyFilters(){

}


function displayProblem(jsonObj) {
	// console.log(jsonObj);

	const problemId = jsonObj["id"];

	const problemSection = document.getElementById("problem-list");
	const template = document.getElementById("problem-template");

	const clone = template.content.cloneNode(true);


	let problemIdNode = clone.getElementById("problem-id");
	problemIdNode.id = "p" + problemId;

	let problemTitle = clone.getElementById("problem-title");
	problemTitle.textContent = jsonObj["title"];
	problemTitle.id = "p" + problemId + "t";

	let problemDifficulty = clone.getElementById("problem-difficulty");
	let difficulty = jsonObj["difficulty"];
	switch (difficulty) {
		case "EASY":
			problemDifficulty.classList.add("difficulty-easy");
			break;
		case "MEDIUM":
			problemDifficulty.classList.add("difficulty-medium");
			break;
		case "HARD":
			problemDifficulty.classList.add("difficulty-hard");
	}
	problemDifficulty.textContent = difficulty;
	problemDifficulty.id = "p" + problemId + "df";


	let problemTags = clone.getElementById("problem-tags");
	problemTags.textContent = jsonObj["tags"];
	problemTags.id = "p" + problemId + "tg";

	let problemDescription = clone.getElementById("problem-description");
	problemDescription.textContent = jsonObj["description"].substring(0, 200) + "...";
	problemDescription.id = "p" + problemId + "dsc";

	let problemViewButton = clone.getElementById("problem-view-button");
	problemViewButton.setAttribute("onclick", "location.href = 'view-problem.html?problem=" + problemId + "\';");
	problemViewButton.id = "p" + problemId + "b";

	let problemStatus = clone.getElementById("problem-status");
	problemStatus.textContent = jsonObj["status"];
	problemStatus.id = "p" + problemId + "s";

	// console.log(jsonObj["title"]);
	problemSection.appendChild(clone);


}