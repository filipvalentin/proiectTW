//STEP 1

const customProblemList = document.getElementById("custom-problems-list");
var customProblemsIds = new Array();

function addNewCustomProblem() {

	const problemId = customProblemsIds.length + 1;
	customProblemsIds.push(problemId);

	const template = document.getElementById("custom-problem-template");

	const clone = template.content.cloneNode(true);


	let problemIdNode = clone.getElementById("custom-problem-id");
	problemIdNode.id = "pc" + problemId;

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
	const customProblem = document.getElementById("pc" + id);
	customProblemList.removeChild(customProblem);
	
	const index = customProblemsIds.indexOf(id);
	if (index > -1) { 
		customProblemsIds.splice(index, 1);
	}

}




// STEP 2


//global
var problemResultJson = null;
var selectedProblemsIds = new Array();


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

	http.open('POST', "../php/get_verified_problems.php", true);

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

		if (div.id != null && !selectedProblemsIds.includes(div.id)) {
			resultList.removeChild(div);
		}
	});


	problemResultJson.forEach(json => {

		if (!selectedProblemsIds.includes("p" + json["id"])) {
			displayAssignmentProblem(json);
		}

	})

}



function displayAssignmentProblem(jsonObj) {

	const entryID = jsonObj["id"];

	const template = document.getElementById("entry-template");

	const clone = template.content.cloneNode(true);


	let problemIdNode = clone.getElementById("entry-id");
	problemIdNode.id = "pa" + entryID;

	let problemCheckbox = clone.getElementById("assigned-problem-checkbox");
	problemCheckbox.id = "p" + entryID + "chkb";
	problemCheckbox.addEventListener("change", function () {
		if (this.checked) {
			selectedProblemsIds.push(this.parentNode.parentNode.parentNode.id);
		} else {
			const index = selectedProblemsIds.indexOf(this.parentNode.parentNode.parentNode.id);
			if (index > -1) {
				selectedProblemsIds.splice(index, 1); //scoate id-ul deselectat
			}
		}
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

var canSubmit = true;

function submitHomework() {

	if (customProblemsIds.length == 0 && selectedProblemsIds.length == 0) {
		displayErrorNothingSelected();
	}
	else {
		document.getElementById("error-popup-nothng-selected").style.display = "none";
	}


	var customProblems = new Array();

	customProblemsIds.forEach(
		(customProblemId) => {
			const title = document.getElementById("p" + customProblemId + "t").value;
			if (!title)
				displayError();

			const difficulty = document.getElementById("p" + customProblemId + "df").value;
			const tags = document.getElementById("p" + customProblemId + "tg").value;
			const description = document.getElementById("p" + customProblemId + "dsc").value;

			customProblems.push(
				{
					title: title,
					tags: tags,
					difficulty: difficulty,
					description: description
				}
			);

		}
	);

	var assignedProblems = new Array();

	selectedProblemsIds.forEach((selectedProblemId) => {
		assignedProblems.push(selectedProblemId.substring(2));
	})


	const deadlineDate = document.getElementById("deadline-date-input").value;
	const deadlineTime = document.getElementById("deadline-hour-input").value;

	if (!deadlineDate || !deadlineTime) {
		displayErrorUnsetDeadline();
	}
	else {
		document.getElementById("error-popup-unset-deadline").style.display = "none";
	}


	const title = document.getElementById("homework-title-input").value;
	if (!title) {
		displayErrorNoTitle();
	}
	else {
		document.getElementById("error-popup-unset-title").style.display = "none";
	}


	if (!canSubmit) {
		return;
	}

	const data = {
		custom_problems: customProblems,
		assigned_problems: assignedProblems,
		deadline: deadlineDate + " " + deadlineTime,
		class_id: id, //nota: stiu ca id e destul de obscur, dar nu m-am gandit la asta cand am facut js-ul pentru page identification, deci ramane asa
		title: title
	}


	var http = new XMLHttpRequest();

	http.open('POST', "../php/add_homework.php", true);

	http.setRequestHeader('Content-Type', 'application/json');
	http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	http.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));


	const json = JSON.stringify(data);

	http.onreadystatechange = function () {
		if (http.readyState == 4 && http.status == 200) {
			// console.log(http.responseText);
			window.location.assign("class-admin-homeworks.html?id=" + id);
		}
		if (http.readyState == 4 && http.status == 401) {
			window.location.assign("unauthorized.html");
		}
	}

	http.send(json);


}

function displayError() {
	canSubmit = false;

	document.getElementById("error-popup").style.display = "block";
}

function displayErrorNothingSelected() {
	canSubmit = false;

	document.getElementById("error-popup-nothng-selected").style.display = "block";
}

function displayErrorUnsetDeadline() {
	canSubmit = false;

	document.getElementById("error-popup-unset-deadline").style.display = "block";
}

function displayErrorNoTitle() {
	canSubmit = false;

	document.getElementById("error-popup-unset-title").style.display = "block";
}
