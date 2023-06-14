var http = new XMLHttpRequest();
http.open("GET", 'getInformation.php', true);
http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
http.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
http.onreadystatechange = function () {
    //Call a function when the state changes.
    if (http.readyState == 4 && http.status == 200) {
        var information = JSON.parse(http.responseText);
        console.log(information);

        //adauga username ul in informatii
        var username = information.username;
        console.log(username);
        var mainFrame = document.getElementById("main-frame");
        var usernameDiv = document.createElement("div");
        usernameDiv.classList.add("username");
        usernameDiv.textContent = username;
        mainFrame.appendChild(usernameDiv);

        //

        var nameUser = information.entire_name;
        console.log(nameUser);
        var mainFrame = document.getElementById("information");
        var nameUserDiv = document.createElement("div");
        nameUserDiv.classList.add("user-info");
        var aux1 = document.createElement("p");
        aux1.innerHTML = "Name: "
        nameUserDiv.appendChild(aux1);
        var aux2 = document.createElement("p");
        aux2.innerHTML = nameUser;
        nameUserDiv.appendChild(aux2);
        mainFrame.appendChild(nameUserDiv);

        //

        var email = information.email;
        console.log(email);
        var emailDiv = document.createElement("div");
        emailDiv.classList.add("user-info");
        var aux1 = document.createElement("p");
        aux1.innerHTML = "Email: "
        emailDiv.appendChild(aux1);
        var aux2 = document.createElement("p");
        aux2.innerHTML = email;
        emailDiv.appendChild(aux2);
        mainFrame.appendChild(emailDiv);

        //

        var creation_date = information.creation_date;
        var creationDiv = document.createElement("div");
        creationDiv.classList.add("user-info");
        var aux1 = document.createElement("p");
        aux1.innerHTML = "Here since: "
        creationDiv.appendChild(aux1);
        var aux2 = document.createElement("p");
        aux2.innerHTML = creation_date;
        creationDiv.appendChild(aux2);
        mainFrame.appendChild(creationDiv);

        //

        if (information.display_gender == '1') {
            var gender = information.gender;
            var genderDiv = document.createElement("div");
            genderDiv.classList.add("user-info");
            var aux1 = document.createElement("p");
            aux1.innerHTML = "Gender: "
            genderDiv.appendChild(aux1);
            var aux2 = document.createElement("p");
            aux2.innerHTML = gender;
            genderDiv.appendChild(aux2);
            mainFrame.appendChild(genderDiv);
        }

        //

        if (information.display_birthdate == '1') {
            var birthday = information.birth_date;
            var birthDiv = document.createElement("div");
            birthDiv.classList.add("user-info");
            var aux1 = document.createElement("p");
            aux1.innerHTML = "My birthday : "
            birthDiv.appendChild(aux1);
            var aux2 = document.createElement("p");
            aux2.innerHTML = birthday;
            birthDiv.appendChild(aux2);
            mainFrame.appendChild(birthDiv);
        }

        //

        if (information.display_highschool == '1') {
            var high_school = information.high_school;
            var schoolDiv = document.createElement("div");
            schoolDiv.classList.add("user-info");
            var aux1 = document.createElement("p");
            aux1.innerHTML = "Institution : "
            schoolDiv.appendChild(aux1);
            var aux2 = document.createElement("p");
            aux2.innerHTML = high_school;
            schoolDiv.appendChild(aux2);
            mainFrame.appendChild(schoolDiv);
        }

        //

        var aboutMe = information.about_me;
        var aboutDiv = document.createElement("div");
        aboutDiv.classList.add("aboutme");
        var aux1 = document.createElement("div");
        aux1.classList.add("title");
        aux1.innerHTML = "About me"
        aboutDiv.appendChild(aux1);
        var aux2 = document.createElement("div");
        aux2.classList.add("content");
        var aux3 = document.createElement("p");
        aux3.innerHTML = aboutMe;
        aux2.appendChild(aux3);
        aboutDiv.appendChild(aux2);
        mainFrame.appendChild(aboutDiv);

    }
    if (http.readyState == 4 && http.status == 401) {
        console.log('au')
        window.location.assign("unauthorized.html");
    }
}
http.send();