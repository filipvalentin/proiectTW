
var currentPage = 1;
var itemsOnPage = 100;
var filterByTitleOrId = "";

retrieveProblems();

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("focusout",
	(event) => {
		document.getElementById("problem-list").replaceChildren();

		retrieveProblems();
	}
);
searchInput.addEventListener("keyup", (event) => {
	if (event.key === "Enter") {
		event.target.blur();
	}
});

function retrieveProblems() {

	var httpRetrieveProblems = new XMLHttpRequest();

	httpRetrieveProblems.open('GET', "../php/admin_get_problems.php?page=" + currentPage + "&items_on_page=" + itemsOnPage + "&filter_by_title_or_id=" + filterByTitleOrId, true);

	//Send the proper header information along with the request
	httpRetrieveProblems.setRequestHeader('Content-Type', 'application/json');
	httpRetrieveProblems.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	httpRetrieveProblems.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));

	httpRetrieveProblems.onreadystatechange = function () {//Call a function when the state changes.
		if (httpRetrieveProblems.readyState == 4 && httpRetrieveProblems.status == 200) {

			// console.log(httpRetrieveProblems.responseText);

			var result = JSON.parse(httpRetrieveProblems.responseText);

			result.forEach(element => {
				displayProblem(element);
			});

		}
		if (httpRetrieveProblems.readyState == 4 && httpRetrieveProblems.status == 401) {
			window.location.assign("unauthorized.html");
		}

	}

	httpRetrieveProblems.send();

}




function displayProblem(jsonObj) {
	// console.log(jsonObj);

	const problemId = jsonObj["id"];

	const problemSection = document.getElementById("problem-list");
	const template = document.getElementById("problem-template");

	const clone = template.content.cloneNode(true);

	let problemIdLabel = clone.getElementById("problem-entry-id");
	problemIdLabel.textContent = problemId;
	problemIdLabel.id = "pt" + problemId;

	let problemTitle = clone.getElementById("problem-entry-title");
	problemTitle.textContent = jsonObj["title"];
	problemTitle.id = "pt" + problemId;

	let problemViewButton = clone.getElementById("problem-entry-view-button");
	problemViewButton.setAttribute("onclick", "location.href = 'admin-view-problem.html?id=" + problemId + "\';");
	problemViewButton.id = "pvb" + problemId;

	let problemStatus = clone.getElementById("problem-entry-status");
	problemStatus.textContent = jsonObj["status"];
	problemStatus.id = "ps" + problemId;

	let problemPostDate = clone.getElementById("problem-entry-post-date");
	problemPostDate.textContent = jsonObj["post_date"];
	problemPostDate.id = "pd" + problemId;

	let problemTeacher = clone.getElementById("problem-entry-teacher");
	problemTeacher.textContent = jsonObj["username"];
	problemTeacher.setAttribute("href", "profile.html?id=" + jsonObj["user_id"]);
	problemTeacher.id = "ptc" + jsonObj["user_id"];

	problemSection.appendChild(clone);
}


function updateFilter() {
	filterByTitleOrId = document.getElementById("search-input").value;
}
