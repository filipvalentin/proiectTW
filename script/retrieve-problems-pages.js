var pages = 0;
var currentPage = 1;
var itemsOnPage = 6;
var numberOfProblems = 0;

function updateProblemList() {
	const problemList = document.getElementById("problem-list");
	problemList.replaceChildren();

	// console.log(itemsOnPage, pages);
	retrieveProblems(currentPage, itemsOnPage);
}

//get the number of problems
function retrieveNumberOfProblems() {
	var http = new XMLHttpRequest();

	var url = "get_my_problems_problems_number.php" +
		"?filterWords=" + filterWords +
		"&filterDifficulty=" + filterDifficulty +
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

			console.log(http.responseText);

			numberOfProblems = http.responseText;
			updatePageNumbersWrapper(http.responseText);
			updateProblemList();
		}
		if (http.readyState == 4 && http.status == 401) {
			console.log(http.responseText);
			// window.location.assign("unauthorized.html");
		}

	}

	http.send();
}

function updatePageNumbersWrapper() {
	pages = Math.ceil(parseInt(numberOfProblems) / itemsOnPage);

	updatePageNumbers();
}

function updatePageNumbers() {
	//< [] >

	const pageSelector = document.getElementById("page-selector");
	pageSelector.replaceChildren();
	// console.log(pages);
	for (const page in [...Array(pages).keys()]) {
		const option = document.createElement("option");

		option.textContent = parseInt(page) + 1;

		pageSelector.appendChild(option);
	}

	// if (pages < currentPage) {
	// 	pageSelector.value = 1;
	// }
	// else {
		pageSelector.value = 1;
		currentPage = 1;
	// }
}


function backPageButtonClicked() {

	const pageSelector = document.getElementById("page-selector");

	if (currentPage > 1) {
		currentPage -= 1;
	}

	pageSelector.value = currentPage;

	updateProblemList();

}

function nextPageButtonClicked() {
	const pageSelector = document.getElementById("page-selector");

	if (currentPage < pages) {
		currentPage += 1;
	}

	pageSelector.value = currentPage;

	updateProblemList();
}

function pageSelectorClicked() {
	const pageSelector = document.getElementById("page-selector");
	currentPage = pageSelector.value;

	updateProblemList();
}


