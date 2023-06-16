
const userRole = parseJwt(localStorage.getItem("JWT"))["role"];

const studentNavbar = document.getElementById("student-navbar");
const teacherNavbar = document.getElementById("teacher-navbar");

if (userRole == "student") {

	document.getElementById("student-navbar").style.display = "block";

}
else {
	document.getElementById("teacher-navbar").style.display = "block";
}

function logout() {
	localStorage.removeItem("JWT");
	window.location.replace("index.html");
}


const userImage = document.getElementById("navbar-profile-img");
var httpGetUserPic = new XMLHttpRequest();
httpGetUserPic.open('GET', "getImage.php", true);
httpGetUserPic.setRequestHeader('Content-Type', 'application/json');
httpGetUserPic.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
httpGetUserPic.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
httpGetUserPic.onreadystatechange = function () {
	if (httpGetUserPic.readyState == 4 && httpGetUserPic.status == 200) {
		// console.log(httpGetUserPic.responseText);
		userImage.setAttribute("src", httpGetUserPic.responseText);
	}
	else if (httpGetUserPic.readyState == 4 && httpGetUserPic.status == 401) {
		window.location.assign("unauthorized.html");
	}
}
httpGetUserPic.send();