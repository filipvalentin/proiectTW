
const token = localStorage.getItem("JWT");
const userRole = parseJwt(token)["role"];

if (token == null || isTokenExpired(token)) {
	window.location.assign("login.html");
}
else if (userRole != "teacher" && userRole != "admin") {
	window.location.assign("unauthorized.html");
}
