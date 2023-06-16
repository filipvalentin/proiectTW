//setez id-ul pe butoane ca sa il am peste tot
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const classOverviewButton = document.getElementById("class-overview-button");
if (classOverviewButton)
	classOverviewButton.setAttribute("href", "class-admin-overview.html?id=" + id);

const classSettingsButton = document.getElementById("class-settings-button");
if (classSettingsButton)
	classSettingsButton.setAttribute("href", "class-admin-settings.html?id=" + id);

const clasStudentsButton = document.getElementById("class-students-button");
if (clasStudentsButton)
	clasStudentsButton.setAttribute("href", "class-admin-students.html?id=" + id);

const classHomeworksButton = document.getElementById("class-homeworks-button");
if (classHomeworksButton)
	classHomeworksButton.setAttribute("href", "class-admin-homeworks.html?id=" + id);

const classId = document.getElementById("class-id");
if (classId)
	classId.textContent = id;

const addStudentsButton = document.getElementById("add-students-button");
if (addStudentsButton) {
	addStudentsButton.setAttribute("href", "add-students.html?id=" + id);
}

const addHomeworkButton = document.getElementById("add-homework-button");
if (addHomeworkButton) {
	addHomeworkButton.setAttribute("href", "add-homework.html?id=" + id);
}

var nameClass = document.getElementById("name-class");
if (nameClass) {
	var httpClassName = new XMLHttpRequest();
	httpClassName.open("GET", 'getClassName.php?id=' + id, true);
	httpClassName.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	httpClassName.onreadystatechange = function () {
		if (httpClassName.readyState == 4 && httpClassName.status == 200) {
			nameClass.textContent = httpClassName.responseText;
			var changeName = document.getElementById('new-name');
			if (changeName != null) {
				changeName.setAttribute('value', httpClassName.responseText);

				var descriptionClass = document.getElementById("new-description");
				if (descriptionClass) {
					var httpDescriptionName = new XMLHttpRequest();
					httpDescriptionName.open("GET", 'getClassDescription.php?id=' + id, true);
					httpDescriptionName.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
					httpDescriptionName.onreadystatechange = function () {
						if (httpDescriptionName.readyState == 4 && httpDescriptionName.status == 200) {
							console.log(httpDescriptionName.responseText);
							descriptionClass.innerHTML = httpDescriptionName.responseText;
						}
						if (httpDescriptionName.readyState == 4 && httpDescriptionName.status == 401) {
							console.log('au')
							window.location.assign("unauthorized.html");
						}
					}
					httpDescriptionName.send();
				}
			}
		}
		if (httpClassName.readyState == 4 && httpClassName.status == 401) {
			console.log('au')
			window.location.assign("unauthorized.html");
		}
	}
	httpClassName.send();
}