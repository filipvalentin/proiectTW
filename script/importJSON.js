function importJSON() {
    var fileInput = document.getElementById("inputJSON");
    var file = fileInput.files[0];

    if (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var contents = e.target.result;
            var jsonData = JSON.parse(contents);

            console.log(jsonData);

            var http = new XMLHttpRequest();
            http.open("POST", "../php/importJSON.php", true);
            http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            http.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    console.log("hello");
                    window.location.assign("my-problems.html");
                }
                if (http.readyState == 4 && http.status == 404) {
                    var errorDiv = document.getElementById("no-json");
                    errorDiv.style.display = "block";
                }else{
                    console.log("helloDD");
                }
            }

            http.send(JSON.stringify(jsonData));
        };

        reader.readAsText(file);
    } else {
        // No file selected
        var errorDiv = document.getElementById("no-json");
        errorDiv.style.display = "block";
    }
}