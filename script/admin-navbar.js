function logout() {
	localStorage.removeItem("JWT");
	window.location.replace("index.html");
}