function sendRequest() {
	const title = document.getElementById("title").value;
	const difficulty = document.getElementById("difficulty").value;
	const tags = document.getElementById("tags").value;
	const description = document.getElementById("description").value;

	var http = new XMLHttpRequest();

	http.open('POST', "../php/add_problem.php", true);

	//Send the proper header information along with the request
	http.setRequestHeader('Content-Type', 'application/json');
	http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	http.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));

	const data = {
		title: title,
		difficulty: difficulty,
		tags: tags,
		description: description
	};

	const json = JSON.stringify(data);

	http.onreadystatechange = function () {//Call a function when the state changes.
		if (http.readyState == 4 && http.status == 200) {
			window.location.assign("my-problems.html");
		}
		if (http.readyState == 4 && http.status == 401) {
			window.location.assign("unauthorized.html");
		}
		
	}

	http.send(json);

}


document.getElementById('description').addEventListener('keydown', function(e) {
	if (e.key == 'Tab') {
		e.preventDefault();
		var start = this.selectionStart;
		var end = this.selectionEnd;
	
		// set textarea value to: text before caret + tab + text after caret
		this.value = this.value.substring(0, start) +
			"\t" + this.value.substring(end);
	
		// put caret at right position again
		this.selectionStart =
		this.selectionEnd = start + 1;
	}
  });