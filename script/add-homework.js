//STEP 1

var problems = new Array();

function addNewCustomProblem() {

	const problemId = problems.length + 1;
	problems.push(problemId);

	const customProblemList = document.getElementById("custom-problems-list");
	const template = document.getElementById("custom-problem-template");

	const clone = template.content.cloneNode(true);


	let problemIdNode = clone.getElementById("custom-problem-id");
	problemIdNode.id = "p" + problemId;

	let problemTitle = clone.getElementById("new-problem-title");
	problemTitle.id = "p" + problemId + "t";

	let problemDifficulty = clone.getElementById("new-problem-difficulty-selector");
	problemDifficulty.id = "p" + problemId + "df";


	let problemTags = clone.getElementById("new-problem-tags");
	problemTags.id = "p" + problemId + "tg";

	let problemDescription = clone.getElementById("new-problem-description");
	problemDescription.id = "p" + problemId + "dsc";

	let problemDiscardButton = clone.getElementById("new-problem-discard-button");
	problemDiscardButton.setAttribute("onclick", "discardProblem(\'" + problemId + "\')");
	problemDiscardButton.id = "p" + problemId + "discard";


	customProblemList.appendChild(clone);

}

function discardProblem(id) {
	const customProblemList = document.getElementById("custom-problems-list");
	const customProblem = document.getElementById("p" + id);
	customProblemList.removeChild(customProblem);
}




// STEP 2


//global
var problemResultJson = null;
var selectedProblems = new Array();


function retrieveProblems() {

	const easyDifficultyCheckbox = document.getElementById("easy-dif-ckb").checked;
	const mediumDifficultyCheckbox = document.getElementById("medium-dif-ckb").checked;
	const hardDifficultyCheckbox = document.getElementById("hard-dif-ckb").checked;

	const searchByIdOrName = document.getElementById("search-by-id-or-name").value;
	const searchByTags = document.getElementById("search-by-tags").value;

	var tags = new Array();
	searchByTags.split(",").forEach(element => {
		element.split(" ").forEach(k => {
			if (k) {
				tags.push(k);
			}
		});
	});


	var http = new XMLHttpRequest();

	http.open('POST', "get_verified_problems.php", true);

	http.setRequestHeader('Content-Type', 'application/json');
	http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	http.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));


	var data = {
		by_id_or_name: searchByIdOrName,
		by_tags: tags,
		easy: easyDifficultyCheckbox,
		medium: mediumDifficultyCheckbox,
		hard: hardDifficultyCheckbox
	}

	const json = JSON.stringify(data);

	http.onreadystatechange = function () {//Call a function when the state changes.
		if (http.readyState == 4 && http.status == 200) {

			// console.log(http.responseText);

			problemResultJson = JSON.parse(http.responseText);

			displayResultListOnPages();

		}
		if (http.readyState == 4 && http.status == 401) {
			window.location.assign("unauthorized.html");
		}

	}

	http.send(json);

}

const resultList = document.getElementById("result-list");

function displayResultListOnPages() {


	const childDivs = resultList.childNodes;

	childDivs.forEach((div) => {

		if (div.id!=null && !selectedProblems.includes(div.id)) {
			resultList.removeChild(div);
		}
	});


	problemResultJson.forEach(json => {
		
		if (!selectedProblems.includes("p" + json["id"])){
			console.log("p" + json["id"]);
			displayAssignmentProblem(json);
		}
		console.log(" ");
	})

}



function displayAssignmentProblem(jsonObj) {

	const entryID = jsonObj["id"];

	const template = document.getElementById("entry-template");

	const clone = template.content.cloneNode(true);


	let problemIdNode = clone.getElementById("entry-id");
	problemIdNode.id = "p" + entryID;

	let problemCheckbox = clone.getElementById("assigned-problem-checkbox");
	problemCheckbox.id = "p" + entryID + "chkb";
	problemCheckbox.addEventListener("change", function () {
		if (this.checked) {
			selectedProblems.push(this.parentNode.parentNode.parentNode.id);
		} else {
			const index = selectedProblems.indexOf(this.parentNode.parentNode.parentNode.id);
			if (index > -1) {
				selectedProblems.splice(index, 1); //scoate id-ul deselectat
			}
		}
		console.log(selectedProblems);
	});


	let problemTitle = clone.getElementById("entry-title");
	problemTitle.textContent = jsonObj["title"];
	problemTitle.id = "p" + entryID + "t";

	let problemDifficulty = clone.getElementById("entry-difficulty");
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
	problemDifficulty.id = "p" + entryID + "df";

	let problemTags = clone.getElementById("entry-tags");
	problemTags.textContent = jsonObj["tags"];
	problemTags.id = "p" + entryID + "tg";

	let problemIdLabel = clone.getElementById("entry-label");
	problemIdLabel.textContent = jsonObj["id"];
	problemIdLabel.id = "p" + entryID + "tg";

	let problemViewButton = clone.getElementById("entry-view-button");
	problemViewButton.setAttribute("onclick", "location.href = 'view-problem.html?problem=" + entryID + "\';");
	problemViewButton.id = "p" + entryID + "b";

	// console.log(jsonObj["title"]);
	resultList.appendChild(clone);

}





// SUBMIT LOGIC

function subitHomework(){

}