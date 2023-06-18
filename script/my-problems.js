
const itemsOnPageElem = document.getElementById("items-on-page");
itemsOnPageElem.value = itemsOnPage;
itemsOnPageElem.addEventListener("focusout",
	(event) => {
		itemsOnPage = event.target.value;

		// retrieveProblems(1,itemsOnPage);
		// updatePageNumbersWrapper();
		// updateProblemList();
		retrieveNumberOfProblems();
	}
);

itemsOnPageElem.addEventListener("keyup", (event) => {
	if (event.key === "Enter") {
		event.target.blur();
		// event.target.dispatchEvent(new Event("focusout"));

	}
});



function correctInput() {
	itemsOnPageElem.value = itemsOnPageElem.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
}

const checkboxDifficultyEasy = document.getElementById("chk1");
const checkboxDifficultyMedium = document.getElementById("chk2");
const checkboxDifficultyHard = document.getElementById("chk3");

function setDifficulty(id) {

	if (id == "chk1") {
		checkboxDifficultyMedium.checked = false;
		checkboxDifficultyHard.checked = false;
		if (checkboxDifficultyEasy.checked) {
			filterDifficulty = "EASY";
		}
		else {
			filterDifficulty = null;
		}

	}
	else if (id == "chk2") {
		checkboxDifficultyEasy.checked = false;
		checkboxDifficultyHard.checked = false;

		if (checkboxDifficultyMedium.checked) {
			filterDifficulty = "MEDIUM";
		}
		else {
			filterDifficulty = null;
		}
	}
	else if (id == "chk3") {
		checkboxDifficultyEasy.checked = false;
		checkboxDifficultyMedium.checked = false;

		if (checkboxDifficultyHard.checked) {
			filterDifficulty = "HARD";
		}
		else {
			filterDifficulty = null;
		}
	}
}


// globale din retrieve-problems.js
// var filterWords = null;
// var filerDifficulty = null;
// var filterTags = null;
// var filterStartDate = null;
// var filterEndDate = null;

function updateGlobalParams() {
	filterWords = document.getElementById("filter-by-words-input").value;
	if (filterWords == "") {
		filterWords = null;
	}

	filterTags = document.getElementById("filter-by-tags-input").value;
	if (filterTags == "") {
		filterTags = null;
	}

	filterStartDate = document.getElementById("filter-by-start-date").value;
	if (filterStartDate == "") {
		filterStartDate = null;
	}

	filterEndDate = document.getElementById("filter-by-end-date").value;
	if (filterEndDate == "") {
		filterEndDate = null;
	}

}

function searchWithFilters() {

	updateGlobalParams();

	retrieveNumberOfProblems();

}

retrieveMyProblemsStats();

function retrieveMyProblemsStats() {
	var httpGetStats = new XMLHttpRequest();

	httpGetStats.open('GET', "get_my_problems_stats.php", true);

	//Send the proper header information along with the request
	httpGetStats.setRequestHeader('Content-Type', 'application/json');
	httpGetStats.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	httpGetStats.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));

	httpGetStats.onreadystatechange = function () {//Call a function when the state changes.
		if (httpGetStats.readyState == 4 && httpGetStats.status == 200) {

			// console.log(httpGetStats.responseText);

			var result = JSON.parse(httpGetStats.responseText);
			document.getElementById("submissions-label").textContent = result["problem_count"];
			document.getElementById("approved-label").textContent = result["verified_count"];
		}
		if (httpGetStats.readyState == 4 && httpGetStats.status == 401) {
			window.location.assign("unauthorized.html");
		}
	}
	httpGetStats.send();
}