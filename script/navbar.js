
const userJwt = parseJwt(localStorage.getItem("JWT"));

const studentNavbar = document.getElementById("student-navbar");
const teacherNavbar = document.getElementById("teacher-navbar");

var userImage = null;
var username = null
if (userJwt["role"] == "student") {
	document.getElementById("student-navbar").style.display = "inline-block";
	document.getElementById("profile-my-profile-link-stud").setAttribute("href", "profile.html?id=" + userJwt["sub"]);
	userImage = document.getElementById("navbar-profile-img-stud");
	username = document.getElementById("navbar-profile-username-stud");
}
else {
	document.getElementById("teacher-navbar").style.display = "inline-block";
	document.getElementById("profile-my-profile-link-prof").setAttribute("href", "profile.html?id=" + userJwt["sub"]);
	userImage = document.getElementById("navbar-profile-img-prof");
	username = document.getElementById("navbar-profile-username-prof");
}


var httpGetUserInfo = new XMLHttpRequest();
httpGetUserInfo.open('GET', "navbar_get_user_info.php", true);
httpGetUserInfo.setRequestHeader('Content-Type', 'application/json');
httpGetUserInfo.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
httpGetUserInfo.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
httpGetUserInfo.onreadystatechange = function () {
	if (httpGetUserInfo.readyState == 4 && httpGetUserInfo.status == 200) {
		// console.log(httpGetUserInfo.responseText)
		let json = JSON.parse(httpGetUserInfo.responseText)[0];

		userImage.setAttribute("src", json["user_image"]);
		username.textContent = json["username"];
	}
	else if (httpGetUserInfo.readyState == 4 && httpGetUserInfo.status == 401) {
		window.location.assign("unauthorized.html");
	}
}
httpGetUserInfo.send();


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