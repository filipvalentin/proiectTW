
//9 per pagina
//de adaugat butoane

const urlParams2 = new URLSearchParams(window.location.search);
const urlClassId = urlParams2.get('id');

const JWT = parseJwt(localStorage.getItem("JWT"));
const role = JWT["role"];

function retrieveHomeworks() {

	var http = new XMLHttpRequest();

	let pageCountMultiplier = 0;

	if(!urlClassId){
		return;
	}

	var url = "../php/get_homeworks.php?class_id=" + urlClassId + 
		"&page_multiplier=" + pageCountMultiplier +
		"&page_count=" + 9;

	http.open('GET', url.toString(), true);

	//Send the proper header information along with the request
	http.setRequestHeader('Content-Type', 'application/json');
	http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	http.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));

	http.onreadystatechange = function () {//Call a function when the state changes.
		if (http.readyState == 4 && http.status == 200) {

			// console.log(http.responseText);

			var result = JSON.parse(http.responseText);

			// lastRetrievedIds = new Array();

			result.forEach(element => {
				displayHomework(element);
				// lastRetrievedIds.push("p" + element["id"]);
			});

			// console.log(lastRetrievedIds);

		}
		if (http.readyState == 4 && http.status == 401) {
			console.log(http.responseText);
			// window.location.assign("unauthorized.html");
		}

	}

	http.send();

}


function displayHomework(jsonObj) {
	const hmkId = jsonObj["homework_id"];

	const hmkList = document.getElementById("homeworks-list");
	const template = document.getElementById("homework-template");

	const clone = template.content.cloneNode(true);

	let hmkIdNode = clone.getElementById("homework-div");
	hmkIdNode.id = "h" + hmkId;

	let hmkTitle = clone.getElementById("homework-title");
	hmkTitle.textContent = jsonObj["title"];
	hmkTitle.id = "h" + hmkId + "t";

	let hmkGotoButton = clone.getElementById("homework-goto-button");
	if(role == "teacher"){
		hmkGotoButton.setAttribute("onclick", "location.href = 'prof-view-homework.html?id=" + hmkId + "\';");
	}
	else if(role == "student"){
		hmkGotoButton.setAttribute("onclick", "location.href = 'stud-view-homework.html?id=" + hmkId + "\';");
	}
	hmkGotoButton.id = "h" + hmkId + "goto";

	let hmkDeadline = clone.getElementById("deadline-label-id");
	hmkDeadline.textContent = jsonObj["deadline"];
	hmkDeadline.id = "h" + hmkId + "dl";


	hmkList.appendChild(clone);
}