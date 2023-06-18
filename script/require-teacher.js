
const token = localStorage.getItem("JWT");
const userRole = parseJwt(token)["role"];

if (token == null || isTokenExpired(token)) {
	window.location.assign("login.html");
}
else if (userRole != "teacher" ) {
	window.location.assign("unauthorized.html");
}
