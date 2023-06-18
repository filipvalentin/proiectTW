var pages = 0;
var currentPage = 1;
var itemsOnPage = 15;
var numberOfUsers = 0;

var filterUsernameId = "";
var filterAccountType = "";
var filterCreationDate = "";

const itemsOnPageElem = document.getElementById("items-on-page");
itemsOnPageElem.value = itemsOnPage;
itemsOnPageElem.addEventListener("focusout",
	(event) => {
		itemsOnPage = event.target.value;

		updatePageSequenceAsync();
	}
);

function updatePageSequenceAsync() {
	updateFilters();
	retrieveNumberOfUsersAsync();

}

itemsOnPageElem.addEventListener("keyup", (event) => {
	if (event.key === "Enter") {
		event.target.blur();
	}
});

retrieveNumberOfUsers();//initial load, it's not used for future requests
retrieveUsers(currentPage, itemsOnPage);

function updateResultList() {
	updateFilters();

	const userList = document.getElementById("user-list");
	userList.replaceChildren();

	retrieveUsers(currentPage, itemsOnPage);
}



function updateFilters() {
	filterUsernameId = document.getElementById("filter-username-id").value;
	if (document.getElementById("filter-select-role").value == "unset") {
		filterAccountType = "";
	}
	else {
		filterAccountType = document.getElementById("filter-select-role").value;
	}
	filterCreationDate = document.getElementById("filter-date").value;
}

function retrieveNumberOfUsers() {
	var httpRetrieveNumberOfUsers = new XMLHttpRequest();

	var url = "admin_get_users_count.php?page=" + currentPage +
		"&items_on_page=" + itemsOnPage +
		"&filterUsernameId=" + filterUsernameId +
		"&filterAccountType=" + filterAccountType +
		"&filterCreationDate=" + filterCreationDate;

	httpRetrieveNumberOfUsers.open('GET', url.toString(), true);

	//Send the proper header information along with the request
	httpRetrieveNumberOfUsers.setRequestHeader('Content-Type', 'application/json');
	httpRetrieveNumberOfUsers.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	httpRetrieveNumberOfUsers.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));

	httpRetrieveNumberOfUsers.onreadystatechange = function () {//Call a function when the state changes.
		if (httpRetrieveNumberOfUsers.readyState == 4 && httpRetrieveNumberOfUsers.status == 200) {
			// console.log(httpRetrieveNumberOfUsers.responseText);

			numberOfUsers = httpRetrieveNumberOfUsers.responseText;
			updatePageNumbersWrapper(httpRetrieveNumberOfUsers.responseText);
		}
		if (httpRetrieveNumberOfUsers.readyState == 4 && httpRetrieveNumberOfUsers.status == 401) {
			// console.log(httpRetrieveNumberOfUsers.responseText);
			window.location.assign("unauthorized.html");
		}
	}
	httpRetrieveNumberOfUsers.send();
}

function retrieveNumberOfUsersAsync() {
	var httpRetrieveNumberOfUsers = new XMLHttpRequest();

	var url = "admin_get_users_count.php?page=" + currentPage +
		"&items_on_page=" + itemsOnPage +
		"&filterUsernameId=" + filterUsernameId +
		"&filterAccountType=" + filterAccountType +
		"&filterCreationDate=" + filterCreationDate;

	httpRetrieveNumberOfUsers.open('GET', url.toString(), true);

	//Send the proper header information along with the request
	httpRetrieveNumberOfUsers.setRequestHeader('Content-Type', 'application/json');
	httpRetrieveNumberOfUsers.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	httpRetrieveNumberOfUsers.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));

	httpRetrieveNumberOfUsers.onreadystatechange = function () {//Call a function when the state changes.
		if (httpRetrieveNumberOfUsers.readyState == 4 && httpRetrieveNumberOfUsers.status == 200) {
			// console.log(httpRetrieveNumberOfUsers.responseText);

			numberOfUsers = httpRetrieveNumberOfUsers.responseText;
			updatePageNumbersWrapper(httpRetrieveNumberOfUsers.responseText);

			updateResultList();
		}
		if (httpRetrieveNumberOfUsers.readyState == 4 && httpRetrieveNumberOfUsers.status == 401) {
			// console.log(httpRetrieveNumberOfUsers.responseText);
			window.location.assign("unauthorized.html");
		}
	}
	httpRetrieveNumberOfUsers.send();
}

function updatePageNumbersWrapper() {
	pages = Math.ceil(parseInt(numberOfUsers) / itemsOnPage);

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

	pageSelector.value = 1;
	currentPage = 1;

}


function backPageButtonClicked() {

	const pageSelector = document.getElementById("page-selector");

	if (currentPage > 1) {
		currentPage -= 1;
	}

	pageSelector.value = currentPage;

	updateResultList();

}

function nextPageButtonClicked() {
	const pageSelector = document.getElementById("page-selector");

	if (currentPage < pages) {
		currentPage += 1;
	}

	pageSelector.value = currentPage;

	updateResultList();
}

function pageSelectorClicked() {
	const pageSelector = document.getElementById("page-selector");
	currentPage = pageSelector.value;

	updateResultList();
}


function updateUserList() {
	const problemList = document.getElementById("problem-list");
	problemList.replaceChildren();

	// comst updatePageNumbers

	// console.log(itemsOnPage, pages);
	retrieveUsers(currentPage, itemsOnPage);
}

function retrieveUsers(currentPage, itemsOnPage) {
	var httpRetrieveUsers = new XMLHttpRequest();
	httpRetrieveUsers.open("POST", "admin_get_users.php?page=" + currentPage +
		"&items_on_page=" + itemsOnPage +
		"&filterUsernameId=" + filterUsernameId +
		"&filterAccountType=" + filterAccountType +
		"&filterCreationDate=" + filterCreationDate, true);
	httpRetrieveUsers.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	httpRetrieveUsers.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
	httpRetrieveUsers.onreadystatechange = function () {
		if (httpRetrieveUsers.readyState == 4 && httpRetrieveUsers.status == 200) {

			// console.log(httpRetrieveUsers.responseText);

			var result = JSON.parse(httpRetrieveUsers.responseText);

			result.forEach(element => {
				displayUserEntry(element);
			});
		}
		if (httpRetrieveUsers.readyState == 4 && httpRetrieveUsers.status == 401) {
			window.location.assign("unauthorized.html");
		}
	}
	httpRetrieveUsers.send();
}


function displayUserEntry(jsonObj) {
	const userId = jsonObj["user_id"];

	const userList = document.getElementById("user-list");
	const template = document.getElementById("user-entry-template");

	const clone = template.content.cloneNode(true);

	let entryUsername = clone.getElementById("user-entry-username");
	entryUsername.textContent = jsonObj["username"];
	entryUsername.id = "u" + userId;

	let entryRole = clone.getElementById("entry-user-role");
	entryRole.textContent = jsonObj["role"];
	entryRole.id = "ur" + userId;

	let userEntryDiv = clone.getElementById("entry-user-div");
	userEntryDiv.setAttribute("onclick", "getUserData('" + userId + "')");
	userEntryDiv.id = "ud" + userId;

	userList.appendChild(clone);
}


