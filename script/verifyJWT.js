
function isTokenExpired(token) {
  const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
  return (Math.floor((new Date).getTime() / 1000)) >= expiry;
}

const token = localStorage.getItem("JWTTOKEN");

if(token == null || isTokenExpired(localStorage.getItem("JWTTOKEN"))){
	window.location.replace("login.html");
}