function sentEmail() {
    document.getElementById('empty-email').style.display = "none";
    document.getElementById('no-email').style.display = "none";

    if (document.getElementById('userEmail').value == '') {
        document.getElementById('empty-email').style.display = "block";
    } else {
        var emailUser = document.getElementById('userEmail').value;

        var http = new XMLHttpRequest();
        console.log(emailUser);
        http.open("POST", '../php/sentEmail.php', true);
        http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        const data = {
            email: emailUser
        };
        const json = JSON.stringify(data);
        console.log(json);
        http.onreadystatechange = function () {
            //Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
                console.log("hip");
                var response = http.responseText;
                console.log(response);
                window.location.assign("reset-password.html?id="+response);
            }
            if (http.readyState == 4 && http.status == 404) {
                document.getElementById('no-email').style.display = "block";
            }
        }
        http.send(json);
    }
}