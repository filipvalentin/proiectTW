
var currentPage = 1;
var itemsOnPage = 100;
var filterByTitleOrId = "";

retrieveClasses();

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("focusout",
	(event) => {
		document.getElementById("classes-list").replaceChildren();

		retrieveClasses();
	}
);
searchInput.addEventListener("keyup", (event) => {
	if (event.key === "Enter") {
		event.target.blur();
	}
});



function retrieveClasses() {
	var httpRetrieveClasses = new XMLHttpRequest();

	httpRetrieveClasses.open('GET', "admin_get_classes.php?page=" + currentPage + "&items_on_page=" + itemsOnPage + "&filter_by_title_or_id=" + filterByTitleOrId, true);

	//Send the proper header information along with the request
	httpRetrieveClasses.setRequestHeader('Content-Type', 'application/json');
	httpRetrieveClasses.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	httpRetrieveClasses.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));

	httpRetrieveClasses.onreadystatechange = function () {//Call a function when the state changes.
		if (httpRetrieveClasses.readyState == 4 && httpRetrieveClasses.status == 200) {

			// console.log(httpRetrieveClasses.responseText);

			var result = JSON.parse(httpRetrieveClasses.responseText);

			result.forEach(element => {
				displayClass(element);
			});

		}
		if (httpRetrieveClasses.readyState == 4 && httpRetrieveClasses.status == 401) {

			window.location.assign("unauthorized.html");
		}

	}

	httpRetrieveClasses.send();
}

function displayClass(jsonObj) {
	const classId = jsonObj["id"];

	const classList = document.getElementById("classes-list");
	var template = document.getElementById("class-template");

	const clone = template.content.cloneNode(true);

	let classTitle = clone.getElementById("entry-class-title");
	classTitle.textContent = jsonObj["class_name"];
	classTitle.id = "cri" + classId;

	let classIdLabel = clone.getElementById("entry-class-id");
	classIdLabel.textContent = classId;
	classIdLabel.setAttribute("href", "classes-admin-overview.html?id=" + classId);
	classIdLabel.id = "c" + classId;

	let classTeacher = clone.getElementById("entry-teacher-username");
	classTeacher.textContent = jsonObj["username"];
	classTeacher.setAttribute("href", "profile.html?id=" + jsonObj["user_id"]);
	classTeacher.id = "cte" + classId;

	let classCreationDate = clone.getElementById("entry-creation-date");
	classCreationDate.textContent = jsonObj["creation_time"];
	classCreationDate.id = "cd" + classId;

	let classGotoButton = clone.getElementById("entry-class-goto-button");
	classGotoButton.href = "class-admin-overview.html?id=" + classId;

	classList.appendChild(clone);

}

function updateFilter() {
	filterByTitleOrId = document.getElementById("search-input").value;
}
