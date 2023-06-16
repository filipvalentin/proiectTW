function isTokenExpired(token) {
	const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
	return (Math.floor((new Date).getTime() / 1000)) >= expiry;
}

const token = localStorage.getItem("JWT");

if (token != null && !isTokenExpired(token)) {
	window.location.assign("my-classes.html");
}