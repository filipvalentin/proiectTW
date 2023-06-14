
var problems = new Array();

function addNewCustomProblem(){

	const problemId = problems.length + 1;
	problems.push(problemId);
	
	const customProblemList = document.getElementById("problem-list");
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
	problemDescription.textContent = jsonObj["description"].substring(1, 200) + "...";
	problemDescription.id = "p" + problemId + "dsc";

	let problemViewButton = clone.getElementById("problem-view-button");
	problemViewButton.setAttribute("onclick", "location.href = 'view-problem.html?problem=" + jsonObj["id"] + "\';");
	problemViewButton.id = "p" + problemId + "b";

	// console.log(jsonObj["title"]);
	customProblemList.appendChild(clone);

}