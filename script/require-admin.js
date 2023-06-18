
const token = localStorage.getItem("JWT");

if (token == null || isTokenExpired(token)) {
	window.location.assign("login.html");
}
else if ( parseJwt(token)["role"] != "admin") {
	window.location.assign("unauthorized.html");
}
