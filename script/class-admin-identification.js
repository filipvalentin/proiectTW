//setez id-ul pe butoane ca sa il am peste tot
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const classOverviewButton = document.getElementById("class-overview-button");
if(classOverviewButton)
classOverviewButton.setAttribute("href", "class-admin-overview.html?id=" + id);

const classSettingsButton = document.getElementById("class-settings-button");
if(classSettingsButton)
classSettingsButton.setAttribute("href", "class-admin-settings.html?id=" + id);

const clasStudentsButton = document.getElementById("class-students-button");
if(clasStudentsButton)
clasStudentsButton.setAttribute("href", "class-admin-students.html?id=" + id);

const classHomeworksButton = document.getElementById("class-homeworks-button");
if(classHomeworksButton)
classHomeworksButton.setAttribute("href", "class-admin-homeworks.html?id=" + id);

const classId = document.getElementById("class-id");
if(classId)
	classId.textContent = id;

const addStudentsButton = document.getElementById("add-students-button");
if(addStudentsButton){
	addStudentsButton.setAttribute("href", "add-students.html?id=" + id);
}

const addHomeworkButton = document.getElementById("add-homework-button");
if(addHomeworkButton){
	addHomeworkButton.setAttribute("href", "add-homework.html?id=" + id);
}

var http = new XMLHttpRequest();
http.open("GET", 'getClassName.php?id='+id, true);
http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
http.onreadystatechange = function () {
    //Call a function when the state changes.
    if (http.readyState == 4 && http.status == 200) {
        var nameClass=document.getElementById('name-class');
        nameClass.innerHTML=http.responseText;

        }
    if (http.readyState == 4 && http.status == 401) {
        console.log('au')
        window.location.assign("unauthorized.html");
    }
}
http.send();