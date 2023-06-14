
var http = new XMLHttpRequest();

http.open('GET', "get_my_classes.php", true);

//Send the proper header information along with the request
http.setRequestHeader('Content-Type', 'application/json');
http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
http.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));

http.onreadystatechange = function () {//Call a function when the state changes.
	if (http.readyState == 4 && http.status == 200) {

		// console.log(http.responseText);

		var result = JSON.parse(http.responseText);

		result.forEach(element => {
			displayClass(element);
		});		

	}
	if (http.readyState == 4 && http.status == 401) {

		window.location.assign("unauthorized.html");
	}

}

http.send();


function displayClass(jsonObj){

	const classId = jsonObj["id"];

	const classList = document.getElementById("class-list");
	const template = document.getElementById("class-template");

	const clone = template.content.cloneNode(true);


	let classIdNode = clone.getElementById("class-div");
	classIdNode.id = "c" + classId;

	let classTitle = clone.getElementById("class-title");
	classTitle.textContent = jsonObj["class_name"];
	classTitle.id = "c" + classId + "t";

	let classViewButton = clone.getElementById("class-goto-button");
	classViewButton.setAttribute("onclick", "location.href = 'class-admin-overview.html?id=" + jsonObj["id"] + "\';");
	classViewButton.id = "c" + classId + "b";

	let classDescription = clone.getElementById("class-description");
	classDescription.textContent = jsonObj["description"];
	classDescription.id = "c" + classId + "d";

	classList.appendChild(clone);

}