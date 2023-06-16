const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const classOverviewButton = document.getElementById("class-overview-button");
if (classOverviewButton)
	classOverviewButton.setAttribute("href", "class-student-overview.html?id=" + id);


const clasStudentsButton = document.getElementById("class-students-button");
if (clasStudentsButton)
	clasStudentsButton.setAttribute("href", "class-student-students.html?id=" + id);

const classHomeworksButton = document.getElementById("class-homeworks-button");
if (classHomeworksButton)
	classHomeworksButton.setAttribute("href", "class-student-homeworks.html?id=" + id);

const classId = document.getElementById("class-id");
if (classId)
	classId.textContent = id;


const addHomeworkButton = document.getElementById("add-homework-button");
if (addHomeworkButton) {
	addHomeworkButton.setAttribute("href", "add-homework.html?id=" + id);
}

var className = document.getElementById("class-name");
if (className) {
	var httpClassName = new XMLHttpRequest();
	httpClassName.open("GET", 'getClassName.php?id=' + id, true);
	httpClassName.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	httpClassName.onreadystatechange = function () {
		if (httpClassName.readyState == 4 && httpClassName.status == 200) {
			className.textContent = httpClassName.responseText;
		}
	}
	httpClassName.send();
}