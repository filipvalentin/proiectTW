
const userJwt = parseJwt(localStorage.getItem("JWT"));

const studentNavbar = document.getElementById("student-navbar");
const teacherNavbar = document.getElementById("teacher-navbar");

var userImage = null;
if (userJwt["role"] == "student") {
	document.getElementById("student-navbar").style.display = "inline-block";
	document.getElementById("profile-my-profile-link-stud").setAttribute("href", "profile.html?id=" + userJwt["sub"]);
	userImage = document.getElementById("navbar-profile-img-stud");
}
else {
	document.getElementById("teacher-navbar").style.display = "inline-block";
	document.getElementById("profile-my-profile-link-prof").setAttribute("href", "profile.html?id=" + userJwt["sub"]);
	userImage = document.getElementById("navbar-profile-img-prof");
}


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


function showNavbarProfileMenuProf() {
	const menu = document.getElementById("navbar-profile-menu-prof");
	menu.style.display = "flex";
}

function hideNavbarProfileMenuProf() {
	const menu = document.getElementById("navbar-profile-menu-prof");
	menu.style.display = "none";
}

function showNavbarProfileMenuStud() {
	const menu = document.getElementById("navbar-profile-menu-stud");
	menu.style.display = "flex";
}

function hideNavbarProfileMenuStud() {
	const menu = document.getElementById("navbar-profile-menu-stud");
	menu.style.display = "none";
}


function logout() {
	localStorage.removeItem("JWT");
	window.location.replace("index.html");
}