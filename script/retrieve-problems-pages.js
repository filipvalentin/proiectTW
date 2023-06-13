var pagesNumber = 0;
var currentPage = 1;


function retrievePageNumbers() {
	var http = new XMLHttpRequest();


	var url = "get_my_problems_pages.php"+
		"?filterWords=" + filterWords +
		"&filerDifficulty=" + filerDifficulty +
		"&filterTags=" + filterTags +
		"&filterStartDate=" + filterStartDate +
		"&filterEndDate=" + filterEndDate;
	console.log(url.toString());
	http.open('GET', url.toString(), true);

	//Send the proper header information along with the request
	http.setRequestHeader('Content-Type', 'application/json');
	http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	http.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));

	http.onreadystatechange = function () {//Call a function when the state changes.
		if (http.readyState == 4 && http.status == 200) {

			console.log(http.responseText);
			pagesNumber = parseInt(http.responseText);

		}
		if (http.readyState == 4 && http.status == 401) {
			console.log(http.responseText);
			// window.location.assign("unauthorized.html");
		}

	}

	http.send();
}

function updatePageNumbers(){
	//1 2 [select] last >= 4
}