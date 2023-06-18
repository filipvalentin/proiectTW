
const token = localStorage.getItem("JWT");
const userRole = parseJwt(token)["role"];

if (token == null || isTokenExpired(token)) {
	window.location.assign("login.html");
}
else if (userRole != "student" ) {
	window.location.assign("unauthorized.html");
}
