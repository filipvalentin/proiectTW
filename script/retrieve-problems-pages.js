var pages = 0;
var currentPage = 1;


function retrievePageNumbers() {
	var http = new XMLHttpRequest();

	var url = "get_my_problems_pages.php" +
		"?filterWords=" + filterWords +
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
			pages = parseInt(http.responseText);
			
			updatePageNumbers();

		}
		if (http.readyState == 4 && http.status == 401) {
			console.log(http.responseText);
			// window.location.assign("unauthorized.html");
		}

	}

	http.send();
}

function updatePageNumbers() {
	//< [] >

	const pageSelector = document.getElementById("page-selector");

	for (const page in [...Array(pages).keys()]) {
		const option = document.createElement("option");

		option.textContent = parseInt(page) + 1;

		pageSelector.appendChild(option);

	}

	pageSelector.value = currentPage;

}


function backPageButtonClicked() {

	const pageSelector = document.getElementById("page-selector");

	if(currentPage > 1){
		currentPage -= 1;
	}

	pageSelector.value = currentPage;

	updateProblemList();

}

function nextPageButtonClicked() {
	const pageSelector = document.getElementById("page-selector");

	if(currentPage < pages){
		currentPage += 1;
	}

	pageSelector.value = currentPage;
	
	updateProblemList();
}

function pageSelectorClicked(){
	const pageSelector = document.getElementById("page-selector");
	currentPage = pageSelector.value;

	updateProblemList();
}


function updateProblemList() {
	const problemList = document.getElementById("problem-list");
	problemList.replaceChildren();
	retrieveProblems(currentPage);
}