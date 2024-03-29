var http = new XMLHttpRequest();
http.open("GET", '../php/getInformation.php', true);
http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
http.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
http.onreadystatechange = function () {
    //Call a function when the state changes.
    if (http.readyState == 4 && http.status == 200) {
        var information = JSON.parse(http.responseText);
        // console.log(information);

        //adauga username ul in informatii
        var username = information.username;
        // console.log(username);
        var mainFrame = document.getElementById("main-frame");
        var usernameInput = document.getElementById("username");
        usernameInput.value = username;
        var usernameDiv = document.createElement("div");
        usernameDiv.classList.add("username");
        usernameDiv.textContent = username;
        mainFrame.appendChild(usernameDiv);

        //

        var nameUser = information.entire_name;
        var nameInput = document.getElementById("name");
        nameInput.value = nameUser;
        // console.log(nameUser);
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
        // console.log(email);
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

        var genderInput = document.getElementById("gender");
        if(information.gender !=''){
            genderInput.removeAttribute('selected');
            genderInput.value = information.gender;
        }
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
        var dayInput = document.getElementById("birthday");
        dayInput.value = information.unformat_b_d;
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
        var schoolInput = document.getElementById("highschool");
        schoolInput.value = information.high_school;
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
        var aboutInput = document.getElementById("aboutMe");
        var aboutMe = information.about_me;
        aboutInput.innerHTML = aboutMe;
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

        var xhr = new XMLHttpRequest();
        xhr.open('GET', '../php/getImage.php', true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("JWT"));
        xhr.onload = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                // console.log(xhr.responseText);
                if (xhr.responseText != '') {
                    // console.log('ay');
                    var imgElement = document.getElementById('profile');
                    imgElement.src = xhr.responseText;
                } else {
                    var imgElement = document.getElementById('profile');
                    imgElement.src = "../resources/Sample_User_Icon.png";
                }
            } if (xhr.readyState == 4 && xhr.status == 401) {
                // console.log('au')
                window.location.assign("unauthorized.html");
            }
        };

        xhr.send();

    }
    if (http.readyState == 4 && http.status == 401) {
        // console.log('au')
        window.location.assign("unauthorized.html");
    }
}
http.send();

